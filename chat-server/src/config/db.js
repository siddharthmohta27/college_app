require("dotenv").config();
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

// ──────────────────────────────────────────────────────────────
// PostgreSQL Connection Pool
// ──────────────────────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_URL && process.env.DATABASE_URL.includes("localhost")
      ? false
      : process.env.DATABASE_URL
        ? { rejectUnauthorized: false }
        : false,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("⚠️  PostgreSQL connection error:", err.message);
  console.error("   Chat features will be unavailable until DB is connected.");
});

// ──────────────────────────────────────────────────────────────
// Supabase JWT Verification
// ──────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_JWKS_URI =
  process.env.SUPABASE_JWKS_URI ||
  (SUPABASE_URL ? `${SUPABASE_URL}/auth/v1/.well-known/jwks.json` : null);

let jwks;
if (SUPABASE_JWKS_URI) {
  jwks = jwksClient({
    jwksUri: SUPABASE_JWKS_URI,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
  });
} else {
  console.warn("⚠️  SUPABASE_URL not set - JWT verification will not work");
}

function getKey(header, callback) {
  if (!jwks) return callback(new Error("JWKS client not initialized"));
  jwks.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

/**
 * Verify a Supabase JWT token
 * @param {string} token - JWT token string
 * @returns {Promise<object>} Decoded token payload
 */
async function verifySupabaseToken(token) {
  return new Promise((resolve, reject) => {
    if (!jwks) return reject(new Error("JWKS not configured"));

    jwt.verify(
      token,
      getKey,
      {
        algorithms: ["RS256"],
        audience: "authenticated",
        issuer: `${SUPABASE_URL}/auth/v1`,
      },
      (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      },
    );
  });
}

/**
 * Extract user ID from verified Supabase JWT
 * @param {object} decoded - Decoded JWT payload
 * @returns {string} User UUID (sub claim)
 */
function getUserIdFromToken(decoded) {
  return decoded.sub;
}

/**
 * Verify token and return user ID
 * @param {string} token - JWT token string
 * @returns {Promise<string>} User UUID
 */
async function verifyTokenAndGetUserId(token) {
  const decoded = await verifySupabaseToken(token);
  return getUserIdFromToken(decoded);
}

// ──────────────────────────────────────────────────────────────
// Helper: Get or create chat user for authenticated user
// ──────────────────────────────────────────────────────────────
async function getOrCreateChatUser(authUserId, userData = {}) {
  const { username, avatar, role = "Student", color = "bg-primary", email } = userData;

  const avatarShort =
    avatar ||
    username
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ||
    "AN";

  const res = await pool.query(
    `INSERT INTO chat_users (username, avatar, role, color, status, college_email, auth_user_id)
     VALUES ($1, $2, $3, $4, 'online', $5, $6)
     ON CONFLICT (auth_user_id) DO UPDATE SET
       username = EXCLUDED.username,
       avatar = EXCLUDED.avatar,
       role = EXCLUDED.role,
       color = EXCLUDED.color,
       status = 'online',
       last_seen = NOW()
     RETURNING id, username, avatar, role, color, status, auth_user_id`,
    [username || "Anonymous", avatarShort, role, color, email, authUserId],
  );
  return res.rows[0];
}

// ──────────────────────────────────────────────────────────────
// Helper: Get or create dating profile for authenticated user
// ──────────────────────────────────────────────────────────────
async function getOrCreateDatingProfile(authUserId, profileData = {}) {
  const {
    name,
    age = 20,
    year = "3rd Year",
    major = "Computer Science",
    bio = "Hey there! I'm new to Campus Connect.",
    interests = [],
    emoji = "🎓",
    verified = false,
  } = profileData;

  const res = await pool.query(
    `INSERT INTO dating_profiles (name, age, year, major, bio, interests, emoji, verified, auth_user_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (auth_user_id) DO UPDATE SET
       name = EXCLUDED.name,
       age = EXCLUDED.age,
       year = EXCLUDED.year,
       major = EXCLUDED.major,
       bio = EXCLUDED.bio,
       interests = EXCLUDED.interests,
       emoji = EXCLUDED.emoji,
       verified = EXCLUDED.verified
     RETURNING id, name, age, year, major, bio, interests, emoji, verified, auth_user_id`,
    [name, age, year, major, bio, interests, emoji, verified, authUserId],
  );
  return res.rows[0];
}

module.exports = {
  pool,
  verifySupabaseToken,
  getUserIdFromToken,
  verifyTokenAndGetUserId,
  getOrCreateChatUser,
  getOrCreateDatingProfile,
};
