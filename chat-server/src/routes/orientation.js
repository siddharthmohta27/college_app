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

const DEFAULT_SCHEDULE = [
  ...DEFAULT_SCHEDULE_DAY1,
  ...DEFAULT_SCHEDULE_DAY2,
  ...DEFAULT_SCHEDULE_DAY3,
];

// In-memory runtime cache for orientation content (Days 1 to 3)
let cachedOrientationData = {
  map: DEFAULT_MAP,
  venue: DEFAULT_VENUE,
  schedule: DEFAULT_SCHEDULE,
  day1: DEFAULT_SCHEDULE_DAY1,
  day2: DEFAULT_SCHEDULE_DAY2,
  day3: DEFAULT_SCHEDULE_DAY3,
  notice: "Other days timetable will be added after official confirmation.",
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
          `SELECT id, day_number, time_slot, activity, venue, coordinator, category, sort_order, created_at
           FROM orientation_schedule_items
           ORDER BY sort_order ASC, id ASC`
        );

        if (scheduleRes.rows.length > 0) {
          scheduleItems = scheduleRes.rows.map((r) => ({
            ...r,
            day: r.day_number || 1,
          }));
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
