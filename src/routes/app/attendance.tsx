import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Check,
  X,
  Ban,
  AlertTriangle,
  Calendar,
  Plus,
  BookOpen,
  Star,
  RefreshCw,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Trash2,
  GraduationCap,
} from "lucide-react";
import { firebaseAuth } from "@/lib/firebase";
import { parsePecEmail } from "@/lib/pec-email";
import {
  getSectionFromRollNo,
  getTimetableForSection,
  getTodaySchedule,
  WeeklyTimetable,
  ClassSlot,
} from "@/lib/pec-timetable";
import {
  AttendanceSubject,
  AttendanceStatus,
  extractSubjectsFromTimetable,
  mergeTimetableWithSaved,
  loadLocalAttendance,
  saveLocalAttendance,
  syncSupabaseAttendance,
  fetchSupabaseAttendance,
  calculateSubjectStats,
} from "@/lib/attendance";

export const Route = createFileRoute("/app/attendance")({
  head: () => ({
    meta: [{ title: "Attendance Tracker — Campus Connect" }],
  }),
  component: AttendanceTracker,
});

function AttendanceTracker() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [subjects, setSubjects] = useState<AttendanceSubject[]>([]);
  const [timetable, setTimetable] = useState<WeeklyTimetable | null>(null);
  const [section, setSection] = useState<string | null>(null);

  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectCode, setNewSubjectCode] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const isPecEmail = Boolean(userEmail && userEmail.toLowerCase().endsWith("@pec.edu.in"));

  // Load auth profile & timetable
  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        setUserName(user.displayName);
        setUserId(user.uid);

        const isPec = Boolean(user.email && user.email.toLowerCase().endsWith("@pec.edu.in"));
        if (isPec) {
          const profile = parsePecEmail(user.email, user.displayName);
          const sec = getSectionFromRollNo(profile.rollNo);
          setSection(sec);
          if (sec) {
            const tt = getTimetableForSection(sec);
            setTimetable(tt);
          }
        } else {
          // If non-pec, check if user previously chose a section manually
          const manualSec = localStorage.getItem("campus_connect_manual_section");
          if (manualSec) {
            setSection(manualSec);
            const tt = getTimetableForSection(manualSec);
            setTimetable(tt);
          } else {
            setSection(null);
            setTimetable(null);
          }
        }
      }
    });
    return unsub;
  }, []);

  // Handler for manually selecting a section
  const handleSelectSection = (chosenSec: string) => {
    if (!chosenSec) {
      setSection(null);
      setTimetable(null);
      localStorage.removeItem("campus_connect_manual_section");
      const onlyCustom = subjects.filter((s) => s.isCustom);
      updateSubjectsState(onlyCustom);
      return;
    }

    setSection(chosenSec);
    localStorage.setItem("campus_connect_manual_section", chosenSec);
    const tt = getTimetableForSection(chosenSec);
    setTimetable(tt);
    if (tt) {
      const timetableSubjects = extractSubjectsFromTimetable(tt);
      const merged = mergeTimetableWithSaved(timetableSubjects, subjects);
      updateSubjectsState(merged);
    }
  };

  // Sync attendance records on load
  useEffect(() => {
    async function loadAttendanceData() {
      setIsSyncing(true);
      let saved = loadLocalAttendance();

      if (userId) {
        const remote = await fetchSupabaseAttendance(userId);
        if (remote && remote.length > 0) {
          saved = remote;
          saveLocalAttendance(remote);
        }
      }

      let timetableSubjects: { name: string; code: string }[] = [];
      if (timetable) {
        timetableSubjects = extractSubjectsFromTimetable(timetable);
      }

      const merged = mergeTimetableWithSaved(timetableSubjects, saved);
      setSubjects(merged);
      setIsSyncing(false);
    }

    loadAttendanceData();
  }, [timetable, userId]);

  // Save changes to localStorage & Supabase
  const updateSubjectsState = (updated: AttendanceSubject[]) => {
    setSubjects(updated);
    saveLocalAttendance(updated);
    if (userId) {
      syncSupabaseAttendance(userId, updated);
    }
  };

  const [dailyLogs, setDailyLogs] = useState<Record<string, AttendanceStatus>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem("campus_connect_daily_logs_v1");
      return saved ? JSON.parse(saved) : {};
    } catch (_) {
      return {};
    }
  });

  // Save daily logs
  const saveDailyLogs = (logs: Record<string, AttendanceStatus>) => {
    setDailyLogs(logs);
    try {
      localStorage.setItem("campus_connect_daily_logs_v1", JSON.stringify(logs));
    } catch (_) {}
  };

  // Mark attendance for today's specific slot (1 click per slot per day)
  const handleMarkDailySlot = (slotKey: string, code: string, newStatus: AttendanceStatus) => {
    const prevStatus = dailyLogs[slotKey];

    // If same status clicked, do nothing
    if (prevStatus === newStatus) return;

    const updatedSubjects = subjects.map((sub) => {
      if (sub.code === code) {
        let attended = sub.lecturesAttended;
        let absent = sub.lecturesAbsent;
        let cancelled = sub.lecturesCancelled;

        // Undo previous status if any
        if (prevStatus === "present" && attended > 0) attended -= 1;
        if (prevStatus === "absent" && absent > 0) absent -= 1;
        if (prevStatus === "cancelled" && cancelled > 0) cancelled -= 1;

        // Apply new status
        if (newStatus === "present") attended += 1;
        if (newStatus === "absent") absent += 1;
        if (newStatus === "cancelled") cancelled += 1;

        return {
          ...sub,
          lecturesAttended: attended,
          lecturesAbsent: absent,
          lecturesCancelled: cancelled,
          lastUpdated: `Today (${newStatus})`,
        };
      }
      return sub;
    });

    updateSubjectsState(updatedSubjects);
    saveDailyLogs({ ...dailyLogs, [slotKey]: newStatus });
  };

  // Undo daily slot marking
  const handleUndoDailySlot = (slotKey: string, code: string) => {
    const prevStatus = dailyLogs[slotKey];
    if (!prevStatus) return;

    const updatedSubjects = subjects.map((sub) => {
      if (sub.code === code) {
        let attended = sub.lecturesAttended;
        let absent = sub.lecturesAbsent;
        let cancelled = sub.lecturesCancelled;

        if (prevStatus === "present" && attended > 0) attended -= 1;
        if (prevStatus === "absent" && absent > 0) absent -= 1;
        if (prevStatus === "cancelled" && cancelled > 0) cancelled -= 1;

        return {
          ...sub,
          lecturesAttended: attended,
          lecturesAbsent: absent,
          lecturesCancelled: cancelled,
        };
      }
      return sub;
    });

    const newLogs = { ...dailyLogs };
    delete newLogs[slotKey];

    updateSubjectsState(updatedSubjects);
    saveDailyLogs(newLogs);
  };

  // Mark attendance status for a course generally
  const handleMarkAttendance = (code: string, status: AttendanceStatus) => {
    const updated = subjects.map((sub) => {
      if (sub.code === code) {
        return {
          ...sub,
          lecturesAttended: sub.lecturesAttended + (status === "present" ? 1 : 0),
          lecturesAbsent: sub.lecturesAbsent + (status === "absent" ? 1 : 0),
          lecturesCancelled: sub.lecturesCancelled + (status === "cancelled" ? 1 : 0),
          lastUpdated: `Just now (${status})`,
        };
      }
      return sub;
    });
    updateSubjectsState(updated);
  };

  // Undo last action for a subject
  const handleDecrement = (code: string, field: "attended" | "absent" | "cancelled") => {
    const updated = subjects.map((sub) => {
      if (sub.code === code) {
        if (field === "attended" && sub.lecturesAttended > 0) {
          return { ...sub, lecturesAttended: sub.lecturesAttended - 1 };
        }
        if (field === "absent" && sub.lecturesAbsent > 0) {
          return { ...sub, lecturesAbsent: sub.lecturesAbsent - 1 };
        }
        if (field === "cancelled" && sub.lecturesCancelled > 0) {
          return { ...sub, lecturesCancelled: sub.lecturesCancelled - 1 };
        }
      }
      return sub;
    });
    updateSubjectsState(updated);
  };

  // Add custom course
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName || !newSubjectCode) return;

    const newSub: AttendanceSubject = {
      id: newSubjectCode.trim().toUpperCase(),
      name: newSubjectName.trim(),
      code: newSubjectCode.trim().toUpperCase(),
      lecturesAttended: 0,
      lecturesAbsent: 0,
      lecturesCancelled: 0,
      lastUpdated: "Just added",
      isCustom: true,
    };

    const updated = [...subjects, newSub];
    updateSubjectsState(updated);
    setNewSubjectName("");
    setNewSubjectCode("");
    setShowAddModal(false);
  };

  // Delete custom course
  const handleDeleteCustom = (code: string) => {
    const updated = subjects.filter((s) => s.code !== code);
    updateSubjectsState(updated);
  };

  // Calculate overall semester stats
  const totalAttended = subjects.reduce((sum, s) => sum + s.lecturesAttended, 0);
  const totalAbsent = subjects.reduce((sum, s) => sum + s.lecturesAbsent, 0);
  const totalCancelled = subjects.reduce((sum, s) => sum + s.lecturesCancelled, 0);
  const totalConducted = totalAttended + totalAbsent;
  const overallPct = totalConducted > 0 ? (totalAttended / totalConducted) * 100 : 100;

  // Get Today's classes from timetable
  const todayStr = new Date().toISOString().split("T")[0];
  const todaySchedule = timetable ? getTodaySchedule(timetable) : null;
  const todayClasses = todaySchedule
    ? todaySchedule.slots.filter((ts) => ts.slot && ts.slot.type !== "free" && ts.slot.type !== "lunch")
    : [];

const AVAILABLE_SECTIONS = [
  { value: "DS1", label: "CSE (Data Science) — DS1" },
  { value: "DS2", label: "CSE (Data Science) — DS2" },
  { value: "DS3", label: "CSE (Data Science) — DS3" },
  { value: "CSE-1", label: "CSE Core — Group 1 (CSE-1)" },
  { value: "CSE-2", label: "CSE Core — Group 1 (CSE-2)" },
  { value: "CSE-3", label: "CSE Core — Group 1 (CSE-3)" },
  { value: "CSE-4", label: "CSE Core — Group 2 (CSE-4)" },
  { value: "CSE-5", label: "CSE Core — Group 2 (CSE-5)" },
  { value: "CSE-6", label: "CSE Core — Group 2 (CSE-6)" },
  { value: "AI-1", label: "CSE (AI) — Group 1 (AI-1)" },
  { value: "AI-2", label: "CSE (AI) — Group 2 (AI-2)" },
  { value: "ECE-G1", label: "ECE — Group 1 (LSG1)" },
  { value: "ECE-G2", label: "ECE — Group 2 (LSG1)" },
  { value: "ECE-G3", label: "ECE — Group 3 (LSG1)" },
  { value: "ECE-G4", label: "ECE — Group 4 (LSG2)" },
  { value: "ECE-G5", label: "ECE — Group 5 (LSG2)" },
  { value: "ECE-G6", label: "ECE — Group 6 (LSG2)" },
  { value: "CIVIL-C1", label: "Civil Engineering — C1" },
  { value: "CIVIL-C2", label: "Civil Engineering — C2" },
  { value: "CIVIL-C3", label: "Civil Engineering — C3" },
  { value: "CIVIL-C4", label: "Civil Engineering — C4" },
  { value: "CIVIL-C5", label: "Civil Engineering — C5" },
  { value: "CIVIL-C6", label: "Civil Engineering — C6" },
];

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 pb-28 md:pb-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 animate-fade-up">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight">Attendance Tracker</h1>
            {section && (
              <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-bold text-primary">
                Section {section}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {isPecEmail
              ? "Auto-linked to your PEC section timetable. Mark classes as Present, Absent, or Cancelled."
              : "Track your 75% attendance rule. Add custom courses or select your branch section."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
          >
            <Plus className="h-4 w-4" /> Add Course
          </button>
        </div>
      </div>

      {/* Non-PEC Email / Section Selector Helper Banner */}
      {!isPecEmail && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-fade-up">
          <div className="space-y-0.5">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Personal Email ({userEmail || "Signed in"})
            </span>
            <p className="text-muted-foreground text-[11px]">
              Select your PEC branch section to load official semester timetable courses, or track custom subjects.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <select
              value={section || ""}
              onChange={(e) => handleSelectSection(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground outline-none focus:border-primary shadow-sm"
            >
              <option value="">Select PEC Section</option>
              {AVAILABLE_SECTIONS.map((sec) => (
                <option key={sec.value} value={sec.value}>
                  {sec.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* When no subjects are tracked, show clean empty state */}
      {subjects.length === 0 ? (
        <div className="rounded-3xl border border-border/80 glass p-8 sm:p-12 text-center space-y-4 animate-fade-up">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary mx-auto">
            <BookOpen className="h-8 w-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-lg font-bold text-foreground">No Courses Tracked Yet</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isPecEmail
                ? "No timetable subjects detected for your section yet. Click Add Course to manually track custom electives and labs."
                : `You are signed in with a personal email. Select your branch section above to auto-load official courses, or click Add Course below.`}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm glow-primary hover:opacity-90 transition"
            >
              <Plus className="h-4 w-4" />
              Add Custom Course
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Main Overview Dashboard Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-border glass p-6 md:p-8 animate-fade-up">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="flex flex-col gap-6 md:grid md:grid-cols-12 md:items-center">
              {/* Left stats */}
              <div className="md:col-span-8 space-y-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <Zap className="h-3.5 w-3.5" /> Semester Summary
                </span>

                <div className="flex items-baseline gap-3">
                  <h2 className="text-4xl font-black tracking-tight">
                    {overallPct.toFixed(1)}%
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      overallPct >= 75
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                    }`}
                  >
                    {overallPct >= 75 ? "Safe Zone (Above 75%)" : "Danger Zone (Below 75%)"}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Attended <strong className="text-foreground">{totalAttended}</strong> out of{" "}
                  <strong className="text-foreground">{totalConducted}</strong> conducted lectures.
                  {totalCancelled > 0 && (
                    <>
                      {" "}
                      (<strong className="text-amber-400">{totalCancelled}</strong> classes cancelled by faculty — not counted in penalty).
                    </>
                  )}
                </p>

                <div className="flex flex-wrap gap-4 pt-2 text-xs">
                  <div className="flex items-center gap-2 rounded-xl bg-surface-elevated px-3 py-2 border border-border/60">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Present: <strong className="text-foreground">{totalAttended}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-surface-elevated px-3 py-2 border border-border/60">
                    <XCircle className="h-4 w-4 text-rose-400" />
                    <span>Absent: <strong className="text-foreground">{totalAbsent}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-surface-elevated px-3 py-2 border border-border/60">
                    <Ban className="h-4 w-4 text-amber-400" />
                    <span>Cancelled: <strong className="text-foreground">{totalCancelled}</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Progress Circle */}
              <div className="md:col-span-4 flex items-center justify-center">
                <div className="relative h-32 w-32 shrink-0 flex items-center justify-center">
                  <svg className="-rotate-90 h-full w-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-surface-elevated"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - overallPct / 100)}
                      className={overallPct >= 75 ? "text-primary" : "text-rose-400"}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-2xl font-black">{overallPct.toFixed(0)}%</span>
                    <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">
                      Target 75%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Scheduled Classes Logger (1 click per slot per day) */}
          {todayClasses.length > 0 && (
            <section className="animate-fade-up">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" /> Today's Scheduled Classes
                </h2>
                <span className="text-[11px] text-muted-foreground">1-click per class slot today</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {todayClasses.map((ts, idx) => {
                  const slot = ts.slot!;
                  const code = slot.code || slot.subject;
                  const slotKey = `${todayStr}_${code}_${ts.start}`;
                  const markedStatus = dailyLogs[slotKey];

                  return (
                    <div
                      key={idx}
                      className={`group relative rounded-2xl border glass p-4 transition duration-300 ${
                        markedStatus ? "border-primary/40 bg-primary/5" : "border-border/80 hover:border-primary/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono font-semibold text-primary">
                            {ts.start} – {ts.end}
                          </span>
                          <h3 className="font-bold text-sm text-foreground mt-0.5">{slot.subject}</h3>
                          <p className="text-xs text-muted-foreground font-mono">{code}</p>
                        </div>
                        {slot.type === "lab" && (
                          <span className="rounded-full bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-[9px] font-semibold text-violet-400">
                            Lab
                          </span>
                        )}
                      </div>

                      {/* Class Marked Status or Action Buttons */}
                      <div className="mt-4 pt-2 border-t border-border/50">
                        {markedStatus ? (
                          <div className="flex items-center justify-between gap-2">
                            <div
                              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold ${
                                markedStatus === "present"
                                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                  : markedStatus === "absent"
                                  ? "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                                  : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                              }`}
                            >
                              {markedStatus === "present" && <Check className="h-3.5 w-3.5" />}
                              {markedStatus === "absent" && <X className="h-3.5 w-3.5" />}
                              {markedStatus === "cancelled" && <Ban className="h-3.5 w-3.5" />}
                              <span className="capitalize">Marked {markedStatus}</span>
                            </div>

                            <button
                              onClick={() => handleUndoDailySlot(slotKey, code)}
                              className="text-[11px] text-muted-foreground hover:text-foreground transition underline font-medium"
                            >
                              Change
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-1.5">
                            <button
                              onClick={() => handleMarkDailySlot(slotKey, code, "present")}
                              className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
                              title="Mark Present for Today's Class"
                            >
                              <Check className="h-3.5 w-3.5" /> Present
                            </button>
                            <button
                              onClick={() => handleMarkDailySlot(slotKey, code, "absent")}
                              className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-rose-500/10 border border-rose-500/20 py-1.5 text-xs font-semibold text-rose-400 transition hover:bg-rose-500/20"
                              title="Mark Absent for Today's Class"
                            >
                              <X className="h-3.5 w-3.5" /> Absent
                            </button>
                            <button
                              onClick={() => handleMarkDailySlot(slotKey, code, "cancelled")}
                              className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-amber-500/10 border border-amber-500/20 py-1.5 text-xs font-semibold text-amber-400 transition hover:bg-amber-500/20"
                              title="Class Cancelled by Faculty Today"
                            >
                              <Ban className="h-3.5 w-3.5" /> Cancelled
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Course-by-Course Attendance List */}
          <section className="space-y-4 animate-fade-up">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <BookOpen className="h-4 w-4 text-primary" /> Course Attendance Breakdown
              </h2>
              <span className="text-xs text-muted-foreground">
                {subjects.length} Course{subjects.length === 1 ? "" : "s"} Tracked
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {subjects.map((sub) => {
                const stats = calculateSubjectStats(sub);

                return (
                  <article
                    key={sub.code}
                    className="group relative rounded-2xl border border-border/80 glass p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-primary">{sub.code}</span>
                          {sub.isCustom && (
                            <span className="rounded-full bg-surface-elevated px-2 py-0.5 text-[9px] font-medium text-muted-foreground">
                              Custom
                            </span>
                          )}
                        </div>
                        <h3 className="mt-0.5 truncate text-base font-bold text-foreground">
                          {sub.name}
                        </h3>
                      </div>

                      {/* Percentage Badge */}
                      <div className="text-right">
                        <span
                          className={`text-xl font-black ${
                            stats.conducted === 0
                              ? "text-muted-foreground"
                              : stats.percentage >= 75
                              ? "text-emerald-400"
                              : "text-rose-400"
                          }`}
                        >
                          {stats.conducted > 0 ? `${stats.percentage.toFixed(0)}%` : "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-elevated">
                        <div
                          className={`h-full transition-all duration-500 ${
                            stats.percentage >= 75 ? "bg-primary" : "bg-rose-500"
                          }`}
                          style={{ width: `${Math.min(100, Math.max(0, stats.percentage))}%` }}
                        />
                      </div>
                    </div>

                    {/* Stat numbers */}
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <div>
                        Attended: <strong className="text-foreground">{sub.lecturesAttended}</strong> /{" "}
                        <strong className="text-foreground">{stats.conducted}</strong>
                      </div>
                      {sub.lecturesCancelled > 0 && (
                        <div className="text-amber-400 font-semibold">
                          {sub.lecturesCancelled} Cancelled
                        </div>
                      )}
                    </div>

                    {/* Advice banner */}
                    <div
                      className={`mt-3 flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold ${
                        stats.conducted === 0
                          ? "bg-surface-elevated text-muted-foreground"
                          : stats.percentage >= 75
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {stats.isDanger ? (
                          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                        ) : (
                          <Check className="h-3.5 w-3.5 shrink-0" />
                        )}
                        {stats.adviceMsg}
                      </span>
                    </div>

                    {/* Main Action Buttons */}
                    <div className="mt-4 flex items-center gap-2 pt-2 border-t border-border/40">
                      <button
                        onClick={() => handleMarkAttendance(sub.code, "present")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 py-2 text-xs font-bold text-emerald-400 transition hover:bg-emerald-500/20"
                        title="Add Attended Class (+1 Present)"
                      >
                        <Check className="h-3.5 w-3.5" /> Present
                      </button>

                      <button
                        onClick={() => handleMarkAttendance(sub.code, "absent")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 py-2 text-xs font-bold text-rose-400 transition hover:bg-rose-500/20"
                        title="Add Bunked/Missed Class (+1 Absent)"
                      >
                        <X className="h-3.5 w-3.5" /> Absent
                      </button>

                      <button
                        onClick={() => handleMarkAttendance(sub.code, "cancelled")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 py-2 text-xs font-bold text-amber-400 transition hover:bg-amber-500/20"
                        title="Class Cancelled by Teacher/College (Doesn't affect attendance %)"
                      >
                        <Ban className="h-3.5 w-3.5" /> Cancelled
                      </button>
                    </div>

                    {/* Sub Action Undo Controls */}
                    {(sub.lecturesAttended > 0 || sub.lecturesAbsent > 0 || sub.lecturesCancelled > 0 || sub.isCustom) && (
                      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                        <div className="flex gap-2">
                          {sub.lecturesAttended > 0 && (
                            <button
                              onClick={() => handleDecrement(sub.code, "attended")}
                              className="hover:text-rose-400 transition underline"
                            >
                              -1 Present
                            </button>
                          )}
                          {sub.lecturesAbsent > 0 && (
                            <button
                              onClick={() => handleDecrement(sub.code, "absent")}
                              className="hover:text-emerald-400 transition underline"
                            >
                              -1 Absent
                            </button>
                          )}
                          {sub.lecturesCancelled > 0 && (
                            <button
                              onClick={() => handleDecrement(sub.code, "cancelled")}
                              className="hover:text-amber-400 transition underline"
                            >
                              -1 Cancelled
                            </button>
                          )}
                        </div>

                        {sub.isCustom && (
                          <button
                            onClick={() => handleDeleteCustom(sub.code)}
                            className="text-rose-400 hover:underline flex items-center gap-0.5"
                          >
                            <Trash2 className="h-3 w-3" /> Remove
                          </button>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* Add Custom Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl glass-strong border border-border/80 p-6 shadow-2xl animate-scale-up">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-border/50 bg-surface/60 text-muted-foreground transition hover:bg-surface hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-lg font-bold text-foreground">Add Custom Course</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Add extra electives, minor courses, or lab subjects not listed in your section timetable.
            </p>

            <form onSubmit={handleAddSubject} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Course Name</label>
                <input
                  type="text"
                  placeholder="e.g. Deep Learning Elective"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Course Code</label>
                <input
                  type="text"
                  placeholder="e.g. CSN3005"
                  value={newSubjectCode}
                  onChange={(e) => setNewSubjectCode(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-elevated"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
