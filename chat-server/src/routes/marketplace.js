const express = require("express");
const router = express.Router();
const { pool, verifyFirebaseToken } = require("../config/db");

// ─── Auth Middleware ─────────────────────────────────────────────
async function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const token = auth.split("Bearer ")[1];
    const decoded = await verifyFirebaseToken(token);
    req.firebaseUid = decoded.uid;
    req.firebaseEmail = decoded.email || null;
    req.firebaseName = decoded.name || decoded.email?.split("@")[0] || "Student";
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// ─── GET /api/marketplace/listings ─────────────────────────────
// Returns all active listings with save status for the requesting user
router.get("/listings", async (req, res) => {
  try {
    // Optionally read auth for save status
    let uid = null;
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
      try {
        const decoded = await verifyFirebaseToken(auth.split("Bearer ")[1]);
        uid = decoded.uid;
      } catch (_) {}
    }

    const result = await pool.query(`
      SELECT
        l.*,
        CASE WHEN s.id IS NOT NULL THEN true ELSE false END AS saved
      FROM marketplace_listings l
      LEFT JOIN marketplace_saves s
        ON s.listing_id = l.id AND s.saver_auth_id = $1
      WHERE l.is_sold = false
      ORDER BY l.created_at DESC
    `, [uid || ""]);

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
      [req.firebaseUid]
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

  if (!title || !price || !category) {
    return res.status(400).json({ error: "title, price and category are required" });
  }

  // Build seller initials and a gradient color from UID
  const name = req.firebaseName;
  const parts = name.split(" ");
  const initials = parts.length >= 2
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
  const colorIndex = req.firebaseUid.charCodeAt(0) % COLORS.length;
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
        parseInt(price),
        category,
        condition || "Good",
        location || "",
        emoji || "📦",
        req.firebaseUid,
        name,
        initials,
        sellerColor,
        req.firebaseEmail,
      ]
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
      [id]
    );
    if (!check.rows.length) {
      return res.status(404).json({ error: "Listing not found" });
    }
    if (check.rows[0].seller_auth_id !== req.firebaseUid) {
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
      [id, req.firebaseUid]
    );
    if (existing.rows.length > 0) {
      await pool.query(
        `DELETE FROM marketplace_saves WHERE listing_id = $1 AND saver_auth_id = $2`,
        [id, req.firebaseUid]
      );
      res.json({ saved: false });
    } else {
      await pool.query(
        `INSERT INTO marketplace_saves (listing_id, saver_auth_id) VALUES ($1, $2)`,
        [id, req.firebaseUid]
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
      [id]
    );
    if (!check.rows.length) return res.status(404).json({ error: "Listing not found" });
    if (check.rows[0].seller_auth_id !== req.firebaseUid) {
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
