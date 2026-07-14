require("dotenv").config();
const { Pool } = require("pg");
const admin = require("firebase-admin");

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

try {
  // Option 1: Use service account JSON file path (FIREBASE_SERVICE_ACCOUNT_PATH)
  // Option 2: Use individual env vars (FIREBASE_PROJECT_ID, etc.)
  // Option 3: Auto-detect from GOOGLE_APPLICATION_CREDENTIALS env var

  if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  } else {
    console.warn("⚠️  Firebase Admin credentials not found. Auth will not work.");
    console.warn("   Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env");
    console.warn("   Or set FIREBASE_SERVICE_ACCOUNT_PATH to your service account JSON file path.");
  }

  firebaseInitialized = true;
  console.log("✅ Firebase Admin initialized");
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
  if (!firebaseInitialized) {
    throw new Error("Firebase Admin not initialized. Check your .env credentials.");
  }
  return admin.auth().verifyIdToken(token);
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
async function getOrCreateChatUser(firebaseUid, userData = {}) {
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
    `INSERT INTO chat_users (username, avatar, role, color, status, college_email, firebase_uid)
     VALUES ($1, $2, $3, $4, 'online', $5, $6)
     ON CONFLICT (firebase_uid) DO UPDATE SET
       username = EXCLUDED.username,
       avatar = EXCLUDED.avatar,
       role = EXCLUDED.role,
       color = EXCLUDED.color,
       status = 'online',
       last_seen = NOW()
     RETURNING id, username, avatar, role, color, status, firebase_uid`,
    [username || "Anonymous", avatarShort, role, color, email, firebaseUid],
  );
  return res.rows[0];
}

// ──────────────────────────────────────────────────────────────
// Helper: Get or create dating profile for Firebase user
// ──────────────────────────────────────────────────────────────
async function getOrCreateDatingProfile(firebaseUid, profileData = {}) {
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
    `INSERT INTO dating_profiles (name, age, year, major, bio, interests, emoji, verified, firebase_uid)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (firebase_uid) DO UPDATE SET
       name = EXCLUDED.name,
       age = EXCLUDED.age,
       year = EXCLUDED.year,
       major = EXCLUDED.major,
       bio = EXCLUDED.bio,
       interests = EXCLUDED.interests,
       emoji = EXCLUDED.emoji,
       verified = EXCLUDED.verified
     RETURNING id, name, age, year, major, bio, interests, emoji, verified, firebase_uid`,
    [name, age, year, major, bio, interests, emoji, verified, firebaseUid],
  );
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
