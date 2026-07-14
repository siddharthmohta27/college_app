const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");
const { requireAuth, optionalAuth } = require("../middleware/auth");

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────

async function getOrCreateChatUser(userId, profile = {}) {
  const { name, avatar, role, color, email } = profile;

  // Try to find existing
  const existing = await pool.query(`SELECT * FROM chat_users WHERE auth_user_id = $1`, [userId]);
  if (existing.rows.length > 0) {
    // Update last_seen
    await pool.query(`UPDATE chat_users SET last_seen = NOW() WHERE auth_user_id = $1`, [userId]);
    return existing.rows[0];
  }

  // Create new
  const avatarShort =
    avatar ||
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ||
    "AN";
  const res = await pool.query(
    `INSERT INTO chat_users (username, avatar, role, color, college_email, auth_user_id, status)
     VALUES ($1, $2, $3, $4, $5, $6, 'online')
     RETURNING *`,
    [name || "Anonymous", avatarShort, role || "Student", color || "bg-primary", email, userId],
  );
  return res.rows[0];
}

// ──────────────────────────────────────────────────────────────
// GET /api/chat/channels - List all channels
// ──────────────────────────────────────────────────────────────
router.get("/channels", optionalAuth, async (req, res) => {
  try {
    const channels = await pool.query(
      `SELECT id, name, description, is_voice, created_at FROM channels ORDER BY name`,
    );

    // Add online count for each channel
    const channelsWithCounts = await Promise.all(
      channels.rows.map(async (ch) => {
        // Get online users in this channel from socket.io (would need socket.io adapter)
        // For now return basic info
        return {
          ...ch,
          onlineCount: 0, // Will be populated by socket.io
        };
      }),
    );

    res.json({ channels: channelsWithCounts });
  } catch (err) {
    console.error("Error fetching channels:", err);
    res.status(500).json({ error: "Failed to fetch channels" });
  }
});

// ──────────────────────────────────────────────────────────────
// GET /api/chat/channels/:channelId/messages - Get message history
// ──────────────────────────────────────────────────────────────
router.get("/channels/:channelId/messages", requireAuth, async (req, res) => {
  const { channelId } = req.params;
  const limit = Math.min(parseInt(req.query.limit) || 50, 100);
  const before = req.query.before; // ISO timestamp for pagination

  try {
    let query = `
      SELECT m.id, m.text, m.created_at,
             u.username as "user", u.color, u.avatar
      FROM messages m
      LEFT JOIN chat_users u ON m.sender_id = u.id
      WHERE m.channel_id = $1
    `;
    const params = [channelId];

    if (before) {
      query += ` AND m.created_at < $2`;
      params.push(before);
    }

    query += ` ORDER BY m.created_at DESC LIMIT $${params.length + 1}`;
    params.push(limit);

    const messages = await pool.query(query, params);

    // Get reactions for these messages
    const messageIds = messages.rows.map((m) => m.id);
    let reactionsByMessage = {};

    if (messageIds.length > 0) {
      const placeholders = messageIds.map((_, i) => `$${i + 1}`).join(",");
      const reactions = await pool.query(
        `SELECT r.message_id, r.emoji, COUNT(*) as count
         FROM reactions r
         WHERE r.message_id IN (${placeholders})
         GROUP BY r.message_id, r.emoji`,
        messageIds,
      );

      for (const r of reactions.rows) {
        if (!reactionsByMessage[r.message_id]) reactionsByMessage[r.message_id] = [];
        reactionsByMessage[r.message_id].push({ emoji: r.emoji, count: parseInt(r.count) });
      }
    }

    // Format messages (reverse to chronological order)
    const formatted = messages.rows.reverse().map((m) => ({
      id: m.id,
      user: m.user,
      color: m.color || "text-primary",
      avatar: m.avatar,
      time: new Date(m.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      text: m.text,
      reactions: reactionsByMessage[m.id] || [],
    }));

    res.json({ messages: formatted });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// ──────────────────────────────────────────────────────────────
// POST /api/chat/channels/:channelId/messages - Send message
// ──────────────────────────────────────────────────────────────
router.post("/channels/:channelId/messages", requireAuth, async (req, res) => {
  const { channelId } = req.params;
  const { text } = req.body;
  const userId = req.user.id;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Message text required" });
  }

  try {
    // Ensure user exists in chat_users
    await getOrCreateChatUser(userId, {
      name: req.user.email?.split("@")[0] || "User",
      email: req.user.email,
    });

    // Save message
    const msgRes = await pool.query(
      `INSERT INTO messages (channel_id, sender_id, text)
       VALUES ($1, (SELECT id FROM chat_users WHERE auth_user_id = $2), $3)
       RETURNING id, created_at`,
      [channelId, userId, text.trim()],
    );

    const message = {
      id: msgRes.rows[0].id,
      text: text.trim(),
      created_at: msgRes.rows[0].created_at,
    };

    res.status(201).json({ message });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// ──────────────────────────────────────────────────────────────
// POST /api/chat/messages/:messageId/reactions - Add reaction
// ──────────────────────────────────────────────────────────────
router.post("/messages/:messageId/reactions", requireAuth, async (req, res) => {
  const { messageId } = req.params;
  const { emoji } = req.body;
  const userId = req.user.id;

  if (!emoji) {
    return res.status(400).json({ error: "Emoji required" });
  }

  try {
    // Ensure chat user exists
    await getOrCreateChatUser(userId, { email: req.user.email });

    // Upsert reaction (one per user per emoji per message)
    await pool.query(
      `INSERT INTO reactions (message_id, user_id, emoji)
       VALUES ($1, (SELECT id FROM chat_users WHERE auth_user_id = $2), $3)
       ON CONFLICT (message_id, user_id, emoji) DO NOTHING`,
      [messageId, userId, emoji],
    );

    // Get updated reaction counts
    const reactions = await pool.query(
      `SELECT emoji, COUNT(*) as count
       FROM reactions
       WHERE message_id = $1
       GROUP BY emoji`,
      [messageId],
    );

    const formatted = reactions.rows.map((r) => ({
      emoji: r.emoji,
      count: parseInt(r.count),
    }));

    res.json({ reactions: formatted });
  } catch (err) {
    console.error("Error adding reaction:", err);
    res.status(500).json({ error: "Failed to add reaction" });
  }
});

// ──────────────────────────────────────────────────────────────
// GET /api/chat/channels/:channelId/members - Get online members
// ──────────────────────────────────────────────────────────────
router.get("/channels/:channelId/members", optionalAuth, async (req, res) => {
  // Note: Real-time member list comes from Socket.io
  // This endpoint can return static seeded members as fallback
  try {
    const members = await pool.query(
      `SELECT username as name, status, role, color, auth_user_id
       FROM chat_users
       WHERE status = 'online'
       ORDER BY last_seen DESC
       LIMIT 50`,
    );

    // Add seeded members
    const seededMembers = [
      {
        name: "Aisha R.",
        status: "online",
        role: "Mod",
        color: "bg-emerald-500",
        auth_user_id: null,
      },
      {
        name: "Marcus K.",
        status: "online",
        role: "Student",
        color: "bg-cyan-500",
        auth_user_id: null,
      },
      { name: "Priya S.", status: "idle", role: "TA", color: "bg-fuchsia-500", auth_user_id: null },
      {
        name: "Leo T.",
        status: "offline",
        role: "Student",
        color: "bg-amber-500",
        auth_user_id: null,
      },
    ];

    // Deduplicate
    const allMembers = [...members.rows];
    for (const seeded of seededMembers) {
      if (!allMembers.some((m) => m.name === seeded.name)) {
        allMembers.push(seeded);
      }
    }

    res.json({ members: allMembers });
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

// ──────────────────────────────────────────────────────────────
// GET /api/chat/me - Get current user's chat profile
// ──────────────────────────────────────────────────────────────
router.get("/me", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get or create chat user
    const chatUser = await getOrCreateChatUser(userId, {
      name: req.user.email?.split("@")[0] || "User",
      email: req.user.email,
    });

    res.json({ user: chatUser });
  } catch (err) {
    console.error("Error fetching chat profile:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

module.exports = router;
