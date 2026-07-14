require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const datingRouter = require("./src/routes/dating");

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

// Seed Initial Channel message history
const messageHistory = {
  general: [
    {
      id: "1",
      user: "Priya S.",
      color: "text-fuchsia-400",
      avatar: "PS",
      time: "10:24",
      text: "yo did anyone finish the algo pset? 😭 stuck on Q3",
      reactions: [{ emoji: "😭", count: 4 }],
    },
    {
      id: "2",
      user: "Marcus K.",
      color: "text-cyan-400",
      avatar: "MK",
      time: "10:26",
      text: "same boat. the DP transition is cursed",
    },
    {
      id: "3",
      user: "Aisha R.",
      color: "text-emerald-400",
      avatar: "AR",
      time: "10:28",
      text: "hop in Study Room 1 — im screensharing rn",
      reactions: [
        { emoji: "🔥", count: 6 },
        { emoji: "🙏", count: 3 },
      ],
    },
  ],
  announcements: [
    {
      id: "ann-1",
      user: "HOD Office",
      color: "text-primary",
      avatar: "HO",
      time: "09:00",
      text: "End Semester timetable has been posted in the resources wing.",
    },
  ],
  assignments: [
    {
      id: "assign-1",
      user: "Aisha R.",
      color: "text-emerald-400",
      avatar: "AR",
      time: "Yesterday",
      text: "Lab 5 submissions are open on the portal now.",
    },
  ],
  random: [
    {
      id: "rand-1",
      user: "Leo T.",
      color: "text-amber-400",
      avatar: "LT",
      time: "12:00",
      text: "Who wants to order pizza from Dominoes tonight? 🍕",
    },
  ],
  internships: [
    {
      id: "int-1",
      user: "Placement Cell",
      color: "text-primary",
      avatar: "PC",
      time: "11:00",
      text: "Summer internship applications for Google open next Monday. Get your resumes reviewed!",
    },
  ],
};

// Tracks active sockets: socket.id -> { name, avatar, status, role, color, activeChannel }
const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User registers their presence and enters a channel
  socket.on("join", ({ name, avatar, role, color, channelId }) => {
    // Save user info associated with socket
    activeUsers.set(socket.id, {
      name: name || "Anonymous",
      avatar: avatar || "AN",
      status: "online",
      role: role || "Student",
      color: color || "bg-primary",
      activeChannel: channelId || "general",
    });

    // Join room for this channel
    socket.join(channelId);
    console.log(`${name || "Anonymous"} joined channel: ${channelId}`);

    // Send history of this channel to the user
    const history = messageHistory[channelId] || [];
    socket.emit("history", history);

    // Broadcast updated active members list to all clients in the channel
    broadcastChannelMembers(channelId);
  });

  // Client sent a chat message
  socket.on("message", ({ text, channelId }) => {
    const user = activeUsers.get(socket.id);
    if (!user) return;

    const newMsg = {
      id: crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      user: user.name,
      color: "text-primary",
      avatar: user.avatar,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      text: text,
      reactions: [],
    };

    // Store in history
    if (!messageHistory[channelId]) {
      messageHistory[channelId] = [];
    }
    messageHistory[channelId].push(newMsg);

    // Keep history capped at 100 messages to prevent memory leak
    if (messageHistory[channelId].length > 100) {
      messageHistory[channelId].shift();
    }

    // Broadcast to the channel room
    io.to(channelId).emit("message", newMsg);
  });

  // Client reacted to a message
  socket.on("reaction", ({ msgId, emoji, channelId }) => {
    const history = messageHistory[channelId] || [];
    const msg = history.find((m) => m.id === msgId);
    if (msg) {
      if (!msg.reactions) msg.reactions = [];
      const reactIdx = msg.reactions.findIndex((r) => r.emoji === emoji);
      if (reactIdx !== -1) {
        msg.reactions[reactIdx].count += 1;
      } else {
        msg.reactions.push({ emoji, count: 1 });
      }

      // Broadcast reaction update to channel
      io.to(channelId).emit("reactionUpdate", { msgId, reactions: msg.reactions });
    }
  });

  // Client switching channels
  socket.on("change_channel", ({ oldChannel, newChannel }) => {
    const user = activeUsers.get(socket.id);
    if (user) {
      user.activeChannel = newChannel;
      socket.leave(oldChannel);
      socket.join(newChannel);

      // Send history of the new channel
      const history = messageHistory[newChannel] || [];
      socket.emit("history", history);

      // Update rosters for both rooms
      broadcastChannelMembers(oldChannel);
      broadcastChannelMembers(newChannel);
    }
  });

  // User disconnected
  socket.on("disconnect", () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      const channelId = user.activeChannel;
      activeUsers.delete(socket.id);
      console.log(`User disconnected: ${user.name} (${socket.id})`);

      // Update roster for the channel they were in
      broadcastChannelMembers(channelId);
    }
  });
});

// Helper to broadcast list of active members in a room
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

  // Always append some seeded offline/idle mock members to make the chat feel alive
  const seededMembers = [
    { name: "Aisha R.", status: "online", role: "Mod", color: "bg-emerald-500" },
    { name: "Marcus K.", status: "online", role: "Student", color: "bg-cyan-500" },
    { name: "Priya S.", status: "idle", role: "TA", color: "bg-fuchsia-500" },
    { name: "Leo T.", status: "offline", role: "Student", color: "bg-amber-500" },
  ];

  // De-duplicate members to prevent doubles if a real user matches a seeded name
  const allMembers = [...membersInChannel];
  seededMembers.forEach((seeded) => {
    if (!allMembers.some((m) => m.name === seeded.name)) {
      allMembers.push(seeded);
    }
  });

  io.to(channelId).emit("members", allMembers);
}

app.get("/", (req, res) => {
  res.send("Campus Connect Mock Chat server running.");
});

server.listen(PORT, () => {
  console.log(`Mock chat server running on port http://localhost:${PORT}`);
});
