import { supabase } from "@/lib/supabase";
import { getSectionFromRollNo, getTimetableForSection, WeeklyTimetable } from "@/lib/pec-timetable";

export type AttendanceStatus = "present" | "absent" | "cancelled";

export interface AttendanceSubject {
  id: string; // e.g. "DSN3001" or custom ID
  name: string;
  code: string;
  lecturesAttended: number;
  lecturesAbsent: number;
  lecturesCancelled: number;
  lastUpdated?: string;
  isCustom?: boolean;
}

export interface AttendanceLog {
  id?: string;
  user_id?: string;
  subject_code: string;
  subject_name: string;
  date: string;
  status: AttendanceStatus;
  created_at?: string;
}

const STORAGE_KEY = "campus_connect_attendance_v3";

/**
 * Extracts unique non-free, non-lunch subjects from a weekly timetable.
 */
export function extractSubjectsFromTimetable(timetable: WeeklyTimetable): { name: string; code: string }[] {
  const map = new Map<string, { name: string; code: string }>();

  for (const day of timetable.schedule) {
    for (const ts of day.slots) {
      if (!ts.slot || ts.slot.type === "free" || ts.slot.type === "lunch") continue;
      const code = ts.slot.code || ts.slot.subject;
      const name = ts.slot.subject;
      if (!map.has(code)) {
        map.set(code, { name, code });
      }
    }
  }

  return Array.from(map.values());
}

/**
 * Merges timetable subjects with saved attendance records.
 */
export function mergeTimetableWithSaved(
  timetableSubjects: { name: string; code: string }[],
  saved: AttendanceSubject[]
): AttendanceSubject[] {
  const savedMap = new Map<string, AttendanceSubject>();
  for (const s of saved) {
    savedMap.set(s.code, s);
  }

  const result: AttendanceSubject[] = [];

  // Add all timetable subjects (restoring saved counts if present)
  for (const ts of timetableSubjects) {
    const existing = savedMap.get(ts.code);
    if (existing) {
      result.push({
        ...existing,
        name: ts.name, // keep up to date
      });
      savedMap.delete(ts.code);
    } else {
      result.push({
        id: ts.code,
        name: ts.name,
        code: ts.code,
        lecturesAttended: 0,
        lecturesAbsent: 0,
        lecturesCancelled: 0,
        lastUpdated: "Scheduled in Timetable",
        isCustom: false,
      });
    }
  }

  // Add any custom subjects the user added manually
  for (const remaining of savedMap.values()) {
    result.push(remaining);
  }

  return result;
}

/**
 * Load attendance subjects from localStorage
 */
export function loadLocalAttendance(): AttendanceSubject[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn("Failed to load local attendance:", err);
  }
  return [];
}

/**
 * Save attendance subjects to localStorage
 */
export function saveLocalAttendance(subjects: AttendanceSubject[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
  } catch (err) {
    console.warn("Failed to save local attendance:", err);
  }
}

/**
 * Sync attendance records with Supabase & PostgreSQL
 */
export async function syncSupabaseAttendance(userId: string, subjects: AttendanceSubject[]) {
  if (!userId) return;

  const recordsToUpsert = subjects.map((s) => ({
    user_id: userId,
    subject_code: s.code,
    subject_name: s.name,
    attended: s.lecturesAttended,
    absent: s.lecturesAbsent,
    cancelled: s.lecturesCancelled,
    updated_at: new Date().toISOString(),
  }));

  // 1. Sync to Supabase via HTTPS (Always reliable)
  if (supabase) {
    try {
      const { error } = await supabase
        .from("user_attendance")
        .upsert(recordsToUpsert, { onConflict: "user_id,subject_code" });
      if (error) console.warn("Supabase attendance sync notice:", error.message);
    } catch (err) {
      console.warn("Supabase attendance sync fallback:", err);
    }
  }

  // 2. Sync to local Express backend if running
  try {
    await fetch("http://localhost:3001/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, records: recordsToUpsert }),
    });
  } catch (_) {}
}

/**
 * Load attendance from Supabase & PostgreSQL if logged in
 */
export async function fetchSupabaseAttendance(userId: string): Promise<AttendanceSubject[] | null> {
  if (!userId) return null;

  // 1. Try Supabase HTTPS client first
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("user_attendance")
        .select("*")
        .eq("user_id", userId);

      if (!error && data && data.length > 0) {
        return data.map((row: any) => ({
          id: row.subject_code,
          name: row.subject_name,
          code: row.subject_code,
          lecturesAttended: row.attended || 0,
          lecturesAbsent: row.absent || 0,
          lecturesCancelled: row.cancelled || 0,
          lastUpdated: new Date(row.updated_at || Date.now()).toLocaleDateString(),
        }));
      }
    } catch (_) {}
  }

  // 2. Fallback to local Express PostgreSQL backend
  try {
    const res = await fetch(`http://localhost:3001/api/attendance?userId=${encodeURIComponent(userId)}`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        return json.data.map((row: any) => ({
          id: row.subject_code,
          name: row.subject_name,
          code: row.subject_code,
          lecturesAttended: row.attended || 0,
          lecturesAbsent: row.absent || 0,
          lecturesCancelled: row.cancelled || 0,
          lastUpdated: new Date(row.updated_at || Date.now()).toLocaleDateString(),
        }));
      }
    }
  } catch (_) {}

  return null;
}

/**
 * Calculate stats for a single subject
 */
export function calculateSubjectStats(subject: AttendanceSubject) {
  const conducted = subject.lecturesAttended + subject.lecturesAbsent;
  const percentage = conducted > 0 ? (subject.lecturesAttended / conducted) * 100 : 100;
  const isDanger = percentage < 75 && conducted > 0;

  let adviceMsg = "";
  if (conducted === 0) {
    adviceMsg = "No classes recorded yet";
  } else if (percentage >= 75) {
    // How many classes can be safely skipped
    const maxSkips = Math.floor((subject.lecturesAttended - 0.75 * conducted) / 0.75);
    if (maxSkips === 0) {
      adviceMsg = "On the edge! Don't miss the next class.";
    } else {
      adviceMsg = `Can safely skip ${maxSkips} next ${maxSkips === 1 ? "class" : "classes"}`;
    }
  } else {
    // How many consecutive classes must be attended to reach 75%
    const needed = Math.ceil((0.75 * conducted - subject.lecturesAttended) / 0.25);
    adviceMsg = `Must attend next ${needed} ${needed === 1 ? "class" : "classes"} to hit 75%`;
  }

  return { conducted, percentage, isDanger, adviceMsg };
}
