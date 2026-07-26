export type ClassType = "lecture" | "lab" | "tutorial" | "lunch" | "free";

export interface ClassSlot {
  subject: string;
  code?: string;
  room?: string;
  faculty?: string;
  type: ClassType;
  groups?: string; // e.g. "DS1, DS2"
}

export interface TimeSlot {
  start: string; // "09:00"
  end: string;   // "10:00"
  slot: ClassSlot | null;
}

export interface DaySchedule {
  day: "MON" | "TUE" | "WED" | "THU" | "FRI";
  slots: TimeSlot[];
}

export interface WeeklyTimetable {
  section: string;
  semester: string;
  branch: string;
  period: string;
  schedule: DaySchedule[];
}

// ─── Roll No → Section Lookup ────────────────────────────────────────────────

const SECTION_RANGES: { section: string; min: number; max: number }[] = [
  { section: "DS1", min: 25106001, max: 25106016 },
  { section: "DS2", min: 25106017, max: 25106032 },
  { section: "DS3", min: 25106033, max: 25106048 },
  { section: "DS4", min: 25106049, max: 25106064 },
];

export function getSectionFromRollNo(rollNo: string): string | null {
  const num = parseInt(rollNo.replace(/\D/g, ""), 10);
  if (isNaN(num)) return null;
  for (const range of SECTION_RANGES) {
    if (num >= range.min && num <= range.max) return range.section;
  }
  return null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function free(): ClassSlot {
  return { subject: "Free", type: "free" };
}
function lunch(): ClassSlot {
  return { subject: "Lunch Break", type: "lunch" };
}

// ─── DS1 Timetable ───────────────────────────────────────────────────────────

const DS1_TIMETABLE: WeeklyTimetable = {
  section: "DS1",
  semester: "3rd Sem",
  branch: "B.Tech CSE (Data Science)",
  period: "Jul–Dec 2026",
  schedule: [
    {
      day: "MON",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: free() },
        { start: "10:00", end: "11:00", slot: free() },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "HSM-II", code: "HSM-II", room: "L405, L406, L407", faculty: "G1–G4", type: "lecture", groups: "All" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Operating Systems", code: "DSN3003", room: "L405", faculty: "Ramteke Mamta", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "15:00",
          slot: { subject: "Probability & Data Science", code: "DSN3002", room: "L405", faculty: "Kanu Goel", type: "lecture" },
        },
        {
          start: "15:00", end: "16:00",
          slot: { subject: "Data Structures", code: "DSN3001", room: "L405", faculty: "Sudesh Rani", type: "lecture" },
        },
        { start: "16:00", end: "17:00", slot: free() },
        { start: "17:00", end: "19:00", slot: free() },
      ],
    },
    {
      day: "TUE",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: free() },
        { start: "10:00", end: "11:00", slot: free() },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Data Structures", code: "DSN3001", room: "L405", faculty: "Sudesh Rani", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Computer Networks", code: "DSN3004", room: "L405", faculty: "Trilok Chand", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "15:00",
          slot: { subject: "Probability & Data Science", code: "DSN3002", room: "L405", faculty: "Kanu Goel", type: "lecture" },
        },
        {
          start: "15:00", end: "16:00",
          slot: { subject: "HSM-II", code: "HSM-II", room: "L405", faculty: "G1–G4", type: "lecture", groups: "All" },
        },
        { start: "16:00", end: "17:00", slot: free() },
        { start: "17:00", end: "19:00", slot: free() },
      ],
    },
    {
      day: "WED",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        {
          start: "09:00", end: "11:00",
          slot: { subject: "DS Lab", code: "DSN3001L", room: "301 + 303", faculty: "Sudesh Rani", type: "lab", groups: "DS1, DS2" },
        },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Data Structures", code: "DSN3001", room: "L405", faculty: "Sudesh Rani", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Operating Systems", code: "DSN3003", room: "L405", faculty: "Ramteke Mamta", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "16:00",
          slot: { subject: "CN Lab", code: "DSN3004L", room: "CL13 + CL14", faculty: "Trilok Chand", type: "lab", groups: "DS1, DS2" },
        },
        { start: "16:00", end: "17:00", slot: free() },
        { start: "17:00", end: "19:00", slot: free() },
      ],
    },
    {
      day: "THU",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: free() },
        { start: "10:00", end: "11:00", slot: free() },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Computer Networks", code: "DSN3004", room: "L405", faculty: "Trilok Chand", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Probability & Data Science", code: "DSN3002", room: "L22", faculty: "Kanu Goel", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: free() },
        {
          start: "15:00", end: "16:00",
          slot: { subject: "HSM-II Tutorial", code: "HSM-II T", room: "L405", faculty: "", type: "tutorial" },
        },
        {
          start: "16:00", end: "17:00",
          slot: { subject: "HSM-II Tutorial", code: "HSM-II T", room: "L405–L407, T-9, T-11, T-12", faculty: "", type: "tutorial" },
        },
        {
          start: "17:00", end: "19:00",
          slot: { subject: "OS Lab", code: "DSN3003L", room: "306", faculty: "Ramteke Mamta", type: "lab", groups: "DS1, DS2" },
        },
      ],
    },
    {
      day: "FRI",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        {
          start: "09:00", end: "11:00",
          slot: { subject: "PDS Lab", code: "DSN3002L", room: "306", faculty: "Kanu Goel", type: "lab", groups: "DS1, DS2" },
        },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Computer Networks", code: "DSN3004", room: "L405", faculty: "Trilok Chand", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Operating Systems", code: "DSN3003", room: "L19", faculty: "Ramteke Mamta", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "16:00",
          slot: { subject: "HSM-II Tutorial", code: "HSM-II T", room: "L405–L407, T-9, T-11, T-12", faculty: "", type: "tutorial" },
        },
        { start: "16:00", end: "17:00", slot: free() },
        { start: "17:00", end: "19:00", slot: free() },
      ],
    },
  ],
};

// ─── DS4 Timetable ───────────────────────────────────────────────────────────

const DS4_TIMETABLE: WeeklyTimetable = {
  section: "DS4",
  semester: "3rd Sem",
  branch: "B.Tech CSE (Data Science)",
  period: "Jul–Dec 2026",
  schedule: [
    {
      day: "MON",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: free() },
        { start: "10:00", end: "11:00", slot: free() },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "HSM-II", code: "HSM-II", room: "L405, L406, L407", faculty: "", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Operating Systems", code: "DSN3003", room: "L405", faculty: "Ramteke Mamta", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "15:00",
          slot: { subject: "Probability & Data Science", code: "DSN3002", room: "L405", faculty: "Kanu Goel", type: "lecture" },
        },
        {
          start: "15:00", end: "16:00",
          slot: { subject: "Data Structures", code: "DSN3001", room: "L405", faculty: "Sudesh Rani", type: "lecture" },
        },
        { start: "16:00", end: "17:00", slot: free() },
        { start: "17:00", end: "19:00", slot: free() },
      ],
    },
    {
      day: "TUE",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: free() },
        { start: "10:00", end: "11:00", slot: free() },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Data Structures", code: "DSN3001", room: "L405", faculty: "Sudesh Rani", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Computer Networks", code: "DSN3004", room: "L405", faculty: "Trilok Chand", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "15:00",
          slot: { subject: "Probability & Data Science", code: "DSN3002", room: "L405", faculty: "Kanu Goel", type: "lecture" },
        },
        {
          start: "15:00", end: "16:00",
          slot: { subject: "HSM-II", code: "HSM-II", room: "L405", faculty: "", type: "lecture" },
        },
        { start: "16:00", end: "17:00", slot: free() },
        {
          start: "17:00", end: "19:00",
          slot: { subject: "OS Lab", code: "DSN3003L", room: "306", faculty: "Ramteke Mamta", type: "lab", groups: "DS4" },
        },
      ],
    },
    {
      day: "WED",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        {
          start: "09:00", end: "11:00",
          slot: { subject: "PDS Lab", code: "DSN3002L", room: "304 & 306", faculty: "Kanu Goel", type: "lab", groups: "DS4" },
        },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Data Structures", code: "DSN3001", room: "L405", faculty: "Sudesh Rani", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Operating Systems", code: "DSN3003", room: "L405", faculty: "Ramteke Mamta", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: free() },
        { start: "15:00", end: "16:00", slot: free() },
        { start: "16:00", end: "17:00", slot: free() },
        { start: "17:00", end: "19:00", slot: free() },
      ],
    },
    {
      day: "THU",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        {
          start: "09:00", end: "11:00",
          slot: { subject: "DS Lab", code: "DSN3001L", room: "306", faculty: "Sudesh Rani", type: "lab", groups: "DS4" },
        },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Computer Networks", code: "DSN3004", room: "L405", faculty: "Trilok Chand", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Probability & Data Science", code: "DSN3002", room: "L22", faculty: "Kanu Goel", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: free() },
        {
          start: "15:00", end: "16:00",
          slot: { subject: "HSM-II Tutorial", code: "HSM-II T", room: "L405", faculty: "", type: "tutorial" },
        },
        { start: "16:00", end: "17:00", slot: free() },
        { start: "17:00", end: "19:00", slot: free() },
      ],
    },
    {
      day: "FRI",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        {
          start: "09:00", end: "11:00",
          slot: { subject: "CN Lab", code: "DSN3004L", room: "CL13 + CL14", faculty: "Trilok Chand", type: "lab", groups: "DS4" },
        },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Computer Networks", code: "DSN3004", room: "L405", faculty: "Trilok Chand", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Operating Systems", code: "DSN3003", room: "L19", faculty: "Ramteke Mamta", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "16:00",
          slot: { subject: "HSM-II Tutorial", code: "HSM-II T", room: "L405–L407, T-9, T-11, T-12", faculty: "", type: "tutorial" },
        },
        { start: "16:00", end: "17:00", slot: free() },
        { start: "17:00", end: "19:00", slot: free() },
      ],
    },
  ],
};

// ─── Registry ─────────────────────────────────────────────────────────────────

const TIMETABLE_REGISTRY: Record<string, WeeklyTimetable> = {
  DS1: DS1_TIMETABLE,
  DS4: DS4_TIMETABLE,
};

export function getTimetableForSection(section: string): WeeklyTimetable | null {
  return TIMETABLE_REGISTRY[section] ?? null;
}

// ─── Utility helpers ──────────────────────────────────────────────────────────

const DAY_INDEX: Record<string, number> = {
  SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6,
};

/**
 * Returns today's schedule (or null if weekend / no data).
 */
export function getTodaySchedule(timetable: WeeklyTimetable): DaySchedule | null {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const todayName = days[new Date().getDay()];
  return timetable.schedule.find((d) => d.day === todayName) ?? null;
}

/**
 * Returns upcoming or current class for a DaySchedule.
 */
export function getNextClass(schedule: DaySchedule): { slot: TimeSlot; status: "ongoing" | "upcoming" } | null {
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();

  for (const ts of schedule.slots) {
    if (!ts.slot || ts.slot.type === "free" || ts.slot.type === "lunch") continue;
    const [sh, sm] = ts.start.split(":").map(Number);
    const [eh, em] = ts.end.split(":").map(Number);
    const startMins = sh * 60 + sm;
    const endMins = eh * 60 + em;

    if (nowMins >= startMins && nowMins < endMins) {
      return { slot: ts, status: "ongoing" };
    }
    if (nowMins < startMins) {
      return { slot: ts, status: "upcoming" };
    }
  }
  return null;
}

export { DAY_INDEX };
