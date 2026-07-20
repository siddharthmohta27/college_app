const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");
const { requireAuth } = require("../middleware/auth");
const { getOrCreateDatingProfile } = require("../config/db");

// ─── GET /api/dating/profiles ─────────────────────────────────────────────
// Fetch profiles NOT yet swiped by the current user
router.get("/profiles", requireAuth, async (req, res) => {
  const firebaseUid = req.user.id;

  try {
    // Ensure current user has a dating profile
    await getOrCreateDatingProfile(firebaseUid, {
      name: req.user.email?.split("@")[0] || "Student",
    });

    // Get current user's dating profile ID (numeric)
    const profileRes = await pool.query(`SELECT id FROM dating_profiles WHERE auth_user_id = $1`, [
      firebaseUid,
    ]);
    const currentProfile = profileRes.rows[0];
    if (!currentProfile) {
      return res.json({ profiles: [], source: "database" });
    }
    const currentProfileId = currentProfile.id;

    const result = await pool.query(
      `SELECT id, name, age, year, major, bio, interests, emoji, verified
       FROM dating_profiles
       WHERE id != $1
         AND id NOT IN (
           SELECT swiped_id FROM swipes WHERE swiper_id = $1
         )
       ORDER BY created_at DESC`,
      [currentProfileId],
    );
    res.json({ profiles: result.rows, source: "database" });
  } catch (err) {
    console.error("Error fetching profiles:", err.message);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

// ─── POST /api/dating/swipe ────────────────────────────────────────────────
// Record a swipe and check for mutual match
router.post("/swipe", requireAuth, async (req, res) => {
  const { swipedId, action } = req.body;
  const firebaseUid = req.user.id;

  if (!swipedId || !["like", "pass"].includes(action)) {
    return res.status(400).json({ error: "swipedId and action ('like'|'pass') are required" });
  }

  try {
    // Get current user's dating profile ID
    const profileRes = await pool.query(`SELECT id FROM dating_profiles WHERE auth_user_id = $1`, [
      firebaseUid,
    ]);
    const currentProfile = profileRes.rows[0];
    if (!currentProfile) {
      return res.status(400).json({ error: "Dating profile not found" });
    }
    const swiperId = currentProfile.id;

    // Record the swipe (ignore if already exists)
    await pool.query(
      `INSERT INTO swipes (swiper_id, swiped_id, action)
       VALUES ($1, $2, $3)
       ON CONFLICT (swiper_id, swiped_id) DO NOTHING`,
      [swiperId, swipedId, action],
    );

    let isMatch = false;

    if (action === "like") {
      // Check if the other person already liked back
      const mutual = await pool.query(
        `SELECT id FROM swipes
         WHERE swiper_id = $1 AND swiped_id = $2 AND action = 'like'`,
        [swipedId, swiperId],
      );

      if (mutual.rows.length > 0) {
        // It's a mutual match — insert into matches table (smaller id first to avoid duplicates)
        const [u1, u2] = [Math.min(swiperId, swipedId), Math.max(swiperId, swipedId)];
        await pool.query(
          `INSERT INTO matches (user1_id, user2_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [u1, u2],
        );
        isMatch = true;
      }
    }

    res.json({ recorded: true, isMatch, source: "database" });
  } catch (err) {
    console.error("Error recording swipe:", err.message);
    res.status(500).json({ error: "Failed to record swipe" });
  }
});

// ─── GET /api/dating/matches ───────────────────────────────────────────────
// Fetch all mutual matches for the current authenticated user
router.get("/matches", requireAuth, async (req, res) => {
  const firebaseUid = req.user.id;

  try {
    // Get current user's dating profile ID
    const profileRes = await pool.query(`SELECT id FROM dating_profiles WHERE auth_user_id = $1`, [
      firebaseUid,
    ]);
    const currentProfile = profileRes.rows[0];
    if (!currentProfile) {
      return res.json({ matches: [], source: "database" });
    }
    const userId = currentProfile.id;

    const result = await pool.query(
      `SELECT dp.id, dp.name, dp.major, dp.emoji, dp.year, m.created_at as matched_at
       FROM matches m
       JOIN dating_profiles dp
         ON (m.user1_id = dp.id OR m.user2_id = dp.id) AND dp.id != $1
       WHERE m.user1_id = $1 OR m.user2_id = $1
       ORDER BY m.created_at DESC`,
      [userId],
    );
    res.json({ matches: result.rows, source: "database" });
  } catch (err) {
    console.error("Error fetching matches:", err.message);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

// ─── GET /api/dating/me ────────────────────────────────────────────────────
// Get current user's dating profile
router.get("/me", requireAuth, async (req, res) => {
  const firebaseUid = req.user.id;

  try {
    const profile = await getOrCreateDatingProfile(firebaseUid, {
      name: req.user.email?.split("@")[0] || "Student",
    });
    res.json({ profile });
  } catch (err) {
    console.error("Error fetching dating profile:", err.message);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

module.exports = router;
