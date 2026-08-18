import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import { fetchOrientationData, OrientationData } from "@/lib/orientation-api";
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Search,
  Filter,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  FileText,
  Building,
  Users,
  ChevronRight,
  Info,
  Sparkles,
  Navigation,
  Utensils,
  GraduationCap,
  Shield,
  Layers,
  X,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/app/orientation")({
  head: () => ({
    meta: [
      { title: "Orientation 2026 — Campus Connect" },
      {
        name: "description",
        content: "PEC Freshers Orientation 2026 guide, campus maps, reporting venues, and Day 1 schedule.",
      },
    ],
  }),
  component: OrientationPage,
});

// ─── Data Definitions ────────────────────────────────────────────────────────

interface ScheduleEvent {
  id: string;
  day: number;
  time: string;
  activity: string;
  venue: string;
  coordinator?: string;
  category: "morning" | "inaugural" | "lunch" | "afternoon";
  highlight?: boolean;
  notes?: string;
}

const SCHEDULE_DATA_BY_DAY: Record<number, ScheduleEvent[]> = {
  1: [
    { id: "d1-1", day: 1, time: "9:30 AM – 10:00 AM", activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 1)", venue: "Annexure 1 (Day 1) Reporting Venues", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", highlight: true, notes: "Mandatory reporting for all first-year freshers." },
    { id: "d1-2", day: 1, time: "10:00 AM – 10:30 AM", activity: "Distribution of Welcome Kit", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "morning" },
    { id: "d1-3", day: 1, time: "10:30 AM – 10:35 AM", activity: "Welcoming the Batch of 2030 & Welcoming Dignitaries", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "inaugural" },
    { id: "d1-4", day: 1, time: "10:35 AM – 10:40 AM", activity: "Inaugural & Lamp Lighting", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "inaugural" },
    { id: "d1-5", day: 1, time: "10:40 AM – 10:45 AM", activity: "Know Your Director", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "inaugural" },
    { id: "d1-6", day: 1, time: "10:45 AM – 11:05 AM", activity: "Address By Director, PEC", venue: "Auditorium", coordinator: "Director, PEC", category: "inaugural", highlight: true },
    { id: "d1-7", day: 1, time: "11:05 AM – 11:15 AM", activity: "Introduction to Heads of Departments, Deans & Registrar", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "inaugural" },
    { id: "d1-8", day: 1, time: "11:15 AM – 11:35 AM", activity: "Address By Dean of Academic Affairs (DAA)", venue: "Auditorium", coordinator: "Dean Academic Affairs", category: "inaugural" },
    { id: "d1-9", day: 1, time: "11:35 AM – 11:50 AM", activity: "Address By Dean of Student Affairs (DSA)", venue: "Auditorium", coordinator: "Dean Student Affairs", category: "inaugural" },
    { id: "d1-10", day: 1, time: "11:50 AM – 12:05 PM", activity: "Address By Head, Computer Centre", venue: "Auditorium", coordinator: "Head, Computer Centre", category: "inaugural" },
    { id: "d1-11", day: 1, time: "12:05 PM – 12:30 PM", activity: "Dispersal Of Students to Respective Hostels", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "lunch" },
    { id: "d1-12", day: 1, time: "12:30 PM – 1:45 PM", activity: "Lunch", venue: "Annexure 2 Venues (Centenary Hall / Shivalik / KC Hostel)", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch", highlight: true, notes: "All Girls at KC Hostel. Hosteller Boys at Shivalik Hostel. Day Scholars at Centenary Hall." },
    { id: "d1-13", day: 1, time: "1:45 PM – 1:55 PM", activity: "Documentary", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon" },
    { id: "d1-14", day: 1, time: "1:55 PM – 2:00 PM", activity: "Introduction to Honorable Professor Rajeev Ahuja, Director, IIT Ropar", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon" },
    { id: "d1-15", day: 1, time: "2:00 PM – 3:00 PM", activity: "Address By Professor Rajeev Ahuja (Director, IIT Ropar)", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon", highlight: true },
    { id: "d1-16", day: 1, time: "3:00 PM – 3:10 PM", activity: "Felicitation Ceremony", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon" },
    { id: "d1-17", day: 1, time: "3:10 PM – 3:15 PM", activity: "Vote of Thanks", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon" },
    { id: "d1-18", day: 1, time: "3:30 PM – 4:30 PM", activity: "Department Visit(s) (Address by Respective HOD, Interaction With Faculty & Lab Visit)", venue: "Annexure 3", coordinator: "Address by Respective HOD, Interaction With Faculty, Department Lab Visit(s)", category: "afternoon", highlight: true },
    { id: "d1-19", day: 1, time: "4:30 PM – 5:00 PM", activity: "SNACKS", venue: "Annexure 3", coordinator: "Organizing Committee", category: "afternoon" },
    { id: "d1-20", day: 1, time: "5:00 PM – 5:30 PM", activity: "Institute Tour", venue: "Campus", coordinator: "Student Branch Incharges & Discipline Incharges", category: "afternoon" },
  ],
  2: [
    { id: "d2-1", day: 2, time: "8:45 AM – 9:15 AM", activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 2)", venue: "Annexure 1 (Day 2)", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", highlight: true },
    { id: "d2-2", day: 2, time: "9:15 AM – 9:25 AM", activity: "Address by Head, Physics", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-3", day: 2, time: "9:25 AM – 9:35 AM", activity: "Address by Head, Chemistry", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-4", day: 2, time: "9:35 AM – 9:45 AM", activity: "Address by Head, Mathematics", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-5", day: 2, time: "9:45 AM – 9:55 AM", activity: "Address by Head, CMH", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-6", day: 2, time: "9:55 AM – 10:40 AM", activity: "Speaker Session", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", highlight: true },
    { id: "d2-7", day: 2, time: "10:40 AM – 10:55 AM", activity: "Address by ADSA, Cultural", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-8", day: 2, time: "10:55 AM – 11:10 AM", activity: "Address by ADSA, Technical", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-9", day: 2, time: "11:10 AM – 11:30 AM", activity: "Address by ADSA Hostels - Anti ragging session", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", highlight: true },
    { id: "d2-10", day: 2, time: "11:30 AM – 11:40 AM", activity: "Introduction to P/Is Clubs, Technical Societies, Cells & Wardens", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-11", day: 2, time: "11:40 AM – 11:45 AM", activity: "Vote of Thanks", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-12", day: 2, time: "11:45 AM – 12:15 PM", activity: "Club Presentations Slot 1: Group A (HEB in L-26), Group B (EEB in L-27), Group C (SAASC in L-28), Group D (ACM in L-29), Group E (PDC in Auditorium), Group F (WEC in Aero Audi), Group G (NCC in L-30), Group H (Robotics in L-31)", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/I's of Club, Societies, Cells, NSS & NCC to coordinate and supervise.", category: "afternoon" },
    { id: "d2-13", day: 2, time: "12:15 PM – 12:45 PM", activity: "Club Presentations Slot 2: Group A (SAE in L-26), Group B (ASCE in L-27), Group C (SME in L-28), Group D (CIM in L-29), Group E (EEB in Auditorium), Group F (ASME in Aero Audi), Group G (APC in L-30), Group H (SESI in L-31)", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/I's of Club, Societies, Cells, NSS & NCC to coordinate and supervise.", category: "afternoon" },
    { id: "d2-14", day: 2, time: "12:45 PM – 2:15 PM", activity: "Lunch", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch" },
    { id: "d2-15", day: 2, time: "2:15 PM – 2:30 PM", activity: "Movement of Students", venue: "Respective Venues", coordinator: "Student Mentors", category: "afternoon" },
    { id: "d2-16", day: 2, time: "2:30 PM – 3:00 PM", activity: "Club Presentations Slot 3: Group A (Rotaract in L-26), Group B (ELC in L-27), Group C (ASPS in L-28), Group D (ATS in L-29), Group E (IIM in Auditorium), Group F (IEEE in Aero Audi), Group G (NSS in L-30), Group H (IGS in L-31)", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/I's of Club, Societies, Cells, NSS & NCC to coordinate and supervise.", category: "afternoon" },
    { id: "d2-17", day: 2, time: "3:00 PM – 3:30 PM", activity: "Club Presentations Slot 4: Group A (ELC in L-26), Group B (ASPS in L-27), Group C (ATS in L-28), Group D (IIM in L-29), Group E (IEEE in Auditorium), Group F (NSS in Aero Audi), Group G (IGS in L-30), Group H (ES in L-31)", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/I's of Club, Societies, Cells, NSS & NCC to coordinate and supervise.", category: "afternoon" },
    { id: "d2-18", day: 2, time: "3:30 PM – 4:00 PM", activity: "Evening Snacks", venue: "Respective Venues / Campus", coordinator: "Organizing Committee", category: "afternoon" },
    { id: "d2-19", day: 2, time: "4:00 PM – 4:15 PM", activity: "Movement of Students to Respective Venues", venue: "Respective Venues", coordinator: "Student Mentors", category: "afternoon" },
    { id: "d2-20", day: 2, time: "4:15 PM – 5:45 PM", activity: "Parallel Evening Displays: Technical Display (T1 in Centenary Hall) | Sports (S1 in Athletic Ground) | Music (A3 in Auditorium)", venue: "Centenary Hall / Athletic Ground / Auditorium", coordinator: "Respective P/I's of Club, Societies, Cells & Sports to coordinate and supervise.", category: "afternoon", highlight: true },
  ],
  3: [
    { id: "d3-1", day: 3, time: "8:30 AM – 9:15 AM", activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 3)", venue: "Annexure 1 (Day 3)", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", highlight: true },
    { id: "d3-2", day: 3, time: "9:15 AM – 9:30 AM", activity: "Address by Head, SCC", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning" },
    { id: "d3-3", day: 3, time: "9:30 AM – 9:45 AM", activity: "Address By Head, Alumni Relations", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning" },
    { id: "d3-4", day: 3, time: "9:45 AM – 10:00 AM", activity: "Address by Head, Library", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning" },
    { id: "d3-5", day: 3, time: "10:00 AM – 10:20 AM", activity: "Address by Head, CDGC", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning", highlight: true },
    { id: "d3-6", day: 3, time: "10:20 AM – 11:20 AM", activity: "Speaker Session 1", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning" },
    { id: "d3-7", day: 3, time: "11:20 AM – 12:20 PM", activity: "Speaker Session 2", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning" },
    { id: "d3-8", day: 3, time: "12:20 PM – 12:30 PM", activity: "Felicitation and Vote of Thanks", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning" },
    { id: "d3-9", day: 3, time: "12:30 PM – 12:45 PM", activity: "Movement of Students to Respective Hostels", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch" },
    { id: "d3-10", day: 3, time: "12:45 PM – 2:15 PM", activity: "Lunch", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch" },
    { id: "d3-11", day: 3, time: "2:15 PM – 2:30 PM", activity: "Movement of Students to Respective Venues", venue: "Respective Venues", coordinator: "Student Mentors", category: "afternoon" },
    { id: "d3-12", day: 3, time: "2:30 PM – 3:00 PM", activity: "Club Presentations Slot 5: Group A (Robotics in L-26), Group B (HEB in Aero Audi), Group C (EEB in L-27), Group D (SAASC in L-28), Group E (ACM in L-29), Group F (EIC in L-30), Group G (WEC in Auditorium), Group H (NCC in L-31)", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/I's of Club, Societies, Cells, NSS & NCC to coordinate and supervise.", category: "afternoon" },
    { id: "d3-13", day: 3, time: "3:00 PM – 3:30 PM", activity: "Club Presentations Slot 6: Group A (SCC in L-26), Group B (SAE in Aero Audi), Group C (PDC in L-27), Group D (SME in L-28), Group E (CIM in L-29), Group F (ASCE in L-30), Group G (Robotics in Auditorium), Group H (APC in L-31)", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/I's of Club, Societies, Cells, NSS & NCC to coordinate and supervise.", category: "afternoon" },
    { id: "d3-14", day: 3, time: "3:30 PM – 4:00 PM", activity: "Evening Snacks", venue: "Respective Venues / Campus", coordinator: "Organizing Committee", category: "afternoon" },
    { id: "d3-15", day: 3, time: "4:00 PM – 4:15 PM", activity: "Movement of Students to Respective Venues", venue: "Respective Venues", coordinator: "Student Mentors", category: "afternoon" },
    { id: "d3-16", day: 3, time: "4:15 PM – 5:45 PM", activity: "Parallel Evening Displays: Tech Display (T2 in Centenary Hall) | Sports (S2 in Athletic Ground) | Drams (A1 in Auditorium)", venue: "Centenary Hall / Athletic Ground / Auditorium", coordinator: "Respective P/I's of Club, Societies, Cells & Sports to supervise.", category: "afternoon", highlight: true },
  ],
};

interface ReportingBranch {
  name: string;
  code: string;
  group: string;
  venueName: string;
  building: string;
  floor: string;
  routeType: "audi" | "nab";
  gateDirections: string;
  studentsCount?: number;
  deptVisitVenue?: string;
}

const REPORTING_BRANCHES: ReportingBranch[] = [
  {
    name: "Computer Science & Engineering",
    code: "CSE",
    group: "Group A",
    venueName: "Main Auditorium",
    building: "Auditorium Complex",
    floor: "Ground Floor",
    routeType: "audi",
    gateDirections: "Enter Gate 2 -> Go straight through PEC Roundabout -> Turn RIGHT to Auditorium.",
    studentsCount: 137,
    deptVisitVenue: "Auditorium",
  },
  {
    name: "Electronics & Communication Engineering",
    code: "ECE",
    group: "Group B",
    venueName: "Main Auditorium",
    building: "Auditorium Complex",
    floor: "Ground Floor",
    routeType: "audi",
    gateDirections: "Enter Gate 2 -> Go straight through PEC Roundabout -> Turn RIGHT to Auditorium.",
    studentsCount: 137,
    deptVisitVenue: "Aero Auditorium",
  },
  {
    name: "VLSI Design & Technology",
    code: "VLSI",
    group: "Group C",
    venueName: "Main Auditorium",
    building: "Auditorium Complex",
    floor: "Ground Floor",
    routeType: "audi",
    gateDirections: "Enter Gate 2 -> Go straight through PEC Roundabout -> Turn RIGHT to Auditorium.",
    studentsCount: 36,
    deptVisitVenue: "Aero Auditorium",
  },
  {
    name: "Bachelor of Design (B.Design)",
    code: "B.Design",
    group: "Group C",
    venueName: "Lecture Hall L-26",
    building: "New Academic Block (NAB)",
    floor: "Ground Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 25,
    deptVisitVenue: "L-17",
  },
  {
    name: "Aerospace Engineering",
    code: "AERO",
    group: "Group C",
    venueName: "Lecture Hall L-26",
    building: "New Academic Block (NAB)",
    floor: "Ground Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 36,
    deptVisitVenue: "Seminar Hall, Aero Department",
  },
  {
    name: "Electrical Engineering",
    code: "Electrical",
    group: "Group D",
    venueName: "Lecture Hall L-27",
    building: "New Academic Block (NAB)",
    floor: "Ground Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 136,
    deptVisitVenue: "L-27",
  },
  {
    name: "Civil Engineering",
    code: "Civil",
    group: "Group E",
    venueName: "Lecture Hall L-28",
    building: "New Academic Block (NAB)",
    floor: "1st Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 136,
    deptVisitVenue: "L-26",
  },
  {
    name: "CSE (Artificial Intelligence)",
    code: "AI",
    group: "Group F",
    venueName: "Lecture Hall L-29",
    building: "New Academic Block (NAB)",
    floor: "1st Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 36,
    deptVisitVenue: "Auditorium",
  },
  {
    name: "CSE (Data Science)",
    code: "DS",
    group: "Group F",
    venueName: "Lecture Hall L-29",
    building: "New Academic Block (NAB)",
    floor: "1st Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 67,
    deptVisitVenue: "Auditorium",
  },
  {
    name: "Mathematics & Computing",
    code: "M&C",
    group: "Group F",
    venueName: "Lecture Hall L-29",
    building: "New Academic Block (NAB)",
    floor: "1st Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 36,
    deptVisitVenue: "Mathematics Lab near T5",
  },
  {
    name: "Mechanical Engineering",
    code: "Mechanical",
    group: "Group G",
    venueName: "Lecture Hall L-30",
    building: "New Academic Block (NAB)",
    floor: "2nd Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 137,
    deptVisitVenue: "L-28",
  },
  {
    name: "Materials & Metallurgical Engineering",
    code: "Metallurgy",
    group: "Group H",
    venueName: "Lecture Hall L-31",
    building: "New Academic Block (NAB)",
    floor: "2nd Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 69,
    deptVisitVenue: "Seminar Hall, MMED",
  },
  {
    name: "Production & Industrial Engineering",
    code: "Production",
    group: "Group H",
    venueName: "Lecture Hall L-31",
    building: "New Academic Block (NAB)",
    floor: "2nd Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 46,
    deptVisitVenue: "L-17",
  },
];

export const ORIENTATION_DAYS = [
  { day: 1, label: "Day 1", date: "19 Aug (Wed)", title: "Inaugural, Director Keynote & Dept Visits", status: "confirmed" },
  { day: 2, label: "Day 2", date: "20 Aug (Thu)", title: "Science HODs, Clubs (1–4), Tech/Sports/Music", status: "confirmed" },
  { day: 3, label: "Day 3", date: "21 Aug (Fri)", title: "SCC, Library, CDGC, Speaker Sessions, Clubs (5–6), Displays", status: "confirmed" },
  { day: 4, label: "Day 4", date: "22 Aug (Sat)", title: "Official Timetable Pending Announcement", status: "pending" },
  { day: 5, label: "Day 5", date: "23 Aug (Sun)", title: "Official Timetable Pending Announcement", status: "pending" },
  { day: 6, label: "Day 6", date: "24 Aug (Mon)", title: "Official Timetable Pending Announcement", status: "pending" },
  { day: 7, label: "Day 7", date: "25 Aug (Tue)", title: "Official Timetable Pending Announcement", status: "pending" },
];

export const ATTENDANCE_VENUES_BY_DAY: Record<string, Record<number, string>> = {
  CSE: { 1: "Auditorium", 2: "L-26", 3: "L-26", 4: "L-26", 5: "L-26", 6: "L-26", 7: "L-26" },
  ECE: { 1: "Auditorium", 2: "L-27", 3: "L-27", 4: "L-27", 5: "L-27", 6: "L-27", 7: "L-27" },
  VLSI: { 1: "Auditorium", 2: "L-28", 3: "L-28", 4: "L-28", 5: "L-28", 6: "L-28", 7: "L-28" },
  "B.Design": { 1: "L-26", 2: "L-28", 3: "L-28", 4: "L-28", 5: "L-28", 6: "L-28", 7: "L-28" },
  AERO: { 1: "L-26", 2: "L-28", 3: "L-28", 4: "L-28", 5: "L-28", 6: "L-28", 7: "L-28" },
  Electrical: { 1: "L-27", 2: "L-29", 3: "L-29", 4: "L-29", 5: "L-29", 6: "L-29", 7: "L-29" },
  Civil: { 1: "L-28", 2: "L-30", 3: "L-30", 4: "L-30", 5: "L-30", 6: "L-30", 7: "L-30" },
  AI: { 1: "L-29", 2: "L-31", 3: "L-31", 4: "L-31", 5: "L-31", 6: "L-31", 7: "L-31" },
  DS: { 1: "L-29", 2: "L-31", 3: "L-31", 4: "L-31", 5: "L-31", 6: "L-31", 7: "L-31" },
  "M&C": { 1: "L-29", 2: "L-31", 3: "L-31", 4: "L-31", 5: "L-31", 6: "L-31", 7: "L-31" },
  Mechanical: { 1: "L-30", 2: "Aero Audi", 3: "Aero Audi", 4: "Aero Audi", 5: "Aero Audi", 6: "Aero Audi", 7: "Aero Audi" },
  Metallurgy: { 1: "L-31", 2: "Auditorium", 3: "Auditorium", 4: "Auditorium", 5: "Auditorium", 6: "Auditorium", 7: "Auditorium" },
  Production: { 1: "L-31", 2: "Auditorium", 3: "Auditorium", 4: "Auditorium", 5: "Auditorium", 6: "Auditorium", 7: "Auditorium" },
};

export const SPECIAL_GROUPINGS = {
  tech: [
    { code: "T1", branches: ["CSE", "VLSI", "B.Design", "Production"], venue: "Centenary Hall" },
    { code: "T2", branches: ["AERO", "AI", "DS", "M&C", "Mechanical"], venue: "Centenary Hall" },
    { code: "T3", branches: ["ECE", "Civil"], venue: "Centenary Hall" },
    { code: "T4", branches: ["Electrical", "Metallurgy"], venue: "Centenary Hall" },
  ],
  sports: [
    { code: "S1", branches: ["ECE", "Civil"], venue: "Athletic Ground" },
    { code: "S2", branches: ["Electrical", "Metallurgy", "Production"], venue: "Athletic Ground" },
    { code: "S3", branches: ["CSE", "M&C", "Mechanical"], venue: "Athletic Ground" },
    { code: "S4", branches: ["VLSI", "B.Design", "AERO", "AI", "DS"], venue: "Athletic Ground" },
  ],
  cultural: [
    { code: "A1", branches: ["CSE", "ECE", "VLSI", "B.Design"], venue: "Auditorium" },
    { code: "A2", branches: ["Civil", "M&C", "Mechanical", "Production"], venue: "Auditorium" },
    { code: "A3", branches: ["AERO", "Electrical", "AI", "DS", "Metallurgy"], venue: "Auditorium" },
  ],
};

// ─── Main Component ─────────────────────────────────────────────────────────

function OrientationPage() {
  const [activeTab, setActiveTab] = useState<"all" | "venues" | "map" | "schedule">("all");
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedBranchCode, setSelectedBranchCode] = useState<string>("CSE");
  const [venueRouteTab, setVenueRouteTab] = useState<"audi" | "nab">("audi");
  const [scheduleCategory, setScheduleCategory] = useState<string>("all");
  const [scheduleSearch, setScheduleSearch] = useState("");
  const [activeAnnexure, setActiveAnnexure] = useState<"none" | "1" | "2" | "3" | "groupings">("none");
  const [allScheduleData, setAllScheduleData] = useState<Record<number, ScheduleEvent[]>>(SCHEDULE_DATA_BY_DAY);
  
  // Lightbox modal state
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  // Map interactive zoom state
  const [mapZoom, setMapZoom] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Fetch dynamic orientation content on mount
  useEffect(() => {
    fetchOrientationData()
      .then((data) => {
        if (data && Array.isArray(data.schedule) && data.schedule.length > 0) {
          const grouped: Record<number, ScheduleEvent[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
          data.schedule.forEach((item) => {
            if (!item) return;
            const d = Number((item as any).day || (item as any).day_number) || 1;
            if (!grouped[d]) grouped[d] = [];
            grouped[d].push({
              id: String(item.id || Math.random()),
              day: d,
              time: item.time_slot || item.time || "",
              activity: item.activity || "",
              venue: item.venue || "",
              coordinator: item.coordinator || undefined,
              category: (item.category as any) || "morning",
            });
          });

          // If valid day 1 items exist, set state
          if (grouped[1] && grouped[1].length > 0) {
            setAllScheduleData(grouped);
          }
        }
      })
      .catch((err) => {
        console.warn("Orientation API fetch failed:", err);
      });
  }, []);

  const selectedBranch = useMemo(() => {
    return (
      REPORTING_BRANCHES.find((b) => b.code === selectedBranchCode) ||
      REPORTING_BRANCHES[0]
    );
  }, [selectedBranchCode]);

  const currentDayEvents = useMemo(() => {
    const list = allScheduleData[selectedDay] || SCHEDULE_DATA_BY_DAY[selectedDay] || [];
    return Array.isArray(list) && list.length > 0 ? list : SCHEDULE_DATA_BY_DAY[selectedDay] || [];
  }, [allScheduleData, selectedDay]);

  const filteredSchedule = useMemo(() => {
    const query = (scheduleSearch || "").trim().toLowerCase();
    return currentDayEvents.filter((item) => {
      if (!item) return false;
      const matchCategory =
        scheduleCategory === "all" || item.category === scheduleCategory;
      const matchSearch =
        query === "" ||
        Boolean(item.activity && String(item.activity).toLowerCase().includes(query)) ||
        Boolean(item.venue && String(item.venue).toLowerCase().includes(query)) ||
        Boolean(item.coordinator && String(item.coordinator).toLowerCase().includes(query)) ||
        Boolean(item.time && String(item.time).toLowerCase().includes(query));
      return matchCategory && matchSearch;
    });
  }, [currentDayEvents, scheduleCategory, scheduleSearch]);

  const handleZoomIn = () => setMapZoom((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setMapZoom((prev) => Math.max(prev - 0.3, 0.8));
  const handleResetZoom = () => {
    setMapZoom(1);
    setMapPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMapPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="min-h-screen w-full bg-background pb-20 text-foreground overflow-x-hidden">
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between pb-3 text-white">
              <h3 className="text-sm font-semibold tracking-wide flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                {lightboxImage.title}
              </h3>
              <button
                onClick={() => setLightboxImage(null)}
                className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="w-full overflow-auto rounded-2xl border border-white/10 bg-black/50 p-2 flex items-center justify-center">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[80vh] w-auto rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative border-b border-border/80 bg-gradient-to-b from-primary/10 via-surface to-background px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Official Freshers Orientation 2026 – 2030
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                PEC Orientation Schedule & Campus Navigator
              </h1>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">
                Complete 7-Day interactive schedule (19th – 25th August 2026), branch reporting venues, campus maps, and official annexures.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() =>
                  setLightboxImage({
                    src: "/orientation/pec-orientation-map.png",
                    title: "PEC Orientation 2026 Full Campus Map",
                  })
                }
                className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold hover:bg-surface-elevated transition shadow-sm"
              >
                <Maximize2 className="h-4 w-4 text-primary" />
                <span>View Full Map</span>
              </button>
              <a
                href="#day-schedule"
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition shadow-sm glow-primary"
              >
                <Calendar className="h-4 w-4" />
                <span>7-Day Schedule</span>
              </a>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "all", label: "Full Overview", icon: Layers },
              { id: "venues", label: "Reporting Venues & Routes", icon: Building },
              { id: "map", label: "Interactive Campus Map", icon: MapPin },
              { id: "schedule", label: "Day-by-Day Schedule (7 Days)", icon: Clock },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border/80 bg-surface/60 text-muted-foreground hover:bg-surface hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-8 py-8 space-y-12">
        {/* ─── SECTION 1: REPORTING VENUES & HOW TO REACH (2 ROUTE PHOTOS) ─── */}
        {(activeTab === "all" || activeTab === "venues") && (
          <section id="reporting-venues" className="space-y-8 animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-500">
                    <Building className="h-4 w-4" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Day 1 Reporting Venues & How to Reach</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Mandatory attendance reporting at <strong>8:30 AM – 9:30 AM</strong> on Wednesday, 19th August 2026.
                </p>
              </div>

              {/* Branch Selector Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="branch-select" className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                  Select Your Branch:
                </label>
                <select
                  id="branch-select"
                  value={selectedBranchCode}
                  onChange={(e) => {
                    setSelectedBranchCode(e.target.value);
                    const b = REPORTING_BRANCHES.find((item) => item.code === e.target.value);
                    if (b) setVenueRouteTab(b.routeType);
                  }}
                  className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 shadow-sm"
                >
                  {REPORTING_BRANCHES.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.code} — {b.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Personalized Branch Fast Card */}
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface to-background p-5 sm:p-6 shadow-md relative overflow-hidden space-y-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border/60 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm">
                      {selectedBranch.code}
                    </span>
                    <span className="rounded-lg bg-surface border border-border px-2.5 py-1 text-xs font-mono font-semibold text-muted-foreground">
                      {selectedBranch.group}
                    </span>
                    {selectedBranch.studentsCount && (
                      <span className="rounded-lg bg-surface border border-border px-2.5 py-1 text-xs font-mono font-semibold text-muted-foreground">
                        {selectedBranch.studentsCount} Students
                      </span>
                    )}
                    <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-500">
                      Day 1 Reporting: 8:30 AM – 9:30 AM
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground mt-2">
                    {selectedBranch.name}
                  </h3>
                </div>

                <div className="text-left lg:text-right">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                    Day 1 Morning Venue
                  </span>
                  <strong className="text-xl font-extrabold text-primary font-mono block mt-0.5">
                    {ATTENDANCE_VENUES_BY_DAY[selectedBranch.code]?.[1] || selectedBranch.venueName}
                  </strong>
                  <span className="text-xs text-muted-foreground">
                    {selectedBranch.building} ({selectedBranch.floor})
                  </span>
                </div>
              </div>

              {/* Day-by-Day Morning Attendance Plan (Annexure 1) */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                  7-Day Morning Attendance Plan (Annexure 1):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <div
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      className={`cursor-pointer rounded-xl border p-2 text-xs transition ${
                        selectedDay === d
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border bg-surface-elevated/50 hover:border-primary/40"
                      }`}
                    >
                      <span className="text-[10px] font-bold text-muted-foreground block">Day {d}</span>
                      <span className="font-semibold text-foreground truncate block font-mono">
                        {ATTENDANCE_VENUES_BY_DAY[selectedBranch.code]?.[d] || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gate 2 Turn-by-Turn Navigation */}
              <div className="rounded-2xl border border-border bg-surface/80 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Navigation className="h-4 w-4 text-emerald-500" />
                  <span>Turn-by-Turn Directions from Gate 2 (Main Campus Gate):</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedBranch.gateDirections}
                </p>
              </div>

              {/* Dept Visit Venue */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                <span className="text-muted-foreground">Day 1 Department Visit (2:00 PM – 4:00 PM):</span>
                <span className="font-semibold text-foreground bg-surface border border-border px-3 py-1 rounded-lg">
                  {selectedBranch.deptVisitVenue || "Respective Department"}
                </span>
              </div>
            </div>

            {/* ─── DUAL PHOTO DISPLAY: AUDITORIUM & NAB HOW TO REACH ─── */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>How to Reach Reporting Buildings (Visual Route Maps)</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Switch between the Auditorium and NAB routes to view the official photographic directions from Gate 2.
                  </p>
                </div>

                {/* Route Switcher Tabs */}
                <div className="flex rounded-xl border border-border bg-surface p-1 self-start sm:self-auto">
                  <button
                    onClick={() => setVenueRouteTab("audi")}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                      venueRouteTab === "audi"
                        ? "bg-primary text-primary-foreground shadow-sm glow-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Auditorium Route (CSE, ECE, VLSI)
                  </button>
                  <button
                    onClick={() => setVenueRouteTab("nab")}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                      venueRouteTab === "nab"
                        ? "bg-primary text-primary-foreground shadow-sm glow-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    NAB Route (Aero, Elec, Civil, AI, DS, Mech, etc.)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left 7 cols: Image Display Card with Lightbox Trigger */}
                <div className="lg:col-span-7 rounded-3xl border border-border bg-surface/50 overflow-hidden shadow-xl group">
                  <div className="relative">
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        onClick={() =>
                          setLightboxImage({
                            src:
                              venueRouteTab === "audi"
                                ? "/orientation/reporting-venue-audi.png"
                                : "/orientation/reporting-venue-nab.png",
                            title:
                              venueRouteTab === "audi"
                                ? "Auditorium Reporting Route Map"
                                : "New Academic Block (NAB) Reporting Route Map",
                          })
                        }
                        className="flex items-center gap-1.5 rounded-xl bg-black/70 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white hover:bg-black/90 transition shadow-md"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                        <span>Expand / Zoom</span>
                      </button>
                    </div>

                    <img
                      src={
                        venueRouteTab === "audi"
                          ? "/orientation/reporting-venue-audi.png"
                          : "/orientation/reporting-venue-nab.png"
                      }
                      alt={
                        venueRouteTab === "audi"
                          ? "Reporting on Day 1 for CSE, ECE, VLSI"
                          : "Reporting on Day 1 for NAB Branches"
                      }
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01] cursor-pointer"
                      onClick={() =>
                        setLightboxImage({
                          src:
                            venueRouteTab === "audi"
                              ? "/orientation/reporting-venue-audi.png"
                              : "/orientation/reporting-venue-nab.png",
                          title:
                            venueRouteTab === "audi"
                              ? "Auditorium Reporting Route Map"
                              : "New Academic Block (NAB) Reporting Route Map",
                        })
                      }
                    />
                  </div>

                  <div className="border-t border-border/60 bg-surface px-4 py-3 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-medium text-foreground">
                      {venueRouteTab === "audi"
                        ? "📌 Route: Enter Gate 2 ➔ PEC Roundabout ➔ Turn RIGHT to Auditorium"
                        : "📌 Route: Enter Gate 2 ➔ Roundabout ➔ Go past Library ➔ Turn RIGHT past CSRC & Nescafe to NAB"}
                    </span>
                    <span className="text-[11px] font-mono text-primary shrink-0">Tap image to zoom in modal</span>
                  </div>
                </div>

                {/* Right 5 cols: Structured Venue Breakdown */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-3xl border border-border bg-surface p-5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <h4 className="text-sm font-bold tracking-tight flex items-center gap-2">
                        <Building className="h-4 w-4 text-primary" />
                        <span>
                          {venueRouteTab === "audi"
                            ? "Auditorium Venue Breakdown"
                            : "New Academic Block (NAB) Floor Guide"}
                        </span>
                      </h4>
                      <span className="text-[10px] font-mono uppercase bg-surface-elevated px-2 py-0.5 rounded border border-border text-primary font-bold">
                        {venueRouteTab === "audi" ? "3 Branches" : "10 Branches"}
                      </span>
                    </div>

                    {venueRouteTab === "audi" ? (
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-primary">Main Auditorium</span>
                            <span className="text-[10px] font-mono bg-primary/20 text-primary px-2 py-0.5 rounded font-semibold">
                              Stage & Main Seating
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Primary reporting hall for <strong>CSE (Group A)</strong>, <strong>ECE (Group B)</strong>, and <strong>VLSI (Group C)</strong>.
                          </p>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
                            <div>
                              <strong className="text-foreground block">Computer Science (CSE)</strong>
                              <span className="text-[11px] text-muted-foreground">Group A · 137 Students</span>
                            </div>
                            <span className="font-mono text-primary font-bold">Ground Floor</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
                            <div>
                              <strong className="text-foreground block">Electronics & Comm (ECE)</strong>
                              <span className="text-[11px] text-muted-foreground">Group B · 137 Students</span>
                            </div>
                            <span className="font-mono text-primary font-bold">Ground Floor</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
                            <div>
                              <strong className="text-foreground block">VLSI Design & Technology</strong>
                              <span className="text-[11px] text-muted-foreground">Group C · 36 Students</span>
                            </div>
                            <span className="font-mono text-primary font-bold">Ground Floor</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-xs">
                        <div className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between">
                          <div>
                            <strong className="text-foreground block">Lecture Hall L-26</strong>
                            <span className="text-[11px] text-muted-foreground">B.Design (25) & Aerospace (36)</span>
                          </div>
                          <span className="font-mono text-primary font-bold">Ground Floor</span>
                        </div>
                        <div className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between">
                          <div>
                            <strong className="text-foreground block">Lecture Hall L-27</strong>
                            <span className="text-[11px] text-muted-foreground">Electrical Engineering (136)</span>
                          </div>
                          <span className="font-mono text-primary font-bold">Ground Floor</span>
                        </div>
                        <div className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between">
                          <div>
                            <strong className="text-foreground block">Lecture Hall L-28</strong>
                            <span className="text-[11px] text-muted-foreground">Civil Engineering (136)</span>
                          </div>
                          <span className="font-mono text-primary font-bold">1st Floor</span>
                        </div>
                        <div className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between">
                          <div>
                            <strong className="text-foreground block">Lecture Hall L-29</strong>
                            <span className="text-[11px] text-muted-foreground">AI (36), DS (67), M&C (36)</span>
                          </div>
                          <span className="font-mono text-primary font-bold">1st Floor</span>
                        </div>
                        <div className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between">
                          <div>
                            <strong className="text-foreground block">Lecture Hall L-30</strong>
                            <span className="text-[11px] text-muted-foreground">Mechanical Engineering (137)</span>
                          </div>
                          <span className="font-mono text-primary font-bold">2nd Floor</span>
                        </div>
                        <div className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between">
                          <div>
                            <strong className="text-foreground block">Lecture Hall L-31</strong>
                            <span className="text-[11px] text-muted-foreground">Metallurgy (69) & Production (46)</span>
                          </div>
                          <span className="font-mono text-primary font-bold">2nd Floor</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── SECTION 2: INTERACTIVE CAMPUS MAP ───────────────────────── */}
        {(activeTab === "all" || activeTab === "map") && (
          <section id="campus-map" className="space-y-4 animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Orientation Campus Map</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Pinch or drag to zoom and pan. Inspect high resolution layout of Auditorium, NAB, Library, and Hostels.
                </p>
              </div>

              {/* Map Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomIn}
                  className="rounded-lg border border-border bg-surface p-2 hover:bg-surface-elevated transition"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="rounded-lg border border-border bg-surface p-2 hover:bg-surface-elevated transition"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="rounded-lg border border-border bg-surface p-2 hover:bg-surface-elevated transition"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setLightboxImage({
                      src: "/orientation/pec-orientation-map.png",
                      title: "PEC Chandigarh — Orientation Master Campus Map",
                    })
                  }
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-sm glow-primary hover:opacity-90 transition"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Lightbox</span>
                </button>
              </div>
            </div>

            {/* Zoomable Map Card */}
            <div className="relative rounded-3xl border border-border bg-black/40 overflow-hidden shadow-2xl">
              <div
                className="relative w-full h-[380px] sm:h-[500px] overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src="/orientation/pec-orientation-map.png"
                  alt="Punjab Engineering College Orientation Map"
                  style={{
                    transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapZoom})`,
                    transition: isDragging ? "none" : "transform 0.15s ease-out",
                  }}
                  className="max-w-none w-full h-auto object-contain select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
          </section>
        )}

        {/* ─── SECTION 3: 7-DAY STRUCTURED TIMELINE & SCHEDULE ─────────── */}
        {(activeTab === "all" || activeTab === "schedule") && (
          <section id="day-schedule" className="space-y-6 animate-fade-up">
            <div className="flex flex-col gap-4 border-b border-border/60 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Clock className="h-4 w-4" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">
                      Day {selectedDay} Schedule — {ORIENTATION_DAYS.find((d) => d.day === selectedDay)?.date}
                    </h2>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {ORIENTATION_DAYS.find((d) => d.day === selectedDay)?.title}
                  </p>
                </div>

                {/* Schedule Search & Category Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={scheduleSearch}
                      onChange={(e) => setScheduleSearch(e.target.value)}
                      placeholder="Search event, venue..."
                      className="w-48 sm:w-60 rounded-xl border border-border bg-surface py-2 pl-9 pr-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                    />
                    {scheduleSearch && (
                      <button
                        onClick={() => setScheduleSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex rounded-xl border border-border bg-surface p-1">
                    {[
                      { id: "all", label: "All" },
                      { id: "morning", label: "Morning" },
                      { id: "inaugural", label: "Inaugural" },
                      { id: "lunch", label: "Lunch" },
                      { id: "afternoon", label: "Afternoon" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setScheduleCategory(cat.id)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                          scheduleCategory === cat.id
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 7-DAY TABS SELECTOR */}
              <div className="flex overflow-x-auto gap-2 py-1 scrollbar-none">
                {ORIENTATION_DAYS.map((item) => (
                  <button
                    key={item.day}
                    onClick={() => setSelectedDay(item.day)}
                    className={`shrink-0 rounded-2xl px-4 py-2.5 text-left border transition relative ${
                      selectedDay === item.day
                        ? "border-primary bg-primary text-primary-foreground shadow-md glow-primary"
                        : "border-border/80 bg-surface/70 text-muted-foreground hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold opacity-80 block">
                        {item.label}
                      </span>
                      {item.day > 3 && (
                        <span
                          className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-md ${
                            selectedDay === item.day
                              ? "bg-white/20 text-white"
                              : "bg-amber-500/15 text-amber-500 border border-amber-500/20"
                          }`}
                        >
                          Pending
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-extrabold block">
                      {item.date}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* If Day 4 to 7 is selected: Show Official Announcement Pending notice */}
            {selectedDay > 3 ? (
              <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-surface to-background p-8 sm:p-10 text-center space-y-4 shadow-lg animate-in fade-in duration-200">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-amber-500/20 text-amber-500 shadow-inner mx-auto">
                  <Clock className="h-8 w-8" />
                </div>
                <div className="space-y-2 max-w-lg mx-auto">
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground">
                    Day {selectedDay} Schedule Pending Official Announcement
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Further days timetable will be uploaded after official announcement by college administration.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/15 px-4 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    Days 1 – 3 Schedules Confirmed
                  </div>
                  <button
                    onClick={() => setSelectedDay(1)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-foreground hover:bg-surface-elevated transition"
                  >
                    View Day 1 Schedule &rarr;
                  </button>
                </div>
              </div>
            ) : (
              /* Schedule Table Component for Confirmed Days (Days 1 to 3) */
              <div className="rounded-2xl border border-border glass overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-border bg-surface-elevated/70 text-[11px] uppercase font-bold text-muted-foreground tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4 sm:px-6 w-36 sm:w-44">Time</th>
                        <th className="py-3.5 px-4 sm:px-6">Activity / Event</th>
                        <th className="py-3.5 px-4 sm:px-6 w-44 sm:w-56">Venue</th>
                        <th className="py-3.5 px-4 sm:px-6 w-48 sm:w-64">Coordinator / Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredSchedule.map((item) => (
                        <tr
                          key={item.id}
                          className={`transition hover:bg-surface-elevated/50 ${
                            item.highlight ? "bg-primary/5 font-medium" : ""
                          }`}
                        >
                          {/* Time */}
                          <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-primary whitespace-nowrap align-top">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                              <span>{item.time}</span>
                            </div>
                          </td>

                          {/* Activity */}
                          <td className="py-3.5 px-4 sm:px-6 align-top">
                            <div className="font-semibold text-foreground text-sm">
                              {item.activity}
                            </div>
                          </td>

                          {/* Venue */}
                          <td className="py-3.5 px-4 sm:px-6 align-top">
                            <span className="inline-flex items-center gap-1 font-medium text-foreground bg-surface border border-border/80 px-2 py-1 rounded-lg">
                              <MapPin className="h-3 w-3 text-amber-500 shrink-0" />
                              <span>{item.venue}</span>
                            </span>
                          </td>

                          {/* Coordinator / Details */}
                          <td className="py-3.5 px-4 sm:px-6 text-muted-foreground align-top">
                            {item.coordinator ? (
                              <span className="font-medium text-foreground block">
                                {item.coordinator}
                              </span>
                            ) : (
                              <span className="text-muted-foreground/60">—</span>
                            )}
                          </td>
                        </tr>
                      ))}

                      {filteredSchedule.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-muted-foreground">
                            No schedule items matched your search query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Annexures Interactive Accordions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold tracking-tight flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Official Annexures & Activity Groups
                </h3>
                <span className="text-xs text-muted-foreground">Click any card to inspect full details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Annexure 1 */}
                <div
                  onClick={() => setActiveAnnexure(activeAnnexure === "1" ? "none" : "1")}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    activeAnnexure === "1"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-surface hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-primary/20 text-xs font-bold text-primary">
                      1
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        activeAnnexure === "1" ? "rotate-90 text-primary" : ""
                      }`}
                    />
                  </div>
                  <strong className="text-xs font-bold text-foreground block mt-2">
                    Annexure 1: Attendance
                  </strong>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Day 1 to Day 7 seating plan for all 13 branches.
                  </p>
                </div>

                {/* Annexure 2 */}
                <div
                  onClick={() => setActiveAnnexure(activeAnnexure === "2" ? "none" : "2")}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    activeAnnexure === "2"
                      ? "border-emerald-500 bg-emerald-500/5 shadow-md"
                      : "border-border bg-surface hover:border-emerald-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-500/20 text-xs font-bold text-emerald-500">
                      2
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        activeAnnexure === "2" ? "rotate-90 text-emerald-500" : ""
                      }`}
                    />
                  </div>
                  <strong className="text-xs font-bold text-foreground block mt-2">
                    Annexure 2: Lunch Plan
                  </strong>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Centenary Hall, Shivalik Hostel & Kalpana Chawla Hostel.
                  </p>
                </div>

                {/* Annexure 3 */}
                <div
                  onClick={() => setActiveAnnexure(activeAnnexure === "3" ? "none" : "3")}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    activeAnnexure === "3"
                      ? "border-amber-500 bg-amber-500/5 shadow-md"
                      : "border-border bg-surface hover:border-amber-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-amber-500/20 text-xs font-bold text-amber-500">
                      3
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        activeAnnexure === "3" ? "rotate-90 text-amber-500" : ""
                      }`}
                    />
                  </div>
                  <strong className="text-xs font-bold text-foreground block mt-2">
                    Annexure 3: Dept Visits
                  </strong>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Day 1 department lab venues & student counts.
                  </p>
                </div>

                {/* Activity Groups */}
                <div
                  onClick={() => setActiveAnnexure(activeAnnexure === "groupings" ? "none" : "groupings")}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    activeAnnexure === "groupings"
                      ? "border-violet-500 bg-violet-500/5 shadow-md"
                      : "border-border bg-surface hover:border-violet-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-violet-500/20 text-xs font-bold text-violet-400">
                      ★
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        activeAnnexure === "groupings" ? "rotate-90 text-violet-400" : ""
                      }`}
                    />
                  </div>
                  <strong className="text-xs font-bold text-foreground block mt-2">
                    Tech, Sports & Culture
                  </strong>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    T1–T4, S1–S4, and A1–A3 group distributions.
                  </p>
                </div>
              </div>

              {/* Annexure 1 Details Panel */}
              {activeAnnexure === "1" && (
                <div className="rounded-3xl border border-primary/20 bg-surface/90 p-6 space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Annexure 1: Daily Morning Attendance Venues for all 13 Branches</span>
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-border/80 rounded-xl overflow-hidden">
                      <thead className="bg-surface-elevated text-muted-foreground uppercase font-bold text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3">Branch</th>
                          <th className="py-2.5 px-3">Group</th>
                          <th className="py-2.5 px-3">Day 1 (19th)</th>
                          <th className="py-2.5 px-3">Day 2 (20th)</th>
                          <th className="py-2.5 px-3">Day 3 (21st)</th>
                          <th className="py-2.5 px-3">Day 4 (22nd)</th>
                          <th className="py-2.5 px-3">Day 5 (23rd)</th>
                          <th className="py-2.5 px-3">Day 6 (24th)</th>
                          <th className="py-2.5 px-3">Day 7 (25th)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {REPORTING_BRANCHES.map((b) => (
                          <tr key={b.code} className="hover:bg-surface-elevated/40">
                            <td className="py-2 px-3 font-semibold text-foreground">{b.name}</td>
                            <td className="py-2 px-3 font-mono text-primary">{b.group}</td>
                            <td className="py-2 px-3 font-mono">{ATTENDANCE_VENUES_BY_DAY[b.code]?.[1]}</td>
                            <td className="py-2 px-3 font-mono">{ATTENDANCE_VENUES_BY_DAY[b.code]?.[2]}</td>
                            <td className="py-2 px-3 font-mono">{ATTENDANCE_VENUES_BY_DAY[b.code]?.[3]}</td>
                            <td className="py-2 px-3 font-mono">{ATTENDANCE_VENUES_BY_DAY[b.code]?.[4]}</td>
                            <td className="py-2 px-3 font-mono">{ATTENDANCE_VENUES_BY_DAY[b.code]?.[5]}</td>
                            <td className="py-2 px-3 font-mono">{ATTENDANCE_VENUES_BY_DAY[b.code]?.[6]}</td>
                            <td className="py-2 px-3 font-mono">{ATTENDANCE_VENUES_BY_DAY[b.code]?.[7]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Annexure 2 Details Panel */}
              {activeAnnexure === "2" && (
                <div className="rounded-3xl border border-emerald-500/20 bg-surface/90 p-6 space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-sm font-bold text-emerald-500 flex items-center gap-2">
                    <Utensils className="h-4 w-4" />
                    <span>Annexure 2: Lunch Group Distribution Rules</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="rounded-2xl border border-border bg-surface p-4 space-y-2">
                      <span className="font-bold text-foreground block">Day Scholars (Boys & Girls):</span>
                      <p className="text-muted-foreground leading-relaxed">
                        • <strong>Centenary Hall</strong> (Directly across from Central Library).
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-surface p-4 space-y-2">
                      <span className="font-bold text-foreground block">Hostellers:</span>
                      <p className="text-muted-foreground leading-relaxed">
                        • <strong>All Girls</strong>: Kalpana Chawla (KC) Hostel Dining Hall.<br />
                        • <strong>All Hosteller Boys</strong>: Shivalik Hostel Dining Hall.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Annexure 3 Details Panel */}
              {activeAnnexure === "3" && (
                <div className="rounded-3xl border border-amber-500/20 bg-surface/90 p-6 space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-sm font-bold text-amber-500 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Annexure 3: Department Visits (Day 1 at 2:00 PM) & Student Capacities</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    {REPORTING_BRANCHES.map((b) => (
                      <div key={b.code} className="rounded-xl border border-border bg-surface p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-foreground">{b.name}</strong>
                          <span className="text-[11px] font-mono text-muted-foreground">{b.studentsCount} Students</span>
                        </div>
                        <p className="text-primary font-medium text-[11px]">
                          Venue: {b.deptVisitVenue || "Respective Dept"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Groupings Panel */}
              {activeAnnexure === "groupings" && (
                <div className="rounded-3xl border border-violet-500/20 bg-surface/90 p-6 space-y-6 animate-in fade-in duration-200">
                  <h4 className="text-sm font-bold text-violet-400 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Official Activity Groups for Tech Displays, Sports, and Cultural Shows</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Tech Displays */}
                    <div className="rounded-2xl border border-border bg-surface p-4 space-y-2">
                      <span className="font-bold text-foreground uppercase tracking-wider text-[11px] block text-primary">
                        Technical Display (Centenary Hall)
                      </span>
                      {SPECIAL_GROUPINGS.tech.map((g) => (
                        <div key={g.code} className="flex justify-between border-b border-border/40 py-1 text-[11px]">
                          <strong>{g.code}</strong>
                          <span className="text-muted-foreground">{g.branches.join(", ")}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sports */}
                    <div className="rounded-2xl border border-border bg-surface p-4 space-y-2">
                      <span className="font-bold text-foreground uppercase tracking-wider text-[11px] block text-emerald-400">
                        Sports (Athletics Ground)
                      </span>
                      {SPECIAL_GROUPINGS.sports.map((g) => (
                        <div key={g.code} className="flex justify-between border-b border-border/40 py-1 text-[11px]">
                          <strong>{g.code}</strong>
                          <span className="text-muted-foreground">{g.branches.join(", ")}</span>
                        </div>
                      ))}
                    </div>

                    {/* Cultural / PEB / Music */}
                    <div className="rounded-2xl border border-border bg-surface p-4 space-y-2">
                      <span className="font-bold text-foreground uppercase tracking-wider text-[11px] block text-amber-400">
                        Cultural / PEB / Music (Auditorium)
                      </span>
                      {SPECIAL_GROUPINGS.cultural.map((g) => (
                        <div key={g.code} className="flex justify-between border-b border-border/40 py-1 text-[11px]">
                          <strong>{g.code}</strong>
                          <span className="text-muted-foreground">{g.branches.join(", ")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
