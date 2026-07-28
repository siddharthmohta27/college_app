const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

let isTableInitialized = false;

async function initAttendanceTable() {
  if (isTableInitialized) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_attendance (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        subject_code VARCHAR(100) NOT NULL,
        subject_name VARCHAR(255) NOT NULL,
        attended INT DEFAULT 0,
        absent INT DEFAULT 0,
        cancelled INT DEFAULT 0,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT user_subject_unique UNIQUE (user_id, subject_code)
      );
    `);
    isTableInitialized = true;
    console.log("✅ PostgreSQL user_attendance table initialized successfully");
  } catch (err) {
    console.error("⚠️ PostgreSQL user_attendance table init warning:", err?.message || err);
  }
}

// Run immediately and also ensure table exists on routes
setTimeout(initAttendanceTable, 1000);

// GET /api/attendance?userId=xyz
router.get("/", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "userId query parameter required" });
  }

  try {
    const result = await pool.query(
      `SELECT subject_code, subject_name, attended, absent, cancelled, updated_at
         FROM user_attendance
        WHERE user_id = $1
        ORDER BY subject_code ASC`,
      [userId]
    );

    return res.json({ data: result.rows });
  } catch (err) {
    console.error("Error fetching attendance from PostgreSQL:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/attendance
router.post("/", async (req, res) => {
  const { userId, records } = req.body;
  if (!userId || !Array.isArray(records)) {
    return res.status(400).json({ error: "userId and records array required" });
  }

  try {
    for (const r of records) {
      await pool.query(
        `INSERT INTO user_attendance (user_id, subject_code, subject_name, attended, absent, cancelled, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
         ON CONFLICT (user_id, subject_code)
         DO UPDATE SET
           subject_name = EXCLUDED.subject_name,
           attended = EXCLUDED.attended,
           absent = EXCLUDED.absent,
           cancelled = EXCLUDED.cancelled,
           updated_at = CURRENT_TIMESTAMP`,
        [userId, r.code || r.subject_code, r.name || r.subject_name, r.lecturesAttended || r.attended || 0, r.lecturesAbsent || r.absent || 0, r.lecturesCancelled || r.cancelled || 0]
      );
    }

    return res.json({ success: true, count: records.length });
  } catch (err) {
    console.error("Error syncing attendance to PostgreSQL:", err);
    return res.status(500).json({ error: "Failed to save attendance" });
  }
});

module.exports = router;
