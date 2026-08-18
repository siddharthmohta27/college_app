const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");
const { requireAuth, optionalAuth } = require("../middleware/auth");

// Helper: Seed initial sample listings if database is empty
async function seedDefaultListings() {
  try {
    const samples = [
      {
        title: "Calculus & Linear Algebra (BS Grewal 44th Ed)",
        description: "Barely used for 3rd sem math. No highlighted pages or pencil marks.",
        price: 450,
        category: "Books",
        condition: "Like New",
        location: "Hostel Block A, Room 204",
        emoji: "📚",
        seller_auth_id: "seed_seller_1",
        seller_name: "Aarav Sharma",
        seller_initials: "AS",
        seller_color: "from-cyan-400 to-blue-600",
        seller_email: "aarav.btech24@pec.edu.in",
      },
      {
        title: "NVIDIA GTX 1660 Super (6GB VRAM)",
        description: "Great condition, upgraded to RTX card. Works perfectly for ML & gaming.",
        price: 8500,
        category: "Electronics",
        condition: "Good",
        location: "Kurukshetra Hostel R-112",
        emoji: "💻",
        seller_auth_id: "seed_seller_2",
        seller_name: "Karan Patel",
        seller_initials: "KP",
        seller_color: "from-fuchsia-500 to-violet-600",
        seller_email: "karan.btech23@pec.edu.in",
      },
      {
        title: "Ergonomic Mesh Study Chair",
        description: "Height adjustable with lumbar support. Super comfortable for long study sessions.",
        price: 1200,
        category: "Dorm Gear",
        condition: "Good",
        location: "Kalpana Chawla Hostel",
        emoji: "🛏️",
        seller_auth_id: "seed_seller_3",
        seller_name: "Riya Verma",
        seller_initials: "RV",
        seller_color: "from-pink-500 to-rose-600",
        seller_email: "riya.btech24@pec.edu.in",
      },
      {
        title: "Engineering Drafter + Mini Drawing Board",
        description: "Complete set for 1st/2nd year Engineering Drawing lab. Steel arm mechanism.",
        price: 350,
        category: "Others",
        condition: "Like New",
        location: "Mechanical Dept Workshop",
        emoji: "📦",
        seller_auth_id: "seed_seller_4",
        seller_name: "Siddharth M",
        seller_initials: "SM",
        seller_color: "from-emerald-400 to-teal-600",
        seller_email: "siddharth.btech24@pec.edu.in",
      },
      {
        title: "PEC Fest Star Night Passes (Pair of 2)",
        description: "Extra VIP passes for upcoming PEC Fest concert night. Transferrable.",
        price: 300,
        category: "Tickets",
        condition: "New",
        location: "Main Auditorium Gate",
        emoji: "🎟️",
        seller_auth_id: "seed_seller_5",
        seller_name: "Sneha Gupta",
        seller_initials: "SG",
        seller_color: "from-amber-400 to-orange-600",
        seller_email: "sneha.btech25@pec.edu.in",
      },
      {
        title: "Official PEC Varsity Hoodie (Size L)",
        description: "Navy blue embroidered PEC logo hoodie. Worn twice, warm fleece lining.",
        price: 650,
        category: "Clothes",
        condition: "Like New",
        location: "Vindhyachal Hostel",
        emoji: "👕",
        seller_auth_id: "seed_seller_6",
        seller_name: "Rohan Kapoor",
        seller_initials: "RK",
        seller_color: "from-sky-400 to-indigo-600",
        seller_email: "rohan.btech23@pec.edu.in",
      },
    ];

    for (const item of samples) {
      await pool.query(
        `INSERT INTO marketplace_listings
          (title, description, price, category, condition, location, emoji,
           seller_auth_id, seller_name, seller_initials, seller_color, seller_email)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        [
          item.title,
          item.description,
          item.price,
          item.category,
          item.condition,
          item.location,
          item.emoji,
          item.seller_auth_id,
          item.seller_name,
          item.seller_initials,
          item.seller_color,
          item.seller_email,
        ],
      );
    }
    console.log("🌱 Auto-seeded initial campus marketplace listings");
  } catch (err) {
    console.error("❌ Failed to seed default marketplace listings:", err.message);
  }
}

// ─── GET /api/marketplace/listings ─────────────────────────────
// Returns all active listings with save status for the requesting user
router.get("/listings", optionalAuth, async (req, res) => {
  try {
    // Check if table is empty and auto-seed sample listings
    const countRes = await pool.query("SELECT COUNT(*) FROM marketplace_listings");
    if (parseInt(countRes.rows[0].count, 10) === 0) {
      await seedDefaultListings();
    }

    // Optionally read auth for save status
    const uid = req.user?.id || null;

    const result = await pool.query(
      `
      SELECT
        l.id, l.title, l.description, l.price, l.category, l.condition, l.location, l.emoji,
        l.seller_auth_id, l.seller_name, l.seller_initials, l.seller_color,
        l.is_sold, l.created_at,
        CASE WHEN s.id IS NOT NULL THEN true ELSE false END AS saved
      FROM marketplace_listings l
      LEFT JOIN marketplace_saves s
        ON s.listing_id = l.id AND s.saver_auth_id = $1
      WHERE l.is_sold = false
      ORDER BY l.created_at DESC
    `,
      [uid || ""],
    );

    res.json({ listings: result.rows });
  } catch (err) {
    console.error("[marketplace] GET /listings error:", err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

// ─── GET /api/marketplace/listings/my ──────────────────────────
// Returns listings posted by the current user
router.get("/listings/my", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM marketplace_listings WHERE seller_auth_id = $1 ORDER BY created_at DESC`,
      [req.user.id],
    );
    res.json({ listings: result.rows });
  } catch (err) {
    console.error("[marketplace] GET /listings/my error:", err);
    res.status(500).json({ error: "Failed to fetch your listings" });
  }
});

// ─── POST /api/marketplace/listings ────────────────────────────
// Create a new listing
router.post("/listings", requireAuth, async (req, res) => {
  const { title, description, price, category, condition, location, emoji } = req.body;

  if (!title || price === undefined || price === null || price === "" || !category) {
    return res.status(400).json({ error: "title, price and category are required" });
  }

  const parsedPrice = parseInt(price, 10);
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    return res.status(400).json({ error: "Price must be a valid non-negative number" });
  }

  // Build seller initials and a gradient color from UID
  const name = req.user.name || req.user.email?.split("@")[0] || "Student";
  const parts = name.split(" ");
  const initials =
    parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();

  const COLORS = [
    "from-fuchsia-500 to-violet-600",
    "from-cyan-400 to-blue-600",
    "from-pink-500 to-rose-600",
    "from-emerald-400 to-teal-600",
    "from-amber-400 to-orange-600",
    "from-violet-400 to-purple-600",
    "from-sky-400 to-indigo-600",
    "from-rose-400 to-pink-600",
  ];
  const colorIndex = req.user.id.charCodeAt(0) % COLORS.length;
  const sellerColor = COLORS[colorIndex];

  try {
    const result = await pool.query(
      `INSERT INTO marketplace_listings
        (title, description, price, category, condition, location, emoji,
         seller_auth_id, seller_name, seller_initials, seller_color, seller_email)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *`,
      [
        title,
        description || "",
        parsedPrice,
        category,
        condition || "Good",
        location || "",
        emoji || "📦",
        req.user.id,
        name,
        initials,
        sellerColor,
        req.user.email,
      ],
    );
    res.status(201).json({ listing: result.rows[0] });
  } catch (err) {
    console.error("[marketplace] POST /listings error:", err);
    res.status(500).json({ error: "Failed to create listing" });
  }
});


// ─── DELETE /api/marketplace/listings/:id ──────────────────────
// Delete own listing
router.delete("/listings/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const check = await pool.query(
      `SELECT seller_auth_id FROM marketplace_listings WHERE id = $1`,
      [id],
    );
    if (!check.rows.length) {
      return res.status(404).json({ error: "Listing not found" });
    }
    if (check.rows[0].seller_auth_id !== req.user.id) {
      return res.status(403).json({ error: "You can only delete your own listings" });
    }
    await pool.query(`DELETE FROM marketplace_listings WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("[marketplace] DELETE /listings/:id error:", err);
    res.status(500).json({ error: "Failed to delete listing" });
  }
});

// ─── POST /api/marketplace/listings/:id/save ───────────────────
// Toggle save/unsave a listing
router.post("/listings/:id/save", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const existing = await pool.query(
      `SELECT id FROM marketplace_saves WHERE listing_id = $1 AND saver_auth_id = $2`,
      [id, req.user.id],
    );
    if (existing.rows.length > 0) {
      await pool.query(
        `DELETE FROM marketplace_saves WHERE listing_id = $1 AND saver_auth_id = $2`,
        [id, req.user.id],
      );
      res.json({ saved: false });
    } else {
      await pool.query(
        `INSERT INTO marketplace_saves (listing_id, saver_auth_id) VALUES ($1, $2)`,
        [id, req.user.id],
      );
      res.json({ saved: true });
    }
  } catch (err) {
    console.error("[marketplace] POST /listings/:id/save error:", err);
    res.status(500).json({ error: "Failed to toggle save" });
  }
});

// ─── PATCH /api/marketplace/listings/:id/sold ──────────────────
// Mark listing as sold
router.patch("/listings/:id/sold", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const check = await pool.query(
      `SELECT seller_auth_id FROM marketplace_listings WHERE id = $1`,
      [id],
    );
    if (!check.rows.length) return res.status(404).json({ error: "Listing not found" });
    if (check.rows[0].seller_auth_id !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    await pool.query(`UPDATE marketplace_listings SET is_sold = true WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("[marketplace] PATCH /listings/:id/sold error:", err);
    res.status(500).json({ error: "Failed to mark as sold" });
  }
});

module.exports = router;
