const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");
const { requireAuth, optionalAuth } = require("../middleware/auth");
const { writeLimiter, readLimiter } = require("../middleware/rateLimit");

// Hardcoded CR list (mirrored)
const PRECONFIGURED_CRS = [
  { email: "siddharthmohta.bt25cseds@pec.edu.in", section: "DS1", name: "Siddharth Mohta" },
  { email: "umangkumararora.bt25cseds@pec.edu.in", section: "DS1", name: "Umang Kumar Arora" },
  { email: "siddharthmohta33@gmail.com", section: "DS1", name: "Siddharth Mohta (Admin)" },
];

async function userHasCROrAdminAuthority(user, targetSection) {
  if (!user) return false;
  if (user.isAdmin || user.role === "admin" || user.role === "HOD" || user.role === "Mod") {
    return true;
  }

  const userEmail = (user.email || "").toLowerCase().trim();
  const sec = (targetSection || "").toUpperCase().trim();

  const isPre = PRECONFIGURED_CRS.some(
    (c) => c.email.toLowerCase().trim() === userEmail && c.section.toUpperCase().trim() === sec
  );
  if (isPre) return true;

  const dbCheck = await pool.query(
    `SELECT 1 FROM cr_assignments 
     WHERE (auth_user_id = $1 OR LOWER(college_email) = LOWER($2)) 
       AND UPPER(section) = UPPER($3)`,
    [user.id, userEmail, sec]
  );

  return dbCheck.rows.length > 0;
}

// ──────────────────────────────────────────────────────────────
// GET /api/assignments - Fetch assignments for a section
// ──────────────────────────────────────────────────────────────
router.get("/", optionalAuth, readLimiter, async (req, res) => {
  try {
    const { section } = req.query;
    const authUserId = req.user?.id || null;

    if (!section) {
      return res.status(400).json({ error: "Section parameter is required" });
    }

    const cleanSection = section.toUpperCase().trim();

    // Query assignments joined with user's personal completion progress
    let query = `
      SELECT a.id, a.section, a.subject, a.subject_code, a.title, a.description,
             a.due_date, a.submission_format, a.material_url, a.max_marks,
             a.created_by_name, a.created_at,
             COALESCE(p.is_completed, false) as is_completed,
             p.completed_at
      FROM section_assignments a
      LEFT JOIN student_assignment_progress p 
        ON p.assignment_id = a.id AND p.auth_user_id = $2
      WHERE UPPER(a.section) = $1
      ORDER BY a.due_date ASC, a.created_at DESC
    `;

    const result = await pool.query(query, [cleanSection, authUserId || "anonymous"]);

    res.json({ assignments: result.rows });
  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

// ──────────────────────────────────────────────────────────────
// POST /api/assignments - Create new assignment (CR / Admin only)
// ──────────────────────────────────────────────────────────────
router.post("/", requireAuth, writeLimiter, async (req, res) => {
  try {
    const {
      section,
      subject,
      subjectCode,
      title,
      description,
      dueDate,
      submissionFormat = "PDF on Google Classroom",
      materialUrl,
      maxMarks,
    } = req.body;

    if (!section || !subject || !title || !dueDate) {
      return res.status(400).json({
        error: "Missing required fields: section, subject, title, dueDate",
      });
    }

    const cleanSection = section.toUpperCase().trim();

    // Verify CR authority
    const hasAuth = await userHasCROrAdminAuthority(req.user, cleanSection);
    if (!hasAuth) {
      return res.status(403).json({
        error: "Forbidden",
        message: `You do not have CR permissions to upload assignments for Section ${section}`,
      });
    }

    const creatorName = req.user.name || req.user.email?.split("@")[0] || "CR";

    const insertRes = await pool.query(
      `INSERT INTO section_assignments (
        section, subject, subject_code, title, description,
        due_date, submission_format, material_url, max_marks,
        created_by_auth_id, created_by_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        cleanSection,
        subject.trim(),
        subjectCode?.trim() || null,
        title.trim(),
        description?.trim() || null,
        dueDate,
        submissionFormat.trim(),
        materialUrl?.trim() || null,
        maxMarks ? parseInt(maxMarks, 10) : null,
        req.user.id,
        creatorName,
      ]
    );

    res.status(201).json({ assignment: insertRes.rows[0] });
  } catch (err) {
    console.error("Error creating assignment:", err);
    res.status(500).json({ error: "Failed to create assignment" });
  }
});

// ──────────────────────────────────────────────────────────────
// PUT /api/assignments/:id - Edit assignment (CR / Admin only)
// ──────────────────────────────────────────────────────────────
router.put("/:id", requireAuth, writeLimiter, async (req, res) => {
  try {
    const assignmentId = parseInt(req.params.id, 10);
    if (isNaN(assignmentId)) {
      return res.status(400).json({ error: "Invalid assignment ID" });
    }

    const existing = await pool.query(
      `SELECT section, created_by_auth_id FROM section_assignments WHERE id = $1`,
      [assignmentId]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const { section, created_by_auth_id } = existing.rows[0];

    const hasAuth =
      req.user.id === created_by_auth_id ||
      (await userHasCROrAdminAuthority(req.user, section));

    if (!hasAuth) {
      return res.status(403).json({
        error: "Forbidden",
        message: `You do not have permission to edit this assignment for Section ${section}`,
      });
    }

    const {
      subject,
      subjectCode,
      title,
      description,
      dueDate,
      submissionFormat,
      materialUrl,
      maxMarks,
    } = req.body;

    const updateRes = await pool.query(
      `UPDATE section_assignments
       SET subject = COALESCE($1, subject),
           subject_code = COALESCE($2, subject_code),
           title = COALESCE($3, title),
           description = COALESCE($4, description),
           due_date = COALESCE($5, due_date),
           submission_format = COALESCE($6, submission_format),
           material_url = COALESCE($7, material_url),
           max_marks = COALESCE($8, max_marks),
           updated_at = NOW()
       WHERE id = $9
       RETURNING *`,
      [
        subject?.trim(),
        subjectCode?.trim(),
        title?.trim(),
        description?.trim(),
        dueDate,
        submissionFormat?.trim(),
        materialUrl?.trim(),
        maxMarks !== undefined ? parseInt(maxMarks, 10) : undefined,
        assignmentId,
      ]
    );

    res.json({ assignment: updateRes.rows[0] });
  } catch (err) {
    console.error("Error updating assignment:", err);
    res.status(500).json({ error: "Failed to update assignment" });
  }
});

// ──────────────────────────────────────────────────────────────
// DELETE /api/assignments/:id - Delete assignment (CR / Admin only)
// ──────────────────────────────────────────────────────────────
router.delete("/:id", requireAuth, writeLimiter, async (req, res) => {
  try {
    const assignmentId = parseInt(req.params.id, 10);
    if (isNaN(assignmentId)) {
      return res.status(400).json({ error: "Invalid assignment ID" });
    }

    const existing = await pool.query(
      `SELECT section, created_by_auth_id FROM section_assignments WHERE id = $1`,
      [assignmentId]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const { section, created_by_auth_id } = existing.rows[0];

    const hasAuth =
      req.user.id === created_by_auth_id ||
      (await userHasCROrAdminAuthority(req.user, section));

    if (!hasAuth) {
      return res.status(403).json({
        error: "Forbidden",
        message: `You do not have permission to delete this assignment for Section ${section}`,
      });
    }

    await pool.query(`DELETE FROM section_assignments WHERE id = $1`, [assignmentId]);

    res.json({ success: true, message: "Assignment deleted successfully" });
  } catch (err) {
    console.error("Error deleting assignment:", err);
    res.status(500).json({ error: "Failed to delete assignment" });
  }
});

// ──────────────────────────────────────────────────────────────
// POST /api/assignments/:id/toggle-done - Student personal progress toggle
// ──────────────────────────────────────────────────────────────
router.post("/:id/toggle-done", requireAuth, async (req, res) => {
  try {
    const assignmentId = parseInt(req.params.id, 10);
    const authUserId = req.user.id;

    if (isNaN(assignmentId)) {
      return res.status(400).json({ error: "Invalid assignment ID" });
    }

    const existing = await pool.query(
      `SELECT is_completed FROM student_assignment_progress 
       WHERE assignment_id = $1 AND auth_user_id = $2`,
      [assignmentId, authUserId]
    );

    let isCompleted = true;
    if (existing.rows.length > 0) {
      isCompleted = !existing.rows[0].is_completed;
      await pool.query(
        `UPDATE student_assignment_progress 
         SET is_completed = $1, completed_at = CASE WHEN $1 = true THEN NOW() ELSE NULL END
         WHERE assignment_id = $2 AND auth_user_id = $3`,
        [isCompleted, assignmentId, authUserId]
      );
    } else {
      await pool.query(
        `INSERT INTO student_assignment_progress (assignment_id, auth_user_id, is_completed, completed_at)
         VALUES ($1, $2, true, NOW())`,
        [assignmentId, authUserId]
      );
    }

    res.json({ success: true, isCompleted });
  } catch (err) {
    console.error("Error toggling assignment progress:", err);
    res.status(500).json({ error: "Failed to update assignment progress" });
  }
});

module.exports = router;
