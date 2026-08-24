/**
 * Self-contained security test runner
 */
const express = require("express");
const http = require("http");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

// Set environment
process.env.JWT_SECRET = "campus_connect_jwt_secret_key_2026";
process.env.PORT = "3456";

// Mock DB pool
const mockMessages = new Map();
let nextMsgId = 1;
const mockChatUsers = new Map([
  ["test_user_a_123", { id: 1, auth_user_id: "test_user_a_123", username: "User A", email: "usera@pec.edu.in", status: "online" }],
  ["test_user_b_456", { id: 2, auth_user_id: "test_user_b_456", username: "User B", email: "userb@pec.edu.in", status: "online" }],
]);

const mockDatingProfiles = [
  {
    id: 1,
    auth_user_id: "test_user_a_123",
    name: "User A",
    college_email: "usera@pec.edu.in",
    age: 20,
    year: "3rd Year",
    major: "Computer Science",
    bio: "Bio A",
    interests: ["Coding"],
    emoji: "💻",
    verified: true,
    is_incognito: false,
  },
  {
    id: 2,
    auth_user_id: "test_user_b_456",
    name: "User B",
    college_email: "userb@pec.edu.in",
    age: 21,
    year: "4th Year",
    major: "Electrical",
    bio: "Bio B",
    interests: ["Robotics"],
    emoji: "⚡",
    verified: true,
    is_incognito: false,
  },
];

// Require application components
const { requireAuth } = require("./src/middleware/auth");
const chatRouter = require("./src/routes/chat");
const datingRouter = require("./src/routes/dating");

const app = express();
app.use(express.json());

// Wire routes
app.use("/api/chat", chatRouter);
app.use("/api/dating", datingRouter);

const server = http.createServer(app);

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, "http://127.0.0.1:3456");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const req = http.request(url, { method, headers }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        let parsed;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        resolve({ status: res.statusCode, headers: res.headers, body: parsed });
      });
    });

    req.on("error", reject);
    if (body) req.write(typeof body === "string" ? body : JSON.stringify(body));
    req.end();
  });
}

function generateMockToken(id, email, name, isAdmin = false) {
  return jwt.sign(
    {
      id,
      auth_user_id: id,
      email,
      name,
      account_type: "pec_verified",
      email_verified: true,
      is_admin: isAdmin,
      role: isAdmin ? "admin" : "authenticated",
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

async function run() {
  await new Promise((resolve) => server.listen(3456, "127.0.0.1", resolve));
  console.log("🚀 Test server listening on http://127.0.0.1:3456");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  const userAToken = generateMockToken("test_user_a_123", "usera.bt25cse@pec.edu.in", "User A");
  const userBToken = generateMockToken("test_user_b_456", "userb.bt25ele@pec.edu.in", "User B");

  console.log("\n▶ [Test Suite 1] Unauthenticated Requests Return 401");
  {
    const res1 = await request("GET", "/api/chat/channels");
    assert(res1.status === 401, `GET /api/chat/channels -> Status ${res1.status} (expected 401)`);

    const res2 = await request("GET", "/api/chat/channels/general/messages");
    assert(res2.status === 401, `GET /api/chat/channels/general/messages -> Status ${res2.status} (expected 401)`);

    const res3 = await request("POST", "/api/chat/channels/general/messages", { text: "Unauth test" });
    assert(res3.status === 401, `POST /api/chat/channels/general/messages -> Status ${res3.status} (expected 401)`);

    const res4 = await request("PUT", "/api/chat/messages/1", { text: "Unauth edit" });
    assert(res4.status === 401, `PUT /api/chat/messages/1 -> Status ${res4.status} (expected 401)`);

    const res5 = await request("DELETE", "/api/chat/messages/1");
    assert(res5.status === 401, `DELETE /api/chat/messages/1 -> Status ${res5.status} (expected 401)`);

    const res6 = await request("GET", "/api/dating/profiles");
    assert(res6.status === 401, `GET /api/dating/profiles -> Status ${res6.status} (expected 401)`);

    const res7 = await request("POST", "/api/dating/swipe", { swipedId: 1, action: "like" });
    assert(res7.status === 401, `POST /api/dating/swipe -> Status ${res7.status} (expected 401)`);
  }

  console.log("\n▶ [Test Suite 2] Rate Limiting (Rapid Fire) -> 429");
  {
    let hit429 = false;
    for (let i = 0; i < 15; i++) {
      const res = await request("POST", "/api/chat/channels/general/messages", { text: `Burst ${i}` }, userAToken);
      if (res.status === 429) {
        hit429 = true;
        break;
      }
    }
    assert(hit429, `Rapid burst requests trigger HTTP 429 Too Many Requests`);
  }

  console.log(`\n========================================`);
  console.log(`Test Results: ${passed} passed, ${failed} failed`);
  console.log(`========================================\n`);

  server.close();
  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error("Test runner error:", err);
  server.close();
  process.exit(1);
});
