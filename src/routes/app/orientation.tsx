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
    { id: "d1-11", day: 1, time: "12:05 PM – 12:30 PM", activity: "Dispersal Of Students to Respective Hostels", venue: "Campus / Hostels", coordinator: "Prof. Amandeep Kaur", category: "lunch" },
    { id: "d1-12", day: 1, time: "12:30 PM – 1:45 PM", activity: "Lunch (Annexure 2)", venue: "Annexure 2 Venues (Centenary Hall / Shivalik / KC Hostel)", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch", highlight: true, notes: "All Girls at KC Hostel. Hosteller Boys at Shivalik Hostel. Day Scholars at Centenary Hall." },
    { id: "d1-13", day: 1, time: "1:45 PM – 1:55 PM", activity: "PEC Heritage Documentary", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon" },
    { id: "d1-14", day: 1, time: "1:55 PM – 2:00 PM", activity: "Introduction to Honorable Professor Rajeev Ahuja, Director, IIT Ropar", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon" },
    { id: "d1-15", day: 1, time: "2:00 PM – 3:00 PM", activity: "Address By Professor Rajeev Ahuja (Director, IIT Ropar)", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon", highlight: true },
    { id: "d1-16", day: 1, time: "3:00 PM – 3:10 PM", activity: "Felicitation Ceremony", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon" },
    { id: "d1-17", day: 1, time: "3:10 PM – 3:15 PM", activity: "Vote of Thanks", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon" },
    { id: "d1-18", day: 1, time: "3:30 PM – 4:30 PM", activity: "Department Visit(s) (Address by Respective HOD, Interaction With Faculty & Lab Visit)", venue: "Annexure 3 Locations", coordinator: "Address by Respective HOD, Faculty, Department Lab Incharges", category: "afternoon", highlight: true },
    { id: "d1-19", day: 1, time: "4:30 PM – 5:00 PM", activity: "Refreshments & SNACKS", venue: "Annexure 3 Locations", coordinator: "Organizing Committee", category: "afternoon" },
    { id: "d1-20", day: 1, time: "5:00 PM – 5:30 PM", activity: "Institute Campus Tour", venue: "Campus Grounds & Key Buildings", coordinator: "Student Branch Incharges & Discipline Incharges", category: "afternoon" },
  ],
  2: [
    { id: "d2-1", day: 2, time: "8:45 AM – 9:15 AM", activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 2)", venue: "Annexure 1 (Day 2)", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", highlight: true },
    { id: "d2-2", day: 2, time: "9:15 AM – 9:25 AM", activity: "Address by Head, Physics Department", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-3", day: 2, time: "9:25 AM – 9:35 AM", activity: "Address by Head, Chemistry Department", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-4", day: 2, time: "9:35 AM – 9:45 AM", activity: "Address by Head, Mathematics Department", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-5", day: 2, time: "9:45 AM – 9:55 AM", activity: "Address by Head, Centre for Management & Humanities (CMH)", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-6", day: 2, time: "9:55 AM – 10:40 AM", activity: "Distinguished Speaker Session", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", highlight: true },
    { id: "d2-7", day: 2, time: "10:40 AM – 10:55 AM", activity: "Address by ADSA (Cultural Activities)", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-8", day: 2, time: "10:55 AM – 11:10 AM", activity: "Address by ADSA (Technical Societies)", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-9", day: 2, time: "11:10 AM – 11:30 AM", activity: "Address by ADSA Hostels & Anti-Ragging Awareness Session", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", highlight: true },
    { id: "d2-10", day: 2, time: "11:30 AM – 11:40 AM", activity: "Introduction to P/Is Clubs, Technical Societies, Cells & Wardens", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-11", day: 2, time: "11:40 AM – 11:45 AM", activity: "Vote of Thanks", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning" },
    { id: "d2-12", day: 2, time: "11:45 AM – 12:15 PM", activity: "Club Presentations Slot 1 (A: HEB [L-26], B: EEB [L-27], C: SAASC [L-28], D: ACM [L-29], E: PDC [Audi], F: WEC [Aero Audi], G: NCC [L-30], H: Robotics [L-31])", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/Is of Club, Societies, Cells, NSS & NCC", category: "afternoon" },
    { id: "d2-13", day: 2, time: "12:15 PM – 12:45 PM", activity: "Club Presentations Slot 2 (A: SAE [L-26], B: ASCE [L-27], C: SME [L-28], D: CIM [L-29], E: EEB [Audi], F: ASME [Aero Audi], G: APC [L-30], H: SESI [L-31])", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/Is of Club, Societies, Cells, NSS & NCC", category: "afternoon" },
    { id: "d2-14", day: 2, time: "12:45 PM – 2:15 PM", activity: "Lunch", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch" },
    { id: "d2-15", day: 2, time: "2:15 PM – 2:30 PM", activity: "Movement of Students", venue: "Respective Venues", coordinator: "Student Mentors", category: "afternoon" },
    { id: "d2-16", day: 2, time: "2:30 PM – 3:00 PM", activity: "Club Presentations Slot 3 (A: Rotaract [L-26], B: ELC [L-27], C: ASPS [L-28], D: ATS [L-29], E: IIM [Audi], F: IEEE [Aero Audi], G: NSS [L-30], H: IGS [L-31])", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/Is of Club, Societies, Cells, NSS & NCC", category: "afternoon" },
    { id: "d2-17", day: 2, time: "3:00 PM – 3:30 PM", activity: "Club Presentations Slot 4 (A: ELC [L-26], B: ASPS [L-27], C: ATS [L-28], D: IIM [L-29], E: IEEE [Audi], F: NSS [Aero Audi], G: IGS [L-30], H: ES [L-31])", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/Is of Club, Societies, Cells, NSS & NCC", category: "afternoon" },
    { id: "d2-18", day: 2, time: "3:30 PM – 4:00 PM", activity: "Evening Refreshments & Snacks", venue: "Campus / Respective Venues", coordinator: "Organizing Committee", category: "afternoon" },
    { id: "d2-19", day: 2, time: "4:00 PM – 4:15 PM", activity: "Movement of Students to Display Venues", venue: "Respective Venues", coordinator: "Student Mentors", category: "afternoon" },
    { id: "d2-20", day: 2, time: "4:15 PM – 5:45 PM", activity: "Parallel Evening Displays: Technical Display (T1 in Centenary Hall) | Sports (S1 in Athletic Ground) | Music (A3 in Auditorium)", venue: "Centenary Hall / Athletic Ground / Auditorium", coordinator: "Respective P/Is of Club, Societies, Cells & Sports", category: "afternoon", highlight: true },
  ],
  3: [
    { id: "d3-1", day: 3, time: "8:30 AM – 9:15 AM", activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 3)", venue: "Annexure 1 (Day 3)", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", highlight: true },
    { id: "d3-2", day: 3, time: "9:15 AM – 9:30 AM", activity: "Address by Head, Student Counselling Cell (SCC)", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning" },
    { id: "d3-3", day: 3, time: "9:30 AM – 9:45 AM", activity: "Address By Head, Alumni Relations", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning" },
    { id: "d3-4", day: 3, time: "9:45 AM – 10:00 AM", activity: "Address by Head, Central Library", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning" },
    { id: "d3-5", day: 3, time: "10:00 AM – 10:20 AM", activity: "Address by Head, Career Development & Guidance Centre (CDGC)", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning", highlight: true },
    { id: "d3-6", day: 3, time: "10:20 AM – 11:20 AM", activity: "Guest Speaker Session 1", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning" },
    { id: "d3-7", day: 3, time: "11:20 AM – 12:20 PM", activity: "Guest Speaker Session 2", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning" },
    { id: "d3-8", day: 3, time: "12:20 PM – 12:30 PM", activity: "Felicitation and Vote of Thanks", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning" },
    { id: "d3-9", day: 3, time: "12:30 PM – 12:45 PM", activity: "Movement of Students to Respective Hostels", venue: "Hostels / Campus", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch" },
    { id: "d3-10", day: 3, time: "12:45 PM – 2:15 PM", activity: "Lunch", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch" },
    { id: "d3-11", day: 3, time: "2:15 PM – 2:30 PM", activity: "Movement of Students to Respective Venues", venue: "Respective Venues", coordinator: "Student Mentors", category: "afternoon" },
    { id: "d3-12", day: 3, time: "2:30 PM – 3:00 PM", activity: "Club Presentations Slot 5 (A: Robotics [L-26], B: HEB [Aero Audi], C: EEB [L-27], D: SAASC [L-28], E: ACM [L-29], F: EIC [L-30], G: WEC [Audi], H: NCC [L-31])", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/Is of Club, Societies, Cells, NSS & NCC", category: "afternoon" },
    { id: "d3-13", day: 3, time: "3:00 PM – 3:30 PM", activity: "Club Presentations Slot 6 (A: SCC [L-26], B: SAE [Aero Audi], C: PDC [L-27], D: SME [L-28], E: CIM [L-29], F: ASCE [L-30], G: Robotics [Audi], H: APC [L-31])", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/Is of Club, Societies, Cells, NSS & NCC", category: "afternoon" },
    { id: "d3-14", day: 3, time: "3:30 PM – 4:00 PM", activity: "Evening Snacks", venue: "Campus", coordinator: "Organizing Committee", category: "afternoon" },
    { id: "d3-15", day: 3, time: "4:00 PM – 4:15 PM", activity: "Movement of Students to Respective Venues", venue: "Respective Venues", coordinator: "Student Mentors", category: "afternoon" },
    { id: "d3-16", day: 3, time: "4:15 PM – 5:45 PM", activity: "Parallel Displays: Tech Display (T2 in Centenary Hall) | Sports (S2 in Athletic Ground) | Dramatics (A1 in Auditorium)", venue: "Centenary Hall / Athletic Ground / Auditorium", coordinator: "Respective P/Is of Club, Societies, Cells & Sports", category: "afternoon", highlight: true },
  ],
  4: [
    { id: "d4-1", day: 4, time: "9:00 AM – 9:30 AM", activity: "Attendance in respective rooms/venue mentioned in Annexure 1 (Day 4)", venue: "Annexure 1 (Day 4)", coordinator: "Respective Faculty Incharges & Student Branch Incharges", category: "morning", highlight: true },
    { id: "d4-2", day: 4, time: "9:30 AM – 10:30 AM", activity: "Mental Health Speaker Session & Nasha Mukti Speaker Session", venue: "Auditorium", coordinator: "Guest Speakers & Faculty", category: "morning", highlight: true },
    { id: "d4-3", day: 4, time: "10:30 AM – 11:00 AM", activity: "Club Slot: Group A (SME in L-31), Group B (CIM in L-26), Group C (IGS in L-30), Group D (ES in L-31)", venue: "Respective Lecture Halls", coordinator: "Respective Club Faculty & Student Leads", category: "morning" },
    { id: "d4-4", day: 4, time: "11:00 AM – 11:30 AM", activity: "Club Slot: Group A (ATS in L-31), Group B (IIM in L-26), Group C (APC in L-30), Group D (SESI in L-31)", venue: "Respective Lecture Halls", coordinator: "Respective Club Faculty & Student Leads", category: "morning" },
    { id: "d4-5", day: 4, time: "11:30 AM – 12:00 PM", activity: "Club Slot: Group A (EEB in L-31), Group B (IEEE in L-26), Group C (HEB in L-29)", venue: "Respective Lecture Halls", coordinator: "Respective Club Faculty & Student Leads", category: "morning" },
    { id: "d4-6", day: 4, time: "10:30 AM – 12:00 PM", activity: "Physical Education Board (PEB) Session (Group A2)", venue: "Auditorium", coordinator: "PEB Coordinators", category: "morning" },
    { id: "d4-7", day: 4, time: "12:00 PM – 12:15 PM", activity: "Movement of Students to Respective Hostels", venue: "Hostels / Campus", coordinator: "Student Branch Incharges", category: "lunch" },
    { id: "d4-8", day: 4, time: "12:15 PM – 1:45 PM", activity: "Lunch", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch" },
    { id: "d4-9", day: 4, time: "1:15 PM – 2:45 PM", activity: "Music Club Session (Group A3)", venue: "Auditorium", coordinator: "Music Club Coordinators", category: "afternoon" },
    { id: "d4-10", day: 4, time: "2:45 PM – 4:15 PM", activity: "Physical Education Board (PEB) Session (Group A3)", venue: "Auditorium", coordinator: "PEB Coordinators", category: "afternoon" },
    { id: "d4-11", day: 4, time: "2:00 PM – 2:30 PM", activity: "Club Slot: Group A (IIM in L-31), Group B (SME in L-26), Group E (WEC in L-27), Group G (PDC in Audi)", venue: "Respective Venues", coordinator: "Club Incharges", category: "afternoon" },
    { id: "d4-12", day: 4, time: "2:30 PM – 3:00 PM", activity: "Club Slot: Group A (NSS in L-31), Group B (IGS in L-26), Group E (PDC in Audi), Group G (Robotics in L-28)", venue: "Respective Venues", coordinator: "Club Incharges", category: "afternoon" },
    { id: "d4-13", day: 4, time: "3:00 PM – 3:30 PM", activity: "Club Slot: Group A (ASCE in L-31), Group B (ACM in L-26), Group E (NCC in L-29), Group G (HEB in L-30)", venue: "Respective Venues", coordinator: "Club Incharges", category: "afternoon" },
    { id: "d4-14", day: 4, time: "3:30 PM – 4:00 PM", activity: "Club Slot: Group A (ASPS in L-31), Group B (ATS in L-26), Group E (HEB in L-29), Group G (ELC in L-30)", venue: "Respective Venues", coordinator: "Club Incharges", category: "afternoon" },
    { id: "d4-15", day: 4, time: "4:00 PM – 4:30 PM", activity: "Evening Refreshments & SNACKS", venue: "Campus Locations", coordinator: "Organizing Committee", category: "afternoon" },
    { id: "d4-16", day: 4, time: "4:40 PM – 5:10 PM", activity: "Rotaract Club Session (Group B)", venue: "L-26", coordinator: "Rotaract Club Coordinators", category: "afternoon" },
    { id: "d4-17", day: 4, time: "4:40 PM – 6:00 PM", activity: "Parallel Displays: Drams (A2 in Auditorium) | Technical Display (T4 in Centenary Hall) | Sports (S4 in Athletics Ground)", venue: "Auditorium / Centenary Hall / Athletic Ground", coordinator: "Respective Club P/Is & Coordinators", category: "afternoon", highlight: true },
  ],
  5: [
    { id: "d5-1", day: 5, time: "8:30 AM – 9:00 AM", activity: "Attendance in respective rooms/venue mentioned in Annexure 1 (Day 5)", venue: "Annexure 1 (Day 5)", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", highlight: true },
    { id: "d5-2", day: 5, time: "9:00 AM – 9:45 AM", activity: "Dhyan Kendra Session & Mindful Meditation", venue: "Auditorium", coordinator: "Dhyan Kendra Incharges & Yoga Mentors", category: "morning", highlight: true },
    { id: "d5-3", day: 5, time: "9:45 AM – 11:00 AM", activity: "Music Club Session (Group A1)", venue: "Auditorium", coordinator: "Music Club Coordinators", category: "morning" },
    { id: "d5-4", day: 5, time: "9:45 AM – 10:15 AM", activity: "Club Slot: Group C (CIM in Aero Audi), Group D (ASCE in L-27), Group E (APC in L-27), Group F (NCC in L-28), Group G (Rotaract in L-28), Group H (SAASC in L-29)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d5-5", day: 5, time: "10:15 AM – 10:45 AM", activity: "Club Slot: Group C (ES in Aero Audi), Group D (ASME in L-27), Group E (IGS in L-27), Group F (ELC), Group G (SCC in L-28), Group H (HEB)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d5-6", day: 5, time: "11:00 AM – 12:15 PM", activity: "Music Club Session (Group A2)", venue: "Auditorium", coordinator: "Music Club Coordinators", category: "morning" },
    { id: "d5-7", day: 5, time: "10:45 AM – 11:15 AM", activity: "Club Slot: Group A (EIC in L-28), Group B (WEC in L-29), Group C (IIM in Aero Audi), Group D (EIC in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d5-8", day: 5, time: "11:15 AM – 11:45 AM", activity: "Club Slot: Group A (SAASC in L-28), Group B (ASME in L-29), Group C (NCC in L-30), Group D (Robotics in L-31)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d5-9", day: 5, time: "11:45 AM – 12:15 PM", activity: "Club Slot: Group A (IEEE in L-28), Group B (NSS in L-29)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d5-10", day: 5, time: "12:15 PM – 1:45 PM", activity: "Physical Education Board (PEB) Session (Group A2)", venue: "Auditorium", coordinator: "PEB Coordinators", category: "lunch" },
  ],
  6: [
    { id: "d6-1", day: 6, time: "9:00 AM – 9:30 AM", activity: "Attendance in respective rooms/venue mentioned in Annexure 1 (Day 6)", venue: "Annexure 1 (Day 6)", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", highlight: true },
    { id: "d6-2", day: 6, time: "9:30 AM – 10:30 AM", activity: "Career Guidance & Future Planning Speaker Session", venue: "Auditorium", coordinator: "CDGC & Guest Speakers", category: "morning", highlight: true },
    { id: "d6-3", day: 6, time: "10:30 AM – 11:00 AM", activity: "Club Slot: Group A (ES in L-29), Group B (SCC in L-30), Group C (ACM in L-31), Group D (EEB in Audi), Group E (SAASC in Aero Audi), Group F (CIM in L-26), Group G (EIC in L-27), Group H (WEC in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d6-4", day: 6, time: "11:00 AM – 11:30 AM", activity: "Club Slot: Group A (NCC in L-29), Group B (Robotics in L-30), Group C (SAE in L-31), Group D (PDC in Audi), Group E (SME in Aero Audi), Group F (ES in L-26), Group G (ASCE in L-27), Group H (ASME in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d6-5", day: 6, time: "11:30 AM – 12:00 PM", activity: "Club Slot: Group A (APC in L-29), Group B (SESI in L-30), Group C (Rotaract in L-31), Group D (ELC in Audi), Group E (ASPS in Aero Audi), Group F (ATS in L-26), Group G (IIM in L-27), Group H (IEEE in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d6-6", day: 6, time: "12:00 PM – 12:30 PM", activity: "Club Slot: Group C (ASCE in L-31), Group G (EEB in L-27), Group E (SCC in Aero Audi), Group F (PDC in L-26), Group H (ACM in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d6-7", day: 6, time: "12:45 PM – 2:15 PM", activity: "Lunch", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch" },
    { id: "d6-8", day: 6, time: "2:30 PM – 3:00 PM", activity: "Club Slot: Group A (IGS in L-29), Group B (ES in L-30), Group C (SCC in L-31), Group D (HEB in Audi), Group E (ASCE in Aero Audi), Group F (SAASC in L-26), Group G (ACM in L-27), Group H (EIC in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon" },
    { id: "d6-9", day: 6, time: "3:00 PM – 3:30 PM", activity: "Club Slot: Group A (WEC in L-29), Group B (NCC in L-30), Group C (Robotics in L-31), Group D (SAE in Audi), Group E (ASME in Aero Audi), Group F (SME in L-26), Group G (CIM in L-27), Group H (ASCE in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon" },
    { id: "d6-10", day: 6, time: "3:30 PM – 4:00 PM", activity: "Club Slot: Group A (ASME in L-29), Group B (APC in L-30), Group C (SESI in L-31), Group D (Rotaract in Audi), Group E (ELC in Aero Audi), Group F (ASPS in L-26), Group G (ATS in L-27), Group H (IIM in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon" },
    { id: "d6-11", day: 6, time: "4:00 PM – 4:30 PM", activity: "Evening Refreshments & Snacks", venue: "Campus", coordinator: "Organizing Committee", category: "afternoon" },
    { id: "d6-12", day: 6, time: "4:40 PM – 6:00 PM", activity: "Parallel Evening Displays: Technical Display (T3 in Centenary Hall) | Sports (S3 in Athletics Ground) | PEB (A3 in Auditorium)", venue: "Centenary Hall / Athletic Ground / Auditorium", coordinator: "Respective Club P/Is & Sports Coaches", category: "afternoon", highlight: true },
  ],
  7: [
    { id: "d7-1", day: 7, time: "8:30 AM – 9:00 AM", activity: "Attendance in respective rooms/venue mentioned in Annexure 1 (Day 7)", venue: "Annexure 1 (Day 7)", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", highlight: true },
    { id: "d7-2", day: 7, time: "9:00 AM – 9:30 AM", activity: "Club Slot: Group A (ACM in Auditorium), Group B (EIC in L-28), Group C (WEC in L-29), Group D (NCC in L-30), Group E (Robotics in L-31), Group F (SAE in L-26), Group G (SESI in Aero Audi), Group H (SME in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d7-3", day: 7, time: "9:30 AM – 10:00 AM", activity: "Club Slot: Group A (CIM in Auditorium), Group B (SAASC in L-28), Group C (IEEE in L-29), Group D (APC in L-30), Group E (SESI in L-31), Group F (Rotaract in L-26), Group G (SAASC in Aero Audi), Group H (ASPS in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d7-4", day: 7, time: "10:00 AM – 10:30 AM", activity: "Club Slot: Group D (IGS in L-30), Group E (ES in L-31), Group F (SCC in L-26), Group G (SAE in Aero Audi), Group H (EEB in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d7-5", day: 7, time: "10:30 AM – 11:00 AM", activity: "Club Slot: Group A (SESI in Auditorium), Group C (ASME in L-29), Group D (SCC in L-30), Group E (Rotaract in L-31), Group F (IIM in L-26), Group G (ASPS in Aero Audi), Group H (NSS in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d7-6", day: 7, time: "11:00 AM – 11:30 AM", activity: "Club Slot: Group D (IEEE in L-30), Group E (ATS in L-31), Group F (EEB in L-26), Group G (ES in Aero Audi), Group H (SCC in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d7-7", day: 7, time: "11:30 AM – 12:00 PM", activity: "Club Slot: Group D (WEC in L-30), Group E (NSS in L-31), Group F (Robotics in L-26), Group G (IEEE in Aero Audi), Group H (Rotaract in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning" },
    { id: "d7-8", day: 7, time: "11:00 AM – 12:30 PM", activity: "Music Club Session (Group A1)", venue: "Auditorium", coordinator: "Music Club Coordinators", category: "morning" },
    { id: "d7-9", day: 7, time: "12:45 PM – 2:15 PM", activity: "Lunch", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch" },
    { id: "d7-10", day: 7, time: "1:45 PM – 2:15 PM", activity: "Club Slot: Group A (PDC in Audi), Group B (PDC in Audi), Group C (NSS in L-29), Group D (ASPS in L-30), Group E (Rotaract in L-31), Group F (IGS in L-26), Group G (SME in Aero Audi), Group H (SAE in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon" },
    { id: "d7-11", day: 7, time: "2:15 PM – 2:45 PM", activity: "Club Slot: Group F (APC in L-26), Group H (PDC in L-27), Group E (SAE in L-31), Group C (ELC in L-29)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon" },
    { id: "d7-12", day: 7, time: "2:45 PM – 3:15 PM", activity: "Club Slot: Group F (ACM in L-26), Group H (ATS in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon" },
    { id: "d7-13", day: 7, time: "3:15 PM – 3:45 PM", activity: "Club Slot: Group F (SESI in L-26), Group H (CIM in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon" },
    { id: "d7-14", day: 7, time: "4:15 PM onwards", activity: "Grand Finale & FUN Cultural Extravaganza", venue: "Campus / Auditorium", coordinator: "Student Branch Incharges & Cultural Council", category: "afternoon", highlight: true },
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
    fetchOrientationData().then((data) => {
      if (data && Array.isArray(data.schedule) && data.schedule.length > 0) {
        const grouped: Record<number, ScheduleEvent[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
        data.schedule.forEach((item) => {
          const d = Number((item as any).day || (item as any).day_number) || 1;
          if (!grouped[d]) grouped[d] = [];
          grouped[d].push({
            id: String(item.id),
            day: d,
            time: item.time_slot || item.time || "",
            activity: item.activity,
            venue: item.venue,
            coordinator: item.coordinator,
            category: (item.category as any) || "morning",
          });
        });
        setAllScheduleData(grouped);
      }
    });
  }, []);

  const selectedBranch = useMemo(() => {
    return REPORTING_BRANCHES.find((b) => b.code === selectedBranchCode) || REPORTING_BRANCHES[0];
  }, [selectedBranchCode]);

  const currentDayEvents = useMemo(() => {
    return allScheduleData[selectedDay] || SCHEDULE_DATA_BY_DAY[selectedDay] || [];
  }, [allScheduleData, selectedDay]);

  const filteredSchedule = useMemo(() => {
    return currentDayEvents.filter((item) => {
      const matchCategory =
        scheduleCategory === "all" || item.category === scheduleCategory;
      const matchSearch =
        scheduleSearch.trim() === "" ||
        item.activity.toLowerCase().includes(scheduleSearch.toLowerCase()) ||
        item.venue.toLowerCase().includes(scheduleSearch.toLowerCase()) ||
        (item.coordinator && item.coordinator.toLowerCase().includes(scheduleSearch.toLowerCase())) ||
        item.time.toLowerCase().includes(scheduleSearch.toLowerCase());
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
        {/* ─── SECTION 1: REPORTING VENUES & DIRECTIONS ────────────────── */}
        {(activeTab === "all" || activeTab === "venues") && (
          <section id="reporting-venues" className="space-y-6 animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Building className="h-4 w-4" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Branch Reporting Venues & Gate 2 Routes</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Select your engineering branch to view assigned venue, group, route directions from Gate 2, and student count.
                </p>
              </div>

              {/* Branch Quick Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">Branch:</span>
                <select
                  value={selectedBranchCode}
                  onChange={(e) => setSelectedBranchCode(e.target.value)}
                  className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                >
                  {REPORTING_BRANCHES.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.name} ({b.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Branch Highlight Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface to-background p-6 space-y-6 shadow-md relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-bold text-primary font-mono">
                        {selectedBranch.group}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {selectedBranch.studentsCount ? `${selectedBranch.studentsCount} Students` : ""}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight mt-1 text-foreground">
                      {selectedBranch.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] uppercase font-bold text-muted-foreground tracking-wider block">
                      Day 1 Morning Venue
                    </span>
                    <strong className="text-lg font-extrabold text-primary font-mono">
                      {ATTENDANCE_VENUES_BY_DAY[selectedBranch.code]?.[1] || selectedBranch.venueName}
                    </strong>
                  </div>
                </div>

                {/* Day-by-Day Attendance Venue Badges */}
                <div className="rounded-2xl border border-border/80 bg-surface/70 p-4 space-y-2.5">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Daily Morning Attendance Venue Plan (Annexure 1):
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

                {/* Gate 2 Turn-by-Turn Directions */}
                <div className="rounded-2xl border border-border bg-surface p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Navigation className="h-4 w-4 text-emerald-500" />
                    <span>Turn-by-Turn Navigation from Gate 2 (Main Campus Gate):</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedBranch.gateDirections}
                  </p>
                </div>

                {/* Dept Visit Info */}
                <div className="flex items-center justify-between text-xs border-t border-border/60 pt-4">
                  <span className="text-muted-foreground">Day 1 Department Visit (2:00 PM):</span>
                  <span className="font-semibold text-foreground bg-surface border border-border px-2.5 py-1 rounded-lg">
                    {selectedBranch.deptVisitVenue || "Respective Department"}
                  </span>
                </div>
              </div>

              {/* Route Type Quick Switcher */}
              <div className="rounded-3xl border border-border bg-surface p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Reporting Buildings
                  </h4>
                  <span className="text-[11px] text-primary font-semibold">
                    {venueRouteTab === "audi" ? "Auditorium Complex" : "New Academic Block"}
                  </span>
                </div>

                <div className="flex rounded-xl border border-border bg-surface-elevated p-1">
                  <button
                    onClick={() => setVenueRouteTab("audi")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                      venueRouteTab === "audi"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Main Auditorium
                  </button>
                  <button
                    onClick={() => setVenueRouteTab("nab")}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                      venueRouteTab === "nab"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    NAB Lecture Halls
                  </button>
                </div>

                {venueRouteTab === "audi" ? (
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground">Auditorium Branches (Day 1):</p>
                    <p>• Computer Science (CSE) — Group A</p>
                    <p>• Electronics & Comm (ECE) — Group B</p>
                    <p>• VLSI Design & Tech — Group C</p>
                    <p className="text-[11px] text-primary font-medium pt-2">
                      Location: Right side after passing central roundabout from Gate 2.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground">NAB Lecture Halls (Day 1):</p>
                    <p>• <strong>L-26</strong>: Civil (Group E)</p>
                    <p>• <strong>L-27</strong>: Electrical (Group D)</p>
                    <p>• <strong>L-28</strong>: Mechanical (Group G)</p>
                    <p>• <strong>L-29</strong>: AI, DS, M&C (Group F)</p>
                    <p>• <strong>L-30</strong>: Metallurgy, Production (Group H)</p>
                    <p>• <strong>L-31</strong>: B.Design, Aerospace (Group C)</p>
                  </div>
                )}
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
                    className={`shrink-0 rounded-2xl px-4 py-2.5 text-left border transition ${
                      selectedDay === item.day
                        ? "border-primary bg-primary text-primary-foreground shadow-md glow-primary"
                        : "border-border/80 bg-surface/70 text-muted-foreground hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold opacity-80 block">
                      {item.label}
                    </span>
                    <span className="text-xs font-extrabold block">
                      {item.date}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule Table Component */}
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
                              <span className="font-mono text-[10px] text-primary">{b.group}</span>
                            </div>
                            <div className="text-muted-foreground text-[11px]">
                              {b.name}
                            </div>
                            <div className="font-semibold text-foreground pt-1">
                              Venue: {b.venueName} ({b.building})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeAnnexure === "2" && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-sm text-emerald-500 flex items-center gap-2">
                        <Utensils className="h-4 w-4" />
                        <span>Annexure 2: Lunch Group Distribution (12:45 PM – 2:00 PM)</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="rounded-xl border border-border bg-surface p-4 space-y-2">
                          <span className="text-[11px] font-bold text-muted-foreground uppercase">
                            Day Scholars
                          </span>
                          <p className="text-sm font-bold text-foreground">
                            Centenary Hall & Kalpana Chawla Hostel
                          </p>
                          <p className="text-muted-foreground text-[11px]">
                            Day scholar students proceed to Centenary Hall for lunch catering.
                          </p>
                        </div>
                        <div className="rounded-xl border border-border bg-surface p-4 space-y-2">
                          <span className="text-[11px] font-bold text-muted-foreground uppercase">
                            Hostellers
                          </span>
                          <p className="text-sm font-bold text-foreground">
                            Shivalik Hostels & Kalpana Chawla Hostel
                          </p>
                          <p className="text-muted-foreground text-[11px]">
                            Hosteller boys at Shivalik Hostel mess; all girls at Kalpana Chawla Hostel.
                          </p>
                        </div>
                      </div>
                      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-500 font-medium">
                        ⚠️ <strong>Important Note:</strong> All Girls will have their lunch at Kalpana Chawla Hostel & All Hosteller Boys will have their lunch at Shivalik Hostel.
                      </div>
                    </div>
                  )}

                  {activeAnnexure === "3" && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-amber-500 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>Annexure 3: Department Visits on Day 1 (2:00 PM – 4:00 PM)</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                        {REPORTING_BRANCHES.map((b) => (
                          <div key={b.code} className="rounded-xl border border-border bg-surface p-3 space-y-1">
                            <div className="flex items-center justify-between">
                              <strong className="text-foreground">{b.code}</strong>
                              <span className="font-mono text-[10px] bg-surface-elevated px-2 py-0.5 rounded border border-border">
                                {b.studentsCount} Students · {b.group}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              Visit Venue: <strong className="text-foreground">{b.deptVisitVenue}</strong>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
