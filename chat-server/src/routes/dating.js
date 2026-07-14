const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// In-memory fallback data (used when DB is not connected)
const FALLBACK_PROFILES = [
  { id: 1, name: "Anjali Sharma", age: 20, year: "3rd Year", major: "Design", bio: "Always sketchin' in class. Coffee lover, indie music fan, and looking for someone to review campus cafes with!", interests: ["Art", "Indie Rock", "Cafes", "UI/UX"], emoji: "🎨", verified: true },
  { id: 2, name: "Vikram Sen", age: 21, year: "4th Year", major: "Mechanical Eng.", bio: "Car enthusiast, amateur guitar player, and gym regular. Let's study (or skip lectures) together.", interests: ["Gym", "Guitars", "Anime", "Formula 1"], emoji: "🎸", verified: false },
  { id: 3, name: "Kavya Iyer", age: 19, year: "2nd Year", major: "Economics", bio: "If you love debate, board games, and late night chai, we will probably get along. Bookworm 📚", interests: ["Chai", "Debating", "Chess", "Reading"], emoji: "♟️", verified: true },
  { id: 4, name: "Rohan Varma", age: 20, year: "3rd Year", major: "Computer Science", bio: "I build websites and compile errors for fun. Let's match if you want someone to debug your life.", interests: ["Coding", "Hackathons", "Valorant", "Memes"], emoji: "💻", verified: true },
  { id: 5, name: "Tanya Kapoor", age: 20, year: "3rd Year", major: "English Lit.", bio: "Poetry, street photography, and vintage vinyl records are my jam. Tell me your favorite movie?", interests: ["Poetry", "Cinema", "Vinyls", "Travel"], emoji: "📷", verified: false },
];

let dbAvailable = false;

// Test DB availability on startup
pool.query("SELECT 1")
  .then(() => {
    dbAvailable = true;
    console.log("✅ Database connection verified");
  }).catch((err) => {
  dbAvailable = false;
  console.error("Database connection failed:", err.message);
});

// ─── GET /api/dating/profiles ─────────────────────────────────────────────
// Fetch profiles NOT yet swiped by the current user
router.get("/profiles", async (req, res) => {
  // No auth: default to userId=6 (Siddharth seed row), override via ?userId=
  const userId = parseInt(req.query.userId) || 6;

  if (!dbAvailable) {
    // Fallback: return all profiles except the user's own
    return res.json({ profiles: FALLBACK_PROFILES.filter((p) => p.id !== userId), source: "fallback" });
  }

  try {
    const result = await pool.query(
      `SELECT id, name, age, year, major, bio, interests, emoji, verified
       FROM dating_profiles
       WHERE id != $1
         AND id NOT IN (
           SELECT swiped_id FROM swipes WHERE swiper_id = $1
         )
       ORDER BY created_at DESC`,
      [userId]
    );
    res.json({ profiles: result.rows, source: "database" });
  } catch (err) {
    console.error("Error fetching profiles:", err.message);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

// ─── POST /api/dating/swipe ────────────────────────────────────────────────
// Record a swipe and check for mutual match
router.post("/swipe", async (req, res) => {
  const { swiperId = 6, swipedId, action } = req.body;

  if (!swipedId || !["like", "pass"].includes(action)) {
    return res.status(400).json({ error: "swipedId and action ('like'|'pass') are required" });
  }

  if (!dbAvailable) {
    // Fallback: simulate 70% match chance for 'like'
    const isMatch = action === "like" && Math.random() > 0.3;
    return res.json({ recorded: true, isMatch, source: "fallback" });
  }

  try {
    // Record the swipe (ignore if already exists)
    await pool.query(
      `INSERT INTO swipes (swiper_id, swiped_id, action)
       VALUES ($1, $2, $3)
       ON CONFLICT (swiper_id, swiped_id) DO NOTHING`,
      [swiperId, swipedId, action]
    );

    let isMatch = false;

    if (action === "like") {
      // Check if the other person already liked back
      const mutual = await pool.query(
        `SELECT id FROM swipes
         WHERE swiper_id = $1 AND swiped_id = $2 AND action = 'like'`,
        [swipedId, swiperId]
      );

      if (mutual.rows.length > 0) {
        // It's a mutual match — insert into matches table (smaller id first to avoid duplicates)
        const [u1, u2] = [Math.min(swiperId, swipedId), Math.max(swiperId, swipedId)];
        await pool.query(
          `INSERT INTO matches (user1_id, user2_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [u1, u2]
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

// ─── GET /api/dating/matches/:userId ──────────────────────────────────────
// Fetch all mutual matches for a user
router.get("/matches/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId) || 6;

  if (!dbAvailable) {
    return res.json({ matches: [], source: "fallback" });
  }

  try {
    const result = await pool.query(
      `SELECT dp.id, dp.name, dp.major, dp.emoji, dp.year, m.created_at as matched_at
       FROM matches m
       JOIN dating_profiles dp
         ON (m.user1_id = dp.id OR m.user2_id = dp.id) AND dp.id != $1
       WHERE m.user1_id = $1 OR m.user2_id = $1
       ORDER BY m.created_at DESC`,
      [userId]
    );
    res.json({ matches: result.rows, source: "database" });
  } catch (err) {
    console.error("Error fetching matches:", err.message);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

module.exports = router;
