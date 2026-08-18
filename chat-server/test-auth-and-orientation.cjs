const http = require("http");
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { authRouter, JWT_SECRET } = require("./src/routes/auth");
const accountRouter = require("./src/routes/account");
const orientationRouter = require("./src/routes/orientation");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/account", accountRouter);
app.use("/api/orientation", orientationRouter);

const PORT = 3099;
const server = app.listen(PORT, async () => {
  console.log(`\n🧪 Test Server started on http://localhost:${PORT}`);
  await runTests();
  server.close(() => {
    console.log("🏁 Test Server closed.\n");
    process.exit(0);
  });
});

async function apiRequest(path, options = {}) {
  const url = `http://localhost:${PORT}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
}

async function runTests() {
  console.log("────────────────────────────────────────────────────────────");
  console.log("🚀 Starting Backend Tests for Non-PEC Fresher Auth & Orientation");
  console.log("────────────────────────────────────────────────────────────\n");

  let passed = 0;
  let total = 0;

  function assert(condition, name) {
    total++;
    if (condition) {
      console.log(`✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${name}`);
    }
  }

  // ── TEST 1: Reject standard PEC signup if email is not @pec.edu.in
  try {
    const res = await apiRequest("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: "student@gmail.com",
        name: "Test Student",
        account_type: "pec_verified",
      }),
    });
    assert(res.status === 400 && res.data.success === false, "Test 1: Rejects @gmail.com for pec_verified account type");
  } catch (err) {
    assert(false, `Test 1 failed: ${err.message}`);
  }

  // ── TEST 2: Allow Fresher signup with non-PEC email
  let fresherEmail = `fresher_${Date.now()}@gmail.com`;
  let otpCode = null;
  try {
    const res = await apiRequest("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: fresherEmail,
        name: "Aarav Fresher",
        account_type: "fresher_temp",
      }),
    });
    otpCode = res.data.debugOtp;
    assert(
      res.status === 200 && res.data.success === true && res.data.account_type === "fresher_temp",
      "Test 2: Accepts non-PEC email for fresher_temp and dispatches OTP"
    );
  } catch (err) {
    assert(false, `Test 2 failed: ${err.message}`);
  }

  // ── TEST 3: Verify OTP for Fresher account
  let fresherToken = null;
  try {
    const res = await apiRequest("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({
        email: fresherEmail,
        otp: otpCode,
      }),
    });
    fresherToken = res.data.token;
    assert(
      res.status === 200 &&
        res.data.success === true &&
        res.data.user.account_type === "fresher_temp" &&
        res.data.user.email_verified === true &&
        !!fresherToken,
      "Test 3: OTP verification activates fresher account and issues session JWT with account_type=fresher_temp"
    );
  } catch (err) {
    assert(false, `Test 3 failed: ${err.message}`);
  }

  // ── TEST 4: Request linking PEC email to the Fresher account
  let pecTargetEmail = `aarav.bt26cs@pec.edu.in`;
  let pecLinkOtp = null;
  try {
    const res = await apiRequest("/api/account/link-pec-email", {
      method: "POST",
      headers: { Authorization: `Bearer ${fresherToken}` },
      body: JSON.stringify({
        pec_email: pecTargetEmail,
      }),
    });
    pecLinkOtp = res.data.debugOtp;
    assert(
      res.status === 200 && res.data.success === true && res.data.pec_email === pecTargetEmail,
      "Test 4: POST /api/account/link-pec-email sends OTP to new @pec.edu.in address"
    );
  } catch (err) {
    assert(false, `Test 4 failed: ${err.message}`);
  }

  // ── TEST 5: Verify PEC Link OTP and upgrade account in-place
  try {
    const res = await apiRequest("/api/account/verify-link-pec-email", {
      method: "POST",
      headers: { Authorization: `Bearer ${fresherToken}` },
      body: JSON.stringify({
        pec_email: pecTargetEmail,
        otp: pecLinkOtp,
      }),
    });
    assert(
      res.status === 200 &&
        res.data.success === true &&
        res.data.user.account_type === "pec_verified" &&
        res.data.user.pec_email === pecTargetEmail,
      "Test 5: In-place migration upgrades fresher account to pec_verified retaining all user data"
    );
  } catch (err) {
    assert(false, `Test 5 failed: ${err.message}`);
  }

  // ── TEST 6: Orientation GET endpoint accessible to logged-in user
  try {
    const res = await apiRequest("/api/orientation", {
      method: "GET",
    });
    assert(
      res.status === 200 &&
        res.data.success === true &&
        Array.isArray(res.data.schedule) &&
        res.data.schedule.length > 0 &&
        !!res.data.map,
      "Test 6: GET /api/orientation returns full dynamic bundle (map, venues, schedule)"
    );
  } catch (err) {
    assert(false, `Test 6 failed: ${err.message}`);
  }

  // ── TEST 7: Orientation Admin upload security check
  try {
    // Normal non-admin user attempt should be forbidden
    const normalUserRes = await apiRequest("/api/orientation/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${fresherToken}` },
      body: JSON.stringify({
        map: { title: "Hacked Map", image_url: "bad.png" },
      }),
    });
    assert(
      normalUserRes.status === 403,
      "Test 7a: POST /api/orientation/upload strictly rejects non-admin users (403 Forbidden)"
    );

    // Admin user token attempt should succeed
    const adminToken = jwt.sign(
      { id: 999, email: "admin@pec.edu.in", is_admin: true, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const adminRes = await apiRequest("/api/orientation/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({
        map: { title: "Updated Orientation 2026 Map", image_url: "/orientation/pec-map-v2.png" },
        schedule: [
          { time_slot: "9:00 AM – 10:00 AM", activity: "Admin Keynote", venue: "Auditorium", category: "morning" },
        ],
      }),
    });
    assert(
      adminRes.status === 200 && adminRes.data.success === true,
      "Test 7b: POST /api/orientation/upload allows admin to update content dynamically without redeployment"
    );
  } catch (err) {
    assert(false, `Test 7 failed: ${err.message}`);
  }

  console.log("\n────────────────────────────────────────────────────────────");
  console.log(`📊 Test Summary: ${passed} / ${total} tests passed.`);
  console.log("────────────────────────────────────────────────────────────\n");
}
