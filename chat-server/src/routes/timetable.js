const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");
const { requireAuth, optionalAuth } = require("../middleware/auth");
const { writeLimiter, readLimiter } = require("../middleware/rateLimit");

// Pre-configured hardcoded CRs
const PRECONFIGURED_CRS = [
  { email: "siddharthmohta.bt25cseds@pec.edu.in", section: "DS1", name: "Siddharth Mohta" },
  { email: "umangkumararora.bt25cseds@pec.edu.in", section: "DS1", name: "Umang Kumar Arora" },
  { email: "siddharthmohta33@gmail.com", section: "DS1", name: "Siddharth Mohta (Admin)" },
];

/**
 * Helper: Check if a user has CR authority for a given section
 */
async function userHasCROrAdminAuthority(user, targetSection) {
  if (!user) return false;
  if (user.isAdmin || user.role === "admin" || user.role === "HOD" || user.role === "Mod") {
    return true;
  }

  const userEmail = (user.email || "").toLowerCase().trim();
  const sec = (targetSection || "").toUpperCase().trim();

  // 1. Check hardcoded config
  const isPre = PRECONFIGURED_CRS.some(
    (c) => c.email.toLowerCase().trim() === userEmail && c.section.toUpperCase().trim() === sec
  );
  if (isPre) return true;

  // 2. Check database cr_assignments
  const dbCheck = await pool.query(
    `SELECT 1 FROM cr_assignments 
     WHERE (auth_user_id = $1 OR LOWER(college_email) = LOWER($2)) 
       AND UPPER(section) = UPPER($3)`,
    [user.id, userEmail, sec]
  );

  return dbCheck.rows.length > 0;
}

/**
 * Helper: Get all sections a user is CR for
 */
async function getUserAssignedSections(user) {
  if (!user) return [];
  const userEmail = (user.email || "").toLowerCase().trim();

  const sectionsSet = new Set();

  // Hardcoded
  PRECONFIGURED_CRS.forEach((c) => {
    if (c.email.toLowerCase().trim() === userEmail) {
      sectionsSet.add(c.section.toUpperCase().trim());
    }
  });

  // DB
  const dbRes = await pool.query(
    `SELECT section FROM cr_assignments 
     WHERE auth_user_id = $1 OR LOWER(college_email) = LOWER($2)`,
    [user.id, userEmail]
  );

  dbRes.rows.forEach((r) => sectionsSet.add(r.section.toUpperCase().trim()));

  return Array.from(sectionsSet);
}

// ──────────────────────────────────────────────────────────────
// GET /api/timetable/overrides - Get live overrides for a section
// ──────────────────────────────────────────────────────────────
router.get("/overrides", optionalAuth, readLimiter, async (req, res) => {
  try {
    const { section, date } = req.query;

    if (!section) {
      return res.status(400).json({ error: "Section parameter is required" });
    }

    let query = `
      SELECT id, section, override_date, day_of_week, start_time, end_time,
             status, subject, code, faculty, original_room, updated_room,
             reason, created_by_name, created_at
      FROM timetable_overrides
      WHERE UPPER(section) = UPPER($1)
    `;
    const params = [section.trim()];

    if (date) {
      query += ` AND override_date = $2`;
      params.push(date);
    } else {
      // Default: Last 7 days and next 14 days
      query += ` AND override_date >= CURRENT_DATE - INTERVAL '7 days' 
                 AND override_date <= CURRENT_DATE + INTERVAL '14 days'`;
    }

    query += ` ORDER BY override_date DESC, start_time ASC`;

    const result = await pool.query(query, params);

    res.json({ overrides: result.rows });
  } catch (err) {
    console.error("Error fetching timetable overrides:", err);
    res.status(500).json({ error: "Failed to fetch timetable overrides" });
  }
});

// ──────────────────────────────────────────────────────────────
// GET /api/timetable/cr-status - Check current user's CR status & sections
// ──────────────────────────────────────────────────────────────
router.get("/cr-status", requireAuth, async (req, res) => {
  try {
    const assignedSections = await getUserAssignedSections(req.user);
    const isAdmin = Boolean(req.user.isAdmin || req.user.role === "admin");

    res.json({
      isCR: assignedSections.length > 0 || isAdmin,
      assignedSections,
      isAdmin,
    });
  } catch (err) {
    console.error("Error checking CR status:", err);
    res.status(500).json({ error: "Failed to check CR status" });
  }
});

// ──────────────────────────────────────────────────────────────
// POST /api/timetable/overrides - Create live override (Cancelled / Room Change / Extra Class)
// ──────────────────────────────────────────────────────────────
router.post("/overrides", requireAuth, writeLimiter, async (req, res) => {
  try {
    const {
      section,
      overrideDate,
      dayOfWeek,
      startTime,
      endTime,
      status = "cancelled",
      subject,
      code,
      faculty,
      originalRoom,
      updatedRoom,
      reason,
    } = req.body;

    if (!section || !overrideDate || !dayOfWeek || !startTime || !endTime) {
      return res.status(400).json({
        error: "Missing required fields: section, overrideDate, dayOfWeek, startTime, endTime",
      });
    }

    // Authorization: Verify user is CR for this section or Admin
    const hasAuth = await userHasCROrAdminAuthority(req.user, section);
    if (!hasAuth) {
      return res.status(403).json({
        error: "Forbidden",
        message: `You do not have CR permissions for Section ${section}`,
      });
    }

    const creatorName = req.user.name || req.user.email?.split("@")[0] || "CR";

    const insertRes = await pool.query(
      `INSERT INTO timetable_overrides (
        section, override_date, day_of_week, start_time, end_time,
        status, subject, code, faculty, original_room, updated_room,
        reason, created_by_auth_id, created_by_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,
      [
        section.toUpperCase().trim(),
        overrideDate,
        dayOfWeek.toUpperCase().trim(),
        startTime,
        endTime,
        status,
        subject || null,
        code || null,
        faculty || null,
        originalRoom || null,
        updatedRoom || null,
        reason || null,
        req.user.id,
        creatorName,
      ]
    );

    res.status(201).json({ override: insertRes.rows[0] });
  } catch (err) {
    console.error("Error creating timetable override:", err);
    res.status(500).json({ error: "Failed to create timetable override" });
  }
});

// ──────────────────────────────────────────────────────────────
// DELETE /api/timetable/overrides/:id - Remove override / Restore class
// ──────────────────────────────────────────────────────────────
router.delete("/overrides/:id", requireAuth, writeLimiter, async (req, res) => {
  try {
    const overrideId = parseInt(req.params.id, 10);
    if (isNaN(overrideId)) {
      return res.status(400).json({ error: "Invalid override ID" });
    }

    // Fetch existing override to check section authorization
    const existing = await pool.query(
      `SELECT section, created_by_auth_id FROM timetable_overrides WHERE id = $1`,
      [overrideId]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Override not found" });
    }

    const { section, created_by_auth_id } = existing.rows[0];

    const hasAuth =
      req.user.id === created_by_auth_id ||
      (await userHasCROrAdminAuthority(req.user, section));

    if (!hasAuth) {
      return res.status(403).json({
        error: "Forbidden",
        message: `You do not have permission to delete this override for Section ${section}`,
      });
    }

    await pool.query(`DELETE FROM timetable_overrides WHERE id = $1`, [overrideId]);

    res.json({ success: true, message: "Override removed, class restored" });
  } catch (err) {
    console.error("Error deleting timetable override:", err);
    res.status(500).json({ error: "Failed to delete timetable override" });
  }
});

// ──────────────────────────────────────────────────────────────
// GET /api/timetable/admin/crs - List all active CR assignments
// ──────────────────────────────────────────────────────────────
router.get("/admin/crs", requireAuth, async (req, res) => {
  try {
    const dbCRs = await pool.query(
      `SELECT id, auth_user_id, college_email, student_name, section, created_at
       FROM cr_assignments
       ORDER BY section ASC, created_at DESC`
    );

    // Merge with hardcoded CRs
    const allCRs = [...PRECONFIGURED_CRS.map((c, i) => ({
      id: `pre_${i}`,
      auth_user_id: "configured_in_code",
      college_email: c.email,
      student_name: c.name,
      section: c.section,
      is_preconfigured: true,
      created_at: new Date().toISOString(),
    })), ...dbCRs.rows.map((r) => ({ ...r, is_preconfigured: false }))];

    res.json({ crs: allCRs });
  } catch (err) {
    console.error("Error listing CRs:", err);
    res.status(500).json({ error: "Failed to list CRs" });
  }
});

// ──────────────────────────────────────────────────────────────
// POST /api/timetable/admin/assign-cr - Grant CR role to a student
// ──────────────────────────────────────────────────────────────
router.post("/admin/assign-cr", requireAuth, writeLimiter, async (req, res) => {
  try {
    const { email, section, name } = req.body;

    if (!email || !section) {
      return res.status(400).json({ error: "Email and section are required" });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanSection = section.toUpperCase().trim();

    // Find auth_user_id from chat_users or generate identifier
    const userLookup = await pool.query(
      `SELECT auth_user_id, username FROM chat_users WHERE LOWER(college_email) = LOWER($1) LIMIT 1`,
      [cleanEmail]
    );

    const authUserId = userLookup.rows[0]?.auth_user_id || `assigned_${cleanEmail.replace(/[^a-z0-9]/g, "_")}`;
    const studentName = name || userLookup.rows[0]?.username || cleanEmail.split("@")[0];

    const result = await pool.query(
      `INSERT INTO cr_assignments (auth_user_id, college_email, student_name, section)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (section, auth_user_id) DO UPDATE SET student_name = EXCLUDED.student_name
       RETURNING *`,
      [authUserId, cleanEmail, studentName, cleanSection]
    );

    res.status(201).json({ success: true, cr: result.rows[0] });
  } catch (err) {
    console.error("Error assigning CR:", err);
    res.status(500).json({ error: "Failed to assign CR" });
  }
});

// ──────────────────────────────────────────────────────────────
// DELETE /api/timetable/admin/revoke-cr/:id - Revoke CR assignment
// ──────────────────────────────────────────────────────────────
router.delete("/admin/revoke-cr/:id", requireAuth, writeLimiter, async (req, res) => {
  try {
    const crId = parseInt(req.params.id, 10);
    if (isNaN(crId)) {
      return res.status(400).json({ error: "Invalid CR ID (pre-configured CRs must be edited in code)" });
    }

    await pool.query(`DELETE FROM cr_assignments WHERE id = $1`, [crId]);
    res.json({ success: true, message: "CR role revoked" });
  } catch (err) {
    console.error("Error revoking CR:", err);
    res.status(500).json({ error: "Failed to revoke CR" });
  }
});

module.exports = router;
