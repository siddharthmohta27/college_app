const express = require("express");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const { pool, getOrCreateChatUser } = require("../config/db");
const { sendOtp, verifyOtp } = require("../services/otpService");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "campus_connect_jwt_secret_key_2026";

// In-memory fallback user store if DB connection is down
const memoryUsers = new Map();

// Helper: Email format validation
function isValidEmailFormat(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || "").trim());
}

// Helper: PEC domain validation
function isPecDomain(email) {
  return (email || "").trim().toLowerCase().endsWith("@pec.edu.in");
}

// ─── Rate Limiters ─────────────────────────────────────────────────────────────
// Strict rate-limiting for signups and OTP dispatches (5 requests per 15 minutes per IP)
const signupOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: "Too many signup or OTP requests from this IP. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate-limiting on OTP verification attempts (10 attempts per 15 min)
const verifyOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: "Too many verification attempts. Please wait a few minutes and try again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper: Generate JWT session token
function generateSessionToken(user) {
  return jwt.sign(
    {
      id: user.id,
      auth_user_id: user.auth_user_id || user.id.toString(),
      email: user.email,
      name: user.name,
      account_type: user.account_type || "pec_verified",
      email_verified: user.email_verified === true,
      is_admin: user.is_admin === true,
      role: user.is_admin ? "admin" : "authenticated",
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// POST /api/auth/signup
// ───────────────────────────────────────────────────────────────────────────────
router.post("/signup", signupOtpLimiter, async (req, res) => {
  try {
    const { email, name, password, auth_user_id, account_type = "pec_verified" } = req.body;

    if (!email || !isValidEmailFormat(email)) {
      return res.status(400).json({
        success: false,
        error: "Valid email address is required.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanAccountType = account_type === "fresher_temp" ? "fresher_temp" : "pec_verified";

    // Enforce PEC domain rule only when account_type is 'pec_verified'
    if (cleanAccountType === "pec_verified" && !isPecDomain(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: "Only @pec.edu.in email domain is allowed for PEC student accounts. If you are a fresher, choose Fresher mode.",
      });
    }

    // Check if user already exists
    let existingUser = null;
    try {
      if (pool) {
        const userRes = await pool.query(`SELECT * FROM users WHERE email = $1`, [cleanEmail]);
        if (userRes.rows.length > 0) {
          existingUser = userRes.rows[0];
        }
      }
    } catch (dbErr) {
      console.warn("⚠️  [Auth Signup] DB check failed:", dbErr.message);
      existingUser = memoryUsers.get(cleanEmail);
    }

    if (existingUser && existingUser.email_verified) {
      return res.status(409).json({
        success: false,
        error: "An account with this email already exists. Please log in.",
      });
    }

    // Upsert / Save user with email_verified = false
    let savedUser = null;
    try {
      if (pool) {
        const insertRes = await pool.query(
          `INSERT INTO users (email, name, account_type, email_verified, auth_user_id, updated_at)
           VALUES ($1, $2, $3, false, $4, NOW())
           ON CONFLICT (email) DO UPDATE SET
             name = COALESCE(EXCLUDED.name, users.name),
             account_type = EXCLUDED.account_type,
             auth_user_id = COALESCE(EXCLUDED.auth_user_id, users.auth_user_id),
             updated_at = NOW()
           RETURNING id, email, name, account_type, email_verified, pec_email, is_admin`,
          [cleanEmail, name || "Student", cleanAccountType, auth_user_id || `auth_${Date.now()}`]
        );
        savedUser = insertRes.rows[0];
      }
    } catch (dbErr) {
      console.warn("⚠️  [Auth Signup] DB insert failed, using memory store:", dbErr.message);
    }

    if (!savedUser) {
      savedUser = {
        id: memoryUsers.size + 1,
        email: cleanEmail,
        name: name || "Student",
        account_type: cleanAccountType,
        email_verified: false,
        auth_user_id: auth_user_id || `auth_${Date.now()}`,
        is_admin: false,
      };
      memoryUsers.set(cleanEmail, savedUser);
    }

    // Dispatch verification OTP
    const otpResult = await sendOtp(cleanEmail, "signup_verification");

    return res.status(200).json({
      success: true,
      message: `Verification code sent to ${cleanEmail}. Please verify to activate your account.`,
      email: cleanEmail,
      account_type: cleanAccountType,
      requiresOtp: true,
      debugOtp: otpResult.debugOtp,
    });
  } catch (err) {
    console.error("❌ Error in /api/auth/signup:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error during registration.",
    });
  }
});

// ───────────────────────────────────────────────────────────────────────────────
// POST /api/auth/send-otp
// ───────────────────────────────────────────────────────────────────────────────
router.post("/send-otp", signupOtpLimiter, async (req, res) => {
  try {
    const { email, otp_type = "signup_verification" } = req.body;
    if (!email || !isValidEmailFormat(email)) {
      return res.status(400).json({ success: false, error: "Valid email address is required." });
    }

    const cleanEmail = email.toLowerCase().trim();
    const result = await sendOtp(cleanEmail, otp_type);

    return res.status(200).json({
      success: true,
      message: result.message,
      email: cleanEmail,
      debugOtp: result.debugOtp,
    });
  } catch (err) {
    console.error("❌ Error in /api/auth/send-otp:", err);
    return res.status(500).json({ success: false, error: "Failed to send OTP code." });
  }
});

// ───────────────────────────────────────────────────────────────────────────────
// POST /api/auth/verify-otp
// ───────────────────────────────────────────────────────────────────────────────
router.post("/verify-otp", verifyOtpLimiter, async (req, res) => {
  try {
    const { email, otp, otp_code, auth_user_id } = req.body;
    const code = otp || otp_code;

    if (!email || !isValidEmailFormat(email)) {
      return res.status(400).json({ success: false, error: "Valid email address is required." });
    }
    if (!code) {
      return res.status(400).json({ success: false, error: "Verification code is required." });
    }

    const cleanEmail = email.toLowerCase().trim();
    const verification = await verifyOtp(cleanEmail, code, "signup_verification");

    if (!verification.valid) {
      return res.status(400).json({ success: false, error: verification.message });
    }

    // Mark user as email_verified = true
    let user = null;
    try {
      if (pool) {
        const updateRes = await pool.query(
          `UPDATE users 
           SET email_verified = true, 
               auth_user_id = COALESCE($2, auth_user_id),
               updated_at = NOW()
           WHERE email = $1
           RETURNING id, email, name, account_type, email_verified, pec_email, is_admin, auth_user_id`,
          [cleanEmail, auth_user_id || null]
        );
        if (updateRes.rows.length > 0) {
          user = updateRes.rows[0];
        }
      }
    } catch (dbErr) {
      console.warn("⚠️  [Verify OTP] DB update failed:", dbErr.message);
    }

    if (!user) {
      user = memoryUsers.get(cleanEmail) || {
        id: 1,
        email: cleanEmail,
        name: "Student",
        account_type: cleanEmail.endsWith("@pec.edu.in") ? "pec_verified" : "fresher_temp",
        email_verified: true,
        auth_user_id: auth_user_id || `auth_${Date.now()}`,
        is_admin: false,
      };
      user.email_verified = true;
      if (auth_user_id) user.auth_user_id = auth_user_id;
      memoryUsers.set(cleanEmail, user);
    }

    // Also ensure chat user is created/updated
    try {
      if (typeof getOrCreateChatUser === "function") {
        await getOrCreateChatUser(user.auth_user_id || user.id.toString(), {
          username: user.name || user.email.split("@")[0],
          email: user.email,
          role: user.account_type === "fresher_temp" ? "Fresher" : "Student",
        });
      }
    } catch (chatErr) {
      console.warn("⚠️  Chat user init failed on verify-otp:", chatErr.message);
    }

    // Generate JWT token containing account_type and verified flag
    const token = generateSessionToken(user);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully! Account is now active.",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        account_type: user.account_type,
        email_verified: user.email_verified,
        pec_email: user.pec_email,
        is_admin: user.is_admin,
      },
    });
  } catch (err) {
    console.error("❌ Error in /api/auth/verify-otp:", err);
    return res.status(500).json({ success: false, error: "Internal server error during verification." });
  }
});

// ───────────────────────────────────────────────────────────────────────────────
// GET /api/auth/me (Returns active user info from token)
// ───────────────────────────────────────────────────────────────────────────────
router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Authorization header required" });
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ success: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
});

module.exports = {
  authRouter: router,
  generateSessionToken,
  JWT_SECRET,
};
