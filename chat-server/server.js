require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const datingRouter = require("./src/routes/dating");
const datingV3Router = require("./src/routes/dating-v3");
const chatRouter = require("./src/routes/chat");
const marketplaceRouter = require("./src/routes/marketplace");
const attendanceRouter = require("./src/routes/attendance");
const { authRouter } = require("./src/routes/auth");
const accountRouter = require("./src/routes/account");
const orientationRouter = require("./src/routes/orientation");
const { verifyAnyToken } = require("./src/middleware/auth");
const {
  pool,
  verifyFirebaseToken,
  getUserIdFromToken,
  getOrCreateChatUser,
  getOrCreateDatingProfile,
} = require("./src/config/db");

const app = express();

// CORS configuration - strict origin validation without wildcard credentials
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:5173",
];

if (process.env.CORS_ORIGIN) {
  process.env.CORS_ORIGIN.split(",").forEach((o) => {
    const trimmed = o.trim();
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /^https:\/\/.*\.netlify\.app$/.test(origin) ||
      /^https:\/\/.*\.vercel\.app$/.test(origin) ||
      /^https:\/\/.*\.lovable\.app$/.test(origin) ||
      /^https:\/\/.*\.lovableproject\.com$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));

// ─── Rate Limiting ──────────────────────────────────────────────────
// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limit for auth-sensitive endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Very strict rate limit for write operations (swipes, likes, messages)
const writeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 write requests per minute
  message: { error: "Too many requests, please slow down" },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", apiLimiter);

// ─── REST Routes ──────────────────────────────────────────────────
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/account", accountRouter);
app.use("/api/orientation", orientationRouter);
app.use("/api/dating", datingRouter);
app.use("/api/dating", datingV3Router);
app.use("/api/chat", chatRouter);
app.use("/api/marketplace", marketplaceRouter);
app.use("/api/attendance", attendanceRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;

// In-memory presence tracking (socket.id -> user info)
const activeUsers = new Map();

// ─── Socket.IO Rate Limiting ─────────────────────────────────────
const socketRateLimits = new Map();

const RATE_LIMIT_CONFIG = {
  MESSAGE_BURST_MAX: 5,         // Max 5 messages in 5-second window
  MESSAGE_WINDOW_MS: 5000,      // 5 second rolling window
  MIN_MESSAGE_INTERVAL_MS: 250, // Minimum 250ms between consecutive messages
  DUPLICATE_INTERVAL_MS: 2000,  // Prevent exact duplicate spam within 2s
  COOLDOWN_MS: 4000,            // 4s cooldown when limit breached
  REACTION_BURST_MAX: 10,       // Max 10 reactions in 5-second window
  REACTION_WINDOW_MS: 5000,     // 5 second rolling window
};

function checkMessageRateLimit(key, text) {
  const now = Date.now();
  let userLimit = socketRateLimits.get(key);
  if (!userLimit) {
    userLimit = {
      messageTimestamps: [],
      lastMessageText: "",
      lastMessageTime: 0,
      reactionTimestamps: [],
      cooldownUntil: 0,
    };
    socketRateLimits.set(key, userLimit);
  }

  // Active cooldown check
  if (now < userLimit.cooldownUntil) {
    const remainingSec = Math.ceil((userLimit.cooldownUntil - now) / 1000);
    return {
      allowed: false,
      reason: `Slow down! You're sending messages too fast. Please wait ${remainingSec}s.`,
      retryAfter: remainingSec,
    };
  }

  // Minimum interval check (burst throttling)
  if (now - userLimit.lastMessageTime < RATE_LIMIT_CONFIG.MIN_MESSAGE_INTERVAL_MS) {
    return {
      allowed: false,
      reason: "Please wait a moment before sending another message.",
      retryAfter: 1,
    };
  }

  // Duplicate spam check
  if (
    userLimit.lastMessageText &&
    userLimit.lastMessageText === (text || "").trim() &&
    now - userLimit.lastMessageTime < RATE_LIMIT_CONFIG.DUPLICATE_INTERVAL_MS
  ) {
    return {
      allowed: false,
      reason: "Please avoid sending identical duplicate messages repeatedly.",
      retryAfter: 2,
    };
  }

  // Clean window
  userLimit.messageTimestamps = userLimit.messageTimestamps.filter(
    (ts) => now - ts < RATE_LIMIT_CONFIG.MESSAGE_WINDOW_MS
  );

  // Check burst count
  if (userLimit.messageTimestamps.length >= RATE_LIMIT_CONFIG.MESSAGE_BURST_MAX) {
    userLimit.cooldownUntil = now + RATE_LIMIT_CONFIG.COOLDOWN_MS;
    const remainingSec = Math.ceil(RATE_LIMIT_CONFIG.COOLDOWN_MS / 1000);
    return {
      allowed: false,
      reason: `You're sending messages too fast! Cooldown active for ${remainingSec}s.`,
      retryAfter: remainingSec,
    };
  }

  userLimit.messageTimestamps.push(now);
  userLimit.lastMessageTime = now;
  userLimit.lastMessageText = (text || "").trim();
  return { allowed: true };
}

function checkReactionRateLimit(key) {
  const now = Date.now();
  let userLimit = socketRateLimits.get(key);
  if (!userLimit) {
    userLimit = {
      messageTimestamps: [],
      lastMessageText: "",
      lastMessageTime: 0,
      reactionTimestamps: [],
      cooldownUntil: 0,
    };
    socketRateLimits.set(key, userLimit);
  }

  userLimit.reactionTimestamps = userLimit.reactionTimestamps.filter(
    (ts) => now - ts < RATE_LIMIT_CONFIG.REACTION_WINDOW_MS
  );

  if (userLimit.reactionTimestamps.length >= RATE_LIMIT_CONFIG.REACTION_BURST_MAX) {
    return {
      allowed: false,
      reason: "You're reacting too fast. Please slow down.",
      retryAfter: 2,
    };
  }

  userLimit.reactionTimestamps.push(now);
  return { allowed: true };
}

// ─── Helpers ──────────────────────────────────────────────────────

async function loadChannelHistory(channelId, limit = 100) {
  const res = await pool.query(
    `SELECT m.id, m.text, m.created_at,
            u.username as "user", u.color, u.avatar
       FROM messages m
       LEFT JOIN chat_users u ON m.sender_id = u.id
      WHERE m.channel_id = $1
      ORDER BY m.created_at DESC
      LIMIT $2`,
    [channelId, limit],
  );
  return res.rows.reverse().map((row) => ({
    id: row.id,
    user: row.user,
    color: row.color || "text-primary",
    avatar: row.avatar,
    time: new Date(row.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
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
    messageIds,
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
    [channelId, senderId, text],
  );
  return res.rows[0];
}

async function upsertReaction(messageId, userId, emoji) {
  // WhatsApp single-reaction behavior:
  // Check if user already reacted to this message
  const existing = await pool.query(
    `SELECT id, emoji FROM reactions WHERE message_id = $1 AND user_id = $2`,
    [messageId, userId]
  );

  if (existing.rows.length > 0) {
    const currentEmoji = existing.rows[0].emoji;
    if (currentEmoji === emoji) {
      // Same reaction tapped again -> Remove/toggle off
      await pool.query(`DELETE FROM reactions WHERE id = $1`, [existing.rows[0].id]);
    } else {
      // Different reaction tapped -> Update to new emoji (strictly 1 reaction per user)
      await pool.query(`UPDATE reactions SET emoji = $1 WHERE id = $2`, [emoji, existing.rows[0].id]);
    }
  } else {
    // No existing reaction -> Insert new reaction
    await pool.query(
      `INSERT INTO reactions (message_id, user_id, emoji)
       VALUES ($1, $2, $3)`,
      [messageId, userId, emoji]
    );
  }

  const res = await pool.query(
    `SELECT emoji, COUNT(*) as count FROM reactions WHERE message_id = $1 GROUP BY emoji ORDER BY count DESC`,
    [messageId],
  );
  return res.rows.map((r) => ({ emoji: r.emoji, count: parseInt(r.count) }));
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

  io.to(channelId).emit("members", membersInChannel);
}

// ─── Socket.io Auth Middleware ────────────────────────────────────

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;

    if (!token) {
      console.log(`🔌 Socket ${socket.id} - No token provided, rejecting`);
      return next(new Error("Authentication required"));
    }

    // Verify Firebase JWT or Server JWT (supports both PEC and fresher accounts)
    const user = await verifyAnyToken(token);

    if (!user || !user.id) {
      return next(new Error("Invalid token: no user ID"));
    }

    // Attach user info to socket
    socket.user = user;

    console.log(`🔌 Socket ${socket.id} - Authenticated user: ${user.id} (${user.account_type || 'user'})`);
    next();
  } catch (err) {
    console.error(`🔌 Socket ${socket.id} - Auth failed:`, err.message);
    next(new Error("Authentication failed"));
  }
});

// ─── Socket.io Connection ─────────────────────────────────────────

io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.id} (${socket.user?.id})`);

  // User registers presence and enters a channel
  socket.on("join", async ({ name, avatar, role, color, channelId }) => {
    try {
      const authUserId = socket.user.id;
      const email = socket.user.email;

      // Get or create chat user linked to auth user
      const user = await getOrCreateChatUser(authUserId, {
        username: name,
        avatar,
        role,
        color,
        email,
      });

      // Get or create dating profile for the same auth user
      await getOrCreateDatingProfile(authUserId, {
        name: name || email?.split("@")[0] || "Student",
        email,
      });

      activeUsers.set(socket.id, {
        authUserId,
        chatUserId: user.id,
        name: user.username,
        avatar: user.avatar,
        status: "online",
        role: user.role,
        color: user.color,
        activeChannel: channelId || "general",
      });

      socket.join(channelId || "general");
      console.log(`👤 ${user.username} (${authUserId}) joined channel: ${channelId || "general"}`);

      // Load history from DB
      const history = await loadChannelHistory(channelId || "general");
      const messageIds = history.map((m) => m.id);
      const reactionsMap = await loadMessageReactions(messageIds);

      // Attach reactions to messages
      const historyWithReactions = history.map((msg) => ({
        ...msg,
        reactions: reactionsMap[msg.id] || [],
      }));

      socket.emit("history", historyWithReactions);
      broadcastChannelMembers(channelId || "general");
    } catch (err) {
      console.error("❌ Error on join:", err.message);
      socket.emit("history", []);
    }
  });

  // Client sent a chat message
  socket.on("message", async ({ text, channelId }) => {
    const user = activeUsers.get(socket.id);
    if (!user) return;

    if (!text || !text.trim()) {
      socket.emit("error", { message: "Message cannot be empty." });
      return;
    }

    // Rate limiting check
    const rateCheck = checkMessageRateLimit(user.authUserId || socket.id, text);
    if (!rateCheck.allowed) {
      socket.emit("rate_limit", {
        type: "MESSAGE_RATE_LIMIT",
        message: rateCheck.reason,
        retryAfter: rateCheck.retryAfter,
      });
      return;
    }

    try {
      const saved = await saveMessage(channelId, user.chatUserId, text.trim());

      const newMsg = {
        id: saved.id,
        user: user.name,
        color: user.color,
        avatar: user.avatar,
        time: new Date(saved.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        text: text.trim(),
        reactions: [],
      };

      io.to(channelId).emit("message", newMsg);
    } catch (err) {
      console.error("❌ Error saving message:", err.message);
      socket.emit("error", { message: "Failed to send message. Please try again." });
    }
  });

  // Client reacted to a message
  socket.on("reaction", async ({ msgId, emoji, channelId }) => {
    const user = activeUsers.get(socket.id);
    if (!user) return;

    if (!emoji || !msgId) return;

    // Rate limiting check
    const rateCheck = checkReactionRateLimit(user.authUserId || socket.id);
    if (!rateCheck.allowed) {
      socket.emit("rate_limit", {
        type: "REACTION_RATE_LIMIT",
        message: rateCheck.reason,
        retryAfter: rateCheck.retryAfter,
      });
      return;
    }

    try {
      const reactions = await upsertReaction(msgId, user.chatUserId, emoji);
      io.to(channelId).emit("reactionUpdate", { msgId, reactions });
    } catch (err) {
      console.error("❌ Error saving reaction:", err.message);
      socket.emit("error", { message: "Failed to update reaction." });
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
      const messageIds = history.map((m) => m.id);
      const reactionsMap = await loadMessageReactions(messageIds);
      const historyWithReactions = history.map((msg) => ({
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
