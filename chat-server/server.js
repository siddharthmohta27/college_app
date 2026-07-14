require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const datingRouter = require("./src/routes/dating");
const pool = require("./src/config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Dating REST API
app.use("/api/dating", datingRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8080", "http://localhost:8081", "http://localhost:3000", "*"],
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3001;

// In-memory presence tracking (socket.id -> user info)
const activeUsers = new Map();

// ─── Helpers ────────────────────────────────────────────────────────

async function ensureUserExists(name, avatar, role, color, email) {
  const avatarShort = avatar || name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "AN";
  const roleClean = role || "Student";
  const colorClean = color || "bg-primary";

  // Try to find by email first (if provided), then by username
  let client;
  if (email) {
    const res = await pool.query(
      `SELECT id, username, avatar, role, color, status FROM chat_users WHERE college_email = $1`,
      [email]
    );
    if (res.rows.length > 0) {
      return res.rows[0];
    }
  }

  const resByName = await pool.query(
    `SELECT id, username, avatar, role, color, status FROM chat_users WHERE username = $1`,
    [name]
  );
  if (resByName.rows.length > 0) {
    // Update last_seen
    await pool.query(
      `UPDATE chat_users SET last_seen = NOW() WHERE id = $1`,
      [resByName.rows[0].id]
    );
    return resByName.rows[0];
  }

  // Create new user
  const insert = await pool.query(
    `INSERT INTO chat_users (username, avatar, role, color, college_email, status)
     VALUES ($1, $2, $3, $4, $5, 'online')
     RETURNING id, username, avatar, role, color, status`,
    [name || "Anonymous", avatarShort, roleClean, colorClean, email]
  );
  return insert.rows[0];
}

async function loadChannelHistory(channelId, limit = 100) {
  const res = await pool.query(
    `SELECT m.id, m.text, m.created_at,
            u.username as "user", u.color, u.avatar
       FROM messages m
       LEFT JOIN chat_users u ON m.sender_id = u.id
      WHERE m.channel_id = $1
      ORDER BY m.created_at DESC
      LIMIT $2`,
    [channelId, limit]
  );
  // Return in chronological order (oldest first)
  return res.rows.reverse().map(row => ({
    id: row.id,
    user: row.user,
    color: row.color || "text-primary",
    avatar: row.avatar,
    time: new Date(row.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
    text: row.text,
    reactions: [],
  }));
}

async function loadMessageReactions(messageIds) {
  if (messageIds.length === 0) return {};
  const placeholders = messageIds.map((_, i) => `$${i + 1}`).join(",");
  const res = await pool.query(
    `SELECT r.message_id, r.emoji, COUNT(*) as count
       FROM reactions r
      WHERE r.message_id IN (${placeholders})
      GROUP BY r.message_id, r.emoji`,
    messageIds
  );
  const reactionsByMessage = {};
  for (const row of res.rows) {
    if (!reactionsByMessage[row.message_id]) reactionsByMessage[row.message_id] = [];
    reactionsByMessage[row.message_id].push({ emoji: row.emoji, count: parseInt(row.count) });
  }
  return reactionsByMessage;
}

async function saveMessage(channelId, senderId, text) {
  const res = await pool.query(
    `INSERT INTO messages (channel_id, sender_id, text)
     VALUES ($1, $2, $3)
     RETURNING id, created_at`,
    [channelId, senderId, text]
  );
  return res.rows[0];
}

async function upsertReaction(messageId, userId, emoji) {
  await pool.query(
    `INSERT INTO reactions (message_id, user_id, emoji)
     VALUES ($1, $2, $3)
     ON CONFLICT (message_id, user_id, emoji) DO NOTHING`,
    [messageId, userId, emoji]
  );
  // Get updated count
  const res = await pool.query(
    `SELECT emoji, COUNT(*) as count FROM reactions WHERE message_id = $1 GROUP BY emoji`,
    [messageId]
  );
  return res.rows.map(r => ({ emoji: r.emoji, count: parseInt(r.count) }));
}

function broadcastChannelMembers(channelId) {
  const membersInChannel = [];
  activeUsers.forEach((user, id) => {
    if (user.activeChannel === channelId) {
      membersInChannel.push({
        name: user.name,
        status: user.status,
        role: user.role,
        color: user.color,
      });
    }
  });

  // Always append seeded offline/idle mock members
  const seededMembers = [
    { name: "Aisha R.", status: "online", role: "Mod", color: "bg-emerald-500" },
    { name: "Marcus K.", status: "online", role: "Student", color: "bg-cyan-500" },
    { name: "Priya S.", status: "idle", role: "TA", color: "bg-fuchsia-500" },
    { name: "Leo T.", status: "offline", role: "Student", color: "bg-amber-500" },
  ];

  const allMembers = [...membersInChannel];
  seededMembers.forEach(seeded => {
    if (!allMembers.some(m => m.name === seeded.name)) {
      allMembers.push(seeded);
    }
  });

  io.to(channelId).emit("members", allMembers);
}

// ─── Socket.io Connection ──────────────────────────────────────────

io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  // User registers presence and enters a channel
  socket.on("join", async ({ name, avatar, role, color, channelId, email }) => {
    try {
      const user = await ensureUserExists(name, avatar, role, color, email);

      activeUsers.set(socket.id, {
        id: user.id,
        name: user.username,
        avatar: user.avatar,
        status: "online",
        role: user.role,
        color: user.color,
        activeChannel: channelId || "general",
      });

      socket.join(channelId || "general");
      console.log(`👤 ${user.username} joined channel: ${channelId || "general"}`);

      // Load history from DB
      const history = await loadChannelHistory(channelId || "general");
      const messageIds = history.map(m => m.id);
      const reactionsMap = await loadMessageReactions(messageIds);

      // Attach reactions to messages
      const historyWithReactions = history.map(msg => ({
        ...msg,
        reactions: reactionsMap[msg.id] || [],
      }));

      socket.emit("history", historyWithReactions);
      broadcastChannelMembers(channelId || "general");
    } catch (err) {
      console.error("❌ Error on join:", err.message);
      // Fallback to empty history
      socket.emit("history", []);
    }
  });

  // Client sent a chat message
  socket.on("message", async ({ text, channelId }) => {
    const user = activeUsers.get(socket.id);
    if (!user) return;

    try {
      const saved = await saveMessage(channelId, user.id, text);

      const newMsg = {
        id: saved.id,
        user: user.name,
        color: user.color,
        avatar: user.avatar,
        time: new Date(saved.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
        text,
        reactions: [],
      };

      io.to(channelId).emit("message", newMsg);
    } catch (err) {
      console.error("❌ Error saving message:", err.message);
    }
  });

  // Client reacted to a message
  socket.on("reaction", async ({ msgId, emoji, channelId }) => {
    const user = activeUsers.get(socket.id);
    if (!user) return;

    try {
      const reactions = await upsertReaction(msgId, user.id, emoji);
      io.to(channelId).emit("reactionUpdate", { msgId, reactions });
    } catch (err) {
      console.error("❌ Error saving reaction:", err.message);
    }
  });

  // Client switching channels
  socket.on("change_channel", async ({ oldChannel, newChannel }) => {
    const user = activeUsers.get(socket.id);
    if (!user) return;

    user.activeChannel = newChannel;
    socket.leave(oldChannel);
    socket.join(newChannel);

    try {
      const history = await loadChannelHistory(newChannel);
      const messageIds = history.map(m => m.id);
      const reactionsMap = await loadMessageReactions(messageIds);
      const historyWithReactions = history.map(msg => ({
        ...msg,
        reactions: reactionsMap[msg.id] || [],
      }));
      socket.emit("history", historyWithReactions);
    } catch (err) {
      console.error("❌ Error loading channel history:", err.message);
      socket.emit("history", []);
    }

    broadcastChannelMembers(oldChannel);
    broadcastChannelMembers(newChannel);
  });

  // User disconnected
  socket.on("disconnect", () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      const channelId = user.activeChannel;
      activeUsers.delete(socket.id);
      console.log(`👋 User disconnected: ${user.name} (${socket.id})`);
      broadcastChannelMembers(channelId);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Campus Connect Chat + Dating server running.");
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});