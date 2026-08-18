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

const DEFAULT_SCHEDULE = [
  {
    id: 1,
    time_slot: "8:30 AM – 9:30 AM",
    activity: "Attendance in respective rooms/venues (Annexure 1)",
    venue: "Respective Branch Venues (Auditorium / NAB L-26 to L-31)",
    coordinator: "Respective Faculty Incharges & Student Branch Incharges",
    category: "morning",
    sort_order: 1,
  },
  {
    id: 2,
    time_slot: "9:30 AM – 10:00 AM",
    activity: "Distribution of Welcome Kit",
    venue: "Auditorium",
    coordinator: "Prof. Amandeep Kaur, Prof. Shilpi Chaudhary, Prof. Nidhi Tanwar",
    category: "morning",
    sort_order: 2,
  },
  {
    id: 3,
    time_slot: "10:00 AM – 10:05 AM",
    activity: "Welcoming the Batch of 2026/2030 & Welcoming Dignitaries",
    venue: "Auditorium",
    coordinator: "Student Anchors",
    category: "inaugural",
    sort_order: 3,
  },
  {
    id: 4,
    time_slot: "10:05 AM – 10:10 AM",
    activity: "Inaugural & Traditional Lamp Lighting",
    venue: "Auditorium",
    coordinator: "Dignitaries & Deans",
    category: "inaugural",
    sort_order: 4,
  },
  {
    id: 5,
    time_slot: "10:10 AM – 10:15 AM",
    activity: "Know Your Director Video / Presentation",
    venue: "Auditorium",
    coordinator: "Audio-Visual Team",
    category: "inaugural",
    sort_order: 5,
  },
  {
    id: 6,
    time_slot: "10:15 AM – 10:35 AM",
    activity: "Address by Director, PEC",
    venue: "Auditorium",
    coordinator: "Director, Punjab Engineering College",
    category: "inaugural",
    sort_order: 6,
  },
  {
    id: 7,
    time_slot: "10:35 AM – 10:55 AM",
    activity: "Address by Chief Guest",
    venue: "Auditorium",
    coordinator: "Chief Guest",
    category: "inaugural",
    sort_order: 7,
  },
  {
    id: 8,
    time_slot: "10:55 AM – 11:15 AM",
    activity: "Address by Guest of Honour",
    venue: "Auditorium",
    coordinator: "Guest of Honour",
    category: "inaugural",
    sort_order: 8,
  },
  {
    id: 9,
    time_slot: "11:15 AM – 11:30 AM",
    activity: "Vote of Thanks & National Anthem",
    venue: "Auditorium",
    coordinator: "Dean Student Affairs",
    category: "inaugural",
    sort_order: 9,
  },
  {
    id: 10,
    time_slot: "11:30 AM – 12:30 PM",
    activity: "High Tea & Campus Interaction",
    venue: "Student Center Lawn",
    coordinator: "Organizing Committee",
    category: "lunch",
    sort_order: 10,
  },
  {
    id: 11,
    time_slot: "12:30 PM – 1:30 PM",
    activity: "Academic System & Curriculum Overview",
    venue: "Auditorium",
    coordinator: "Dean Academic Affairs",
    category: "afternoon",
    sort_order: 11,
  },
  {
    id: 12,
    time_slot: "1:30 PM – 2:30 PM",
    activity: "Hostel & Campus Life Briefing",
    venue: "Auditorium",
    coordinator: "Chief Warden & Student Council",
    category: "afternoon",
    sort_order: 12,
  },
  {
    id: 13,
    time_slot: "2:30 PM – 4:30 PM",
    activity: "Guided Campus Tour & Department Visit",
    venue: "Various Campus Departments",
    coordinator: "Student Mentors & NCC Cadets",
    category: "afternoon",
    sort_order: 13,
  },
];

// In-memory runtime cache for orientation content
let cachedOrientationData = {
  map: DEFAULT_MAP,
  venue: DEFAULT_VENUE,
  schedule: DEFAULT_SCHEDULE,
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
