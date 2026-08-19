const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { pool } = require("../config/db");
const { requireAuth, optionalAuth } = require("../middleware/auth");
const { getOrCreateChatUser, getOrCreateDatingProfile } = require("../config/db");

// Chat specific rate limiters
const chatMessageLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 seconds
  max: 5,             // limit each IP to 5 messages per 5 seconds
  message: { error: "You are sending messages too fast. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

const chatReactionLimiter = rateLimit({
  windowMs: 5 * 1000, // 5 seconds
  max: 10,            // limit each IP to 10 reactions per 5 seconds
  message: { error: "You are reacting too fast. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ──────────────────────────────────────────────────────────────
// GET /api/chat/channels - List all channels
// ──────────────────────────────────────────────────────────────
router.get("/channels", optionalAuth, async (req, res) => {
  try {
    const channels = await pool.query(
      `SELECT id, name, description, is_voice, created_at FROM channels ORDER BY name`,
    );

    const channelsWithCounts = await Promise.all(
      channels.rows.map(async (ch) => {
        return {
          ...ch,
          onlineCount: 0,
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
  const before = req.query.before;

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
router.post("/channels/:channelId/messages", requireAuth, chatMessageLimiter, async (req, res) => {
  const { channelId } = req.params;
  const { text } = req.body;
  const firebaseUid = req.user.id;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Message text required" });
  }

  try {
    // Ensure user exists in chat_users
    await getOrCreateChatUser(firebaseUid, {
      name: req.user.email?.split("@")[0] || "User",
      email: req.user.email,
    });

    // Save message
    const msgRes = await pool.query(
      `INSERT INTO messages (channel_id, sender_id, text)
       VALUES ($1, (SELECT id FROM chat_users WHERE auth_user_id = $2), $3)
       RETURNING id, created_at`,
      [channelId, firebaseUid, text.trim()],
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
// POST /api/chat/messages/:messageId/reactions - Add/Toggle reaction
// ──────────────────────────────────────────────────────────────
router.post("/messages/:messageId/reactions", requireAuth, chatReactionLimiter, async (req, res) => {
  const { messageId } = req.params;
  const { emoji } = req.body;
  const firebaseUid = req.user.id;

  if (!emoji) {
    return res.status(400).json({ error: "Emoji required" });
  }

  try {
    // Ensure chat user exists
    const chatUser = await getOrCreateChatUser(firebaseUid, { email: req.user.email });

    // WhatsApp single-reaction behavior:
    // Check if user already reacted to this message
    const existing = await pool.query(
      `SELECT id, emoji FROM reactions WHERE message_id = $1 AND user_id = $2`,
      [messageId, chatUser.id],
    );

    if (existing.rows.length > 0) {
      const currentEmoji = existing.rows[0].emoji;
      if (currentEmoji === emoji) {
        // Same reaction clicked again -> remove/toggle off
        await pool.query(`DELETE FROM reactions WHERE id = $1`, [existing.rows[0].id]);
      } else {
        // Different emoji clicked -> update to new emoji (strictly 1 reaction per user)
        await pool.query(`UPDATE reactions SET emoji = $1 WHERE id = $2`, [emoji, existing.rows[0].id]);
      }
    } else {
      // No reaction yet -> insert
      await pool.query(
        `INSERT INTO reactions (message_id, user_id, emoji)
         VALUES ($1, $2, $3)`,
        [messageId, chatUser.id, emoji],
      );
    }

    // Get updated reaction counts
    const reactions = await pool.query(
      `SELECT emoji, COUNT(*) as count
       FROM reactions
       WHERE message_id = $1
       GROUP BY emoji
       ORDER BY count DESC`,
      [messageId],
    );

    const formatted = reactions.rows.map((r) => ({
      emoji: r.emoji,
      count: parseInt(r.count),
    }));

    res.json({ reactions: formatted });
  } catch (err) {
    console.error("Error updating reaction:", err);
    res.status(500).json({ error: "Failed to update reaction" });
  }
});

// ──────────────────────────────────────────────────────────────
// GET /api/chat/channels/:channelId/members - Get online members
// ──────────────────────────────────────────────────────────────
router.get("/channels/:channelId/members", optionalAuth, async (req, res) => {
  try {
    const members = await pool.query(
      `SELECT username as name, status, role, color, auth_user_id
       FROM chat_users
       WHERE status = 'online'
       ORDER BY last_seen DESC
       LIMIT 50`,
    );

    res.json({ members: members.rows });
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
    const firebaseUid = req.user.id;

    const chatUser = await getOrCreateChatUser(firebaseUid, {
      name: req.user.email?.split("@")[0] || "User",
      email: req.user.email,
    });

    // Also ensure dating profile exists
    await getOrCreateDatingProfile(firebaseUid, {
      name: req.user.email?.split("@")[0] || "Student",
    });

    res.json({ user: chatUser });
  } catch (err) {
    console.error("Error fetching chat profile:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

module.exports = router;
