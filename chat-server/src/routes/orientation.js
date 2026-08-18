const express = require("express");
const { pool } = require("../config/db");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// ─── Default Fallback Data (PEC Freshers Orientation 2026) ───────────────────
const DEFAULT_MAP = {
  title: "PEC Campus Map & Reporting Zones",
  image_url: "/orientation/pec-campus-map.png",
  extracted_text: "Auditorium, New Academic Block (NAB), Library, Senate Hall, Student Center, Sports Complex",
};

const DEFAULT_VENUE = {
  title: "First Year Branch Reporting Venues",
  image_url: "/orientation/reporting-venues.png",
  extracted_text: "Computer Science & Engineering: Auditorium; CSE (Data Science) & CSE (AI): NAB L-26; Electronics & Communication: NAB L-27; Electrical Engineering: NAB L-28; Mechanical: NAB L-29; Civil: NAB L-30; Aerospace & Materials & Production: NAB L-31",
};

const DEFAULT_SCHEDULE_DAY1 = [
  { id: 1, day: 1, time_slot: "9:30 AM – 10:00 AM", activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 1)", venue: "Annexure 1 (Day 1) Reporting Venues", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", sort_order: 1 },
  { id: 2, day: 1, time_slot: "10:00 AM – 10:30 AM", activity: "Distribution of Welcome kit", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "morning", sort_order: 2 },
  { id: 3, day: 1, time_slot: "10:30 AM – 10:35 AM", activity: "Welcoming the Batch of 2030 & Welcoming Dignitaries", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "inaugural", sort_order: 3 },
  { id: 4, day: 1, time_slot: "10:35 AM – 10:40 AM", activity: "Inaugural & Lamp Lighting", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "inaugural", sort_order: 4 },
  { id: 5, day: 1, time_slot: "10:40 AM – 10:45 AM", activity: "Know Your Director", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "inaugural", sort_order: 5 },
  { id: 6, day: 1, time_slot: "10:45 AM – 11:05 AM", activity: "Address By Director", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "inaugural", sort_order: 6 },
  { id: 7, day: 1, time_slot: "11:05 AM – 11:15 AM", activity: "Introduction to Heads, Deans, Registrar", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "inaugural", sort_order: 7 },
  { id: 8, day: 1, time_slot: "11:15 AM – 11:35 AM", activity: "Address By DAA (Dean Academic Affairs)", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "inaugural", sort_order: 8 },
  { id: 9, day: 1, time_slot: "11:35 AM – 11:50 AM", activity: "Address By DSA (Dean Student Affairs)", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "inaugural", sort_order: 9 },
  { id: 10, day: 1, time_slot: "11:50 AM – 12:05 PM", activity: "Address By Head, Computer Centre", venue: "Auditorium", coordinator: "Prof. Amandeep Kaur", category: "inaugural", sort_order: 10 },
  { id: 11, day: 1, time_slot: "12:05 PM – 12:30 PM", activity: "Dispersal Of Students to Resp. Hostels", venue: "Campus / Hostels", coordinator: "Prof. Amandeep Kaur", category: "lunch", sort_order: 11 },
  { id: 12, day: 1, time_slot: "12:30 PM – 1:45 PM", activity: "Lunch (Annexure 2)", venue: "Annexure 2 Venues", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch", sort_order: 12 },
  { id: 13, day: 1, time_slot: "1:45 PM – 1:55 PM", activity: "Documentary", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon", sort_order: 13 },
  { id: 14, day: 1, time_slot: "1:55 PM – 2:00 PM", activity: "Introduction to Honorable Professor Rajeev Ahuja, Director, IIT Ropar", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon", sort_order: 14 },
  { id: 15, day: 1, time_slot: "2:00 PM – 3:00 PM", activity: "Address By Professor Rajeev Ahuja (Director, IIT Ropar)", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon", sort_order: 15 },
  { id: 16, day: 1, time_slot: "3:00 PM – 3:10 PM", activity: "Felicitation Ceremony", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon", sort_order: 16 },
  { id: 17, day: 1, time_slot: "3:10 PM – 3:15 PM", activity: "Vote of Thanks", venue: "Auditorium", coordinator: "Prof. Shilpa", category: "afternoon", sort_order: 17 },
  { id: 18, day: 1, time_slot: "3:30 PM – 4:30 PM", activity: "Department Visit(s) (Address by Respective HOD, Interaction With Faculty, Department Lab Visit)", venue: "Annexure 3 Locations", coordinator: "Address by Respective HOD, Faculty, Department Lab Incharges", category: "afternoon", sort_order: 18 },
  { id: 19, day: 1, time_slot: "4:30 PM – 5:00 PM", activity: "SNACKS", venue: "Annexure 3 Locations", coordinator: "Organizing Committee", category: "afternoon", sort_order: 19 },
  { id: 20, day: 1, time_slot: "5:00 PM – 5:30 PM", activity: "Institute Tour", venue: "Campus", coordinator: "Student Branch Incharges & Discipline Incharges", category: "afternoon", sort_order: 20 },
];

const DEFAULT_SCHEDULE_DAY2 = [
  { id: 21, day: 2, time_slot: "8:45 AM – 9:15 AM", activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 2)", venue: "Annexure 1 (Day 2)", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", sort_order: 21 },
  { id: 22, day: 2, time_slot: "9:15 AM – 9:25 AM", activity: "Address by Head, Physics", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", sort_order: 22 },
  { id: 23, day: 2, time_slot: "9:25 AM – 9:35 AM", activity: "Address by Head, Chemistry", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", sort_order: 23 },
  { id: 24, day: 2, time_slot: "9:35 AM – 9:45 AM", activity: "Address by Head, Mathematics", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", sort_order: 24 },
  { id: 25, day: 2, time_slot: "9:45 AM – 9:55 AM", activity: "Address by Head, CMH", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", sort_order: 25 },
  { id: 26, day: 2, time_slot: "9:55 AM – 10:40 AM", activity: "Speaker Session", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", sort_order: 26 },
  { id: 27, day: 2, time_slot: "10:40 AM – 10:55 AM", activity: "Address by ADSA, Cultural", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", sort_order: 27 },
  { id: 28, day: 2, time_slot: "10:55 AM – 11:10 AM", activity: "Address by ADSA, Technical", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", sort_order: 28 },
  { id: 29, day: 2, time_slot: "11:10 AM – 11:30 AM", activity: "Address by ADSA Hostels - Anti ragging session", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", sort_order: 29 },
  { id: 30, day: 2, time_slot: "11:30 AM – 11:40 AM", activity: "Introduction to P/Is Clubs, Technical Societies, Cells & Wardens", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", sort_order: 30 },
  { id: 31, day: 2, time_slot: "11:40 AM – 11:45 AM", activity: "Vote of Thanks", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur", category: "morning", sort_order: 31 },
  { id: 32, day: 2, time_slot: "11:45 AM – 12:15 PM", activity: "Club / Society Presentations Slot 1 (Group A: HEB [L-26], B: EEB [L-27], C: SAASC [L-28], D: ACM [L-29], E: PDC [Auditorium], F: WEC [Aero Audi], G: NCC [L-30], H: Robotics [L-31])", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/Is of Club, Societies, Cells, NSS & NCC", category: "afternoon", sort_order: 32 },
  { id: 33, day: 2, time_slot: "12:15 PM – 12:45 PM", activity: "Club / Society Presentations Slot 2 (Group A: SAE [L-26], B: ASCE [L-27], C: SME [L-28], D: CIM [L-29], E: EEB [Auditorium], F: ASME [Aero Audi], G: APC [L-30], H: SESI [L-31])", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/Is of Club, Societies, Cells, NSS & NCC", category: "afternoon", sort_order: 33 },
  { id: 34, day: 2, time_slot: "12:45 PM – 2:15 PM", activity: "Lunch", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch", sort_order: 34 },
  { id: 35, day: 2, time_slot: "2:15 PM – 2:30 PM", activity: "Movement of Students", venue: "Respective Venues", coordinator: "Student Mentors", category: "afternoon", sort_order: 35 },
  { id: 36, day: 2, time_slot: "2:30 PM – 3:00 PM", activity: "Club / Society Presentations Slot 3 (Group A: Rotaract [L-26], B: ELC [L-27], C: ASPS [L-28], D: ATS [L-29], E: IIM [Auditorium], F: IEEE [Aero Audi], G: NSS [L-30], H: IGS [L-31])", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/Is of Club, Societies, Cells, NSS & NCC", category: "afternoon", sort_order: 36 },
  { id: 37, day: 2, time_slot: "3:00 PM – 3:30 PM", activity: "Club / Society Presentations Slot 4 (Group A: ELC [L-26], B: ASPS [L-27], C: ATS [L-28], D: IIM [L-29], E: IEEE [Auditorium], F: NSS [Aero Audi], G: IGS [L-30], H: ES [L-31])", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/Is of Club, Societies, Cells, NSS & NCC", category: "afternoon", sort_order: 37 },
  { id: 38, day: 2, time_slot: "3:30 PM – 4:00 PM", activity: "Evening Snacks", venue: "Campus / Respective Venues", coordinator: "Organizing Committee", category: "afternoon", sort_order: 38 },
  { id: 39, day: 2, time_slot: "4:00 PM – 4:15 PM", activity: "Movement of Students to Respective Venues", venue: "Respective Venues", coordinator: "Student Mentors", category: "afternoon", sort_order: 39 },
  { id: 40, day: 2, time_slot: "4:15 PM – 5:45 PM", activity: "Parallel Displays: Technical Display (T1) in Centenary Hall | Sports (S1) in Athletic Ground | Music (A3) in Auditorium", venue: "Centenary Hall / Athletic Ground / Auditorium", coordinator: "Respective P/Is of Club, Societies, Cells & Sports", category: "afternoon", sort_order: 40 },
];

const DEFAULT_SCHEDULE_DAY3 = [
  { id: 41, day: 3, time_slot: "8:30 AM – 9:15 AM", activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 3)", venue: "Annexure 1 (Day 3)", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", sort_order: 41 },
  { id: 42, day: 3, time_slot: "9:15 AM – 9:30 AM", activity: "Address by Head, SCC", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning", sort_order: 42 },
  { id: 43, day: 3, time_slot: "9:30 AM – 9:45 AM", activity: "Address By Head, Alumni Relations", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning", sort_order: 43 },
  { id: 44, day: 3, time_slot: "9:45 AM – 10:00 AM", activity: "Address by Head, Library", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning", sort_order: 44 },
  { id: 45, day: 3, time_slot: "10:00 AM – 10:20 AM", activity: "Address by Head, CDGC", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning", sort_order: 45 },
  { id: 46, day: 3, time_slot: "10:20 AM – 11:20 AM", activity: "Speaker session 1", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning", sort_order: 46 },
  { id: 47, day: 3, time_slot: "11:20 AM – 12:20 PM", activity: "Speaker session 2", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning", sort_order: 47 },
  { id: 48, day: 3, time_slot: "12:20 PM – 12:30 PM", activity: "Felicitation and Vote of Thanks", venue: "Auditorium", coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa", category: "morning", sort_order: 48 },
  { id: 49, day: 3, time_slot: "12:30 PM – 12:45 PM", activity: "Movement of Students to Respective Hostels", venue: "Hostels / Campus", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch", sort_order: 49 },
  { id: 50, day: 3, time_slot: "12:45 PM – 2:15 PM", activity: "Lunch", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch", sort_order: 50 },
  { id: 51, day: 3, time_slot: "2:15 PM – 2:30 PM", activity: "Movement of Students to Respective Venues", venue: "Respective Venues", coordinator: "Student Mentors", category: "afternoon", sort_order: 51 },
  { id: 52, day: 3, time_slot: "2:30 PM – 3:00 PM", activity: "Club / Society Presentations Slot 5 (Group A: Robotics [L-26], B: HEB [Aero Audi], C: EEB [L-27], D: SAASC [L-28], E: ACM [L-29], F: EIC [L-30], G: WEC [Auditorium], H: NCC [L-31])", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/Is of Club, Societies, Cells, NSS & NCC", category: "afternoon", sort_order: 52 },
  { id: 53, day: 3, time_slot: "3:00 PM – 3:30 PM", activity: "Club / Society Presentations Slot 6 (Group A: SCC [L-26], B: SAE [Aero Audi], C: PDC [L-27], D: SME [L-28], E: CIM [L-29], F: ASCE [L-30], G: Robotics [Auditorium], H: APC [L-31])", venue: "Respective Lecture Halls / Audi", coordinator: "Respective P/Is of Club, Societies, Cells, NSS & NCC", category: "afternoon", sort_order: 53 },
  { id: 54, day: 3, time_slot: "3:30 PM – 4:00 PM", activity: "Evening Snacks", venue: "Campus", coordinator: "Organizing Committee", category: "afternoon", sort_order: 54 },
  { id: 55, day: 3, time_slot: "4:00 PM – 4:15 PM", activity: "Movement of Students to Respective Venues", venue: "Respective Venues", coordinator: "Student Mentors", category: "afternoon", sort_order: 55 },
  { id: 56, day: 3, time_slot: "4:15 PM – 5:45 PM", activity: "Parallel Displays: Tech Display (T2) in Centenary Hall | Sports (S2) in Athletic Ground | Dramatics (A1) in Auditorium", venue: "Centenary Hall / Athletic Ground / Auditorium", coordinator: "Respective P/Is of Club, Societies, Cells & Sports", category: "afternoon", sort_order: 56 },
];

const DEFAULT_SCHEDULE_DAY4 = [
  { id: 57, day: 4, time_slot: "9:00 AM – 9:30 AM", activity: "Attendance in respective rooms/venue mentioned in Annexure 1 (Day 4)", venue: "Annexure 1 (Day 4)", coordinator: "Respective Faculty Incharges & Student Branch Incharges", category: "morning", sort_order: 57 },
  { id: 58, day: 4, time_slot: "9:30 AM – 10:30 AM", activity: "Mental Health Speaker Session & Nasha Mukti Speaker Session", venue: "Auditorium", coordinator: "Guest Speakers & Faculty", category: "morning", sort_order: 58 },
  { id: 59, day: 4, time_slot: "10:30 AM – 11:00 AM", activity: "Club Slot: Group A (SME in L-31), Group B (CIM in L-26), Group C (IGS in L-30), Group D (ES in L-31)", venue: "Respective Lecture Halls", coordinator: "Respective Club Faculty & Student Leads", category: "morning", sort_order: 59 },
  { id: 60, day: 4, time_slot: "11:00 AM – 11:30 AM", activity: "Club Slot: Group A (ATS in L-31), Group B (IIM in L-26), Group C (APC in L-30), Group D (SESI in L-31)", venue: "Respective Lecture Halls", coordinator: "Respective Club Faculty & Student Leads", category: "morning", sort_order: 60 },
  { id: 61, day: 4, time_slot: "11:30 AM – 12:00 PM", activity: "Club Slot: Group A (EEB in L-31), Group B (IEEE in L-26), Group C (HEB in L-29)", venue: "Respective Lecture Halls", coordinator: "Respective Club Faculty & Student Leads", category: "morning", sort_order: 61 },
  { id: 62, day: 4, time_slot: "10:30 AM – 12:00 PM", activity: "PEB Session (Group A2)", venue: "Auditorium", coordinator: "Physical Education Board Coordinators", category: "morning", sort_order: 62 },
  { id: 63, day: 4, time_slot: "12:00 PM – 12:15 PM", activity: "Movement of Students to Respective Hostels", venue: "Hostels / Campus", coordinator: "Student Branch Incharges", category: "lunch", sort_order: 63 },
  { id: 64, day: 4, time_slot: "12:15 PM – 1:45 PM", activity: "Lunch", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch", sort_order: 64 },
  { id: 65, day: 4, time_slot: "1:15 PM – 2:45 PM", activity: "Music Session (Group A3)", venue: "Auditorium", coordinator: "Music Club Coordinators", category: "afternoon", sort_order: 65 },
  { id: 66, day: 4, time_slot: "2:45 PM – 4:15 PM", activity: "PEB Session (Group A3)", venue: "Auditorium", coordinator: "Physical Education Board Coordinators", category: "afternoon", sort_order: 66 },
  { id: 67, day: 4, time_slot: "2:00 PM – 2:30 PM", activity: "Club Slot: Group A (IIM in L-31), Group B (SME in L-26), Group E (WEC in L-27), Group G (PDC in Auditorium)", venue: "Respective Venues", coordinator: "Club Incharges", category: "afternoon", sort_order: 67 },
  { id: 68, day: 4, time_slot: "2:30 PM – 3:00 PM", activity: "Club Slot: Group A (NSS in L-31), Group B (IGS in L-26), Group E (PDC in Auditorium), Group G (Robotics in L-28)", venue: "Respective Venues", coordinator: "Club Incharges", category: "afternoon", sort_order: 68 },
  { id: 69, day: 4, time_slot: "3:00 PM – 3:30 PM", activity: "Club Slot: Group A (ASCE in L-31), Group B (ACM in L-26), Group E (NCC in L-29), Group G (HEB in L-30)", venue: "Respective Venues", coordinator: "Club Incharges", category: "afternoon", sort_order: 69 },
  { id: 70, day: 4, time_slot: "3:30 PM – 4:00 PM", activity: "Club Slot: Group A (ASPS in L-31), Group B (ATS in L-26), Group E (HEB in L-29), Group G (ELC in L-30)", venue: "Respective Venues", coordinator: "Club Incharges", category: "afternoon", sort_order: 70 },
  { id: 71, day: 4, time_slot: "4:00 PM – 4:30 PM", activity: "Evening Refreshments & SNACKS", venue: "Campus Locations", coordinator: "Organizing Committee", category: "afternoon", sort_order: 71 },
  { id: 72, day: 4, time_slot: "4:40 PM – 5:10 PM", activity: "Rotaract Club Session (Group B)", venue: "L-26", coordinator: "Rotaract Club Coordinators", category: "afternoon", sort_order: 72 },
  { id: 73, day: 4, time_slot: "4:40 PM – 6:00 PM", activity: "Parallel Evening Displays: Drams (A2 in Auditorium) | Technical Display (T4 in Centenary Hall) | Sports (S4 in Athletics Ground)", venue: "Auditorium / Centenary Hall / Athletic Ground", coordinator: "Respective Club P/Is & Coordinators", category: "afternoon", sort_order: 73 },
];

const DEFAULT_SCHEDULE_DAY5 = [
  { id: 74, day: 5, time_slot: "8:30 AM – 9:00 AM", activity: "Attendance in respective rooms/venue mentioned in Annexure 1 (Day 5)", venue: "Annexure 1 (Day 5)", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", sort_order: 74 },
  { id: 75, day: 5, time_slot: "9:00 AM – 9:45 AM", activity: "Dhyan Kendra Session", venue: "Auditorium", coordinator: "Dhyan Kendra Incharges & Yoga Mentors", category: "morning", sort_order: 75 },
  { id: 76, day: 5, time_slot: "9:45 AM – 11:00 AM", activity: "Music Session (Group A1)", venue: "Auditorium", coordinator: "Music Club Coordinators", category: "morning", sort_order: 76 },
  { id: 77, day: 5, time_slot: "9:45 AM – 10:15 AM", activity: "Club Slot: Group C (CIM in Aero Audi), Group D (ASCE in L-27), Group E (APC in L-27), Group F (NCC in L-28), Group G (Rotaract in L-28), Group H (SAASC in L-29)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 77 },
  { id: 78, day: 5, time_slot: "10:15 AM – 10:45 AM", activity: "Club Slot: Group C (ES in Aero Audi), Group D (ASME in L-27), Group E (IGS in L-27), Group F (ELC), Group G (SCC in L-28), Group H (HEB)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 78 },
  { id: 79, day: 5, time_slot: "11:00 AM – 12:15 PM", activity: "Music Session (Group A2)", venue: "Auditorium", coordinator: "Music Club Coordinators", category: "morning", sort_order: 79 },
  { id: 80, day: 5, time_slot: "10:45 AM – 11:15 AM", activity: "Club Slot: Group A (EIC in L-28), Group B (WEC in L-29), Group C (IIM in Aero Audi), Group D (EIC in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 80 },
  { id: 81, day: 5, time_slot: "11:15 AM – 11:45 AM", activity: "Club Slot: Group A (SAASC in L-28), Group B (ASME in L-29), Group C (NCC in L-30), Group D (Robotics in L-31)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 81 },
  { id: 82, day: 5, time_slot: "11:45 AM – 12:15 PM", activity: "Club Slot: Group A (IEEE in L-28), Group B (NSS in L-29)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 82 },
  { id: 83, day: 5, time_slot: "12:15 PM – 1:45 PM", activity: "PEB Session (Group A2)", venue: "Auditorium", coordinator: "Physical Education Board Coordinators", category: "lunch", sort_order: 83 },
];

const DEFAULT_SCHEDULE_DAY6 = [
  { id: 84, day: 6, time_slot: "9:00 AM – 9:30 AM", activity: "Attendance in respective rooms/venue mentioned in Annexure 1 (Day 6)", venue: "Annexure 1 (Day 6)", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", sort_order: 84 },
  { id: 85, day: 6, time_slot: "9:30 AM – 10:30 AM", activity: "Career Guidance Speaker Session", venue: "Auditorium", coordinator: "CDGC & Guest Speakers", category: "morning", sort_order: 85 },
  { id: 86, day: 6, time_slot: "10:30 AM – 11:00 AM", activity: "Club Slot: Group A (ES in L-29), Group B (SCC in L-30), Group C (ACM in L-31), Group D (EEB in Auditorium), Group E (SAASC in Aero Audi), Group F (CIM in L-26), Group G (EIC in L-27), Group H (WEC in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 86 },
  { id: 87, day: 6, time_slot: "11:00 AM – 11:30 AM", activity: "Club Slot: Group A (NCC in L-29), Group B (Robotics in L-30), Group C (SAE in L-31), Group D (PDC in Auditorium), Group E (SME in Aero Audi), Group F (ES in L-26), Group G (ASCE in L-27), Group H (ASME in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 87 },
  { id: 88, day: 6, time_slot: "11:30 AM – 12:00 PM", activity: "Club Slot: Group A (APC in L-29), Group B (SESI in L-30), Group C (Rotaract in L-31), Group D (ELC in Auditorium), Group E (ASPS in Aero Audi), Group F (ATS in L-26), Group G (IIM in L-27), Group H (IEEE in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 88 },
  { id: 89, day: 6, time_slot: "12:00 PM – 12:30 PM", activity: "Club Slot: Group C (ASCE in L-31), Group G (EEB in L-27), Group E (SCC in Aero Audi), Group F (PDC in L-26), Group H (ACM in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 89 },
  { id: 90, day: 6, time_slot: "12:45 PM – 2:15 PM", activity: "Lunch", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch", sort_order: 90 },
  { id: 91, day: 6, time_slot: "2:30 PM – 3:00 PM", activity: "Club Slot: Group A (IGS in L-29), Group B (ES in L-30), Group C (SCC in L-31), Group D (HEB in Auditorium), Group E (ASCE in Aero Audi), Group F (SAASC in L-26), Group G (ACM in L-27), Group H (EIC in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon", sort_order: 91 },
  { id: 92, day: 6, time_slot: "3:00 PM – 3:30 PM", activity: "Club Slot: Group A (WEC in L-29), Group B (NCC in L-30), Group C (Robotics in L-31), Group D (SAE in Auditorium), Group E (ASME in Aero Audi), Group F (SME in L-26), Group G (CIM in L-27), Group H (ASCE in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon", sort_order: 92 },
  { id: 93, day: 6, time_slot: "3:30 PM – 4:00 PM", activity: "Club Slot: Group A (ASME in L-29), Group B (APC in L-30), Group C (SESI in L-31), Group D (Rotaract in Auditorium), Group E (ELC in Aero Audi), Group F (ASPS in L-26), Group G (ATS in L-27), Group H (IIM in L-28)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon", sort_order: 93 },
  { id: 94, day: 6, time_slot: "4:00 PM – 4:30 PM", activity: "Evening Refreshments & Snacks", venue: "Campus", coordinator: "Organizing Committee", category: "afternoon", sort_order: 94 },
  { id: 95, day: 6, time_slot: "4:40 PM – 6:00 PM", activity: "Parallel Evening Displays: Technical Display (T3 in Centenary Hall) | Sports (S3 in Athletics Ground) | PEB (A3 in Auditorium)", venue: "Centenary Hall / Athletic Ground / Auditorium", coordinator: "Respective Club P/Is & Sports Coaches", category: "afternoon", sort_order: 95 },
];

const DEFAULT_SCHEDULE_DAY7 = [
  { id: 96, day: 7, time_slot: "8:30 AM – 9:00 AM", activity: "Attendance in respective rooms/venue mentioned in Annexure 1 (Day 7)", venue: "Annexure 1 (Day 7)", coordinator: "Respective Faculty Incharges & Student Branch Incharge", category: "morning", sort_order: 96 },
  { id: 97, day: 7, time_slot: "9:00 AM – 9:30 AM", activity: "Club Slot: Group A (ACM in Auditorium), Group B (EIC in L-28), Group C (WEC in L-29), Group D (NCC in L-30), Group E (Robotics in L-31), Group F (SAE in L-26), Group G (SESI in Aero Audi), Group H (SME in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 97 },
  { id: 98, day: 7, time_slot: "9:30 AM – 10:00 AM", activity: "Club Slot: Group A (CIM in Auditorium), Group B (SAASC in L-28), Group C (IEEE in L-29), Group D (APC in L-30), Group E (SESI in L-31), Group F (Rotaract in L-26), Group G (SAASC in Aero Audi), Group H (ASPS in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 98 },
  { id: 99, day: 7, time_slot: "10:00 AM – 10:30 AM", activity: "Club Slot: Group D (IGS in L-30), Group E (ES in L-31), Group F (SCC in L-26), Group G (SAE in Aero Audi), Group H (EEB in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 99 },
  { id: 100, day: 7, time_slot: "10:30 AM – 11:00 AM", activity: "Club Slot: Group A (SESI in Auditorium), Group C (ASME in L-29), Group D (SCC in L-30), Group E (Rotaract in L-31), Group F (IIM in L-26), Group G (ASPS in Aero Audi), Group H (NSS in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 100 },
  { id: 101, day: 7, time_slot: "11:00 AM – 11:30 AM", activity: "Club Slot: Group D (IEEE in L-30), Group E (ATS in L-31), Group F (EEB in L-26), Group G (ES in Aero Audi), Group H (SCC in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 101 },
  { id: 102, day: 7, time_slot: "11:30 AM – 12:00 PM", activity: "Club Slot: Group D (WEC in L-30), Group E (NSS in L-31), Group F (Robotics in L-26), Group G (IEEE in Aero Audi), Group H (Rotaract in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "morning", sort_order: 102 },
  { id: 103, day: 7, time_slot: "11:00 AM – 12:30 PM", activity: "Music Session (Group A1)", venue: "Auditorium", coordinator: "Music Club Coordinators", category: "morning", sort_order: 103 },
  { id: 104, day: 7, time_slot: "12:45 PM – 2:15 PM", activity: "Lunch", venue: "Annexure 3", coordinator: "Student Branch Incharges & Discipline Incharges", category: "lunch", sort_order: 104 },
  { id: 105, day: 7, time_slot: "1:45 PM – 2:15 PM", activity: "Club Slot: Group A (PDC in Audi), Group B (PDC in Audi), Group C (NSS in L-29), Group D (ASPS in L-30), Group E (Rotaract in L-31), Group F (IGS in L-26), Group G (SME in Aero Audi), Group H (SAE in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon", sort_order: 105 },
  { id: 106, day: 7, time_slot: "2:15 PM – 2:45 PM", activity: "Club Slot: Group F (APC in L-26), Group H (PDC in L-27), Group E (SAE in L-31), Group C (ELC in L-29)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon", sort_order: 106 },
  { id: 107, day: 7, time_slot: "2:45 PM – 3:15 PM", activity: "Club Slot: Group F (ACM in L-26), Group H (ATS in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon", sort_order: 107 },
  { id: 108, day: 7, time_slot: "3:15 PM – 3:45 PM", activity: "Club Slot: Group F (SESI in L-26), Group H (CIM in L-27)", venue: "Respective Venues", coordinator: "Club Coordinators", category: "afternoon", sort_order: 108 },
  { id: 109, day: 7, time_slot: "4:15 PM onwards", activity: "Grand Finale & FUN Event", venue: "Campus / Auditorium", coordinator: "Student Branch Incharges & Cultural Council", category: "afternoon", sort_order: 109 },
];

const DEFAULT_SCHEDULE = [
  ...DEFAULT_SCHEDULE_DAY1,
  ...DEFAULT_SCHEDULE_DAY2,
  ...DEFAULT_SCHEDULE_DAY3,
  ...DEFAULT_SCHEDULE_DAY4,
  ...DEFAULT_SCHEDULE_DAY5,
  ...DEFAULT_SCHEDULE_DAY6,
  ...DEFAULT_SCHEDULE_DAY7,
];

// In-memory runtime cache for orientation content
let cachedOrientationData = {
  map: DEFAULT_MAP,
  venue: DEFAULT_VENUE,
  schedule: DEFAULT_SCHEDULE,
  day1: DEFAULT_SCHEDULE_DAY1,
  day2: DEFAULT_SCHEDULE_DAY2,
  day3: DEFAULT_SCHEDULE_DAY3,
  day4: DEFAULT_SCHEDULE_DAY4,
  day5: DEFAULT_SCHEDULE_DAY5,
  day6: DEFAULT_SCHEDULE_DAY6,
  day7: DEFAULT_SCHEDULE_DAY7,
  updated_at: new Date().toISOString(),
};

// ───────────────────────────────────────────────────────────────────────────────
// GET /api/orientation
// Accessible to all logged-in users (freshers and PEC verified students)
// ───────────────────────────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    let mapData = null;
    let venueData = null;
    let scheduleItems = [];

    try {
      if (pool) {
        // Query content for map and venue
        const contentRes = await pool.query(
          `SELECT type, title, image_url, extracted_text, updated_at 
           FROM orientation_content`
        );

        for (const row of contentRes.rows) {
          if (row.type === "map") {
            mapData = {
              title: row.title,
              image_url: row.image_url,
              extracted_text: row.extracted_text,
              updated_at: row.updated_at,
            };
          } else if (row.type === "venue") {
            venueData = {
              title: row.title,
              image_url: row.image_url,
              extracted_text: row.extracted_text,
              updated_at: row.updated_at,
            };
          }
        }

        // Query schedule items sorted by sort_order
        const scheduleRes = await pool.query(
          `SELECT id, time_slot, activity, venue, coordinator, category, sort_order, created_at
           FROM orientation_schedule_items
           ORDER BY sort_order ASC, id ASC`
        );

        if (scheduleRes.rows.length > 0) {
          scheduleItems = scheduleRes.rows;
        }
      }
    } catch (dbErr) {
      console.warn("⚠️  [Orientation GET] DB query failed, using runtime fallback:", dbErr.message);
    }

    const responseData = {
      success: true,
      map: mapData || cachedOrientationData.map || DEFAULT_MAP,
      venue: venueData || cachedOrientationData.venue || DEFAULT_VENUE,
      schedule: scheduleItems.length > 0 ? scheduleItems : cachedOrientationData.schedule || DEFAULT_SCHEDULE,
      source: scheduleItems.length > 0 ? "database" : "cached_fallback",
    };

    return res.status(200).json(responseData);
  } catch (err) {
    console.error("❌ Error in /api/orientation:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve orientation data.",
      fallback: cachedOrientationData,
    });
  }
});

// ───────────────────────────────────────────────────────────────────────────────
// POST /api/orientation/upload
// Admin-only endpoint to update map, venue information, and schedule items
// ───────────────────────────────────────────────────────────────────────────────
router.post("/upload", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { map, venue, schedule } = req.body;

    if (!map && !venue && !schedule) {
      return res.status(400).json({
        success: false,
        error: "At least one section (map, venue, or schedule) must be provided for upload.",
      });
    }

    let dbUpdated = false;

    try {
      if (pool) {
        // Update Map content
        if (map) {
          await pool.query(
            `INSERT INTO orientation_content (type, title, image_url, extracted_text, updated_at)
             VALUES ('map', $1, $2, $3, NOW())
             ON CONFLICT (type) DO UPDATE SET
               title = EXCLUDED.title,
               image_url = EXCLUDED.image_url,
               extracted_text = EXCLUDED.extracted_text,
               updated_at = NOW()`,
            [map.title || "PEC Campus Map", map.image_url || "", map.extracted_text || ""]
          );
        }

        // Update Venue content
        if (venue) {
          await pool.query(
            `INSERT INTO orientation_content (type, title, image_url, extracted_text, updated_at)
             VALUES ('venue', $1, $2, $3, NOW())
             ON CONFLICT (type) DO UPDATE SET
               title = EXCLUDED.title,
               image_url = EXCLUDED.image_url,
               extracted_text = EXCLUDED.extracted_text,
               updated_at = NOW()`,
            [venue.title || "Branch Reporting Venues", venue.image_url || "", venue.extracted_text || ""]
          );
        }

        // Update / Replace Schedule items
        if (Array.isArray(schedule) && schedule.length > 0) {
          await pool.query(`DELETE FROM orientation_schedule_items`);
          for (let i = 0; i < schedule.length; i++) {
            const item = schedule[i];
            await pool.query(
              `INSERT INTO orientation_schedule_items (time_slot, activity, venue, coordinator, category, sort_order)
               VALUES ($1, $2, $3, $4, $5, $6)`,
              [
                item.time_slot || item.time || "",
                item.activity || "",
                item.venue || "",
                item.coordinator || null,
                item.category || "general",
                item.sort_order !== undefined ? item.sort_order : i + 1,
              ]
            );
          }
        }

        dbUpdated = true;
      }
    } catch (dbErr) {
      console.warn("⚠️  [Orientation Upload] DB update error:", dbErr.message);
    }

    // Update in-memory cache
    if (map) cachedOrientationData.map = { ...cachedOrientationData.map, ...map };
    if (venue) cachedOrientationData.venue = { ...cachedOrientationData.venue, ...venue };
    if (Array.isArray(schedule) && schedule.length > 0) {
      cachedOrientationData.schedule = schedule.map((item, idx) => ({
        id: item.id || idx + 1,
        time_slot: item.time_slot || item.time || "",
        activity: item.activity || "",
        venue: item.venue || "",
        coordinator: item.coordinator || "",
        category: item.category || "general",
        sort_order: item.sort_order || idx + 1,
      }));
    }
    cachedOrientationData.updated_at = new Date().toISOString();

    console.log(`✅ [Admin Orientation Upload] Content successfully updated by admin: ${req.user.email}`);

    return res.status(200).json({
      success: true,
      message: "Orientation content updated successfully without requiring a redeploy.",
      data: cachedOrientationData,
      dbUpdated,
    });
  } catch (err) {
    console.error("❌ Error in /api/orientation/upload:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to upload orientation content.",
    });
  }
});

module.exports = router;
