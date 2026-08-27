import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Et as Clock, H as Navigation, It as Calendar, J as MapPin, Rt as Building, b as Sparkles, gt as FileText, i as X, j as RotateCcw, jt as ChevronRight, lt as GraduationCap, n as ZoomIn, q as Maximize2, rt as Layers, s as Utensils, t as ZoomOut } from "../_libs/lucide-react.mjs";
import { i as SPECIAL_GROUPINGS, n as ORIENTATION_DAYS, t as ATTENDANCE_VENUES_BY_DAY } from "./orientation-B_HT0ZR3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orientation-Ddogoux0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_BASE = "http://localhost:3001/api/orientation";
async function fetchOrientationData() {
	if (typeof window === "undefined") return null;
	try {
		const res = await fetch(API_BASE);
		if (!res.ok) {
			console.warn("Failed to fetch orientation from backend, status:", res.status);
			return null;
		}
		return await res.json();
	} catch (err) {
		console.warn("Orientation API unreachable, using local fallback:", err);
		return null;
	}
}
var SCHEDULE_DATA_BY_DAY = {
	1: [
		{
			id: "d1-1",
			day: 1,
			time: "9:30 AM – 10:00 AM",
			activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 1)",
			venue: "Annexure 1 (Day 1) Venues",
			coordinator: "Respective Faculty Incharges & Student Branch Incharge",
			category: "morning",
			highlight: true,
			notes: "Mandatory reporting for all first-year freshers."
		},
		{
			id: "d1-2",
			day: 1,
			time: "10:00 AM – 10:30 AM",
			activity: "Distribution of Welcome Kit",
			venue: "Auditorium",
			coordinator: "Prof. Amandeep Kaur",
			category: "morning"
		},
		{
			id: "d1-3",
			day: 1,
			time: "10:30 AM – 10:35 AM",
			activity: "Welcoming the Batch of 2030 & Welcoming Dignitaries",
			venue: "Auditorium",
			coordinator: "Prof. Amandeep Kaur",
			category: "inaugural"
		},
		{
			id: "d1-4",
			day: 1,
			time: "10:35 AM – 10:40 AM",
			activity: "Inaugural & Lamp Lighting",
			venue: "Auditorium",
			coordinator: "Prof. Amandeep Kaur",
			category: "inaugural"
		},
		{
			id: "d1-5",
			day: 1,
			time: "10:40 AM – 10:45 AM",
			activity: "Know Your Director",
			venue: "Auditorium",
			coordinator: "Prof. Amandeep Kaur",
			category: "inaugural"
		},
		{
			id: "d1-6",
			day: 1,
			time: "10:45 AM – 11:05 AM",
			activity: "Address By Director, PEC",
			venue: "Auditorium",
			coordinator: "Director, PEC",
			category: "inaugural",
			highlight: true
		},
		{
			id: "d1-7",
			day: 1,
			time: "11:05 AM – 11:15 AM",
			activity: "Introduction to Heads of Departments, Deans & Registrar",
			venue: "Auditorium",
			coordinator: "Prof. Amandeep Kaur",
			category: "inaugural"
		},
		{
			id: "d1-8",
			day: 1,
			time: "11:15 AM – 11:35 AM",
			activity: "Address By Dean of Academic Affairs (DAA)",
			venue: "Auditorium",
			coordinator: "Dean Academic Affairs",
			category: "inaugural"
		},
		{
			id: "d1-9",
			day: 1,
			time: "11:35 AM – 11:50 AM",
			activity: "Address By Dean of Student Affairs (DSA)",
			venue: "Auditorium",
			coordinator: "Dean Student Affairs",
			category: "inaugural"
		},
		{
			id: "d1-10",
			day: 1,
			time: "11:50 AM – 12:05 PM",
			activity: "Address By Head, Computer Centre",
			venue: "Auditorium",
			coordinator: "Head, Computer Centre",
			category: "inaugural"
		},
		{
			id: "d1-11",
			day: 1,
			time: "12:05 PM – 12:30 PM",
			activity: "Dispersal Of Students to Respective Hostels",
			venue: "Auditorium",
			coordinator: "Prof. Amandeep Kaur",
			category: "lunch"
		},
		{
			id: "d1-12",
			day: 1,
			time: "12:30 PM – 1:45 PM",
			activity: "Lunch",
			venue: "Annexure 2 Venues (Centenary Hall / Shivalik / KC Hostel)",
			coordinator: "Student Branch Incharges & Discipline Incharges",
			category: "lunch",
			highlight: true,
			notes: "All Girls at KC Hostel. Hosteller Boys at Shivalik Hostel. Day Scholars at Centenary Hall."
		},
		{
			id: "d1-13",
			day: 1,
			time: "1:45 PM – 1:55 PM",
			activity: "Documentary",
			venue: "Auditorium",
			coordinator: "Prof. Shilpa",
			category: "afternoon"
		},
		{
			id: "d1-14",
			day: 1,
			time: "1:55 PM – 2:00 PM",
			activity: "Introduction to Honorable Professor Rajeev Ahuja, Director, IIT Ropar",
			venue: "Auditorium",
			coordinator: "Prof. Shilpa",
			category: "afternoon"
		},
		{
			id: "d1-15",
			day: 1,
			time: "2:00 PM – 3:00 PM",
			activity: "Address By Professor Rajeev Ahuja (Director, IIT Ropar)",
			venue: "Auditorium",
			coordinator: "Prof. Shilpa",
			category: "afternoon",
			highlight: true
		},
		{
			id: "d1-16",
			day: 1,
			time: "3:00 PM – 3:10 PM",
			activity: "Felicitation Ceremony",
			venue: "Auditorium",
			coordinator: "Prof. Shilpa",
			category: "afternoon"
		},
		{
			id: "d1-17",
			day: 1,
			time: "3:10 PM – 3:15 PM",
			activity: "Vote of Thanks",
			venue: "Auditorium",
			coordinator: "Prof. Shilpa",
			category: "afternoon"
		},
		{
			id: "d1-18",
			day: 1,
			time: "3:30 PM – 4:30 PM",
			activity: "Department Visit(s) (Address by Respective HOD, Interaction With Faculty & Lab Visit)",
			venue: "Annexure 3 Venues",
			coordinator: "Respective HODs & Faculty",
			category: "afternoon",
			highlight: true
		},
		{
			id: "d1-19",
			day: 1,
			time: "4:30 PM – 5:00 PM",
			activity: "SNACKS",
			venue: "Annexure 3",
			coordinator: "Organizing Committee",
			category: "afternoon"
		},
		{
			id: "d1-20",
			day: 1,
			time: "5:00 PM – 5:30 PM",
			activity: "Institute Tour",
			venue: "Campus",
			coordinator: "Student Branch Incharges & Discipline Incharges",
			category: "afternoon"
		}
	],
	2: [
		{
			id: "d2-1",
			day: 2,
			time: "8:45 AM – 9:15 AM",
			activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 2)",
			venue: "Annexure 1 (Day 2) Venues",
			coordinator: "Respective Faculty Incharges & Student Branch Incharge",
			category: "morning",
			highlight: true
		},
		{
			id: "d2-2",
			day: 2,
			time: "9:15 AM – 9:25 AM",
			activity: "Address by Head, Physics",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur",
			category: "morning"
		},
		{
			id: "d2-3",
			day: 2,
			time: "9:25 AM – 9:35 AM",
			activity: "Address by Head, Chemistry",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur",
			category: "morning"
		},
		{
			id: "d2-4",
			day: 2,
			time: "9:35 AM – 9:45 AM",
			activity: "Address by Head, Mathematics",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur",
			category: "morning"
		},
		{
			id: "d2-5",
			day: 2,
			time: "9:45 AM – 9:55 AM",
			activity: "Address by Head, CMH",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur",
			category: "morning"
		},
		{
			id: "d2-6",
			day: 2,
			time: "9:55 AM – 10:40 AM",
			activity: "Speaker Session",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur",
			category: "morning",
			highlight: true
		},
		{
			id: "d2-7",
			day: 2,
			time: "10:40 AM – 10:55 AM",
			activity: "Address by ADSA, Cultural",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur",
			category: "morning"
		},
		{
			id: "d2-8",
			day: 2,
			time: "10:55 AM – 11:10 AM",
			activity: "Address by ADSA, Technical",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur",
			category: "morning"
		},
		{
			id: "d2-9",
			day: 2,
			time: "11:10 AM – 11:30 AM",
			activity: "Address by ADSA Hostels - Anti ragging session",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur",
			category: "morning",
			highlight: true
		},
		{
			id: "d2-10",
			day: 2,
			time: "11:30 AM – 11:40 AM",
			activity: "Introduction to P/Is Clubs, Technical Societies, Cells & Wardens",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur",
			category: "morning"
		},
		{
			id: "d2-11",
			day: 2,
			time: "11:40 AM – 11:45 AM",
			activity: "Vote of Thanks",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Amandeep Kaur",
			category: "morning"
		},
		{
			id: "d2-12",
			day: 2,
			time: "11:45 AM – 12:15 PM",
			activity: "Club Presentations Slot 1: Group A (HEB in L-26), Group B (EEB in L-27), Group C (SAASC in L-28), Group D (ACM in L-29), Group E (PDC in Auditorium), Group F (WEC in Aero Audi), Group G (NCC in L-30), Group H (Robotics in L-31)",
			venue: "Respective Lecture Halls / Audi",
			coordinator: "Respective P/I's of Club, Societies, Cells, NSS & NCC to coordinate and supervise.",
			category: "afternoon"
		},
		{
			id: "d2-13",
			day: 2,
			time: "12:15 PM – 12:45 PM",
			activity: "Club Presentations Slot 2: Group A (SAE in L-26), Group B (ASCE in L-27), Group C (SME in L-28), Group D (CIM in L-29), Group E (EEB in Auditorium), Group F (ASME in Aero Audi), Group G (APC in L-30), Group H (SESI in L-31)",
			venue: "Respective Lecture Halls / Audi",
			coordinator: "Respective P/I's of Club, Societies, Cells, NSS & NCC to coordinate and supervise.",
			category: "afternoon"
		},
		{
			id: "d2-14",
			day: 2,
			time: "12:45 PM – 2:15 PM",
			activity: "Lunch",
			venue: "Annexure 3 Venues",
			coordinator: "Student Branch Incharges & Discipline Incharges",
			category: "lunch"
		},
		{
			id: "d2-15",
			day: 2,
			time: "2:15 PM – 2:30 PM",
			activity: "Movement of Students to Respective Venues",
			venue: "Respective Venues",
			coordinator: "Student Mentors",
			category: "afternoon"
		},
		{
			id: "d2-16",
			day: 2,
			time: "2:30 PM – 3:00 PM",
			activity: "Club Presentations Slot 3: Group A (Rotaract in L-26), Group B (ELC in L-27), Group C (ASPS in L-28), Group D (ATS in L-29), Group E (IIM in Auditorium), Group F (IEEE in Aero Audi), Group G (NSS in L-30), Group H (IGS in L-31)",
			venue: "Respective Lecture Halls / Audi",
			coordinator: "Respective P/I's of Club, Societies, Cells, NSS & NCC to coordinate and supervise.",
			category: "afternoon"
		},
		{
			id: "d2-17",
			day: 2,
			time: "3:00 PM – 3:30 PM",
			activity: "Club Presentations Slot 4: Group A (ELC in L-26), Group B (ASPS in L-27), Group C (ATS in L-28), Group D (IIM in L-29), Group E (IEEE in Auditorium), Group F (NSS in Aero Audi), Group G (IGS in L-30), Group H (ES in L-31)",
			venue: "Respective Lecture Halls / Audi",
			coordinator: "Respective P/I's of Club, Societies, Cells, NSS & NCC to coordinate and supervise.",
			category: "afternoon"
		},
		{
			id: "d2-18",
			day: 2,
			time: "3:30 PM – 4:00 PM",
			activity: "Evening Snacks",
			venue: "Respective Venues",
			coordinator: "Organizing Committee",
			category: "afternoon"
		},
		{
			id: "d2-19",
			day: 2,
			time: "4:00 PM – 4:15 PM",
			activity: "Movement of Students to Respective Venues",
			venue: "Respective Venues",
			coordinator: "Student Mentors",
			category: "afternoon"
		},
		{
			id: "d2-20",
			day: 2,
			time: "4:15 PM – 5:45 PM",
			activity: "Parallel Evening Displays: Technical Display (T1 in Centenary Hall) | Sports (S1 in Athletic Ground) | Music (A3 in Auditorium)",
			venue: "Centenary Hall / Athletic Ground / Auditorium",
			coordinator: "Respective P/I's of Club, Societies, Cells & Sports to coordinate and supervise.",
			category: "afternoon",
			highlight: true
		}
	],
	3: [
		{
			id: "d3-1",
			day: 3,
			time: "8:30 AM – 9:15 AM",
			activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 3)",
			venue: "Annexure 1 (Day 3) Venues",
			coordinator: "Respective Faculty Incharges & Student Branch Incharge",
			category: "morning",
			highlight: true
		},
		{
			id: "d3-2",
			day: 3,
			time: "9:15 AM – 9:30 AM",
			activity: "Address by Head, SCC",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa",
			category: "morning"
		},
		{
			id: "d3-3",
			day: 3,
			time: "9:30 AM – 9:45 AM",
			activity: "Address By Head, Alumni Relations",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa",
			category: "morning"
		},
		{
			id: "d3-4",
			day: 3,
			time: "9:45 AM – 10:00 AM",
			activity: "Address by Head, Library",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa",
			category: "morning"
		},
		{
			id: "d3-5",
			day: 3,
			time: "10:00 AM – 10:20 AM",
			activity: "Address by Head, CDGC",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa",
			category: "morning",
			highlight: true
		},
		{
			id: "d3-6",
			day: 3,
			time: "10:20 AM – 11:20 AM",
			activity: "Speaker Session 1",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa",
			category: "morning"
		},
		{
			id: "d3-7",
			day: 3,
			time: "11:20 AM – 12:20 PM",
			activity: "Speaker Session 2",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa",
			category: "morning"
		},
		{
			id: "d3-8",
			day: 3,
			time: "12:20 PM – 12:30 PM",
			activity: "Felicitation and Vote of Thanks",
			venue: "Auditorium",
			coordinator: "Prof. Nidhi Tanwar, Prof. Shilpa",
			category: "morning"
		},
		{
			id: "d3-9",
			day: 3,
			time: "12:30 PM – 12:45 PM",
			activity: "Movement of Students to Respective Hostels",
			venue: "Annexure 3",
			coordinator: "Student Branch Incharges & Discipline Incharges",
			category: "lunch"
		},
		{
			id: "d3-10",
			day: 3,
			time: "12:45 PM – 2:15 PM",
			activity: "Lunch",
			venue: "Annexure 3 Venues",
			coordinator: "Student Branch Incharges & Discipline Incharges",
			category: "lunch"
		},
		{
			id: "d3-11",
			day: 3,
			time: "2:15 PM – 2:30 PM",
			activity: "Movement of Students to Respective Venues",
			venue: "Respective Venues",
			coordinator: "Student Mentors",
			category: "afternoon"
		},
		{
			id: "d3-12",
			day: 3,
			time: "2:30 PM – 3:00 PM",
			activity: "Club Presentations Slot 5: Group A (Robotics in L-26), Group B (HEB in Aero Audi), Group C (EEB in L-27), Group D (SAASC in L-28), Group E (ACM in L-29), Group F (EIC in L-30), Group G (WEC in Auditorium), Group H (NCC in L-31)",
			venue: "Respective Lecture Halls / Audi",
			coordinator: "Respective P/I's of Club, Societies, Cells, NSS & NCC to coordinate and supervise.",
			category: "afternoon"
		},
		{
			id: "d3-13",
			day: 3,
			time: "3:00 PM – 3:30 PM",
			activity: "Club Presentations Slot 6: Group A (SCC in L-26), Group B (SAE in Aero Audi), Group C (PDC in L-27), Group D (SME in L-28), Group E (CIM in L-29), Group F (ASCE in L-30), Group G (Robotics in Auditorium), Group H (APC in L-31)",
			venue: "Respective Lecture Halls / Audi",
			coordinator: "Respective P/I's of Club, Societies, Cells, NSS & NCC to coordinate and supervise.",
			category: "afternoon"
		},
		{
			id: "d3-14",
			day: 3,
			time: "3:30 PM – 4:00 PM",
			activity: "Evening Snacks",
			venue: "Respective Venues",
			coordinator: "Organizing Committee",
			category: "afternoon"
		},
		{
			id: "d3-15",
			day: 3,
			time: "4:00 PM – 4:15 PM",
			activity: "Movement of Students to Respective Venues",
			venue: "Respective Venues",
			coordinator: "Student Mentors",
			category: "afternoon"
		},
		{
			id: "d3-16",
			day: 3,
			time: "4:15 PM – 5:45 PM",
			activity: "Parallel Evening Displays: Tech Display (T2 in Centenary Hall) | Sports (S2 in Athletic Ground) | Drams (A1 in Auditorium)",
			venue: "Centenary Hall / Athletic Ground / Auditorium",
			coordinator: "Respective P/I's of Club, Societies, Cells & Sports to supervise.",
			category: "afternoon",
			highlight: true
		}
	],
	4: [
		{
			id: "d4-1",
			day: 4,
			time: "9:00 AM – 9:30 AM",
			activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 4)",
			venue: "Annexure 1 (Day 4) Venues",
			coordinator: "Respective Faculty Incharges & Student Branch Incharges",
			category: "morning",
			highlight: true
		},
		{
			id: "d4-2",
			day: 4,
			time: "9:30 AM – 10:30 AM",
			activity: "Speaker Session",
			venue: "Auditorium",
			coordinator: "Faculty Coordinators",
			category: "morning",
			highlight: true
		},
		{
			id: "d4-3",
			day: 4,
			time: "10:30 AM – 11:00 AM",
			activity: "Club Slot 7: Group A (SME in L-31), Group B (CIM in L-26), Group C (IGS in Aero Audi), Group D (ES in L-27)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies, Cells, NSS & NCC",
			category: "morning"
		},
		{
			id: "d4-4",
			day: 4,
			time: "11:00 AM – 11:30 AM",
			activity: "Club Slot 8: Group A (ATS in L-31), Group B (IIM in L-26), Group C (APC in Aero Audi), Group D (SESI in L-27)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies, Cells, NSS & NCC",
			category: "morning"
		},
		{
			id: "d4-5",
			day: 4,
			time: "11:30 AM – 12:00 PM",
			activity: "Club Slot 9: Group A (EEB in L-31), Group B (IEEE in L-26), Group C (HEB in Aero Audi)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies, Cells, NSS & NCC",
			category: "morning"
		},
		{
			id: "d4-6",
			day: 4,
			time: "10:30 AM – 12:00 PM",
			activity: "Cultural / PEB: Group A2 (PEB in Auditorium)",
			venue: "Auditorium",
			coordinator: "Cultural Committee",
			category: "morning"
		},
		{
			id: "d4-7",
			day: 4,
			time: "12:00 PM – 12:15 PM",
			activity: "Movement of Students to Respective Hostels",
			venue: "Campus",
			coordinator: "Student Branch Incharges",
			category: "lunch"
		},
		{
			id: "d4-8",
			day: 4,
			time: "12:15 PM – 1:45 PM",
			activity: "Lunch",
			venue: "Annexure 3 Venues",
			coordinator: "Student Branch Incharges & Discipline Incharges",
			category: "lunch"
		},
		{
			id: "d4-9",
			day: 4,
			time: "1:45 PM – 2:00 PM",
			activity: "Movement of Students to Respective Venues",
			venue: "Campus",
			coordinator: "Student Mentors",
			category: "afternoon"
		},
		{
			id: "d4-10",
			day: 4,
			time: "1:15 PM – 2:45 PM",
			activity: "Group A3 (Music in Auditorium)",
			venue: "Auditorium",
			coordinator: "Music Society",
			category: "afternoon"
		},
		{
			id: "d4-11",
			day: 4,
			time: "2:45 PM – 4:15 PM",
			activity: "Group A3 (PEB in Auditorium)",
			venue: "Auditorium",
			coordinator: "Cultural Committee",
			category: "afternoon"
		},
		{
			id: "d4-12",
			day: 4,
			time: "2:00 PM – 2:30 PM",
			activity: "Club Slot 10: Group A (IIM in L-31), Group B (SME in L-26), Group E (WEC in L-27), Group G (PDC in Aero Audi)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "afternoon"
		},
		{
			id: "d4-13",
			day: 4,
			time: "2:30 PM – 3:00 PM",
			activity: "Club Slot 11: Group A (NSS in L-31), Group B (IGS in L-26), Group E (EIC in L-27), Group G (ASME in L-29)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "afternoon"
		},
		{
			id: "d4-14",
			day: 4,
			time: "3:00 PM – 3:30 PM",
			activity: "Club Slot 12: Group A (ASCE in L-31), Group B (ACM in L-26), Group E (NCC in L-27), Group G (HEB in Aero Audi)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "afternoon"
		},
		{
			id: "d4-15",
			day: 4,
			time: "3:30 PM – 4:00 PM",
			activity: "Club Slot 13: Group A (ASPS in L-31), Group B (ATS in L-26), Group E (HEB in L-27), Group G (ELC in Aero Audi)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "afternoon"
		},
		{
			id: "d4-16",
			day: 4,
			time: "4:00 PM – 4:30 PM",
			activity: "SNACKS",
			venue: "Respective Venues",
			coordinator: "Organizing Committee",
			category: "afternoon"
		},
		{
			id: "d4-17",
			day: 4,
			time: "4:30 PM – 4:40 PM",
			activity: "Movement of Students to Respective Venues",
			venue: "Campus",
			coordinator: "Student Mentors",
			category: "afternoon"
		},
		{
			id: "d4-18",
			day: 4,
			time: "4:40 PM – 6:00 PM",
			activity: "Parallel Evening Displays: Drams (A2 in Auditorium) | Technical Display (T4 in Centenary Hall) | Sports (S4 in Athletics Ground)",
			venue: "Auditorium / Centenary Hall / Athletics Ground",
			coordinator: "Respective P/I's of Club, Societies, Cells & Sports",
			category: "afternoon",
			highlight: true
		}
	],
	5: [
		{
			id: "d5-1",
			day: 5,
			time: "8:30 AM – 9:00 AM",
			activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 5)",
			venue: "Annexure 1 (Day 5) Venues",
			coordinator: "Respective Faculty Incharges & Student Branch Incharge",
			category: "morning",
			highlight: true
		},
		{
			id: "d5-2",
			day: 5,
			time: "9:00 AM – 9:45 AM",
			activity: "Speaker Session",
			venue: "Auditorium",
			coordinator: "Faculty Coordinators",
			category: "morning"
		},
		{
			id: "d5-3",
			day: 5,
			time: "9:45 AM – 11:15 AM",
			activity: "Cultural / Drams: Group A1 (Drams in Auditorium)",
			venue: "Auditorium",
			coordinator: "Dramatics Club",
			category: "morning",
			highlight: true
		},
		{
			id: "d5-4",
			day: 5,
			time: "9:45 AM – 10:15 AM",
			activity: "Club Slot 14: Group C (CIM in L-30), Group D (ASCE in L-31), Group E (APC in L-26), Group F (NCC in L-27), Group G (Rotaract in L-28), Group H (SAASC in Aero Audi)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies, Cells, NSS & NCC",
			category: "morning"
		},
		{
			id: "d5-5",
			day: 5,
			time: "10:15 AM – 10:45 AM",
			activity: "Club Slot 15: Group C (ES in L-30), Group D (EIC in L-31), Group E (IGS in L-26), Group F (ELC in L-27), Group G (SCC in L-28), Group H (HEB in L-29)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies, Cells, NSS & NCC",
			category: "morning"
		},
		{
			id: "d5-6",
			day: 5,
			time: "10:45 AM – 11:15 AM",
			activity: "Club Slot 16: Group A (SAASC in Auditorium), Group B (WEC in L-29), Group C (IIM in L-30), Group D (ASME in L-31), Group E (EIC in L-26), Group F (HEB in L-27), Group H (ELC in Aero Audi)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies, Cells, NSS & NCC",
			category: "morning"
		},
		{
			id: "d5-7",
			day: 5,
			time: "11:15 AM – 11:45 AM",
			activity: "Club Slot 17: Group A (EIC in L-28), Group B (NSS in L-29), Group C (NCC in L-30), Group D (SAE in L-31)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies, Cells, NSS & NCC",
			category: "morning"
		},
		{
			id: "d5-8",
			day: 5,
			time: "11:45 AM – 12:15 PM",
			activity: "Club Slot 18: Group A (IEEE in L-28), Group B (ASME in L-29), Group D (NSS in L-31)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies, Cells, NSS & NCC",
			category: "morning"
		},
		{
			id: "d5-9",
			day: 5,
			time: "11:45 AM – 1:15 PM",
			activity: "Cultural / PEB: Group A2 (PEB in Auditorium)",
			venue: "Auditorium",
			coordinator: "Cultural Committee",
			category: "morning"
		}
	],
	6: [
		{
			id: "d6-1",
			day: 6,
			time: "9:00 AM – 9:30 AM",
			activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 6)",
			venue: "Annexure 1 (Day 6) Venues",
			coordinator: "Respective Faculty Incharges & Student Branch Incharge",
			category: "morning",
			highlight: true
		},
		{
			id: "d6-2",
			day: 6,
			time: "9:30 AM – 10:30 AM",
			activity: "Speaker Session",
			venue: "Auditorium",
			coordinator: "Faculty Coordinators",
			category: "morning",
			highlight: true
		},
		{
			id: "d6-3",
			day: 6,
			time: "10:30 AM – 11:00 AM",
			activity: "Club Slot 19: Group A (ES in L-29), Group B (SCC in L-30), Group C (ACM in L-31), Group D (EEB in Auditorium), Group E (SAASC in Aero Audi), Group F (CIM in L-26), Group G (EIC in L-27), Group H (WEC in L-28)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "morning"
		},
		{
			id: "d6-4",
			day: 6,
			time: "11:00 AM – 11:30 AM",
			activity: "Club Slot 20: Group A (NCC in L-29), Group B (Robotics in L-30), Group C (SAE in L-31), Group D (PDC in Auditorium), Group E (SME in Aero Audi), Group F (ES in L-26), Group G (ASCE in L-27), Group H (ASME in L-28)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "morning"
		},
		{
			id: "d6-5",
			day: 6,
			time: "11:30 AM – 12:00 PM",
			activity: "Club Slot 21: Group A (APC in L-29), Group B (SESI in L-30), Group C (Rotaract in L-31), Group D (ELC in Auditorium), Group E (ASPS in Aero Audi), Group F (ATS in L-26), Group G (IIM in L-27), Group H (IEEE in L-28)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "morning"
		},
		{
			id: "d6-6",
			day: 6,
			time: "12:00 PM – 12:30 PM",
			activity: "Club Slot 22: Group C (ASCE in L-31), Group G (EEB in L-27), Group E (SCC in Aero Audi), Group F (PDC in L-26), Group H (ACM in L-28)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "morning"
		},
		{
			id: "d6-7",
			day: 6,
			time: "12:00 PM – 12:15 PM",
			activity: "Movement of Students to Respective Venues",
			venue: "Campus",
			coordinator: "Student Branch Incharge",
			category: "lunch"
		},
		{
			id: "d6-8",
			day: 6,
			time: "12:45 PM – 2:15 PM",
			activity: "Lunch",
			venue: "Annexure 3 Venues",
			coordinator: "Student Branch Incharges & Discipline Incharges",
			category: "lunch"
		},
		{
			id: "d6-9",
			day: 6,
			time: "2:15 PM – 2:30 PM",
			activity: "Movement of Students to Respective Venues",
			venue: "Campus",
			coordinator: "Student Mentors",
			category: "afternoon"
		},
		{
			id: "d6-10",
			day: 6,
			time: "2:30 PM – 3:00 PM",
			activity: "Club Slot 23: Group A (IGS in L-29), Group B (ES in L-30), Group C (Robotics in L-31), Group D (HEB in Auditorium), Group E (ASCE in Aero Audi), Group F (SAASC in L-26), Group G (ACM in L-27), Group H (EIC in L-28)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "afternoon"
		},
		{
			id: "d6-11",
			day: 6,
			time: "3:00 PM – 3:30 PM",
			activity: "Club Slot 24: Group A (WEC in L-29), Group B (NCC in L-30), Group C (SCC in L-31), Group D (Robotics in Auditorium), Group E (ASME in Aero Audi), Group F (SME in L-26), Group G (CIM in L-27), Group H (ASCE in L-28)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "afternoon"
		},
		{
			id: "d6-12",
			day: 6,
			time: "3:30 PM – 4:00 PM",
			activity: "Club Slot 25: Group A (ASME in L-29), Group B (APC in L-30), Group C (SESI in L-31), Group D (Rotaract in Auditorium), Group E (ELC in Aero Audi), Group F (ASPS in L-26), Group G (ATS in L-27), Group H (IIM in L-28)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "afternoon"
		},
		{
			id: "d6-13",
			day: 6,
			time: "4:00 PM – 4:30 PM",
			activity: "Evening Snacks",
			venue: "Respective Venues",
			coordinator: "Organizing Committee",
			category: "afternoon"
		},
		{
			id: "d6-14",
			day: 6,
			time: "4:30 PM – 4:40 PM",
			activity: "Movement of Students to Respective Venues",
			venue: "Campus",
			coordinator: "Student Mentors",
			category: "afternoon"
		},
		{
			id: "d6-15",
			day: 6,
			time: "4:40 PM – 6:00 PM",
			activity: "Parallel Evening Displays: Technical Display (T3 in Centenary Hall) | Sports (S3 in Athletics Ground) | Music (A2 in Auditorium)",
			venue: "Centenary Hall / Athletics Ground / Auditorium",
			coordinator: "Respective P/I's of Club, Societies, Cells & Sports",
			category: "afternoon",
			highlight: true
		}
	],
	7: [
		{
			id: "d7-1",
			day: 7,
			time: "8:30 AM – 9:00 AM",
			activity: "Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 7)",
			venue: "Annexure 1 (Day 7) Venues",
			coordinator: "Respective Faculty Incharges & Student Branch Inchargess",
			category: "morning",
			highlight: true
		},
		{
			id: "d7-2",
			day: 7,
			time: "9:00 AM – 9:30 AM",
			activity: "Club Slot 26: Group A (ACM in Auditorium), Group B (EIC in L-28), Group C (WEC in L-29), Group D (NCC in L-30), Group E (Robotics in L-31), Group F (SAE in L-26), Group G (SESI in Aero Audi), Group H (SME in L-27)",
			venue: "Respective Venues",
			coordinator: "Faculty & Student Branch Incharges",
			category: "morning"
		},
		{
			id: "d7-3",
			day: 7,
			time: "9:30 AM – 10:00 AM",
			activity: "Club Slot 27: Group A (CIM in Auditorium), Group B (SAASC in L-28), Group C (IEEE in L-29), Group D (APC in L-30), Group E (SESI in L-31), Group F (Rotaract in L-26), Group G (SAASC in Aero Audi), Group H (ASPS in L-27)",
			venue: "Respective Venues",
			coordinator: "Faculty & Student Branch Incharges",
			category: "morning"
		},
		{
			id: "d7-4",
			day: 7,
			time: "10:00 AM – 10:30 AM",
			activity: "Club Slot 28: Group D (IGS in L-30), Group E (ES in L-31), Group F (SCC in L-26), Group G (SAE in Aero Audi), Group H (EEB in L-27)",
			venue: "Respective Venues",
			coordinator: "Faculty & Student Branch Incharges",
			category: "morning"
		},
		{
			id: "d7-5",
			day: 7,
			time: "10:30 AM – 11:00 AM",
			activity: "Club Slot 29: Group A (SESI in Auditorium), Group B (Rotaract in L-28), Group C (ASME in L-29), Group D (SCC in L-30), Group E (Rotaract in L-31), Group F (IIM in L-26), Group G (ASPS in Aero Audi), Group H (NSS in L-27)",
			venue: "Respective Venues",
			coordinator: "Faculty & Student Branch Incharges",
			category: "morning"
		},
		{
			id: "d7-6",
			day: 7,
			time: "11:00 AM – 11:30 AM",
			activity: "Club Slot 30: Group D (IEEE in L-30), Group E (ATS in L-31), Group F (EEB in L-26), Group G (ES in Aero Audi), Group H (SCC in L-27)",
			venue: "Respective Venues",
			coordinator: "Faculty & Student Branch Incharges",
			category: "morning"
		},
		{
			id: "d7-7",
			day: 7,
			time: "11:30 AM – 12:00 PM",
			activity: "Club Slot 31: Group D (WEC in L-30), Group E (NSS in L-31), Group F (Robotics in L-26), Group G (IEEE in Aero Audi), Group H (Rotaract in L-27)",
			venue: "Respective Venues",
			coordinator: "Faculty & Student Branch Incharges",
			category: "morning"
		},
		{
			id: "d7-8",
			day: 7,
			time: "12:30 PM – 12:45 PM",
			activity: "Movement of Students to Respective Hostels",
			venue: "Campus",
			coordinator: "Student Branch Incharges",
			category: "lunch"
		},
		{
			id: "d7-9",
			day: 7,
			time: "12:45 PM – 2:15 PM",
			activity: "Lunch",
			venue: "Annexure 3 Venues",
			coordinator: "Student Branch Incharges & Discipline Incharges",
			category: "lunch"
		},
		{
			id: "d7-10",
			day: 7,
			time: "1:45 PM – 2:15 PM",
			activity: "Club Slot 32: Group A (PDC in Audi), Group B (PDC in Audi), Group C (NSS in L-29), Group D (ASPS in L-30), Group E (Rotaract in L-31), Group F (IGS in L-26), Group G (SME in Aero Audi), Group H (SAE in L-27)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies, NSS & NCC",
			category: "afternoon"
		},
		{
			id: "d7-11",
			day: 7,
			time: "2:15 PM – 2:45 PM",
			activity: "Club Slot 33: Group E (SAE in L-31), Group F (APC in L-26), Group H (PDC in L-27)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "afternoon"
		},
		{
			id: "d7-12",
			day: 7,
			time: "2:45 PM – 3:15 PM",
			activity: "Club Slot 34: Group C (ELC in L-29), Group F (ACM in L-26), Group H (ATS in L-27)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "afternoon"
		},
		{
			id: "d7-13",
			day: 7,
			time: "3:15 PM – 3:45 PM",
			activity: "Club Slot 35: Group F (SESI in L-26), Group H (CIM in L-27)",
			venue: "Respective Venues",
			coordinator: "P/Is of Club, Societies & Cells",
			category: "afternoon"
		},
		{
			id: "d7-14",
			day: 7,
			time: "4:00 PM – 4:15 PM",
			activity: "Movement of Students",
			venue: "Campus",
			coordinator: "Student Branch Incharges & Discipline Incharges",
			category: "afternoon"
		},
		{
			id: "d7-15",
			day: 7,
			time: "4:15 PM onwards",
			activity: "Grand FUN Event & Batch 2030 Celebrations 🎉",
			venue: "Auditorium / Campus",
			coordinator: "Student Branch Incharges & Cultural Committee",
			category: "afternoon",
			highlight: true
		}
	]
};
var REPORTING_BRANCHES = [
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
		deptVisitVenue: "Auditorium"
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
		deptVisitVenue: "Aero Auditorium"
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
		deptVisitVenue: "Aero Auditorium"
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
		deptVisitVenue: "L-17"
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
		deptVisitVenue: "Seminar Hall, Aero Department"
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
		deptVisitVenue: "L-27"
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
		deptVisitVenue: "L-26"
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
		deptVisitVenue: "Auditorium"
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
		deptVisitVenue: "Auditorium"
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
		deptVisitVenue: "Mathematics Lab near T5"
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
		deptVisitVenue: "L-28"
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
		deptVisitVenue: "Seminar Hall, MMED"
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
		deptVisitVenue: "L-17"
	}
];
function OrientationPage() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("all");
	const [selectedDay, setSelectedDay] = (0, import_react.useState)(1);
	const [selectedBranchCode, setSelectedBranchCode] = (0, import_react.useState)("CSE");
	const [venueRouteTab, setVenueRouteTab] = (0, import_react.useState)("audi");
	const [scheduleCategory, setScheduleCategory] = (0, import_react.useState)("all");
	const [scheduleSearch, setScheduleSearch] = (0, import_react.useState)("");
	const [activeAnnexure, setActiveAnnexure] = (0, import_react.useState)("none");
	const [allScheduleData, setAllScheduleData] = (0, import_react.useState)(SCHEDULE_DATA_BY_DAY);
	const [lightboxImage, setLightboxImage] = (0, import_react.useState)(null);
	const [mapZoom, setMapZoom] = (0, import_react.useState)(1);
	const [mapPosition, setMapPosition] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const dragStartRef = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	(0, import_react.useEffect)(() => {
		fetchOrientationData().then((data) => {
			if (data && Array.isArray(data.schedule) && data.schedule.length > 0) {
				const grouped = {
					1: [],
					2: [],
					3: [],
					4: [],
					5: [],
					6: [],
					7: []
				};
				data.schedule.forEach((item) => {
					if (!item) return;
					const d = Number(item.day || item.day_number) || 1;
					if (!grouped[d]) grouped[d] = [];
					grouped[d].push({
						id: String(item.id || Math.random()),
						day: d,
						time: item.time_slot || item.time || "",
						activity: item.activity || "",
						venue: item.venue || "",
						coordinator: item.coordinator || void 0,
						category: item.category || "morning"
					});
				});
				if (grouped[1] && grouped[1].length > 0) setAllScheduleData(grouped);
			}
		}).catch((err) => {
			console.warn("Orientation API fetch failed:", err);
		});
	}, []);
	const selectedBranch = (0, import_react.useMemo)(() => {
		return REPORTING_BRANCHES.find((b) => b.code === selectedBranchCode) || REPORTING_BRANCHES[0];
	}, [selectedBranchCode]);
	const currentDayEvents = (0, import_react.useMemo)(() => {
		const list = allScheduleData[selectedDay] || SCHEDULE_DATA_BY_DAY[selectedDay] || [];
		return Array.isArray(list) && list.length > 0 ? list : SCHEDULE_DATA_BY_DAY[selectedDay] || [];
	}, [allScheduleData, selectedDay]);
	const filteredSchedule = (0, import_react.useMemo)(() => {
		const query = (scheduleSearch || "").trim().toLowerCase();
		return currentDayEvents.filter((item) => {
			if (!item) return false;
			const matchCategory = scheduleCategory === "all" || item.category === scheduleCategory;
			const matchSearch = query === "" || Boolean(item.activity && String(item.activity).toLowerCase().includes(query)) || Boolean(item.venue && String(item.venue).toLowerCase().includes(query)) || Boolean(item.coordinator && String(item.coordinator).toLowerCase().includes(query)) || Boolean(item.time && String(item.time).toLowerCase().includes(query));
			return matchCategory && matchSearch;
		});
	}, [
		currentDayEvents,
		scheduleCategory,
		scheduleSearch
	]);
	const handleZoomIn = () => setMapZoom((prev) => Math.min(prev + .3, 3));
	const handleZoomOut = () => setMapZoom((prev) => Math.max(prev - .3, .8));
	const handleResetZoom = () => {
		setMapZoom(1);
		setMapPosition({
			x: 0,
			y: 0
		});
	};
	const handleMouseDown = (e) => {
		setIsDragging(true);
		dragStartRef.current = {
			x: e.clientX - mapPosition.x,
			y: e.clientY - mapPosition.y
		};
	};
	const handleMouseMove = (e) => {
		if (!isDragging) return;
		setMapPosition({
			x: e.clientX - dragStartRef.current.x,
			y: e.clientY - dragStartRef.current.y
		});
	};
	const handleMouseUp = () => setIsDragging(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen w-full bg-background pb-20 text-foreground overflow-x-hidden",
		children: [
			lightboxImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200",
				onClick: () => setLightboxImage(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full items-center justify-between pb-3 text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-semibold tracking-wide flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-amber-400" }), lightboxImage.title]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setLightboxImage(null),
							className: "rounded-full bg-white/10 p-2 hover:bg-white/20 transition text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full overflow-auto rounded-2xl border border-white/10 bg-black/50 p-2 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: lightboxImage.src,
							alt: lightboxImage.title,
							className: "max-h-[80vh] w-auto rounded-lg object-contain"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative border-b border-border/80 bg-gradient-to-b from-primary/10 via-surface to-background px-4 py-8 sm:px-8 sm:py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "Official Freshers Orientation 2026 – 2030"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl sm:text-4xl font-extrabold tracking-tight",
								children: "PEC Orientation Schedule & Campus Navigator"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1.5 max-w-2xl",
								children: "Complete 7-Day interactive schedule (19th – 25th August 2026), branch reporting venues, campus maps, and official annexures."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setLightboxImage({
										src: "/orientation/pec-orientation-map.png",
										title: "PEC Orientation 2026 Full Campus Map"
									}),
									className: "flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold hover:bg-surface-elevated transition shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Full Map" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#day-schedule",
									className: "flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition shadow-sm glow-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Orientation Schedule" })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2 pt-2",
							children: [
								{
									id: "all",
									label: "Full Overview",
									icon: Layers
								},
								{
									id: "venues",
									label: "Reporting Venues & Routes",
									icon: Building
								},
								{
									id: "map",
									label: "Interactive Campus Map",
									icon: MapPin
								},
								{
									id: "schedule",
									label: "Day-by-Day Schedule",
									icon: Clock
								}
							].map((tab) => {
								const Icon = tab.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setActiveTab(tab.id),
									className: `flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${activeTab === tab.id ? "bg-primary text-primary-foreground shadow-sm" : "border border-border/80 bg-surface/60 text-muted-foreground hover:bg-surface hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label })]
								}, tab.id);
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 sm:px-8 py-8 space-y-12",
				children: [
					(activeTab === "all" || activeTab === "venues") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "reporting-venues",
						className: "space-y-8 animate-fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-500",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold tracking-tight",
										children: "Day 1 Reporting Venues & How to Reach"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: [
										"Mandatory attendance reporting at ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "8:30 AM – 9:30 AM" }),
										" on Wednesday, 19th August 2026."
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 w-full sm:w-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "branch-select",
										className: "text-xs font-semibold text-muted-foreground shrink-0",
										children: "Select Your Branch:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										id: "branch-select",
										value: selectedBranchCode,
										onChange: (e) => {
											setSelectedBranchCode(e.target.value);
											const b = REPORTING_BRANCHES.find((item) => item.code === e.target.value);
											if (b) setVenueRouteTab(b.routeType);
										},
										className: "w-full sm:w-auto min-w-0 max-w-full truncate rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 shadow-sm",
										children: REPORTING_BRANCHES.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: b.code,
											children: [
												b.code,
												" — ",
												b.name
											]
										}, b.code))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface to-background p-5 sm:p-6 shadow-md relative overflow-hidden space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border/60 pb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm",
													children: selectedBranch.code
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-lg bg-surface border border-border px-2.5 py-1 text-xs font-mono font-semibold text-muted-foreground",
													children: selectedBranch.group
												}),
												selectedBranch.studentsCount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "rounded-lg bg-surface border border-border px-2.5 py-1 text-xs font-mono font-semibold text-muted-foreground",
													children: [selectedBranch.studentsCount, " Students"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-500",
													children: "Day 1 Reporting: 8:30 AM – 9:30 AM"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-xl sm:text-2xl font-black text-foreground mt-2",
											children: selectedBranch.name
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-left lg:text-right",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] uppercase font-bold text-muted-foreground tracking-wider block",
													children: "Day 1 Morning Venue"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-xl font-extrabold text-primary font-mono block mt-0.5",
													children: ATTENDANCE_VENUES_BY_DAY[selectedBranch.code]?.[1] || selectedBranch.venueName
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-muted-foreground",
													children: [
														selectedBranch.building,
														" (",
														selectedBranch.floor,
														")"
													]
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold text-muted-foreground uppercase tracking-wider block",
											children: "7-Day Morning Attendance Plan (Annexure 1):"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center",
											children: [
												1,
												2,
												3,
												4,
												5,
												6,
												7
											].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												onClick: () => setSelectedDay(d),
												className: `cursor-pointer rounded-xl border p-2 text-xs transition ${selectedDay === d ? "border-primary bg-primary/10 shadow-sm" : "border-border bg-surface-elevated/50 hover:border-primary/40"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] font-bold text-muted-foreground block",
													children: ["Day ", d]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground truncate block font-mono",
													children: ATTENDANCE_VENUES_BY_DAY[selectedBranch.code]?.[d] || "—"
												})]
											}, d))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-border bg-surface/80 p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs font-bold text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-4 w-4 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Turn-by-Turn Directions from Gate 2 (Main Campus Gate):" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground leading-relaxed",
											children: selectedBranch.gateDirections
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-2 text-xs pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Day 1 Department Visit (2:00 PM – 4:00 PM):"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground bg-surface border border-border px-3 py-1 rounded-lg",
											children: selectedBranch.deptVisitVenue || "Respective Department"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-lg font-bold tracking-tight flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "How to Reach Reporting Buildings (Visual Route Maps)" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Switch between the Auditorium and NAB routes to view the official photographic directions from Gate 2."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex rounded-xl border border-border bg-surface p-1 self-start sm:self-auto",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setVenueRouteTab("audi"),
											className: `rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${venueRouteTab === "audi" ? "bg-primary text-primary-foreground shadow-sm glow-primary" : "text-muted-foreground hover:text-foreground"}`,
											children: "Auditorium Route (CSE, ECE, VLSI)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setVenueRouteTab("nab"),
											className: `rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${venueRouteTab === "nab" ? "bg-primary text-primary-foreground shadow-sm glow-primary" : "text-muted-foreground hover:text-foreground"}`,
											children: "NAB Route (Aero, Elec, Civil, AI, DS, Mech, etc.)"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "lg:col-span-7 rounded-3xl border border-border bg-surface/50 overflow-hidden shadow-xl group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute top-3 right-3 z-10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => setLightboxImage({
														src: venueRouteTab === "audi" ? "/orientation/reporting-venue-audi.png" : "/orientation/reporting-venue-nab.png",
														title: venueRouteTab === "audi" ? "Auditorium Reporting Route Map" : "New Academic Block (NAB) Reporting Route Map"
													}),
													className: "flex items-center gap-1.5 rounded-xl bg-black/70 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white hover:bg-black/90 transition shadow-md",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Expand / Zoom" })]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: venueRouteTab === "audi" ? "/orientation/reporting-venue-audi.png" : "/orientation/reporting-venue-nab.png",
												alt: venueRouteTab === "audi" ? "Reporting on Day 1 for CSE, ECE, VLSI" : "Reporting on Day 1 for NAB Branches",
												className: "w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01] cursor-pointer",
												onClick: () => setLightboxImage({
													src: venueRouteTab === "audi" ? "/orientation/reporting-venue-audi.png" : "/orientation/reporting-venue-nab.png",
													title: venueRouteTab === "audi" ? "Auditorium Reporting Route Map" : "New Academic Block (NAB) Reporting Route Map"
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-border/60 bg-surface px-4 py-3 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: venueRouteTab === "audi" ? "📌 Route: Enter Gate 2 ➔ PEC Roundabout ➔ Turn RIGHT to Auditorium" : "📌 Route: Enter Gate 2 ➔ Roundabout ➔ Go past Library ➔ Turn RIGHT past CSRC & Nescafe to NAB"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-mono text-primary shrink-0",
												children: "Tap image to zoom in modal"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "lg:col-span-5 space-y-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-3xl border border-border bg-surface p-5 space-y-4 shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-b border-border/60 pb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
													className: "text-sm font-bold tracking-tight flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: venueRouteTab === "audi" ? "Auditorium Venue Breakdown" : "New Academic Block (NAB) Floor Guide" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-mono uppercase bg-surface-elevated px-2 py-0.5 rounded border border-border text-primary font-bold",
													children: venueRouteTab === "audi" ? "3 Branches" : "10 Branches"
												})]
											}), venueRouteTab === "audi" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold text-xs text-primary",
															children: "Main Auditorium"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-mono bg-primary/20 text-primary px-2 py-0.5 rounded font-semibold",
															children: "Stage & Main Seating"
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs text-muted-foreground leading-relaxed",
														children: [
															"Primary reporting hall for ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CSE (Group A)" }),
															", ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ECE (Group B)" }),
															", and ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "VLSI (Group C)" }),
															"."
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2 text-xs",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between p-3 rounded-xl bg-surface border border-border",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																className: "text-foreground block",
																children: "Computer Science (CSE)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[11px] text-muted-foreground",
																children: "Group A · 137 Students"
															})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-mono text-primary font-bold",
																children: "Ground Floor"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between p-3 rounded-xl bg-surface border border-border",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																className: "text-foreground block",
																children: "Electronics & Comm (ECE)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[11px] text-muted-foreground",
																children: "Group B · 137 Students"
															})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-mono text-primary font-bold",
																children: "Ground Floor"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between p-3 rounded-xl bg-surface border border-border",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																className: "text-foreground block",
																children: "VLSI Design & Technology"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[11px] text-muted-foreground",
																children: "Group C · 36 Students"
															})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-mono text-primary font-bold",
																children: "Ground Floor"
															})]
														})
													]
												})]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2 text-xs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "p-3 rounded-xl bg-surface border border-border flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-foreground block",
															children: "Lecture Hall L-26"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] text-muted-foreground",
															children: "B.Design (25) & Aerospace (36)"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-mono text-primary font-bold",
															children: "Ground Floor"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "p-3 rounded-xl bg-surface border border-border flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-foreground block",
															children: "Lecture Hall L-27"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] text-muted-foreground",
															children: "Electrical Engineering (136)"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-mono text-primary font-bold",
															children: "Ground Floor"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "p-3 rounded-xl bg-surface border border-border flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-foreground block",
															children: "Lecture Hall L-28"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] text-muted-foreground",
															children: "Civil Engineering (136)"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-mono text-primary font-bold",
															children: "1st Floor"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "p-3 rounded-xl bg-surface border border-border flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-foreground block",
															children: "Lecture Hall L-29"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] text-muted-foreground",
															children: "AI (36), DS (67), M&C (36)"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-mono text-primary font-bold",
															children: "1st Floor"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "p-3 rounded-xl bg-surface border border-border flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-foreground block",
															children: "Lecture Hall L-30"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] text-muted-foreground",
															children: "Mechanical Engineering (137)"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-mono text-primary font-bold",
															children: "2nd Floor"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "p-3 rounded-xl bg-surface border border-border flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-foreground block",
															children: "Lecture Hall L-31"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] text-muted-foreground",
															children: "Metallurgy (69) & Production (46)"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-mono text-primary font-bold",
															children: "2nd Floor"
														})]
													})
												]
											})]
										})
									})]
								})]
							})
						]
					}),
					(activeTab === "all" || activeTab === "map") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "campus-map",
						className: "space-y-4 animate-fade-up",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold tracking-tight",
									children: "Orientation Campus Map"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: "Pinch or drag to zoom and pan. Inspect high resolution layout of Auditorium, NAB, Library, and Hostels."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: handleZoomIn,
										className: "rounded-lg border border-border bg-surface p-2 hover:bg-surface-elevated transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: handleZoomOut,
										className: "rounded-lg border border-border bg-surface p-2 hover:bg-surface-elevated transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: handleResetZoom,
										className: "rounded-lg border border-border bg-surface p-2 hover:bg-surface-elevated transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setLightboxImage({
											src: "/orientation/pec-orientation-map.png",
											title: "PEC Chandigarh — Orientation Master Campus Map"
										}),
										className: "flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-sm glow-primary hover:opacity-90 transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lightbox" })]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative rounded-3xl border border-border bg-black/40 overflow-hidden shadow-2xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative w-full h-[380px] sm:h-[500px] overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center",
								onMouseDown: handleMouseDown,
								onMouseMove: handleMouseMove,
								onMouseUp: handleMouseUp,
								onMouseLeave: handleMouseUp,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/orientation/pec-orientation-map.png",
									alt: "Punjab Engineering College Orientation Map",
									style: {
										transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapZoom})`,
										transition: isDragging ? "none" : "transform 0.15s ease-out"
									},
									className: "max-w-none w-full h-auto object-contain select-none pointer-events-none",
									draggable: false
								})
							})
						})]
					}),
					(activeTab === "all" || activeTab === "schedule") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "day-schedule",
						className: "space-y-6 animate-fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 border-b border-border/60 pb-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
												className: "text-xl font-bold tracking-tight",
												children: [
													"Day ",
													selectedDay,
													" Schedule — ",
													ORIENTATION_DAYS.find((d) => d.day === selectedDay)?.date
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground mt-1",
											children: ORIENTATION_DAYS.find((d) => d.day === selectedDay)?.title
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap items-center gap-1 rounded-xl border border-border bg-surface p-1",
												children: [
													{
														id: "all",
														label: "All"
													},
													{
														id: "morning",
														label: "Morning"
													},
													{
														id: "inaugural",
														label: "Inaugural"
													},
													{
														id: "lunch",
														label: "Lunch"
													},
													{
														id: "afternoon",
														label: "Afternoon"
													}
												].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setScheduleCategory(cat.id),
													className: `rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${scheduleCategory === cat.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
													children: cat.label
												}, cat.id))
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap items-center gap-2 py-1",
										children: ORIENTATION_DAYS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setSelectedDay(item.day),
											className: `rounded-2xl px-5 py-2.5 text-left border transition ${selectedDay === item.day ? "border-primary bg-primary text-primary-foreground shadow-md glow-primary" : "border-border/80 bg-surface/70 text-muted-foreground hover:bg-surface hover:text-foreground"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-bold opacity-80 block",
												children: item.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-extrabold block",
												children: item.date
											})]
										}, item.day))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-3.5 sm:p-4 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-8 w-8 place-items-center rounded-xl bg-primary/15 text-primary shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold text-foreground text-xs sm:text-sm",
													children: "Official B.Tech Orientation Schedule (Days 1 – 7)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] sm:text-xs text-muted-foreground mt-0.5",
													children: "Complete verified schedule for Batch 2026–2030 including all 7-day club presentations, speaker sessions, sports & displays."
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-500 shrink-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), "Official PDF Verified"]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl border border-border glass overflow-hidden shadow-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-left text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "border-b border-border bg-surface-elevated/70 text-[11px] uppercase font-bold text-muted-foreground tracking-wider",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-3.5 px-4 sm:px-6 w-36 sm:w-44",
													children: "Time"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-3.5 px-4 sm:px-6",
													children: "Activity / Event"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-3.5 px-4 sm:px-6 w-44 sm:w-56",
													children: "Venue"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-3.5 px-4 sm:px-6 w-48 sm:w-64",
													children: "Coordinator / Details"
												})
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
											className: "divide-y divide-border/60",
											children: [filteredSchedule.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: `transition hover:bg-surface-elevated/50 ${item.highlight ? "bg-primary/5 font-medium" : ""}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3.5 px-4 sm:px-6 font-mono font-semibold text-primary whitespace-nowrap align-top",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-primary/70 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.time })]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3.5 px-4 sm:px-6 align-top",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-semibold text-foreground text-sm",
															children: item.activity
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3.5 px-4 sm:px-6 align-top",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-flex items-center gap-1 font-medium text-foreground bg-surface border border-border/80 px-2 py-1 rounded-lg",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3 text-amber-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.venue })]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3.5 px-4 sm:px-6 text-muted-foreground align-top",
														children: item.coordinator ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-medium text-foreground block",
															children: item.coordinator
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground/60",
															children: "—"
														})
													})
												]
											}, item.id)), filteredSchedule.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												colSpan: 4,
												className: "py-8 text-center text-muted-foreground",
												children: "No schedule items matched your search query."
											}) })]
										})]
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "text-base font-bold tracking-tight flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-primary" }), "Official Annexures & Activity Groups"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Click any card to inspect full details"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												onClick: () => setActiveAnnexure(activeAnnexure === "1" ? "none" : "1"),
												className: `cursor-pointer rounded-2xl border p-4 transition ${activeAnnexure === "1" ? "border-primary bg-primary/5 shadow-md" : "border-border bg-surface hover:border-primary/40"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "grid h-6 w-6 place-items-center rounded-lg bg-primary/20 text-xs font-bold text-primary",
															children: "1"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-4 w-4 text-muted-foreground transition-transform ${activeAnnexure === "1" ? "rotate-90 text-primary" : ""}` })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-xs font-bold text-foreground block mt-2",
														children: "Annexure 1: Attendance"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 text-[11px] text-muted-foreground",
														children: "Day 1 to Day 7 seating plan for all 13 branches."
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												onClick: () => setActiveAnnexure(activeAnnexure === "2" ? "none" : "2"),
												className: `cursor-pointer rounded-2xl border p-4 transition ${activeAnnexure === "2" ? "border-emerald-500 bg-emerald-500/5 shadow-md" : "border-border bg-surface hover:border-emerald-500/40"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "grid h-6 w-6 place-items-center rounded-lg bg-emerald-500/20 text-xs font-bold text-emerald-500",
															children: "2"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-4 w-4 text-muted-foreground transition-transform ${activeAnnexure === "2" ? "rotate-90 text-emerald-500" : ""}` })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-xs font-bold text-foreground block mt-2",
														children: "Annexure 2: Lunch Plan"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 text-[11px] text-muted-foreground",
														children: "Centenary Hall, Shivalik Hostel & Kalpana Chawla Hostel."
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												onClick: () => setActiveAnnexure(activeAnnexure === "3" ? "none" : "3"),
												className: `cursor-pointer rounded-2xl border p-4 transition ${activeAnnexure === "3" ? "border-amber-500 bg-amber-500/5 shadow-md" : "border-border bg-surface hover:border-amber-500/40"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "grid h-6 w-6 place-items-center rounded-lg bg-amber-500/20 text-xs font-bold text-amber-500",
															children: "3"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-4 w-4 text-muted-foreground transition-transform ${activeAnnexure === "3" ? "rotate-90 text-amber-500" : ""}` })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-xs font-bold text-foreground block mt-2",
														children: "Annexure 3: Dept Visits"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 text-[11px] text-muted-foreground",
														children: "Day 1 department lab venues & student counts."
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												onClick: () => setActiveAnnexure(activeAnnexure === "groupings" ? "none" : "groupings"),
												className: `cursor-pointer rounded-2xl border p-4 transition ${activeAnnexure === "groupings" ? "border-violet-500 bg-violet-500/5 shadow-md" : "border-border bg-surface hover:border-violet-500/40"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "grid h-6 w-6 place-items-center rounded-lg bg-violet-500/20 text-xs font-bold text-violet-400",
															children: "★"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-4 w-4 text-muted-foreground transition-transform ${activeAnnexure === "groupings" ? "rotate-90 text-violet-400" : ""}` })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-xs font-bold text-foreground block mt-2",
														children: "Tech, Sports & Culture"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 text-[11px] text-muted-foreground",
														children: "T1–T4, S1–S4, and A1–A3 group distributions."
													})
												]
											})
										]
									}),
									activeAnnexure === "1" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-3xl border border-primary/20 bg-surface/90 p-6 space-y-4 animate-in fade-in duration-200",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "text-sm font-bold text-primary flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Annexure 1: Daily Morning Attendance Venues for all 13 Branches (Days 1–7)" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "overflow-x-auto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
												className: "w-full text-left text-xs border border-border/80 rounded-xl overflow-hidden",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
													className: "bg-surface-elevated text-muted-foreground uppercase font-bold text-[10px]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "py-2.5 px-3",
															children: "Branch"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "py-2.5 px-3",
															children: "Group"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "py-2.5 px-3",
															children: "Day 1 (19 Aug)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "py-2.5 px-3",
															children: "Day 2 (20 Aug)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "py-2.5 px-3",
															children: "Day 3 (21 Aug)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "py-2.5 px-3",
															children: "Day 4 (22 Aug)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "py-2.5 px-3",
															children: "Day 5 (23 Aug)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "py-2.5 px-3",
															children: "Day 6 (24 Aug)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "py-2.5 px-3",
															children: "Day 7 (25 Aug)"
														})
													] })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
													className: "divide-y divide-border/60",
													children: REPORTING_BRANCHES.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
														className: "hover:bg-surface-elevated/40",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-2 px-3 font-semibold text-foreground whitespace-nowrap",
																children: b.name
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-2 px-3 font-mono text-primary font-bold",
																children: b.group
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-2 px-3 font-mono font-medium whitespace-nowrap",
																children: ATTENDANCE_VENUES_BY_DAY[b.code]?.[1]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-2 px-3 font-mono font-medium whitespace-nowrap",
																children: ATTENDANCE_VENUES_BY_DAY[b.code]?.[2]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-2 px-3 font-mono font-medium whitespace-nowrap",
																children: ATTENDANCE_VENUES_BY_DAY[b.code]?.[3]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-2 px-3 font-mono font-medium whitespace-nowrap",
																children: ATTENDANCE_VENUES_BY_DAY[b.code]?.[4]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-2 px-3 font-mono font-medium whitespace-nowrap",
																children: ATTENDANCE_VENUES_BY_DAY[b.code]?.[5]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-2 px-3 font-mono font-medium whitespace-nowrap",
																children: ATTENDANCE_VENUES_BY_DAY[b.code]?.[6]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-2 px-3 font-mono font-medium whitespace-nowrap",
																children: ATTENDANCE_VENUES_BY_DAY[b.code]?.[7]
															})
														]
													}, b.code))
												})]
											})
										})]
									}),
									activeAnnexure === "2" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-3xl border border-emerald-500/20 bg-surface/90 p-6 space-y-4 animate-in fade-in duration-200",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "text-sm font-bold text-emerald-500 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Annexure 2: Lunch Group Distribution Rules" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-border bg-surface p-4 space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground block",
													children: "Day Scholars (Boys & Girls):"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-muted-foreground leading-relaxed",
													children: [
														"• ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Centenary Hall" }),
														" (Directly across from Central Library)."
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-border bg-surface p-4 space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground block",
													children: "Hostellers:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-muted-foreground leading-relaxed",
													children: [
														"• ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "All Girls" }),
														": Kalpana Chawla (KC) Hostel Dining Hall.",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
														"• ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "All Hosteller Boys" }),
														": Shivalik Hostel Dining Hall."
													]
												})]
											})]
										})]
									}),
									activeAnnexure === "3" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-3xl border border-amber-500/20 bg-surface/90 p-6 space-y-4 animate-in fade-in duration-200",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "text-sm font-bold text-amber-500 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Annexure 3: Department Visits (Day 1 at 2:00 PM) & Student Capacities" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs",
											children: REPORTING_BRANCHES.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-border bg-surface p-3 space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-foreground",
														children: b.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[11px] font-mono text-muted-foreground",
														children: [b.studentsCount, " Students"]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-primary font-medium text-[11px]",
													children: ["Venue: ", b.deptVisitVenue || "Respective Dept"]
												})]
											}, b.code))
										})]
									}),
									activeAnnexure === "groupings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-3xl border border-violet-500/20 bg-surface/90 p-6 space-y-6 animate-in fade-in duration-200",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
											className: "text-sm font-bold text-violet-400 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Official Activity Groups for Tech Displays, Sports, and Cultural Shows" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-2xl border border-border bg-surface p-4 space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-foreground uppercase tracking-wider text-[11px] block text-primary",
														children: "Technical Display (Centenary Hall)"
													}), SPECIAL_GROUPINGS.tech.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between border-b border-border/40 py-1 text-[11px]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: g.code }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: g.branches.join(", ")
														})]
													}, g.code))]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-2xl border border-border bg-surface p-4 space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-foreground uppercase tracking-wider text-[11px] block text-emerald-400",
														children: "Sports (Athletics Ground)"
													}), SPECIAL_GROUPINGS.sports.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between border-b border-border/40 py-1 text-[11px]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: g.code }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: g.branches.join(", ")
														})]
													}, g.code))]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-2xl border border-border bg-surface p-4 space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-foreground uppercase tracking-wider text-[11px] block text-amber-400",
														children: "Cultural / PEB / Music (Auditorium)"
													}), SPECIAL_GROUPINGS.cultural.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between border-b border-border/40 py-1 text-[11px]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: g.code }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: g.branches.join(", ")
														})]
													}, g.code))]
												})
											]
										})]
									})
								]
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { OrientationPage as component };
