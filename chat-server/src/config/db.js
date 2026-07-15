require("dotenv").config();
const { Pool } = require("pg");
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

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
});

// ──────────────────────────────────────────────────────────────
// Firebase Admin SDK Initialization
// ──────────────────────────────────────────────────────────────
let firebaseInitialized = false;
let firebaseAuth = null;

try {
  // Only initialize if not already done (prevents re-init on hot reload)
  if (getApps().length === 0) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
      const path = require("path");
      const resolvedPath = path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
      const serviceAccount = require(resolvedPath);
      initializeApp({ credential: cert(serviceAccount) });
    } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
      });
    } else {
      console.warn("⚠️  Firebase Admin credentials not found. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env");
    }
  }
  firebaseAuth = getAuth();
  firebaseInitialized = true;
  console.log("✅ Firebase Admin initialized for project:", process.env.FIREBASE_PROJECT_ID);
} catch (err) {
  console.error("❌ Firebase Admin initialization failed:", err.message);
}

// ──────────────────────────────────────────────────────────────
// Firebase JWT Verification
// ──────────────────────────────────────────────────────────────

/**
 * Verify a Firebase ID token
 * @param {string} token - Firebase ID token from client
 * @returns {Promise<admin.auth.DecodedIdToken>} Decoded token payload
 */
async function verifyFirebaseToken(token) {
  if (!firebaseInitialized || !firebaseAuth) {
    throw new Error("Firebase Admin not initialized. Check your .env credentials.");
  }
  return firebaseAuth.verifyIdToken(token);
}

/**
 * Extract user ID from verified Firebase token
 * @param {object} decoded - Decoded Firebase token
 * @returns {string} Firebase UID
 */
function getUserIdFromToken(decoded) {
  return decoded.uid;
}

/**
 * Verify token and return Firebase UID
 * @param {string} token - Firebase ID token
 * @returns {Promise<string>} Firebase UID
 */
async function verifyTokenAndGetUserId(token) {
  const decoded = await verifyFirebaseToken(token);
  return getUserIdFromToken(decoded);
}

// ──────────────────────────────────────────────────────────────
// Helper: Get or create chat user for Firebase user
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

  console.log(`🔍 [getOrCreateChatUser] Creating/updating chat user for auth_user_id: ${authUserId}`);
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
  console.log(`✅ [getOrCreateChatUser] Chat user ${res.rows[0] ? 'created/updated' : 'FAILED'}:`, res.rows[0]);
  return res.rows[0];
}

// ──────────────────────────────────────────────────────────────
// Helper: Get or create dating profile for Firebase user
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

  console.log(`🔍 [getOrCreateDatingProfile] Creating/updating dating profile for auth_user_id: ${authUserId}`);
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
  console.log(`✅ [getOrCreateDatingProfile] Dating profile ${res.rows[0] ? 'created/updated' : 'FAILED'}:`, res.rows[0]);
  return res.rows[0];
}

module.exports = {
  pool,
  verifyFirebaseToken,
  getUserIdFromToken,
  verifyTokenAndGetUserId,
  getOrCreateChatUser,
  getOrCreateDatingProfile,
};
