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
  approximate?: boolean; // true when schedule is extracted from image (verify with dept)
  labSubgroup?: string;  // e.g. "G1, G2, G3" or "G4, G5, G6"
}

// ─── Roll No → Section Lookup ────────────────────────────────────────────────

const SECTION_RANGES: { section: string; min: number; max: number }[] = [
  // ── CSE Data Science (branch code 60) ─────────────────────────────────────
  { section: "DS1", min: 25106001, max: 25106016 },
  { section: "DS2", min: 25106017, max: 25106032 },
  { section: "DS3", min: 25106033, max: 25106048 },
  { section: "DS4", min: 25106049, max: 25106064 },
  // ── ECE (branch code 50) ──────────────────────────────────────────────────
  // Each group = 20 students; G1-G6 = roll 001-120; BC (branch change) = 121+
  // Lab Subgroup 1 (LSG1): G1, G2, G3  →  roll 001-060
  // Lab Subgroup 2 (LSG2): G4, G5, G6  →  roll 061-120
  { section: "ECE-G1", min: 25105001, max: 25105020 },
  { section: "ECE-G2", min: 25105021, max: 25105040 },
  { section: "ECE-G3", min: 25105041, max: 25105060 },
  { section: "ECE-G4", min: 25105061, max: 25105080 },
  { section: "ECE-G5", min: 25105081, max: 25105100 },
  { section: "ECE-G6", min: 25105101, max: 25105120 },
  { section: "ECE-G6", min: 25105121, max: 25105999 }, // Branch-change students → same as G6
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

// ─── DS2 Timetable ───────────────────────────────────────────────────────────

const DS2_TIMETABLE: WeeklyTimetable = {
  section: "DS2",
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
          slot: { subject: "HSM-II", code: "HSM-II", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Operating Systems", code: "DSN3003", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "15:00",
          slot: { subject: "Probability & Data Science", code: "DSN3002", type: "lecture" },
        },
        {
          start: "15:00", end: "16:00",
          slot: { subject: "Data Structures", code: "DSN3001", type: "lecture" },
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
          slot: { subject: "Data Structures", code: "DSN3001", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Computer Networks", code: "DSN3004", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "15:00",
          slot: { subject: "Probability & Data Science", code: "DSN3002", type: "lecture" },
        },
        {
          start: "15:00", end: "16:00",
          slot: { subject: "HSM-II", code: "HSM-II", type: "lecture" },
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
          slot: { subject: "DS Lab", code: "DSN3001L", room: "301 + 303", type: "lab", groups: "DS2" },
        },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Data Structures", code: "DSN3001", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Operating Systems", code: "DSN3003", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "16:00",
          slot: { subject: "CN Lab", code: "DSN3004L", room: "CL13 + CL14", type: "lab", groups: "DS2" },
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
          slot: { subject: "Computer Networks", code: "DSN3004", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Probability & Data Science", code: "DSN3002", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: free() },
        {
          start: "15:00", end: "17:00",
          slot: { subject: "HSM-II (Class + Tutorial)", code: "HSM-II T", type: "tutorial" },
        },
        {
          start: "17:00", end: "19:00",
          slot: { subject: "OS Lab", code: "DSN3003L", room: "306", type: "lab", groups: "DS2" },
        },
      ],
    },
    {
      day: "FRI",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        {
          start: "09:00", end: "11:00",
          slot: { subject: "PDS Lab", code: "DSN3002L", room: "306", type: "lab", groups: "DS2" },
        },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Computer Networks", code: "DSN3004", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Operating Systems", code: "DSN3003", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "15:00",
          slot: { subject: "HSM-II", code: "HSM-II", type: "lecture" },
        },
        { start: "15:00", end: "16:00", slot: free() },
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

// ─── DS3 Timetable ───────────────────────────────────────────────────────────

const DS3_TIMETABLE: WeeklyTimetable = {
  section: "DS3",
  semester: "3rd Sem",
  branch: "B.Tech CSE (Data Science)",
  period: "Jul–Dec 2026",
  schedule: [
    {
      day: "MON",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        {
          start: "09:00", end: "11:00",
          slot: { subject: "DS Lab", code: "DSN3001L", room: "306", type: "lab", groups: "DS3" },
        },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "HSM-II", code: "HSM-II", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Operating Systems", code: "DSN3003", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "15:00",
          slot: { subject: "Probability & Data Statistics", code: "DSN3002", type: "lecture" },
        },
        {
          start: "15:00", end: "16:00",
          slot: { subject: "Data Structures", code: "DSN3001", type: "lecture" },
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
          slot: { subject: "Data Structures", code: "DSN3001", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Computer Networks", code: "DSN3004", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "15:00",
          slot: { subject: "Probability & Data Statistics", code: "DSN3002", type: "lecture" },
        },
        {
          start: "15:00", end: "16:00",
          slot: { subject: "HSM-II", code: "HSM-II", type: "lecture" },
        },
        { start: "16:00", end: "17:00", slot: free() },
        {
          start: "17:00", end: "19:00",
          slot: { subject: "OS Lab", code: "DSN3003L", room: "306", type: "lab", groups: "DS3" },
        },
      ],
    },
    {
      day: "WED",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        {
          start: "09:00", end: "11:00",
          slot: { subject: "PDS Lab", code: "DSN3002L", room: "304 & 306", type: "lab", groups: "DS3" },
        },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Data Structures", code: "DSN3001", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Operating Systems", code: "DSN3003", type: "lecture" },
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
        { start: "09:00", end: "10:00", slot: free() },
        { start: "10:00", end: "11:00", slot: free() },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Computer Networks", code: "DSN3004", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Probability & Data Statistics", code: "DSN3002", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: free() },
        {
          start: "15:00", end: "17:00",
          slot: { subject: "HSM-II (Class + Tutorial)", code: "HSM-II T", type: "tutorial" },
        },
        { start: "17:00", end: "19:00", slot: free() },
      ],
    },
    {
      day: "FRI",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        {
          start: "09:00", end: "11:00",
          slot: { subject: "CN Lab", code: "DSN3004L", room: "CL13 + CL14", type: "lab", groups: "DS3" },
        },
        {
          start: "11:00", end: "12:00",
          slot: { subject: "Computer Networks", code: "DSN3004", type: "lecture" },
        },
        {
          start: "12:00", end: "13:00",
          slot: { subject: "Operating Systems", code: "DSN3003", type: "lecture" },
        },
        { start: "13:00", end: "14:00", slot: lunch() },
        {
          start: "14:00", end: "15:00",
          slot: { subject: "HSM-II", code: "HSM-II", type: "lecture" },
        },
        { start: "15:00", end: "16:00", slot: free() },
        { start: "16:00", end: "17:00", slot: free() },
        { start: "17:00", end: "19:00", slot: free() },
      ],
    },
  ],
};

// ─── ECE Subject helpers ──────────────────────────────────────────────────────

function ece(subject: string, code: string, room: string, faculty: string, type: ClassType = "lecture", groups?: string): ClassSlot {
  return { subject, code, room, faculty, type, groups };
}

// ─── ECE LSG1 Timetable (G1, G2, G3 — Roll 25105001–25105060) ────────────────
// Extracted from dept timetable w.e.f 27/07/26 — B.Tech ECE 3rd Sem 26-27-1
// Subjects: EXN301=DLD(Dhawan/Lab2), EXN302=EDC(Kedia/Lab1), EXN303=PRP(Satinder), EXN304=CT(NF-1)

const ECE_LSG1_TIMETABLE: WeeklyTimetable = {
  section: "ECE-LSG1",
  semester: "3rd Sem",
  branch: "B.Tech ECE",
  period: "Jul–Dec 2026",
  approximate: true,
  labSubgroup: "G1, G2, G3",
  schedule: [
    {
      day: "MON",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: ece("Prob. & Random Processes", "EXN303", "L-23", "Dr. Satinder Mohar") },
        { start: "10:00", end: "11:00", slot: ece("Electronic Devices & Circuits", "EXN302", "L-25", "Dr. J. Kedia") },
        { start: "11:00", end: "12:00", slot: free() },
        { start: "12:00", end: "13:00", slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan") },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: ece("Circuit Theory Tutorial", "EXN304 T", "L-25", "NF-1", "tutorial") },
        { start: "15:00", end: "16:00", slot: ece("HSM", "HSM", "L-20 & L-23", "Dr. Jaskirat") },
        { start: "16:00", end: "17:00", slot: ece("Minor Specialization", "Minor Spec", "", "") },
      ],
    },
    {
      day: "TUE",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: ece("Prob. & Random Processes", "EXN303", "L-23", "Dr. Satinder Mohar") },
        { start: "10:00", end: "11:00", slot: ece("Electronic Devices & Circuits", "EXN302", "L-25", "Dr. J. Kedia") },
        { start: "11:00", end: "12:00", slot: ece("HSM", "HSM", "L-20 & L-23", "Dr. Jaskirat") },
        { start: "12:00", end: "13:00", slot: ece("Circuit Theory", "EXN304", "L-24", "NF-1") },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "16:00", slot: ece("EDC Lab / DLD Lab (rotating G1-G3)", "EXN302/EXN301 Lab", "Lab-1 / Lab-2", "Dr. Kedia / Dr. Dhawan", "lab", "G1, G2, G3") },
        { start: "16:00", end: "17:00", slot: ece("PRP Tutorial", "EXN303 T", "L-24", "Dr. Satinder Mohar", "tutorial") },
      ],
    },
    {
      day: "WED",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: free() },
        { start: "10:00", end: "11:00", slot: ece("Prob. & Random Processes", "EXN303", "L-23", "Dr. Satinder Mohar") },
        { start: "11:00", end: "13:00", slot: ece("EDC Lab G2", "EXN302 Lab", "Lab-1", "Dr. Radhika", "lab", "G2") },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan") },
        { start: "15:00", end: "16:00", slot: ece("HSM Tutorial", "HSM T", "", "Dr. Jaskirat", "tutorial") },
        { start: "16:00", end: "17:00", slot: free() },
      ],
    },
    {
      day: "THU",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: free() },
        { start: "10:00", end: "11:00", slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan") },
        { start: "11:00", end: "12:00", slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan") },
        { start: "12:00", end: "13:00", slot: free() },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: ece("CT Tutorial G3", "EXN304 T", "L-25", "NF-1", "tutorial", "G3") },
        { start: "15:00", end: "17:00", slot: ece("DLD Lab G1 / EDC Lab G2", "EXN301/EXN302 Lab", "Lab-2 / Lab-1", "Dr. Dhawan / Dr. Kedia", "lab", "G1, G2") },
        { start: "17:00", end: "18:00", slot: ece("HSM Tutorial", "HSM T", "", "Dr. Jaskirat", "tutorial") },
      ],
    },
    {
      day: "FRI",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: free() },
        { start: "10:00", end: "11:00", slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan") },
        { start: "11:00", end: "12:00", slot: ece("Prob. & Random Processes", "EXN303", "L-23", "Dr. Satinder Mohar") },
        { start: "12:00", end: "13:00", slot: ece("PRP Tutorial G3", "EXN303 T", "Lab-6", "Dr. Satinder Mohar", "tutorial", "G3") },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: ece("HSM Tutorial", "HSM T", "", "Dr. Jaskirat", "tutorial") },
        { start: "15:00", end: "16:00", slot: ece("Minor Specialization", "Minor Spec", "", "") },
        { start: "16:00", end: "17:00", slot: free() },
      ],
    },
  ],
};

// ─── ECE LSG2 Timetable (G4, G5, G6 — Roll 25105061–25105120) ────────────────

const ECE_LSG2_TIMETABLE: WeeklyTimetable = {
  section: "ECE-LSG2",
  semester: "3rd Sem",
  branch: "B.Tech ECE",
  period: "Jul–Dec 2026",
  approximate: true,
  labSubgroup: "G4, G5, G6",
  schedule: [
    {
      day: "MON",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: ece("Circuit Theory", "EXN304", "L-25", "NF-1") },
        { start: "10:00", end: "11:00", slot: ece("Prob. & Random Processes", "EXN303", "L-23", "Dr. Satinder Mohar") },
        { start: "11:00", end: "12:00", slot: ece("CT Tutorial", "EXN304 T", "T-9", "NF-1", "tutorial") },
        { start: "12:00", end: "13:00", slot: ece("Digital Logic Design", "EXN301", "L-20", "Dr. D. Dhawan") },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: ece("PRP Tutorial", "EXN303 T", "T-9", "Dr. Satinder Mohar", "tutorial") },
        { start: "15:00", end: "16:00", slot: ece("HSM", "HSM", "L-20 & L-23", "Dr. Jaskirat") },
        { start: "16:00", end: "17:00", slot: ece("Minor Specialization", "Minor Spec", "", "") },
      ],
    },
    {
      day: "TUE",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: ece("Electronic Devices & Circuits", "EXN302", "L-25", "Dr. J. Kedia") },
        { start: "10:00", end: "11:00", slot: free() },
        { start: "11:00", end: "12:00", slot: ece("HSM", "HSM", "L-20 & L-23", "Dr. Jaskirat") },
        { start: "12:00", end: "13:00", slot: ece("Circuit Theory", "EXN304", "L-24", "NF-1") },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "16:00", slot: ece("EDC Lab G3", "EXN302 Lab", "Lab-1", "Dr. J. Kedia", "lab", "G3 (LSG2)") },
        { start: "16:00", end: "17:00", slot: ece("PRP Tutorial G5", "EXN303 T", "T-9", "Dr. Satinder Mohar", "tutorial", "G5") },
      ],
    },
    {
      day: "WED",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "10:00", slot: ece("PRP Tutorial", "EXN303 T", "L-23", "Dr. Satinder Mohar", "tutorial") },
        { start: "10:00", end: "11:00", slot: ece("Electronic Devices & Circuits", "EXN302", "L-25", "Dr. J. Kedia") },
        { start: "11:00", end: "12:00", slot: ece("DLD Lab G3", "EXN301 Lab", "Lab-2", "Dr. D. Dhawan", "lab", "G3") },
        { start: "12:00", end: "13:00", slot: ece("Circuit Theory", "EXN304", "L-24", "NF-1") },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: free() },
        { start: "15:00", end: "16:00", slot: ece("HSM Tutorial", "HSM T", "", "Dr. Jaskirat", "tutorial") },
        { start: "16:00", end: "18:00", slot: ece("EDC Lab G4 / DLD Lab G5", "EXN302/EXN301 Lab", "Lab-1 / Lab-2", "Dr. Kedia / Dr. Neelam R. Prakash", "lab", "G4, G5") },
      ],
    },
    {
      day: "THU",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "11:00", slot: ece("EDC Lab G5 / DLD Lab G6", "EXN302/EXN301 Lab", "Lab-1 / Lab-2", "Dr. Sukhwinder Singh / Dr. Jasbir Kaur", "lab", "G5, G6") },
        { start: "11:00", end: "12:00", slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan") },
        { start: "12:00", end: "13:00", slot: ece("Electronic Devices & Circuits", "EXN302", "L-25", "Dr. J. Kedia") },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: free() },
        { start: "15:00", end: "16:00", slot: ece("CT Tutorial G5", "EXN304 T", "L-25", "NF-1", "tutorial", "G5") },
        { start: "16:00", end: "17:00", slot: ece("CT Tutorial G5 cont.", "EXN304 T", "L-25", "NF-1", "tutorial", "G5") },
        { start: "17:00", end: "18:00", slot: ece("HSM Tutorial", "HSM T", "", "Dr. Jaskirat", "tutorial") },
      ],
    },
    {
      day: "FRI",
      slots: [
        { start: "08:00", end: "09:00", slot: free() },
        { start: "09:00", end: "11:00", slot: ece("EDC Lab G6 / DLD Lab G4", "EXN302/EXN301 Lab", "Lab-1 / Lab-2", "Dr. J. Kedia / Dr. D. Dhawan", "lab", "G4, G6") },
        { start: "11:00", end: "12:00", slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan") },
        { start: "12:00", end: "13:00", slot: ece("Electronic Devices & Circuits", "EXN302", "L-25", "Dr. J. Kedia") },
        { start: "13:00", end: "14:00", slot: lunch() },
        { start: "14:00", end: "15:00", slot: ece("HSM Tutorial", "HSM T", "", "Dr. Jaskirat", "tutorial") },
        { start: "15:00", end: "16:00", slot: ece("Minor Specialization", "Minor Spec", "", "") },
        { start: "16:00", end: "17:00", slot: free() },
      ],
    },
  ],
};

// ─── Registry ─────────────────────────────────────────────────────────────────

const TIMETABLE_REGISTRY: Record<string, WeeklyTimetable> = {
  // DS sections
  DS1: DS1_TIMETABLE,
  DS2: DS2_TIMETABLE,
  DS3: DS3_TIMETABLE,
  DS4: DS4_TIMETABLE,
  // ECE sections — G1,G2,G3 → LSG1; G4,G5,G6 → LSG2; BC students → G6 (LSG2)
  "ECE-G1": ECE_LSG1_TIMETABLE,
  "ECE-G2": ECE_LSG1_TIMETABLE,
  "ECE-G3": ECE_LSG1_TIMETABLE,
  "ECE-G4": ECE_LSG2_TIMETABLE,
  "ECE-G5": ECE_LSG2_TIMETABLE,
  "ECE-G6": ECE_LSG2_TIMETABLE,
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
