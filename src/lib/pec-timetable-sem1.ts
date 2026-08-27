/**
 * PEC B.Tech 1st Semester Timetable — Session 2026-27-1 (2026 Batch)
 * Branches: AERO, M&C, ECE (G1/G2), MECH (G1/G2), AI, VLSI, METTA,
 *           CSE (G1/G2), CIVIL (G1/G2), EE (G1/G2), PROD, DS, B DES
 */

import type { WeeklyTimetable, ClassSlot, ClassType } from "./pec-timetable";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function free(): ClassSlot { return { subject: "Free", type: "free" }; }
function lunch(): ClassSlot { return { subject: "Lunch Break", type: "lunch" }; }
function cls(subject: string, code: string, room?: string, type: ClassType = "lecture", groups?: string): ClassSlot {
  return { subject, code, room, type, groups };
}
function lab(subject: string, code: string, room?: string, groups?: string): ClassSlot {
  return { subject, code, room, type: "lab", groups };
}

// Subject shortcuts
const S = {
  MA:  { n: "Calculus",                          c: "MA2301" },
  CH1: { n: "Applied Chemistry-I",               c: "CH2301" },
  CH2: { n: "Applied Chemistry-II",              c: "CH2302" },
  PY1: { n: "EM Theory & Quantum Physics",       c: "PY2301" },
  PY2: { n: "Mechanics & Optics",                c: "PY2302" },
  GS1: { n: "Intro to Environmental Sciences",   c: "GS2301" },
  GS2: { n: "Universal Human Values",            c: "GS2302" },
  HS:  { n: "Communication Skills",              c: "HS2351" },
  ES1: { n: "Intro to Computer Programming",     c: "ES2301" },
  ES2: { n: "Engineering Design with CAD",       c: "ES2302" },
  ES3: { n: "Skill Development Workshop",        c: "ES2303" },
  ES4: { n: "Intro to Mechatronics",             c: "ES2304" },
  ES5: { n: "Intro to Electronics & EE",         c: "ES2305" },
  ES6: { n: "Strength of Materials",             c: "ES2306" },
  ES7: { n: "Intro to Product Design",           c: "ES2307" },
  OR:  { n: "Intro to Discipline Engineering",   c: "OR2302" },
};

// ─── AERO ────────────────────────────────────────────────────────────────────

export const AERO_SEM1_TIMETABLE: WeeklyTimetable = {
  section: "AERO", semester: "1st Sem", branch: "B.Tech Aerospace Engineering", period: "Aug–Dec 2026",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES2.n, S.ES2.c, "L-26") },
      { start: "10:00", end: "11:00", slot: cls(S.ES4.n, S.ES4.c, "L-26") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-26") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES2.n + " Lab", S.ES2.c, "DH-1") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "11:00", slot: cls(S.CH2.n, S.CH2.c, "L-10") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-10") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES4.n + " Lab", S.ES4.c) },
      { start: "15:00", end: "17:00", slot: lab(S.CH2.n + " Lab", S.CH2.c) },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "11:00", slot: free() },
      { start: "11:00", end: "12:00", slot: cls(S.CH2.n, S.CH2.c, "L-11") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES3.n + " Lab", S.ES3.c) },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "11:00", slot: lab(S.MA.n + " Lab", S.MA.c) },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-11") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.CH2.n, S.CH2.c, "L-26") },
      { start: "14:00", end: "15:00", slot: cls(S.ES4.n, S.ES4.c, "L-26") },
      { start: "15:00", end: "16:00", slot: cls(S.ES2.n, S.ES2.c, "L-26") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.OR.n,  S.OR.c) },
      { start: "10:00", end: "11:00", slot: cls(S.GS2.n, S.GS2.c, "L-15") },
      { start: "11:00", end: "12:00", slot: cls(S.ES4.n, S.ES4.c, "L-15") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES7.n + " Lab", S.ES7.c) },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
  ],
};

// ─── M&C ─────────────────────────────────────────────────────────────────────

export const MC_SEM1_TIMETABLE: WeeklyTimetable = {
  section: "M&C", semester: "1st Sem", branch: "B.Tech Mathematics & Computing", period: "Aug–Dec 2026",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES2.n, S.ES2.c, "L-26") },
      { start: "10:00", end: "11:00", slot: cls(S.ES4.n, S.ES4.c, "L-26") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-26") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES2.n + " Lab", S.ES2.c, "DH-2") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "11:00", slot: cls(S.CH1.n, S.CH1.c, "L-30") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-10") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.CH1.n + " Lab", S.CH1.c) },
      { start: "15:00", end: "17:00", slot: lab(S.ES4.n + " Lab", S.ES4.c) },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "11:00", slot: free() },
      { start: "11:00", end: "12:00", slot: cls(S.CH1.n, S.CH1.c, "L-15") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES3.n + " Lab", S.ES3.c) },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "11:00", slot: lab(S.MA.n + " Lab", S.MA.c) },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-11") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.CH1.n, S.CH1.c, "L-30") },
      { start: "14:00", end: "15:00", slot: cls(S.ES4.n, S.ES4.c, "L-26") },
      { start: "15:00", end: "16:00", slot: cls(S.ES2.n, S.ES2.c, "L-26") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "11:00", slot: cls(S.GS2.n, S.GS2.c, "L-15") },
      { start: "11:00", end: "12:00", slot: cls(S.ES4.n, S.ES4.c, "L-15") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES7.n + " Lab", S.ES7.c) },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
  ],
};

// ─── ECE G1 ──────────────────────────────────────────────────────────────────

export const ECE_SEM1_G1_TIMETABLE: WeeklyTimetable = {
  section: "ECE-SEM1-G1", semester: "1st Sem", branch: "B.Tech Electronics & Comm. Engineering", period: "Aug–Dec 2026",
  labSubgroup: "G1",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: lab(S.ES3.n + " Lab", S.ES3.c, undefined, "G1") },
      { start: "09:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.MA.n,  S.MA.c,  "L-26", "lecture", "G1") },
      { start: "14:00", end: "15:00", slot: cls(S.CH1.n, S.CH1.c, "L-26", "lecture", "G1") },
      { start: "15:00", end: "16:00", slot: cls(S.ES4.n, S.ES4.c, "L-26", "lecture", "G1") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.GS2.n, S.GS2.c, "L-26", "lecture", "G1") },
      { start: "10:00", end: "11:00", slot: cls(S.ES2.n, S.ES2.c, "L-26", "lecture", "G1") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-26", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES2.n + " Lab", S.ES2.c, "DH-1, DH-2", "G1") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.OR.n,  S.OR.c,  undefined, "lecture", "G1") },
      { start: "10:00", end: "11:00", slot: cls(S.CH1.n, S.CH1.c, "L-28", "lecture", "G1") },
      { start: "11:00", end: "12:00", slot: cls(S.ES4.n, S.ES4.c, "L-28", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.MA.n + " Lab", S.MA.c, undefined, "G1") },
      { start: "15:00", end: "17:00", slot: lab(S.CH1.n + " Lab", S.CH1.c, undefined, "F1") },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "11:00", slot: cls(S.ES2.n, S.ES2.c, "L-26", "lecture", "G1") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-26", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES7.n + " Lab", S.ES7.c, undefined, "G1") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "11:00", slot: cls(S.CH1.n, S.CH1.c, "L-30", "lecture", "G1") },
      { start: "11:00", end: "12:00", slot: cls(S.ES4.n, S.ES4.c, "L-30", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.CH1.n + " Lab", S.CH1.c, undefined, "F2") },
      { start: "15:00", end: "17:00", slot: lab(S.MA.n + " Lab", S.MA.c, undefined, "G2") },
    ]},
  ],
};

// ─── ECE G2 ──────────────────────────────────────────────────────────────────

export const ECE_SEM1_G2_TIMETABLE: WeeklyTimetable = {
  section: "ECE-SEM1-G2", semester: "1st Sem", branch: "B.Tech Electronics & Comm. Engineering", period: "Aug–Dec 2026",
  labSubgroup: "G2",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.CH1.n, S.CH1.c, "L-11", "lecture", "G2") },
      { start: "14:00", end: "15:00", slot: cls(S.MA.n,  S.MA.c,  "L-11", "lecture", "G2") },
      { start: "15:00", end: "16:00", slot: cls(S.ES4.n, S.ES4.c, "L-11", "lecture", "G2") },
      { start: "16:00", end: "17:00", slot: lab(S.ES7.n + " Lab", S.ES7.c, undefined, "G2") },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.GS2.n, S.GS2.c, "L-27", "lecture", "G2") },
      { start: "10:00", end: "11:00", slot: cls(S.ES2.n, S.ES2.c, "L-27", "lecture", "G2") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-27", "lecture", "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES3.n + " Lab", S.ES3.c, undefined, "G2") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "11:00", slot: free() },
      { start: "11:00", end: "12:00", slot: cls(S.CH1.n, S.CH1.c, "L-29", "lecture", "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.CH1.n + " Lab", S.CH1.c, undefined, "F3") },
      { start: "15:00", end: "17:00", slot: lab(S.ES4.n + " Lab", S.ES4.c, undefined, "F2") },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "11:00", slot: cls(S.ES2.n, S.ES2.c, "L-27", "lecture", "G2") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-27", "lecture", "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES2.n + " Lab", S.ES2.c, "DH-3, DH-4", "G2") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.OR.n,  S.OR.c,  undefined, "lecture", "G2") },
      { start: "10:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES4.n + " Lab", S.ES4.c, undefined, "F3") },
      { start: "15:00", end: "17:00", slot: lab(S.ES4.n + " Lab", S.ES4.c, undefined, "F1") },
    ]},
  ],
};

// ─── MECH G1 ─────────────────────────────────────────────────────────────────

export const MECH_SEM1_G1_TIMETABLE: WeeklyTimetable = {
  section: "MECH-SEM1-G1", semester: "1st Sem", branch: "B.Tech Mechanical Engineering", period: "Aug–Dec 2026",
  labSubgroup: "G1",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES4.n, S.ES4.c, "L-28", "lecture", "G1") },
      { start: "10:00", end: "11:00", slot: cls(S.ES2.n, S.ES2.c, "L-28", "lecture", "G1") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-28", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES2.n + " Lab", S.ES2.c, "DH-3, DH-4", "G1") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.CH2.n, S.CH2.c, "L-28", "lecture", "G1") },
      { start: "10:00", end: "11:00", slot: cls(S.MA.n,  S.MA.c,  "L-28", "lecture", "G1") },
      { start: "11:00", end: "12:00", slot: cls(S.ES4.n, S.ES4.c, "L-28", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES7.n + " Lab", S.ES7.c, undefined, "G1") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES2.n, S.ES2.c, "L-26", "lecture", "G1") },
      { start: "10:00", end: "12:00", slot: lab(S.CH2.n + " Lab F1", S.CH2.c, undefined, "F1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.CH2.n, S.CH2.c, "L-26", "lecture", "G1") },
      { start: "14:00", end: "15:00", slot: cls(S.OR.n,  S.OR.c,  undefined, "lecture", "G1") },
      { start: "15:00", end: "17:00", slot: lab(S.MA.n + " Lab", S.MA.c, undefined, "G2") },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "11:00", slot: cls(S.MA.n,  S.MA.c,  "L-28", "lecture", "G1") },
      { start: "11:00", end: "12:00", slot: cls(S.CH2.n, S.CH2.c, "L-28", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.CH2.n + " Lab F2", S.CH2.c, undefined, "F2") },
      { start: "15:00", end: "17:00", slot: lab(S.MA.n + " Lab", S.MA.c, undefined, "G1") },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "11:00", slot: cls(S.ES4.n, S.ES4.c, "L-28", "lecture", "G1") },
      { start: "11:00", end: "12:00", slot: cls(S.GS2.n, S.GS2.c, "L-28", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES3.n + " Lab", S.ES3.c, undefined, "G1") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
  ],
};

// ─── MECH G2 ─────────────────────────────────────────────────────────────────

export const MECH_SEM1_G2_TIMETABLE: WeeklyTimetable = {
  section: "MECH-SEM1-G2", semester: "1st Sem", branch: "B.Tech Mechanical Engineering", period: "Aug–Dec 2026",
  labSubgroup: "G2",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES4.n, S.ES4.c, "L-29", "lecture", "G2") },
      { start: "10:00", end: "11:00", slot: cls(S.ES2.n, S.ES2.c, "L-29", "lecture", "G2") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-29", "lecture", "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES7.n + " Lab", S.ES7.c, undefined, "G2") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "09:00", slot: lab(S.ES3.n + " Lab", S.ES3.c, undefined, "G2") },
      { start: "09:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.CH2.n, S.CH2.c, "L-11", "lecture", "G2") },
      { start: "14:00", end: "15:00", slot: cls(S.MA.n,  S.MA.c,  "L-11", "lecture", "G2") },
      { start: "15:00", end: "16:00", slot: cls(S.ES4.n, S.ES4.c, "L-11", "lecture", "G2") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES2.n, S.ES2.c, "L-27", "lecture", "G2") },
      { start: "10:00", end: "12:00", slot: lab(S.ES4.n + " Lab F2", S.ES4.c, undefined, "F2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.CH2.n, S.CH2.c, "L-27", "lecture", "G2") },
      { start: "14:00", end: "15:00", slot: cls(S.OR.n,  S.OR.c,  undefined, "lecture", "G2") },
      { start: "15:00", end: "17:00", slot: lab(S.ES4.n + " Lab F1", S.ES4.c, undefined, "F1") },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "11:00", slot: cls(S.MA.n,  S.MA.c,  "L-29", "lecture", "G2") },
      { start: "11:00", end: "12:00", slot: cls(S.CH2.n, S.CH2.c, "L-29", "lecture", "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES4.n + " Lab F3", S.ES4.c, undefined, "F3") },
      { start: "15:00", end: "17:00", slot: lab(S.CH2.n + " Lab F3", S.CH2.c, undefined, "F3") },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "11:00", slot: cls(S.ES4.n, S.ES4.c, "L-29", "lecture", "G2") },
      { start: "11:00", end: "12:00", slot: cls(S.GS2.n, S.GS2.c, "L-29", "lecture", "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES2.n + " Lab", S.ES2.c, "DH-1, DH-2", "G2") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
  ],
};

// ─── AI ──────────────────────────────────────────────────────────────────────

export const AI_SEM1_TIMETABLE: WeeklyTimetable = {
  section: "AI-SEM1", semester: "1st Sem", branch: "B.Tech CSE (Artificial Intelligence)", period: "Aug–Dec 2026",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.OR.n,  S.OR.c) },
      { start: "10:00", end: "12:00", slot: lab(S.CH1.n + " Lab", S.CH1.c) },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES4.n, S.ES4.c, "L-15") },
      { start: "14:00", end: "15:00", slot: cls(S.CH1.n, S.CH1.c, "L-15") },
      { start: "15:00", end: "17:00", slot: lab(S.ES4.n + " Lab", S.ES4.c) },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.MA.n,  S.MA.c,  "L-29") },
      { start: "10:00", end: "11:00", slot: cls(S.ES4.n, S.ES4.c, "L-29") },
      { start: "11:00", end: "12:00", slot: cls(S.ES2.n, S.ES2.c, "L-29") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES7.n + " Lab", S.ES7.c) },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "11:00", slot: free() },
      { start: "11:00", end: "12:00", slot: cls(S.GS2.n, S.GS2.c, "L-27") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES2.n + " Lab", S.ES2.c, "DH-1") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.MA.n,  S.MA.c,  "L-15") },
      { start: "10:00", end: "11:00", slot: cls(S.CH1.n, S.CH1.c, "L-15") },
      { start: "11:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES3.n + " Lab", S.ES3.c) },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES4.n, S.ES4.c, "L-27") },
      { start: "10:00", end: "11:00", slot: cls(S.ES2.n, S.ES2.c, "L-27") },
      { start: "11:00", end: "12:00", slot: cls(S.CH1.n, S.CH1.c, "L-27") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.MA.n + " Lab", S.MA.c) },
      { start: "15:00", end: "16:00", slot: cls(S.MA.n,  S.MA.c,  "L-11") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
  ],
};

// ─── VLSI ────────────────────────────────────────────────────────────────────

export const VLSI_SEM1_TIMETABLE: WeeklyTimetable = {
  section: "VLSI-SEM1", semester: "1st Sem", branch: "B.Tech VLSI Design", period: "Aug–Dec 2026",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.OR.n,  S.OR.c) },
      { start: "10:00", end: "12:00", slot: lab(S.ES4.n + " Lab", S.ES4.c) },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES4.n, S.ES4.c, "L-15") },
      { start: "14:00", end: "15:00", slot: cls(S.CH1.n, S.CH1.c, "L-15") },
      { start: "15:00", end: "17:00", slot: lab(S.CH1.n + " Lab", S.CH1.c) },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.MA.n,  S.MA.c,  "L-29") },
      { start: "10:00", end: "11:00", slot: cls(S.ES4.n, S.ES4.c, "L-29") },
      { start: "11:00", end: "12:00", slot: cls(S.ES2.n, S.ES2.c, "L-29") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES7.n + " Lab", S.ES7.c) },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "11:00", slot: free() },
      { start: "11:00", end: "12:00", slot: cls(S.GS2.n, S.GS2.c, "L-27") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES2.n + " Lab", S.ES2.c, "DH-2") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.MA.n,  S.MA.c,  "L-15") },
      { start: "10:00", end: "11:00", slot: cls(S.CH1.n, S.CH1.c, "L-15") },
      { start: "11:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES3.n + " Lab", S.ES3.c) },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES4.n, S.ES4.c, "L-27") },
      { start: "10:00", end: "11:00", slot: cls(S.ES2.n, S.ES2.c, "L-27") },
      { start: "11:00", end: "12:00", slot: cls(S.CH1.n, S.CH1.c, "L-27") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.MA.n + " Lab", S.MA.c) },
      { start: "15:00", end: "16:00", slot: cls(S.MA.n,  S.MA.c,  "L-11") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
  ],
};

// ─── METTA ───────────────────────────────────────────────────────────────────

export const METTA_SEM1_TIMETABLE: WeeklyTimetable = {
  section: "METTA-SEM1", semester: "1st Sem", branch: "B.Tech Metallurgical Engineering", period: "Aug–Dec 2026",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.CH2.n, S.CH2.c, "L-10") },
      { start: "10:00", end: "11:00", slot: cls(S.ES4.n, S.ES4.c, "L-10") },
      { start: "11:00", end: "12:00", slot: cls(S.OR.n,  S.OR.c) },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES3.n + " Lab", S.ES3.c) },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "12:00", slot: lab(S.ES4.n + " Lab", S.ES4.c) },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.MA.n,  S.MA.c,  "L-15") },
      { start: "14:00", end: "15:00", slot: cls(S.CH2.n, S.CH2.c, "L-15") },
      { start: "15:00", end: "17:00", slot: lab(S.MA.n + " Lab", S.MA.c) },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES4.n, S.ES4.c, "L-26") },
      { start: "10:00", end: "11:00", slot: cls(S.ES2.n, S.ES2.c, "L-26") },
      { start: "11:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES7.n + " Lab", S.ES7.c) },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.MA.n,  S.MA.c,  "L-10") },
      { start: "10:00", end: "11:00", slot: cls(S.CH2.n, S.CH2.c, "L-10") },
      { start: "11:00", end: "12:00", slot: cls(S.ES4.n, S.ES4.c, "L-10") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES2.n + " Lab", S.ES2.c, "DH-1, DH-2") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES2.n, S.ES2.c, "L-28") },
      { start: "10:00", end: "12:00", slot: lab(S.CH2.n + " Lab", S.CH2.c) },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.GS2.n, S.GS2.c, "L-26") },
      { start: "14:00", end: "15:00", slot: cls(S.MA.n,  S.MA.c,  "L-26") },
      { start: "15:00", end: "17:00", slot: lab(S.ES4.n + " Lab", S.ES4.c) },
    ]},
  ],
};

// ─── CSE SEM1 G1 ─────────────────────────────────────────────────────────────

export const CSE_SEM1_G1_TIMETABLE: WeeklyTimetable = {
  section: "CSE-SEM1-G1", semester: "1st Sem", branch: "B.Tech Computer Science & Engineering", period: "Aug–Dec 2026",
  labSubgroup: "G1",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES5.n, S.ES5.c, "L-27", "lecture", "G2") },
      { start: "10:00", end: "11:00", slot: cls(S.MA.n,  S.MA.c,  "L-27", "lecture", "G2") },
      { start: "11:00", end: "12:00", slot: cls(S.PY1.n, S.PY1.c, "L-27", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.HS.n + " Lab", S.HS.c, undefined, "G1") },
      { start: "15:00", end: "17:00", slot: lab(S.MA.n + " Lab", S.MA.c, undefined, "G1") },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.PY1.n, S.PY1.c, "L-10", "lecture", "G1") },
      { start: "10:00", end: "12:00", slot: lab(S.ES5.n + " Lab F1", S.ES5.c, undefined, "F1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: free() },
      { start: "15:00", end: "16:00", slot: cls(S.ES1.n, S.ES1.c, "L-28", "lecture", "G1") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.OR.n,  S.OR.c,  undefined, "lecture", "G1") },
      { start: "10:00", end: "12:00", slot: lab(S.MA.n + " Lab", S.MA.c, undefined, "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.MA.n,  S.MA.c,  "L-28", "lecture", "G1") },
      { start: "14:00", end: "15:00", slot: cls(S.GS1.n, S.GS1.c, "L-28", "lecture", "G1") },
      { start: "15:00", end: "16:00", slot: cls(S.ES5.n, S.ES5.c, "L-28", "lecture", "G1") },
      { start: "16:00", end: "17:00", slot: cls(S.HS.n,  S.HS.c,  "L-28", "lecture", "G1") },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "11:00", slot: lab(S.PY1.n + " Lab F2", S.PY1.c, undefined, "F2") },
      { start: "11:00", end: "12:00", slot: cls(S.PY1.n, S.PY1.c, "L-30", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES5.n + " Lab F3", S.ES5.c, undefined, "F3") },
      { start: "15:00", end: "16:00", slot: cls(S.ES5.n, S.ES5.c, "L-30", "lecture", "G1") },
      { start: "16:00", end: "17:00", slot: cls(S.ES1.n, S.ES1.c, "L-30", "lecture", "G1") },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES1.n, S.ES1.c, "L-10", "lecture", "G1") },
      { start: "10:00", end: "11:00", slot: cls(S.MA.n,  S.MA.c,  "L-10", "lecture", "G1") },
      { start: "11:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: free() },
      { start: "15:00", end: "16:00", slot: cls(S.HS.n,  S.HS.c,  "L-11", "lecture", "G1") },
      { start: "16:00", end: "18:00", slot: lab(S.ES5.n + " Lab F2", S.ES5.c, undefined, "F2") },
    ]},
  ],
};

// ─── CSE SEM1 G2 ─────────────────────────────────────────────────────────────

export const CSE_SEM1_G2_TIMETABLE: WeeklyTimetable = {
  section: "CSE-SEM1-G2", semester: "1st Sem", branch: "B.Tech Computer Science & Engineering", period: "Aug–Dec 2026",
  labSubgroup: "G2",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES5.n, S.ES5.c, "L-27", "lecture", "G2") },
      { start: "10:00", end: "11:00", slot: cls(S.MA.n,  S.MA.c,  "L-27", "lecture", "G2") },
      { start: "11:00", end: "12:00", slot: cls(S.PY1.n, S.PY1.c, "L-31", "lecture", "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES1.n + " Lab F3", S.ES1.c, undefined, "F3") },
      { start: "15:00", end: "16:00", slot: cls(S.ES5.n, S.ES5.c, "L-29", "lecture", "G2") },
      { start: "16:00", end: "17:00", slot: cls(S.MA.n,  S.MA.c,  "L-29", "lecture", "G2") },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.PY1.n, S.PY1.c, "L-11", "lecture", "G2") },
      { start: "10:00", end: "12:00", slot: lab(S.HS.n + " Lab", S.HS.c, undefined, "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES1.n + " Lab F2", S.ES1.c, undefined, "F2") },
      { start: "15:00", end: "16:00", slot: cls(S.ES1.n, S.ES1.c, "L-31", "lecture", "G2") },
      { start: "16:00", end: "17:00", slot: cls(S.OR.n,  S.OR.c,  undefined, "lecture", "G2") },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "12:00", slot: lab(S.PY1.n + " Lab F1", S.PY1.c, undefined, "F1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.MA.n,  S.MA.c,  "L-29", "lecture", "G2") },
      { start: "14:00", end: "15:00", slot: cls(S.GS1.n, S.GS1.c, "L-29", "lecture", "G2") },
      { start: "15:00", end: "16:00", slot: cls(S.ES5.n, S.ES5.c, "L-29", "lecture", "G2") },
      { start: "16:00", end: "17:00", slot: cls(S.HS.n,  S.HS.c,  "L-29", "lecture", "G2") },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "11:00", slot: free() },
      { start: "11:00", end: "12:00", slot: cls(S.PY1.n, S.PY1.c, "L-31", "lecture", "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES1.n + " Lab F1", S.ES1.c, undefined, "F1") },
      { start: "15:00", end: "16:00", slot: cls(S.ES5.n, S.ES5.c, "L-31", "lecture", "G2") },
      { start: "16:00", end: "17:00", slot: cls(S.ES1.n, S.ES1.c, "L-31", "lecture", "G1/G2") },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES1.n, S.ES1.c, "L-11", "lecture", "G2") },
      { start: "10:00", end: "11:00", slot: cls(S.MA.n,  S.MA.c,  "L-11", "lecture", "G2") },
      { start: "11:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: free() },
      { start: "15:00", end: "16:00", slot: cls(S.HS.n,  S.HS.c,  "L-15", "lecture", "G2") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
  ],
};

// ─── CIVIL SEM1 G1 ───────────────────────────────────────────────────────────

export const CIVIL_SEM1_G1_TIMETABLE: WeeklyTimetable = {
  section: "CIVIL-SEM1-G1", semester: "1st Sem", branch: "B.Tech Civil Engineering", period: "Aug–Dec 2026",
  labSubgroup: "G1",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "12:00", slot: lab(S.MA.n + " Lab", S.MA.c, undefined, "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.MA.n,  S.MA.c,  "L-30", "lecture", "G1") },
      { start: "14:00", end: "15:00", slot: cls(S.PY2.n, S.PY2.c, "L-30", "lecture", "G1") },
      { start: "15:00", end: "17:00", slot: lab(S.ES6.n + " Lab F11", S.ES6.c, undefined, "F11") },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES1.n, S.ES1.c, "L-30", "lecture", "G1") },
      { start: "10:00", end: "12:00", slot: lab(S.ES6.n + " Lab F12", S.ES6.c, undefined, "F12") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.PY2.n + " Lab F2", S.PY2.c, undefined, "F2") },
      { start: "15:00", end: "16:00", slot: cls(S.ES6.n, S.ES6.c, "L-26", "lecture", "G1") },
      { start: "16:00", end: "17:00", slot: cls(S.OR.n,  S.OR.c,  undefined, "lecture", "G1") },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "09:00", slot: lab(S.HS.n + " Lab", S.HS.c, undefined, "G1") },
      { start: "09:00", end: "10:00", slot: free() },
      { start: "10:00", end: "11:00", slot: cls(S.HS.n,  S.HS.c,  "L-30", "lecture", "G1") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-30", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES6.n, S.ES6.c, "L-10", "lecture") },
      { start: "14:00", end: "15:00", slot: cls(S.PY2.n, S.PY2.c, "L-10", "lecture", "G1") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.GS1.n, S.GS1.c, "L-26", "lecture", "G1") },
      { start: "10:00", end: "12:00", slot: lab(S.ES1.n + " Lab F1", S.ES1.c, undefined, "F1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES1.n, S.ES1.c, "L-28", "lecture", "G1") },
      { start: "14:00", end: "15:00", slot: cls(S.ES6.n, S.ES6.c, "L-28", "lecture", "G1") },
      { start: "15:00", end: "16:00", slot: cls(S.HS.n,  S.HS.c,  "L-28", "lecture", "G1") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "10:00", slot: lab(S.MA.n + " Lab", S.MA.c, undefined, "G1") },
      { start: "10:00", end: "11:00", slot: free() },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-10", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES1.n, S.ES1.c, "L-28", "lecture", "G1") },
      { start: "14:00", end: "15:00", slot: cls(S.PY2.n, S.PY2.c, "L-28", "lecture", "G1") },
      { start: "15:00", end: "17:00", slot: lab(S.PY2.n + " Lab F3", S.PY2.c, undefined, "F3") },
    ]},
  ],
};

// ─── CIVIL SEM1 G2 ───────────────────────────────────────────────────────────

export const CIVIL_SEM1_G2_TIMETABLE: WeeklyTimetable = {
  section: "CIVIL-SEM1-G2", semester: "1st Sem", branch: "B.Tech Civil Engineering", period: "Aug–Dec 2026",
  labSubgroup: "G2",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.MA.n,  S.MA.c,  "L-31", "lecture", "G2") },
      { start: "14:00", end: "15:00", slot: cls(S.PY2.n, S.PY2.c, "L-31", "lecture", "G2") },
      { start: "15:00", end: "17:00", slot: lab(S.ES1.n + " Lab F3", S.ES1.c, undefined, "F3") },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES1.n, S.ES1.c, "L-31", "lecture", "G2") },
      { start: "10:00", end: "12:00", slot: lab(S.ES1.n + " Lab F2", S.ES1.c, undefined, "F2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES6.n + " Lab F3/F31", S.ES6.c, undefined, "F31") },
      { start: "15:00", end: "16:00", slot: cls(S.ES6.n, S.ES6.c, "L-27", "lecture", "G2") },
      { start: "16:00", end: "17:00", slot: cls(S.OR.n,  S.OR.c,  undefined, "lecture", "G2") },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "11:00", slot: cls(S.HS.n,  S.HS.c,  "L-31", "lecture", "G2") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-31", "lecture", "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES6.n, S.ES6.c, "L-11", "lecture") },
      { start: "14:00", end: "15:00", slot: cls(S.PY2.n, S.PY2.c, "L-11", "lecture", "G2") },
      { start: "15:00", end: "17:00", slot: lab(S.ES6.n + " Lab F3/F32", S.ES6.c, undefined, "F32") },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.GS1.n, S.GS1.c, "L-27", "lecture", "G2") },
      { start: "10:00", end: "12:00", slot: lab(S.ES6.n + " Lab F2/F21", S.ES6.c, undefined, "F21") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES1.n, S.ES1.c, "L-29", "lecture", "G2") },
      { start: "14:00", end: "15:00", slot: cls(S.ES6.n, S.ES6.c, "L-29", "lecture", "G2") },
      { start: "15:00", end: "16:00", slot: cls(S.HS.n,  S.HS.c,  "L-29", "lecture", "G2") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "10:00", slot: lab(S.HS.n + " Lab", S.HS.c, undefined, "G2") },
      { start: "10:00", end: "11:00", slot: free() },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-11", "lecture", "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES1.n, S.ES1.c, "L-29", "lecture", "G2") },
      { start: "14:00", end: "15:00", slot: cls(S.PY2.n, S.PY2.c, "L-29", "lecture", "G2") },
      { start: "15:00", end: "17:00", slot: lab(S.ES6.n + " Lab F2/F22", S.ES6.c, undefined, "F22") },
    ]},
  ],
};

// ─── EE SEM1 G1 ──────────────────────────────────────────────────────────────

export const EE_SEM1_G1_TIMETABLE: WeeklyTimetable = {
  section: "EE-SEM1-G1", semester: "1st Sem", branch: "B.Tech Electrical Engineering", period: "Aug–Dec 2026",
  labSubgroup: "G1",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES1.n, S.ES1.c, "L-30", "lecture", "G1") },
      { start: "10:00", end: "12:00", slot: lab(S.HS.n + " Lab", S.HS.c, undefined, "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.MA.n + " Lab", S.MA.c, undefined, "G1") },
      { start: "15:00", end: "16:00", slot: cls(S.HS.n,  S.HS.c,  "L-30", "lecture", "G1") },
      { start: "16:00", end: "17:00", slot: cls(S.PY1.n, S.PY1.c, "L-30", "lecture", "G1") },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "10:00", slot: lab(S.PY1.n + " Lab F2", S.PY1.c, undefined, "F2") },
      { start: "10:00", end: "11:00", slot: free() },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-30", "lecture", "G1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES1.n, S.ES1.c, "L-28", "lecture", "G1") },
      { start: "14:00", end: "15:00", slot: cls(S.ES5.n, S.ES5.c, "L-28", "lecture", "G1") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.MA.n,  S.MA.c,  "L-30", "lecture", "G1") },
      { start: "14:00", end: "15:00", slot: cls(S.HS.n,  S.HS.c,  "L-30", "lecture", "G1") },
      { start: "15:00", end: "16:00", slot: cls(S.PY1.n, S.PY1.c, "L-30", "lecture", "G1") },
      { start: "16:00", end: "17:00", slot: cls(S.ES5.n, S.ES5.c, "L-30", "lecture", "G1") },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.PY1.n, S.PY1.c, "L-30", "lecture", "G1") },
      { start: "10:00", end: "11:00", slot: cls(S.GS1.n, S.GS1.c, "L-30", "lecture", "G1") },
      { start: "11:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.PY1.n + " Lab F1", S.PY1.c, undefined, "F1") },
      { start: "15:00", end: "17:00", slot: lab(S.ES1.n + " Lab F1", S.ES1.c, undefined, "F1") },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.OR.n,  S.OR.c,  undefined, "lecture", "G1") },
      { start: "10:00", end: "12:00", slot: lab(S.ES5.n + " Lab F1", S.ES5.c, undefined, "F1") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.MA.n,  S.MA.c,  "L-30", "lecture", "G1") },
      { start: "14:00", end: "15:00", slot: cls(S.ES1.n, S.ES1.c, "L-30", "lecture", "G1") },
      { start: "15:00", end: "16:00", slot: cls(S.ES5.n, S.ES5.c, "L-30", "lecture", "G1") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
  ],
};

// ─── EE SEM1 G2 ──────────────────────────────────────────────────────────────

export const EE_SEM1_G2_TIMETABLE: WeeklyTimetable = {
  section: "EE-SEM1-G2", semester: "1st Sem", branch: "B.Tech Electrical Engineering", period: "Aug–Dec 2026",
  labSubgroup: "G2",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES1.n, S.ES1.c, "L-31", "lecture", "G2") },
      { start: "10:00", end: "12:00", slot: lab(S.ES1.n + " Lab F3", S.ES1.c, undefined, "F3") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.PY1.n + " Lab F3", S.PY1.c, undefined, "F3") },
      { start: "15:00", end: "16:00", slot: cls(S.HS.n,  S.HS.c,  "L-31", "lecture", "G2") },
      { start: "16:00", end: "17:00", slot: cls(S.PY1.n, S.PY1.c, "L-31", "lecture", "G2") },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "11:00", slot: free() },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-31", "lecture", "G2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES1.n, S.ES1.c, "L-29", "lecture", "G2") },
      { start: "14:00", end: "15:00", slot: cls(S.ES5.n, S.ES5.c, "L-29", "lecture", "G2") },
      { start: "15:00", end: "17:00", slot: lab(S.HS.n + " Lab", S.HS.c, undefined, "G2") },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "12:00", slot: lab(S.ES5.n + " Lab F2", S.ES5.c, undefined, "F2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.MA.n,  S.MA.c,  "L-31", "lecture", "G2") },
      { start: "14:00", end: "15:00", slot: cls(S.HS.n,  S.HS.c,  "L-31", "lecture", "G2") },
      { start: "15:00", end: "16:00", slot: cls(S.PY1.n, S.PY1.c, "L-31", "lecture", "G2") },
      { start: "16:00", end: "17:00", slot: cls(S.ES5.n, S.ES5.c, "L-31", "lecture", "G2") },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.PY1.n, S.PY1.c, "L-31", "lecture", "G2") },
      { start: "10:00", end: "11:00", slot: cls(S.GS1.n, S.GS1.c, "L-31", "lecture", "G2") },
      { start: "11:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.MA.n + " Lab", S.MA.c, undefined, "G2") },
      { start: "15:00", end: "17:00", slot: lab(S.ES5.n + " Lab F3", S.ES5.c, undefined, "F3") },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.OR.n,  S.OR.c,  undefined, "lecture", "G2") },
      { start: "10:00", end: "12:00", slot: lab(S.ES1.n + " Lab F2", S.ES1.c, undefined, "F2") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.MA.n,  S.MA.c,  "L-31", "lecture", "G2") },
      { start: "14:00", end: "15:00", slot: cls(S.ES1.n, S.ES1.c, "L-31", "lecture", "G2") },
      { start: "15:00", end: "16:00", slot: cls(S.ES5.n, S.ES5.c, "L-31", "lecture", "G2") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
  ],
};

// ─── PROD ─────────────────────────────────────────────────────────────────────

export const PROD_SEM1_TIMETABLE: WeeklyTimetable = {
  section: "PROD-SEM1", semester: "1st Sem", branch: "B.Tech Production Engineering", period: "Aug–Dec 2026",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "12:00", slot: lab(S.ES6.n + " Lab F11", S.ES6.c, undefined, "F11") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES6.n, S.ES6.c, "L-28") },
      { start: "14:00", end: "15:00", slot: cls(S.HS.n,  S.HS.c,  "L-28") },
      { start: "15:00", end: "16:00", slot: cls(S.MA.n,  S.MA.c,  "L-15") },
      { start: "16:00", end: "17:00", slot: cls(S.ES1.n, S.ES1.c, "L-15") },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "12:00", slot: lab(S.MA.n + " Lab", S.MA.c) },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.PY2.n, S.PY2.c, "L-30") },
      { start: "14:00", end: "15:00", slot: cls(S.ES1.n, S.ES1.c, "L-30") },
      { start: "15:00", end: "16:00", slot: cls(S.ES6.n, S.ES6.c, "L-30") },
      { start: "16:00", end: "17:00", slot: cls(S.OR.n,  S.OR.c) },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES1.n, S.ES1.c, "L-11") },
      { start: "10:00", end: "12:00", slot: lab(S.ES1.n + " Lab", S.ES1.c) },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES6.n + " Lab F12", S.ES6.c, undefined, "F12") },
      { start: "15:00", end: "16:00", slot: free() },
      { start: "16:00", end: "17:00", slot: cls(S.MA.n,  S.MA.c,  "L-15") },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "12:00", slot: lab(S.HS.n + " Lab", S.HS.c) },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES6.n, S.ES6.c, "L-10") },
      { start: "14:00", end: "15:00", slot: cls(S.MA.n,  S.MA.c,  "L-10") },
      { start: "15:00", end: "16:00", slot: cls(S.PY2.n, S.PY2.c, "L-10") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "10:00", slot: free() },
      { start: "10:00", end: "12:00", slot: lab(S.PY2.n + " Lab", S.PY2.c) },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.PY2.n, S.PY2.c, "L-27") },
      { start: "14:00", end: "15:00", slot: cls(S.GS1.n, S.GS1.c, "L-27") },
      { start: "15:00", end: "16:00", slot: cls(S.HS.n,  S.HS.c,  "L-27") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
  ],
};

// ─── DS SEM1 ──────────────────────────────────────────────────────────────────

export const DS_SEM1_TIMETABLE: WeeklyTimetable = {
  section: "DS-SEM1", semester: "1st Sem", branch: "B.Tech CSE (Data Science)", period: "Aug–Dec 2026",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.GS1.n, S.GS1.c, "L-15") },
      { start: "10:00", end: "11:00", slot: cls(S.OR.n,  S.OR.c) },
      { start: "11:00", end: "12:00", slot: cls(S.PY1.n, S.PY1.c, "L-30") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.ES1.n, S.ES1.c, "L-11") },
      { start: "14:00", end: "15:00", slot: cls(S.ES5.n, S.ES5.c, "L-11") },
      { start: "15:00", end: "17:00", slot: lab(S.PY1.n + " Lab", S.PY1.c) },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.MA.n + " Lab", S.MA.c) },
      { start: "15:00", end: "17:00", slot: lab(S.ES1.n + " Lab", S.ES1.c) },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.MA.n,  S.MA.c,  "L-10") },
      { start: "10:00", end: "11:00", slot: cls(S.PY1.n, S.PY1.c, "L-10") },
      { start: "11:00", end: "12:00", slot: cls(S.ES5.n, S.ES5.c, "L-10") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.PY1.n + " Lab", S.PY1.c) },
      { start: "15:00", end: "16:00", slot: free() },
      { start: "15:00", end: "16:00", slot: cls(S.HS.n,  S.HS.c,  "L-10") },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.MA.n,  S.MA.c,  "L-11") },
      { start: "10:00", end: "11:00", slot: cls(S.ES1.n, S.ES1.c, "L-11") },
      { start: "11:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "14:00", slot: cls(S.HS.n,  S.HS.c,  "L-27") },
      { start: "14:00", end: "15:00", slot: cls(S.ES5.n, S.ES5.c, "L-27") },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "09:00", slot: free() },
      { start: "09:00", end: "10:00", slot: cls(S.ES1.n, S.ES1.c, "L-26") },
      { start: "10:00", end: "11:00", slot: cls(S.PY1.n, S.PY1.c, "L-26") },
      { start: "11:00", end: "12:00", slot: cls(S.MA.n,  S.MA.c,  "L-26") },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.ES5.n + " Lab", S.ES5.c) },
      { start: "15:00", end: "17:00", slot: lab(S.HS.n + " Lab", S.HS.c) },
    ]},
  ],
};

// ─── B Des SEM1 ───────────────────────────────────────────────────────────────

export const BDES_SEM1_TIMETABLE: WeeklyTimetable = {
  section: "BDES-SEM1", semester: "1st Sem", branch: "B.Des", period: "Aug–Dec 2026",
  schedule: [
    { day: "MON", slots: [
      { start: "08:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: free() },
      { start: "15:00", end: "16:00", slot: cls(S.HS.n, S.HS.c, "L-28") },
      { start: "16:00", end: "17:00", slot: free() },
    ]},
    { day: "TUE", slots: [
      { start: "08:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "17:00", slot: free() },
    ]},
    { day: "WED", slots: [
      { start: "08:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "17:00", slot: free() },
    ]},
    { day: "THU", slots: [
      { start: "08:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: lab(S.HS.n + " Lab", S.HS.c) },
      { start: "15:00", end: "17:00", slot: free() },
    ]},
    { day: "FRI", slots: [
      { start: "08:00", end: "12:00", slot: free() },
      { start: "12:00", end: "13:00", slot: lunch() },
      { start: "13:00", end: "15:00", slot: free() },
      { start: "15:00", end: "16:00", slot: cls(S.GS1.n, S.GS1.c, "L-27") },
      { start: "16:00", end: "17:00", slot: cls(S.HS.n,  S.HS.c,  "L-27") },
    ]},
  ],
};

// ─── Roll No → 1st Sem Section (2025 & 2026 Batch) ───────────────────────────
// PEC Roll Number format: YY · 10 · BB · NN
//   YY = batch year (25 or 26)
//   10 = constant department prefix (3rd+4th digits)
//   BB = 2-digit branch code (5th+6th digits)
//   NN = roll number within branch
//
// Confirmed branch codes (5th+6th digit):
//   20 = Civil Engineering
//   30 = CSE
//   31 = Production Engineering  (5th digit=3, 6th=1 → 26103100+)
//   40 = Electrical Engineering (EE)
//   50 = ECE
//   60 = DS
//   65 = AI (sub-code, 5th=6, 6th=5 → 26106500+)
//   61 = AI variant
//   80 = Metta
// Unconfirmed (placeholders): VLSI, Aero, M&C, Mech, B.Des

const SEM1_SECTION_RANGES: { section: string; min: number; max: number }[] = [
  // ── CSE (branch 30) ──────────────────────────────────────────────────────
  // 2026 batch: 26103001–26103099 (roll 01-99, 5th+6th = 30)
  { section: "CSE-SEM1-G1", min: 26103001, max: 26103066 },
  { section: "CSE-SEM1-G2", min: 26103067, max: 26103099 },
  // 2025 batch
  { section: "CSE-SEM1-G1", min: 25103001, max: 25103066 },
  { section: "CSE-SEM1-G2", min: 25103067, max: 25103099 },

  // ── Production (branch 31) ───────────────────────────────────────────────
  // 5th+6th digit = '3','1' → e.g. 26103101 = Prod roll 01
  { section: "PROD-SEM1", min: 26103101, max: 26103144 },  // 2026 (44 students)
  { section: "PROD-SEM1", min: 25103101, max: 25103144 },  // 2025

  // ── Civil (branch 20) ────────────────────────────────────────────────────
  { section: "CIVIL-SEM1-G1", min: 26102001, max: 26102066 },  // 2026 G1
  { section: "CIVIL-SEM1-G2", min: 26102067, max: 26102132 },  // 2026 G2
  { section: "CIVIL-SEM1-G1", min: 25102001, max: 25102066 },  // 2025 G1
  { section: "CIVIL-SEM1-G2", min: 25102067, max: 25102132 },  // 2025 G2

  // ── EE (branch 40) ───────────────────────────────────────────────────────
  { section: "EE-SEM1-G1", min: 26104001, max: 26104066 },  // 2026 G1
  { section: "EE-SEM1-G2", min: 26104067, max: 26104132 },  // 2026 G2
  { section: "EE-SEM1-G1", min: 25104001, max: 25104066 },  // 2025 G1
  { section: "EE-SEM1-G2", min: 25104067, max: 25104132 },  // 2025 G2

  // ── ECE (branch 50) ──────────────────────────────────────────────────────
  { section: "ECE-SEM1-G1", min: 26105001, max: 26105066 },  // 2026 G1
  { section: "ECE-SEM1-G2", min: 26105067, max: 26105132 },  // 2026 G2
  { section: "ECE-SEM1-G1", min: 25105001, max: 25105066 },  // 2025 G1
  { section: "ECE-SEM1-G2", min: 25105067, max: 25105132 },  // 2025 G2

  // ── DS (branch 60) ───────────────────────────────────────────────────────
  { section: "DS-SEM1", min: 26106001, max: 26106066 },  // 2026
  { section: "DS-SEM1", min: 25106001, max: 25106066 },  // 2025

  // ── AI (branch 65, sub-code of DS range) ─────────────────────────────────
  { section: "AI-SEM1", min: 26106501, max: 26106533 },  // 2026 (code 65)
  { section: "AI-SEM1", min: 25106501, max: 25106533 },  // 2025
  { section: "AI-SEM1", min: 26106101, max: 26106133 },  // 2026 (code 61)
  { section: "AI-SEM1", min: 25106101, max: 25106133 },  // 2025

  // ── Metta (branch 80) ────────────────────────────────────────────────────
  { section: "METTA-SEM1", min: 26108001, max: 26108066 },  // 2026
  { section: "METTA-SEM1", min: 25108001, max: 25108066 },  // 2025

  // ── VLSI — branch code unconfirmed (placeholder) ─────────────────────────
  { section: "VLSI-SEM1", min: 26111001, max: 26111033 },
  { section: "VLSI-SEM1", min: 25111001, max: 25111033 },

  // ── Aero — branch code unconfirmed (placeholder) ─────────────────────────
  { section: "AERO", min: 26109001, max: 26109033 },
  { section: "AERO", min: 25109001, max: 25109033 },

  // ── M&C — branch code unconfirmed (placeholder) ──────────────────────────
  { section: "M&C", min: 26109034, max: 26109066 },
  { section: "M&C", min: 25109034, max: 25109066 },

  // ── Mech — branch code unconfirmed (placeholder) ─────────────────────────
  { section: "MECH-SEM1-G1", min: 26107001, max: 26107066 },
  { section: "MECH-SEM1-G2", min: 26107067, max: 26107132 },
  { section: "MECH-SEM1-G1", min: 25107001, max: 25107066 },
  { section: "MECH-SEM1-G2", min: 25107067, max: 25107132 },

  // ── B.Des — branch code unconfirmed (placeholder) ────────────────────────
  { section: "BDES-SEM1", min: 26150001, max: 26150033 },
  { section: "BDES-SEM1", min: 25150001, max: 25150033 },
];

export function getSem1SectionFromRollNo(rollNo: string): string | null {
  const num = parseInt(rollNo.replace(/\D/g, ""), 10);
  if (isNaN(num)) return null;
  for (const r of SEM1_SECTION_RANGES) {
    if (num >= r.min && num <= r.max) return r.section;
  }
  return null;
}

// ─── Registry ────────────────────────────────────────────────────────────────

export const SEM1_TIMETABLE_REGISTRY: Record<string, WeeklyTimetable> = {
  "AERO":         AERO_SEM1_TIMETABLE,
  "M&C":          MC_SEM1_TIMETABLE,
  "ECE-SEM1-G1":  ECE_SEM1_G1_TIMETABLE,
  "ECE-SEM1-G2":  ECE_SEM1_G2_TIMETABLE,
  "MECH-SEM1-G1": MECH_SEM1_G1_TIMETABLE,
  "MECH-SEM1-G2": MECH_SEM1_G2_TIMETABLE,
  "AI-SEM1":      AI_SEM1_TIMETABLE,
  "VLSI-SEM1":    VLSI_SEM1_TIMETABLE,
  "METTA-SEM1":   METTA_SEM1_TIMETABLE,
  "CSE-SEM1-G1":  CSE_SEM1_G1_TIMETABLE,
  "CSE-SEM1-G2":  CSE_SEM1_G2_TIMETABLE,
  "CIVIL-SEM1-G1":CIVIL_SEM1_G1_TIMETABLE,
  "CIVIL-SEM1-G2":CIVIL_SEM1_G2_TIMETABLE,
  "EE-SEM1-G1":   EE_SEM1_G1_TIMETABLE,
  "EE-SEM1-G2":   EE_SEM1_G2_TIMETABLE,
  "PROD-SEM1":    PROD_SEM1_TIMETABLE,
  "DS-SEM1":      DS_SEM1_TIMETABLE,
  "BDES-SEM1":    BDES_SEM1_TIMETABLE,
};

export function getSem1Timetable(section: string): WeeklyTimetable | null {
  return SEM1_TIMETABLE_REGISTRY[section] ?? null;
}
