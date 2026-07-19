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
// Helper: Get or create dating profile for Firebase user (V3)
// ──────────────────────────────────────────────────────────────
async function getOrCreateDatingProfile(authUserId, profileData = {}) {
  const {
    first_name,
    last_name,
    name,
    age = 20,
    year = "3rd Year",
    major = "Computer Science",
    bio = "Hey there! I'm new to Campus Connect.",
    interests = [],
    emoji = "🎓",
    verified = false,
    college_email,
    profile_photo_url,
    gender,
    pronouns,
    relationship_preference = [],
    branch,
    hostel,
    languages = [],
    clubs = [],
    societies = [],
    skills = [],
    favorite_cafe,
    favorite_sport,
    instagram_url,
    linkedin_url,
    github_url,
    study_subjects = [],
    study_cgpa_goal,
    study_preferred_time,
    study_preferred_location,
    startup_looking_for = false,
    startup_role,
    startup_skills = [],
  } = profileData;

  // Build full name from first/last if not provided
  const fullName = name || (first_name && last_name ? `${first_name} ${last_name}` : first_name) || college_email?.split("@")[0] || "Student";

  console.log(`🔍 [getOrCreateDatingProfile] Creating/updating dating profile for auth_user_id: ${authUserId}`);
  const res = await pool.query(
    `INSERT INTO dating_profiles (
      name, age, year, major, bio, interests, emoji, verified,
      first_name, last_name, college_email, profile_photo_url,
      gender, pronouns, relationship_preference, branch, hostel,
      languages, clubs, societies, skills, favorite_cafe, favorite_sport,
      instagram_url, linkedin_url, github_url,
      study_subjects, study_cgpa_goal, study_preferred_time, study_preferred_location,
      startup_looking_for, startup_role, startup_skills,
      auth_user_id
    )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35)
     ON CONFLICT (auth_user_id) DO UPDATE SET
       name = EXCLUDED.name,
       age = EXCLUDED.age,
       year = EXCLUDED.year,
       major = EXCLUDED.major,
       bio = EXCLUDED.bio,
       interests = EXCLUDED.interests,
       emoji = EXCLUDED.emoji,
       verified = EXCLUDED.verified,
       first_name = EXCLUDED.first_name,
       last_name = EXCLUDED.last_name,
       college_email = EXCLUDED.college_email,
       profile_photo_url = EXCLUDED.profile_photo_url,
       gender = EXCLUDED.gender,
       pronouns = EXCLUDED.pronouns,
       relationship_preference = EXCLUDED.relationship_preference,
       branch = EXCLUDED.branch,
       hostel = EXCLUDED.hostel,
       languages = EXCLUDED.languages,
       clubs = EXCLUDED.clubs,
       societies = EXCLUDED.societies,
       skills = EXCLUDED.skills,
       favorite_cafe = EXCLUDED.favorite_cafe,
       favorite_sport = EXCLUDED.favorite_sport,
       instagram_url = EXCLUDED.instagram_url,
       linkedin_url = EXCLUDED.linkedin_url,
       github_url = EXCLUDED.github_url,
       study_subjects = EXCLUDED.study_subjects,
       study_cgpa_goal = EXCLUDED.study_cgpa_goal,
       study_preferred_time = EXCLUDED.study_preferred_time,
       study_preferred_location = EXCLUDED.study_preferred_location,
       startup_looking_for = EXCLUDED.startup_looking_for,
       startup_role = EXCLUDED.startup_role,
       startup_skills = EXCLUDED.startup_skills,
       updated_at = NOW()
     RETURNING id, name, age, year, major, bio, interests, emoji, verified, auth_user_id,
       first_name, last_name, college_email, profile_photo_url, gender, pronouns,
       relationship_preference, branch, hostel, languages, clubs, societies, skills,
       favorite_cafe, favorite_sport, instagram_url, linkedin_url, github_url,
       study_subjects, study_cgpa_goal, study_preferred_time, study_preferred_location,
       startup_looking_for, startup_role, startup_skills`,
    [
      fullName, age, year, major, bio, interests, emoji, verified,
      first_name, last_name, college_email, profile_photo_url,
      gender, pronouns, relationship_preference, branch, hostel,
      languages, clubs, societies, skills, favorite_cafe, favorite_sport,
      instagram_url, linkedin_url, github_url,
      study_subjects, study_cgpa_goal, study_preferred_time, study_preferred_location,
      startup_looking_for, startup_role, startup_skills,
      authUserId,
    ],
  );
  console.log(`✅ [getOrCreateDatingProfile] Dating profile ${res.rows[0] ? 'created/updated' : 'FAILED'}:`, res.rows[0]);
  return res.rows[0];
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Get dating profile by auth_user_id
// ──────────────────────────────────────────────────────────────
async function getDatingProfileByAuthId(authUserId) {
  const res = await pool.query(
    `SELECT * FROM dating_profiles WHERE auth_user_id = $1`,
    [authUserId],
  );
  return res.rows[0];
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Get dating profile by numeric ID
// ──────────────────────────────────────────────────────────────
async function getDatingProfileById(profileId) {
  const res = await pool.query(
    `SELECT * FROM dating_profiles WHERE id = $1`,
    [profileId],
  );
  return res.rows[0];
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Update dating profile (partial update)
// ──────────────────────────────────────────────────────────────
async function updateDatingProfile(profileId, updates) {
  const allowedFields = [
    'name', 'age', 'year', 'major', 'bio', 'interests', 'emoji', 'verified',
    'first_name', 'last_name', 'college_email', 'profile_photo_url',
    'gender', 'pronouns', 'relationship_preference', 'branch', 'hostel',
    'languages', 'clubs', 'societies', 'skills', 'favorite_cafe', 'favorite_sport',
    'instagram_url', 'linkedin_url', 'github_url',
    'study_subjects', 'study_cgpa_goal', 'study_preferred_time', 'study_preferred_location',
    'startup_looking_for', 'startup_role', 'startup_skills',
    'is_incognito', 'show_only', 'is_verified', 'photo_verified',
  ];

  const setClause = [];
  const values = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    if (allowedFields.includes(key) && value !== undefined) {
      setClause.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  }

  if (setClause.length === 0) {
    return getDatingProfileById(profileId);
  }

  setClause.push(`updated_at = NOW()`);
  values.push(profileId);

  const query = `
    UPDATE dating_profiles
    SET ${setClause.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *
  `;

  const res = await pool.query(query, values);
  return res.rows[0];
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Profile Photos
// ──────────────────────────────────────────────────────────────
async function addProfilePhoto(profileId, photoData) {
  const { url, storage_path, is_main = false, display_order = 0, width, height, file_size, mime_type } = photoData;

  // If this is main, unset other main photos
  if (is_main) {
    await pool.query(
      `UPDATE profile_photos SET is_main = false WHERE profile_id = $1`,
      [profileId],
    );
  }

  const res = await pool.query(
    `INSERT INTO profile_photos (profile_id, url, storage_path, is_main, display_order, width, height, file_size, mime_type)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [profileId, url, storage_path, is_main, display_order, width, height, file_size, mime_type],
  );
  return res.rows[0];
}

async function getProfilePhotos(profileId) {
  const res = await pool.query(
    `SELECT * FROM profile_photos WHERE profile_id = $1 ORDER BY display_order, created_at`,
    [profileId],
  );
  return res.rows;
}

async function updateProfilePhoto(photoId, updates) {
  const allowedFields = ['url', 'is_main', 'display_order', 'width', 'height'];
  const setClause = [];
  const values = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(updates)) {
    if (allowedFields.includes(key) && value !== undefined) {
      setClause.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  }

  if (setClause.length === 0) return null;

  // If setting as main, unset others
  if (updates.is_main === true) {
    const photoRes = await pool.query(`SELECT profile_id FROM profile_photos WHERE id = $1`, [photoId]);
    if (photoRes.rows[0]) {
      await pool.query(
        `UPDATE profile_photos SET is_main = false WHERE profile_id = $1 AND id != $2`,
        [photoRes.rows[0].profile_id, photoId],
      );
    }
  }

  values.push(photoId);
  const query = `UPDATE profile_photos SET ${setClause.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
  const res = await pool.query(query, values);
  return res.rows[0];
}

async function deleteProfilePhoto(photoId) {
  const res = await pool.query(`DELETE FROM profile_photos WHERE id = $1 RETURNING *`, [photoId]);
  return res.rows[0];
}

async function reorderProfilePhotos(profileId, photoOrders) {
  // photoOrders: array of { id, display_order }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const { id, display_order } of photoOrders) {
      await client.query(
        `UPDATE profile_photos SET display_order = $1 WHERE id = $2 AND profile_id = $3`,
        [display_order, id, profileId],
      );
    }
    await client.query('COMMIT');
    return getProfilePhotos(profileId);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Prompts
// ──────────────────────────────────────────────────────────────
async function getActivePrompts() {
  const res = await pool.query(`SELECT * FROM prompts WHERE is_active = true ORDER BY display_order`);
  return res.rows;
}

async function getProfilePrompts(profileId) {
  const res = await pool.query(
    `SELECT pp.*, p.text as prompt_text, p.category
     FROM profile_prompts pp
     JOIN prompts p ON p.id = pp.prompt_id
     WHERE pp.profile_id = $1
     ORDER BY pp.display_order`,
    [profileId],
  );
  return res.rows;
}

async function upsertProfilePrompt(profileId, promptId, answer, displayOrder = 0) {
  const res = await pool.query(
    `INSERT INTO profile_prompts (profile_id, prompt_id, answer, display_order)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (profile_id, prompt_id) DO UPDATE SET
       answer = EXCLUDED.answer,
       display_order = EXCLUDED.display_order
     RETURNING *`,
    [profileId, promptId, answer, displayOrder],
  );
  return res.rows[0];
}

async function deleteProfilePrompt(profileId, promptId) {
  const res = await pool.query(
    `DELETE FROM profile_prompts WHERE profile_id = $1 AND prompt_id = $2 RETURNING *`,
    [profileId, promptId],
  );
  return res.rows[0];
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Prompt Likes
// ──────────────────────────────────────────────────────────────
async function likePrompt(likerProfileId, targetProfileId, promptId) {
  const res = await pool.query(
    `INSERT INTO prompt_likes (liker_profile_id, target_profile_id, prompt_id)
     VALUES ($1, $2, $3)
     ON CONFLICT (liker_profile_id, target_profile_id, prompt_id) DO NOTHING
     RETURNING *`,
    [likerProfileId, targetProfileId, promptId],
  );
  return res.rows[0];
}

async function unlikePrompt(likerProfileId, targetProfileId, promptId) {
  const res = await pool.query(
    `DELETE FROM prompt_likes WHERE liker_profile_id = $1 AND target_profile_id = $2 AND prompt_id = $3 RETURNING *`,
    [likerProfileId, targetProfileId, promptId],
  );
  return res.rows[0];
}

async function getPromptLikesForProfile(targetProfileId) {
  const res = await pool.query(
    `SELECT pl.*, p.text as prompt_text, p.category, dp.name as liker_name
     FROM prompt_likes pl
     JOIN prompts p ON p.id = pl.prompt_id
     JOIN dating_profiles dp ON dp.id = pl.liker_profile_id
     WHERE pl.target_profile_id = $1
     ORDER BY pl.created_at DESC`,
    [targetProfileId],
  );
  return res.rows;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Photo Likes
// ──────────────────────────────────────────────────────────────
async function likePhoto(likerProfileId, targetProfileId, photoId) {
  const res = await pool.query(
    `INSERT INTO photo_likes (liker_profile_id, target_profile_id, photo_id)
     VALUES ($1, $2, $3)
     ON CONFLICT (liker_profile_id, target_profile_id, photo_id) DO NOTHING
     RETURNING *`,
    [likerProfileId, targetProfileId, photoId],
  );
  return res.rows[0];
}

async function unlikePhoto(likerProfileId, targetProfileId, photoId) {
  const res = await pool.query(
    `DELETE FROM photo_likes WHERE liker_profile_id = $1 AND target_profile_id = $2 AND photo_id = $3 RETURNING *`,
    [likerProfileId, targetProfileId, photoId],
  );
  return res.rows[0];
}

async function getPhotoLikesForProfile(targetProfileId) {
  const res = await pool.query(
    `SELECT pl.*, pp.url as photo_url, dp.name as liker_name
     FROM photo_likes pl
     JOIN profile_photos pp ON pp.id = pl.photo_id
     JOIN dating_profiles dp ON dp.id = pl.liker_profile_id
     WHERE pl.target_profile_id = $1
     ORDER BY pl.created_at DESC`,
    [targetProfileId],
  );
  return res.rows;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Friend Requests
// ──────────────────────────────────────────────────────────────
async function sendFriendRequest(senderProfileId, receiverProfileId) {
  const res = await pool.query(
    `INSERT INTO friend_requests (sender_profile_id, receiver_profile_id, status)
     VALUES ($1, $2, 'pending')
     ON CONFLICT (sender_profile_id, receiver_profile_id) DO UPDATE SET
       status = 'pending',
       updated_at = NOW()
     RETURNING *`,
    [senderProfileId, receiverProfileId],
  );
  return res.rows[0];
}

async function respondToFriendRequest(requestId, receiverProfileId, action) {
  // action: 'accept' or 'reject'
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const reqRes = await client.query(
      `SELECT * FROM friend_requests WHERE id = $1 AND receiver_profile_id = $2 AND status = 'pending'`,
      [requestId, receiverProfileId],
    );
    if (!reqRes.rows[0]) throw new Error('Friend request not found');

    const request = reqRes.rows[0];

    if (action === 'accept') {
      // Update request status
      await client.query(
        `UPDATE friend_requests SET status = 'accepted', updated_at = NOW() WHERE id = $1`,
        [requestId],
      );

      // Create friendship (smaller id first)
      const [p1, p2] = [request.sender_profile_id, request.receiver_profile_id].sort((a, b) => a - b);
      await client.query(
        `INSERT INTO friends (profile1_id, profile2_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [p1, p2],
      );

      // Create campus graph edges
      await client.query(`SELECT create_friendship_edge($1, $2)`, [request.sender_profile_id, request.receiver_profile_id]);

      // Create notification
      await client.query(
        `INSERT INTO notifications (profile_id, type, title, body, data)
         VALUES ($1, 'friend_accepted', 'Friend Request Accepted', $2, $3)`,
        [request.sender_profile_id, `${request.receiver_profile_id} accepted your friend request`, JSON.stringify({ friend_id: request.receiver_profile_id })],
      );
    } else {
      await client.query(
        `UPDATE friend_requests SET status = 'rejected', updated_at = NOW() WHERE id = $1`,
        [requestId],
      );
    }

    await client.query('COMMIT');
    return { success: true, action };
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function getFriendRequests(profileId) {
  const res = await pool.query(
    `SELECT fr.*, dp.name as sender_name, dp.profile_photo_url as sender_photo, dp.emoji as sender_emoji
     FROM friend_requests fr
     JOIN dating_profiles dp ON dp.id = fr.sender_profile_id
     WHERE fr.receiver_profile_id = $1 AND fr.status = 'pending'
     ORDER BY fr.created_at DESC`,
    [profileId],
  );
  return res.rows;
}

async function getSentFriendRequests(profileId) {
  const res = await pool.query(
    `SELECT fr.*, dp.name as receiver_name, dp.profile_photo_url as receiver_photo, dp.emoji as receiver_emoji
     FROM friend_requests fr
     JOIN dating_profiles dp ON dp.id = fr.receiver_profile_id
     WHERE fr.sender_profile_id = $1
     ORDER BY fr.created_at DESC`,
    [profileId],
  );
  return res.rows;
}

async function getFriends(profileId) {
  const res = await pool.query(
    `SELECT f.*, dp.id as friend_id, dp.name as friend_name, dp.profile_photo_url as friend_photo, dp.emoji as friend_emoji,
            dp.branch, dp.year, dp.major
     FROM friends f
     JOIN dating_profiles dp ON (f.profile1_id = dp.id OR f.profile2_id = dp.id) AND dp.id != $1
     WHERE f.profile1_id = $1 OR f.profile2_id = $1
     ORDER BY f.created_at DESC`,
    [profileId],
  );
  return res.rows;
}

async function removeFriend(profileId, friendProfileId) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      `DELETE FROM friends WHERE (profile1_id = $1 AND profile2_id = $2) OR (profile1_id = $2 AND profile2_id = $1)`,
      [profileId, friendProfileId],
    );
    await client.query(
      `DELETE FROM campus_graph_edges WHERE (source_profile_id = $1 AND target_profile_id = $2 AND edge_type = 'friend') OR (source_profile_id = $2 AND target_profile_id = $1 AND edge_type = 'friend')`,
      [profileId, friendProfileId],
    );
    await client.query('COMMIT');
    return { success: true };
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Blocks
// ──────────────────────────────────────────────────────────────
async function blockUser(blockerProfileId, blockedProfileId, reason) {
  const res = await pool.query(
    `INSERT INTO blocks (blocker_profile_id, blocked_profile_id, reason)
     VALUES ($1, $2, $3)
     ON CONFLICT (blocker_profile_id, blocked_profile_id) DO UPDATE SET
       reason = EXCLUDED.reason
     RETURNING *`,
    [blockerProfileId, blockedProfileId, reason],
  );
  return res.rows[0];
}

async function unblockUser(blockerProfileId, blockedProfileId) {
  const res = await pool.query(
    `DELETE FROM blocks WHERE blocker_profile_id = $1 AND blocked_profile_id = $2 RETURNING *`,
    [blockerProfileId, blockedProfileId],
  );
  return res.rows[0];
}

async function getBlockedUsers(profileId) {
  const res = await pool.query(
    `SELECT b.*, dp.name, dp.profile_photo_url, dp.emoji
     FROM blocks b
     JOIN dating_profiles dp ON dp.id = b.blocked_profile_id
     WHERE b.blocker_profile_id = $1`,
    [profileId],
  );
  return res.rows;
}

async function isBlocked(profileId1, profileId2) {
  const res = await pool.query(
    `SELECT 1 FROM blocks WHERE (blocker_profile_id = $1 AND blocked_profile_id = $2) OR (blocker_profile_id = $2 AND blocked_profile_id = $1)`,
    [profileId1, profileId2],
  );
  return res.rows.length > 0;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Reports
// ──────────────────────────────────────────────────────────────
async function createReport(reporterProfileId, reportedProfileId, reason, description) {
  const res = await pool.query(
    `INSERT INTO reports (reporter_profile_id, reported_profile_id, reason, description)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [reporterProfileId, reportedProfileId, reason, description],
  );
  return res.rows[0];
}

async function getReports(status = 'pending') {
  const res = await pool.query(
    `SELECT r.*, 
            rp.name as reporter_name, rp.email as reporter_email,
            rdp.name as reported_name, rdp.profile_photo_url as reported_photo
     FROM reports r
     JOIN dating_profiles rp ON rp.id = r.reporter_profile_id
     JOIN dating_profiles rdp ON rdp.id = r.reported_profile_id
     WHERE r.status = $1
     ORDER BY r.created_at DESC`,
    [status],
  );
  return res.rows;
}

async function updateReportStatus(reportId, status, adminNotes) {
  const res = await pool.query(
    `UPDATE reports SET status = $1, admin_notes = $2, resolved_at = NOW() WHERE id = $3 RETURNING *`,
    [status, adminNotes, reportId],
  );
  return res.rows[0];
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Notifications
// ──────────────────────────────────────────────────────────────
async function createNotification(profileId, type, title, body, data = {}) {
  const res = await pool.query(
    `INSERT INTO notifications (profile_id, type, title, body, data)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [profileId, type, title, body, JSON.stringify(data)],
  );
  return res.rows[0];
}

async function getNotifications(profileId, limit = 50, unreadOnly = false) {
  let query = `SELECT * FROM notifications WHERE profile_id = $1`;
  const params = [profileId];
  
  if (unreadOnly) {
    query += ` AND is_read = false`;
  }
  
  query += ` ORDER BY created_at DESC LIMIT $${params.length + 1}`;
  params.push(limit);

  const res = await pool.query(query, params);
  return res.rows;
}

async function markNotificationRead(notificationId, profileId) {
  const res = await pool.query(
    `UPDATE notifications SET is_read = true WHERE id = $1 AND profile_id = $2 RETURNING *`,
    [notificationId, profileId],
  );
  return res.rows[0];
}

async function markAllNotificationsRead(profileId) {
  const res = await pool.query(
    `UPDATE notifications SET is_read = true WHERE profile_id = $1 AND is_read = false RETURNING *`,
    [profileId],
  );
  return res.rows;
}

async function getUnreadNotificationCount(profileId) {
  const res = await pool.query(
    `SELECT COUNT(*) as count FROM notifications WHERE profile_id = $1 AND is_read = false`,
    [profileId],
  );
  return parseInt(res.rows[0].count);
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Compatibility Scores
// ──────────────────────────────────────────────────────────────
async function upsertCompatibilityScore(profile1Id, profile2Id, score, reasons) {
  const [p1, p2] = [profile1Id, profile2Id].sort((a, b) => a - b);
  const res = await pool.query(
    `INSERT INTO compatibility_scores (profile1_id, profile2_id, score, reasons)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (profile1_id, profile2_id) DO UPDATE SET
       score = EXCLUDED.score,
       reasons = EXCLUDED.reasons,
       calculated_at = NOW()
     RETURNING *`,
    [p1, p2, score, JSON.stringify(reasons)],
  );
  return res.rows[0];
}

async function getCompatibilityScore(profile1Id, profile2Id) {
  const [p1, p2] = [profile1Id, profile2Id].sort((a, b) => a - b);
  const res = await pool.query(
    `SELECT * FROM compatibility_scores WHERE profile1_id = $1 AND profile2_id = $2`,
    [p1, p2],
  );
  return res.rows[0];
}

async function getTopCompatibilityScores(profileId, limit = 20) {
  const res = await pool.query(
    `SELECT cs.*, 
            dp.id as other_id, dp.name, dp.profile_photo_url, dp.emoji, dp.branch, dp.year, dp.major
     FROM compatibility_scores cs
     JOIN dating_profiles dp ON dp.id = CASE 
       WHEN cs.profile1_id = $1 THEN cs.profile2_id 
       ELSE cs.profile1_id 
     END
     WHERE cs.profile1_id = $1 OR cs.profile2_id = $1
     ORDER BY cs.score DESC
     LIMIT $2`,
    [profileId, limit],
  );
  return res.rows;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Events
// ──────────────────────────────────────────────────────────────
async function getEvents(type = null, upcomingOnly = true) {
  let query = `SELECT * FROM events WHERE is_active = true`;
  const params = [];

  if (type) {
    query += ` AND event_type = $${params.length + 1}`;
    params.push(type);
  }

  if (upcomingOnly) {
    query += ` AND start_time > NOW()`;
  }

  query += ` ORDER BY start_time ASC`;
  const res = await pool.query(query, params);
  return res.rows;
}

async function rsvpToEvent(profileId, eventId, status = 'going') {
  const res = await pool.query(
    `INSERT INTO event_rsvps (event_id, profile_id, status)
     VALUES ($1, $2, $3)
     ON CONFLICT (event_id, profile_id) DO UPDATE SET
       status = EXCLUDED.status
     RETURNING *`,
    [eventId, profileId, status],
  );
  return res.rows[0];
}

async function getEventRsvps(eventId) {
  const res = await pool.query(
    `SELECT er.*, dp.name, dp.profile_photo_url, dp.emoji, dp.branch, dp.year
     FROM event_rsvps er
     JOIN dating_profiles dp ON dp.id = er.profile_id
     WHERE er.event_id = $1 AND er.status = 'going'
     ORDER BY er.created_at`,
    [eventId],
  );
  return res.rows;
}

async function getUserEventRsvps(profileId) {
  const res = await pool.query(
    `SELECT er.*, e.title, e.start_time, e.end_time, e.location, e.event_type
     FROM event_rsvps er
     JOIN events e ON e.id = er.event_id
     WHERE er.profile_id = $1
     ORDER BY e.start_time`,
    [profileId],
  );
  return res.rows;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Saved Profiles
// ──────────────────────────────────────────────────────────────
async function saveProfile(saverProfileId, savedProfileId) {
  const res = await pool.query(
    `INSERT INTO saved_profiles (saver_profile_id, saved_profile_id)
     VALUES ($1, $2)
     ON CONFLICT (saver_profile_id, saved_profile_id) DO NOTHING
     RETURNING *`,
    [saverProfileId, savedProfileId],
  );
  return res.rows[0];
}

async function unsaveProfile(saverProfileId, savedProfileId) {
  const res = await pool.query(
    `DELETE FROM saved_profiles WHERE saver_profile_id = $1 AND saved_profile_id = $2 RETURNING *`,
    [saverProfileId, savedProfileId],
  );
  return res.rows[0];
}

async function getSavedProfiles(saverProfileId) {
  const res = await pool.query(
    `SELECT sp.*, dp.name, dp.profile_photo_url, dp.emoji, dp.branch, dp.year, dp.major
     FROM saved_profiles sp
     JOIN dating_profiles dp ON dp.id = sp.saved_profile_id
     WHERE sp.saver_profile_id = $1
     ORDER BY sp.created_at DESC`,
    [saverProfileId],
  );
  return res.rows;
}

async function isProfileSaved(saverProfileId, savedProfileId) {
  const res = await pool.query(
    `SELECT 1 FROM saved_profiles WHERE saver_profile_id = $1 AND saved_profile_id = $2`,
    [saverProfileId, savedProfileId],
  );
  return res.rows.length > 0;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Daily Picks
// ──────────────────────────────────────────────────────────────
async function getDailyPicks(date = null) {
  const targetDate = date || new Date().toISOString().split('T')[0];
  const res = await pool.query(
    `SELECT dp.*, dpp.name, dpp.profile_photo_url, dpp.emoji, dpp.branch, dpp.year, dpp.major
     FROM daily_picks dp
     JOIN dating_profiles dpp ON dpp.id = dp.profile_id
     WHERE dp.pick_date = $1
     ORDER BY dp.rank`,
    [targetDate],
  );
  return res.rows;
}

async function setDailyPicks(profiles, date = null) {
  const targetDate = date || new Date().toISOString().split('T')[0];
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`DELETE FROM daily_picks WHERE pick_date = $1`, [targetDate]);
    for (let i = 0; i < profiles.length; i++) {
      await client.query(
        `INSERT INTO daily_picks (profile_id, pick_date, rank) VALUES ($1, $2, $3)`,
        [profiles[i], targetDate, i + 1],
      );
    }
    await client.query('COMMIT');
    return getDailyPicks(targetDate);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Conversation Starters
// ──────────────────────────────────────────────────────────────
async function createConversationStarters(matchId, starters) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const created = [];
    for (const starter of starters) {
      const res = await client.query(
        `INSERT INTO conversation_starters (match_id, starter_text, context)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [matchId, starter.text, JSON.stringify(starter.context || {})],
      );
      created.push(res.rows[0]);
    }
    await client.query('COMMIT');
    return created;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function getConversationStarters(matchId) {
  const res = await pool.query(
    `SELECT * FROM conversation_starters WHERE match_id = $1 ORDER BY created_at`,
    [matchId],
  );
  return res.rows;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Profile Badges
// ──────────────────────────────────────────────────────────────
async function awardBadge(profileId, badgeType, badgeData = {}) {
  const res = await pool.query(
    `INSERT INTO profile_badges (profile_id, badge_type, badge_data)
     VALUES ($1, $2, $3)
     ON CONFLICT (profile_id, badge_type) DO UPDATE SET
       badge_data = EXCLUDED.badge_data,
       awarded_at = NOW()
     RETURNING *`,
    [profileId, badgeType, JSON.stringify(badgeData)],
  );
  return res.rows[0];
}

async function getProfileBadges(profileId) {
  const res = await pool.query(
    `SELECT * FROM profile_badges WHERE profile_id = $1 ORDER BY awarded_at DESC`,
    [profileId],
  );
  return res.rows;
}

async function getAllBadgeTypes() {
  return [
    { type: 'verified_student', label: 'Verified Student', icon: '🎓', description: 'Verified college email' },
    { type: 'club_lead', label: 'Club Lead', icon: '👑', description: 'Leads a campus club' },
    { type: 'hackathon_winner', label: 'Hackathon Winner', icon: '🏆', description: 'Won a hackathon' },
    { type: 'startup_founder', label: 'Startup Founder', icon: '🚀', description: 'Building a startup' },
    { type: 'placement_coordinator', label: 'Placement Coordinator', icon: '💼', description: 'Helps with placements' },
    { type: 'athlete', label: 'Athlete', icon: '🏃', description: 'Active in sports' },
    { type: 'alumni_mentor', label: 'Alumni Mentor', icon: '🧑‍🏫', description: 'Mentors students' },
  ];
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Campus Graph
// ──────────────────────────────────────────────────────────────
async function getCampusGraphEdges(profileId, edgeTypes = null) {
  let query = `SELECT cge.*, dp.name, dp.profile_photo_url, dp.emoji, dp.branch, dp.year
               FROM campus_graph_edges cge
               JOIN dating_profiles dp ON dp.id = cge.target_profile_id
               WHERE cge.source_profile_id = $1`;
  const params = [profileId];

  if (edgeTypes && edgeTypes.length > 0) {
    query += ` AND cge.edge_type = ANY($${params.length + 1})`;
    params.push(edgeTypes);
  }

  query += ` ORDER BY cge.weight DESC`;
  const res = await pool.query(query, params);
  return res.rows;
}

async function getMutualConnections(profileId1, profileId2) {
  const res = await pool.query(
    `SELECT dp.id, dp.name, dp.profile_photo_url, dp.emoji, dp.branch, dp.year
     FROM campus_graph_edges cge1
     JOIN campus_graph_edges cge2 ON cge1.target_profile_id = cge2.target_profile_id
     JOIN dating_profiles dp ON dp.id = cge1.target_profile_id
     WHERE cge1.source_profile_id = $1
       AND cge2.source_profile_id = $2
       AND cge1.target_profile_id NOT IN ($1, $2)
       AND cge1.edge_type IN ('friend', 'club_mate', 'classmate')
       AND cge2.edge_type IN ('friend', 'club_mate', 'classmate')
     LIMIT 10`,
    [profileId1, profileId2],
  );
  return res.rows;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Search
// ──────────────────────────────────────────────────────────────
async function searchProfiles(query, filters = {}, limit = 20, offset = 0, currentProfileId = null) {
  let sql = `
    SELECT dp.*, 
           pp.url as main_photo_url
    FROM dating_profiles dp
    LEFT JOIN profile_photos pp ON pp.profile_id = dp.id AND pp.is_main = true
    WHERE dp.is_incognito = false
  `;
  const params = [];
  let paramIndex = 1;

  if (currentProfileId) {
    sql += ` AND dp.id != $${paramIndex}`;
    params.push(currentProfileId);
    paramIndex++;
  }

  // Block filtering
  if (currentProfileId) {
    sql += ` AND dp.id NOT IN (
      SELECT blocked_profile_id FROM blocks WHERE blocker_profile_id = $${paramIndex}
      UNION
      SELECT blocker_profile_id FROM blocks WHERE blocked_profile_id = $${paramIndex}
    )`;
    params.push(currentProfileId);
    paramIndex++;
  }

  // Text search
  if (query && query.trim()) {
    sql += ` AND (
      dp.name ILIKE $${paramIndex} OR
      dp.bio ILIKE $${paramIndex} OR
      dp.branch ILIKE $${paramIndex} OR
      dp.major ILIKE $${paramIndex} OR
      dp.interests @> ARRAY[$${paramIndex}] OR
      dp.clubs @> ARRAY[$${paramIndex}] OR
      dp.skills @> ARRAY[$${paramIndex}]
    )`;
    params.push(`%${query.trim()}%`);
    paramIndex++;
  }

  // Filters
  if (filters.branch) {
    sql += ` AND dp.branch = $${paramIndex}`;
    params.push(filters.branch);
    paramIndex++;
  }

  if (filters.year) {
    sql += ` AND dp.year = $${paramIndex}`;
    params.push(filters.year);
    paramIndex++;
  }

  if (filters.interests && filters.interests.length > 0) {
    sql += ` AND dp.interests && $${paramIndex}`;
    params.push(filters.interests);
    paramIndex++;
  }

  if (filters.clubs && filters.clubs.length > 0) {
    sql += ` AND dp.clubs && $${paramIndex}`;
    params.push(filters.clubs);
    paramIndex++;
  }

  if (filters.skills && filters.skills.length > 0) {
    sql += ` AND dp.skills && $${paramIndex}`;
    params.push(filters.skills);
    paramIndex++;
  }

  if (filters.relationship_preference && filters.relationship_preference.length > 0) {
    sql += ` AND dp.relationship_preference && $${paramIndex}`;
    params.push(filters.relationship_preference);
    paramIndex++;
  }

  if (filters.gender) {
    sql += ` AND dp.gender = $${paramIndex}`;
    params.push(filters.gender);
    paramIndex++;
  }

  if (filters.startup_looking_for) {
    sql += ` AND dp.startup_looking_for = true`;
  }

  sql += ` ORDER BY dp.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  params.push(limit, offset);

  const res = await pool.query(sql, params);
  return res.rows;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Discovery/Recommendations
// ──────────────────────────────────────────────────────────────
async function getDiscoveryProfiles(currentProfileId, tab = 'recommended', filters = {}, limit = 20, offset = 0) {
  let baseQuery = `
    SELECT dp.*, 
           pp.url as main_photo_url,
           CASE 
             WHEN $1 IN (SELECT swiped_id FROM swipes WHERE swiper_id = $1) THEN true
             ELSE false
           END as already_swiped
    FROM dating_profiles dp
    LEFT JOIN profile_photos pp ON pp.profile_id = dp.id AND pp.is_main = true
    WHERE dp.is_incognito = false
      AND dp.id != $1
  `;
  const params = [currentProfileId];
  let paramIndex = 2;

  // Exclude blocked users
  baseQuery += ` AND dp.id NOT IN (
    SELECT blocked_profile_id FROM blocks WHERE blocker_profile_id = $${paramIndex}
    UNION
    SELECT blocker_profile_id FROM blocks WHERE blocked_profile_id = $${paramIndex}
  )`;
  params.push(currentProfileId);
  paramIndex++;

  // Exclude already swiped
  baseQuery += ` AND dp.id NOT IN (SELECT swiped_id FROM swipes WHERE swiper_id = $1)`;

  switch (tab) {
    case 'friends':
      // Show profiles with 'friends' in relationship_preference
      baseQuery += ` AND dp.relationship_preference @> ARRAY['friends']`;
      break;
    case 'dating':
      baseQuery += ` AND dp.relationship_preference @> ARRAY['dating']`;
      break;
    case 'study_buddy':
      baseQuery += ` AND dp.relationship_preference @> ARRAY['study_buddy']`;
      break;
    case 'networking':
      baseQuery += ` AND dp.relationship_preference @> ARRAY['networking']`;
      break;
    case 'startup_partner':
      baseQuery += ` AND dp.startup_looking_for = true`;
      break;
    case 'new_students':
      baseQuery += ` AND dp.created_at > NOW() - INTERVAL '30 days'`;
      break;
    case 'nearby':
      // Could add location-based filtering here
      break;
    case 'trending':
      // Most liked/matched recently
      baseQuery += ` AND dp.id IN (
        SELECT target_profile_id FROM prompt_likes WHERE created_at > NOW() - INTERVAL '7 days'
        UNION
        SELECT target_profile_id FROM photo_likes WHERE created_at > NOW() - INTERVAL '7 days'
        UNION
        SELECT swiped_id FROM swipes WHERE action = 'like' AND created_at > NOW() - INTERVAL '7 days'
      )`;
      break;
    case 'recommended':
    default:
      // Smart recommendations - prioritize compatibility
      baseQuery += ` AND EXISTS (
        SELECT 1 FROM compatibility_scores cs
        WHERE (cs.profile1_id = dp.id AND cs.profile2_id = $1)
           OR (cs.profile2_id = dp.id AND cs.profile1_id = $1)
      )`;
      break;
  }

  // Apply filters
  if (filters.branch) {
    baseQuery += ` AND dp.branch = $${paramIndex}`;
    params.push(filters.branch);
    paramIndex++;
  }
  if (filters.year) {
    baseQuery += ` AND dp.year = $${paramIndex}`;
    params.push(filters.year);
    paramIndex++;
  }
  if (filters.interests && filters.interests.length > 0) {
    baseQuery += ` AND dp.interests && $${paramIndex}`;
    params.push(filters.interests);
    paramIndex++;
  }

  baseQuery += ` ORDER BY dp.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  params.push(limit, offset);

  const res = await pool.query(baseQuery, params);
  return res.rows;
}

async function getRecommendedProfiles(currentProfileId, limit = 10) {
  // Get profiles with high compatibility scores
  const res = await pool.query(
    `SELECT dp.*, pp.url as main_photo_url, cs.score, cs.reasons
     FROM compatibility_scores cs
     JOIN dating_profiles dp ON dp.id = CASE 
       WHEN cs.profile1_id = $1 THEN cs.profile2_id 
       ELSE cs.profile1_id 
     END
     LEFT JOIN profile_photos pp ON pp.profile_id = dp.id AND pp.is_main = true
     WHERE (cs.profile1_id = $1 OR cs.profile2_id = $1)
       AND dp.is_incognito = false
       AND dp.id != $1
       AND dp.id NOT IN (SELECT swiped_id FROM swipes WHERE swiper_id = $1)
       AND dp.id NOT IN (
         SELECT blocked_profile_id FROM blocks WHERE blocker_profile_id = $1
         UNION
         SELECT blocker_profile_id FROM blocks WHERE blocked_profile_id = $1
       )
     ORDER BY cs.score DESC
     LIMIT $2`,
    [currentProfileId, limit],
  );
  return res.rows;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Study Buddy Matching
// ──────────────────────────────────────────────────────────────
async function getStudyBuddyMatches(currentProfileId, filters = {}, limit = 20) {
  const res = await pool.query(
    `SELECT dp.*, pp.url as main_photo_url
     FROM dating_profiles dp
     LEFT JOIN profile_photos pp ON pp.profile_id = dp.id AND pp.is_main = true
     WHERE dp.is_incognito = false
       AND dp.id != $1
       AND dp.relationship_preference @> ARRAY['study_buddy']
       AND dp.study_subjects && $2
       AND dp.id NOT IN (SELECT swiped_id FROM swipes WHERE swiper_id = $1)
       AND dp.id NOT IN (
         SELECT blocked_profile_id FROM blocks WHERE blocker_profile_id = $1
         UNION
         SELECT blocker_profile_id FROM blocks WHERE blocked_profile_id = $1
       )
     ORDER BY 
       (SELECT COUNT(*) FROM unnest(dp.study_subjects) s WHERE s = ANY($2)) DESC,
       dp.created_at DESC
     LIMIT $3`,
    [currentProfileId, filters.subjects || [], limit],
  );
  return res.rows;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Startup Matching
// ──────────────────────────────────────────────────────────────
async function getStartupMatches(currentProfileId, filters = {}, limit = 20) {
  const res = await pool.query(
    `SELECT dp.*, pp.url as main_photo_url
     FROM dating_profiles dp
     LEFT JOIN profile_photos pp ON pp.profile_id = dp.id AND pp.is_main = true
     WHERE dp.is_incognito = false
       AND dp.id != $1
       AND dp.startup_looking_for = true
       AND dp.id NOT IN (SELECT swiped_id FROM swipes WHERE swiper_id = $1)
       AND dp.id NOT IN (
         SELECT blocked_profile_id FROM blocks WHERE blocker_profile_id = $1
         UNION
         SELECT blocker_profile_id FROM blocks WHERE blocked_profile_id = $1
       )
     ORDER BY dp.created_at DESC
     LIMIT $2`,
    [currentProfileId, limit],
  );
  return res.rows;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Chat Redirect
// ──────────────────────────────────────────────────────────────
async function getChatRedirectInfo(currentAuthUserId, targetProfileId) {
  // Get current user's chat_user id
  const currentChatUser = await pool.query(
    `SELECT id FROM chat_users WHERE auth_user_id = $1`,
    [currentAuthUserId],
  );

  // Get target user's auth_user_id via dating_profiles
  const targetProfile = await pool.query(
    `SELECT auth_user_id FROM dating_profiles WHERE id = $1`,
    [targetProfileId],
  );

  if (!currentChatUser.rows[0] || !targetProfile.rows[0]) {
    return null;
  }

  const currentChatUserId = currentChatUser.rows[0].id;
  const targetAuthUserId = targetProfile.rows[0].auth_user_id;

  // Get or create target chat user
  const targetChatUser = await pool.query(
    `SELECT id FROM chat_users WHERE auth_user_id = $1`,
    [targetAuthUserId],
  );

  let targetChatUserId;
  if (targetChatUser.rows[0]) {
    targetChatUserId = targetChatUser.rows[0].id;
  } else {
    // Target hasn't joined chat yet - we'll need to handle this in frontend
    targetChatUserId = null;
  }

  // Check if DM conversation exists (using a convention: dm_<smaller_id>_<larger_id>)
  // Or check channels table for DM channel
  let conversationId = null;
  if (targetChatUserId) {
    const dmChannelId = `dm_${Math.min(currentChatUserId, targetChatUserId)}_${Math.max(currentChatUserId, targetChatUserId)}`;
    const channelRes = await pool.query(
      `SELECT id FROM channels WHERE id = $1`,
      [dmChannelId],
    );
    if (channelRes.rows[0]) {
      conversationId = channelRes.rows[0].id;
    }
  }

  return {
    currentChatUserId,
    targetChatUserId,
    targetAuthUserId,
    conversationId,
  };
}

async function createOrGetDMChannel(user1ChatId, user2ChatId) {
  const dmChannelId = `dm_${Math.min(user1ChatId, user2ChatId)}_${Math.max(user1ChatId, user2ChatId)}`;
  
  const res = await pool.query(
    `INSERT INTO channels (id, name, description, is_voice)
     VALUES ($1, $2, $3, false)
     ON CONFLICT (id) DO NOTHING
     RETURNING id`,
    [dmChannelId, 'Direct Message', 'Direct message between users'],
  );
  
  return res.rows[0] ? res.rows[0].id : dmChannelId;
}

// ──────────────────────────────────────────────────────────────
// V3 Helper: Admin
// ──────────────────────────────────────────────────────────────
async function getAdminStats() {
  const stats = await Promise.all([
    pool.query(`SELECT COUNT(*) FROM dating_profiles`),
    pool.query(`SELECT COUNT(*) FROM matches`),
    pool.query(`SELECT COUNT(*) FROM friend_requests WHERE status = 'pending'`),
    pool.query(`SELECT COUNT(*) FROM reports WHERE status = 'pending'`),
    pool.query(`SELECT COUNT(*) FROM chat_users WHERE status = 'online'`),
    pool.query(`SELECT COUNT(*) FROM dating_profiles WHERE created_at > NOW() - INTERVAL '24 hours'`),
    pool.query(`SELECT COUNT(*) FROM dating_profiles WHERE is_verified = true`),
  ]);

  return {
    totalProfiles: parseInt(stats[0].rows[0].count),
    totalMatches: parseInt(stats[1].rows[0].count),
    pendingFriendRequests: parseInt(stats[2].rows[0].count),
    pendingReports: parseInt(stats[3].rows[0].count),
    onlineUsers: parseInt(stats[4].rows[0].count),
    newUsers24h: parseInt(stats[5].rows[0].count),
    verifiedUsers: parseInt(stats[6].rows[0].count),
  };
}

async function getAllUsersForAdmin(page = 1, limit = 50, search = '') {
  const offset = (page - 1) * limit;
  let query = `
    SELECT dp.id, dp.name, dp.college_email, dp.branch, dp.year, dp.is_verified, dp.is_incognito, dp.created_at,
           cu.status as chat_status, cu.last_seen
    FROM dating_profiles dp
    LEFT JOIN chat_users cu ON cu.auth_user_id = dp.auth_user_id
  `;
  const params = [];

  if (search) {
    query += ` WHERE dp.name ILIKE $1 OR dp.college_email ILIKE $1`;
    params.push(`%${search}%`);
  }

  query += ` ORDER BY dp.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  const res = await pool.query(query, params);
  return res.rows;
}

async function suspendUser(profileId, reason) {
  const res = await pool.query(
    `UPDATE dating_profiles SET is_incognito = true, updated_at = NOW() WHERE id = $1 RETURNING *`,
    [profileId],
  );
  return res.rows[0];
}

async function unsuspendUser(profileId) {
  const res = await pool.query(
    `UPDATE dating_profiles SET is_incognito = false, updated_at = NOW() WHERE id = $1 RETURNING *`,
    [profileId],
  );
  return res.rows[0];
}

async function verifyUser(profileId) {
  const res = await pool.query(
    `UPDATE dating_profiles SET is_verified = true, verified = true, updated_at = NOW() WHERE id = $1 RETURNING *`,
    [profileId],
  );
  return res.rows[0];
}

// ──────────────────────────────────────────────────────────────
// Exports
// ──────────────────────────────────────────────────────────────
module.exports = {
  pool,
  verifyFirebaseToken,
  getUserIdFromToken,
  verifyTokenAndGetUserId,
  getOrCreateChatUser,
  getOrCreateDatingProfile,
  getDatingProfileByAuthId,
  getDatingProfileById,
  updateDatingProfile,
  // Photos
  addProfilePhoto,
  getProfilePhotos,
  updateProfilePhoto,
  deleteProfilePhoto,
  reorderProfilePhotos,
  // Prompts
  getActivePrompts,
  getProfilePrompts,
  upsertProfilePrompt,
  deleteProfilePrompt,
  // Prompt Likes
  likePrompt,
  unlikePrompt,
  getPromptLikesForProfile,
  // Photo Likes
  likePhoto,
  unlikePhoto,
  getPhotoLikesForProfile,
  // Friends
  sendFriendRequest,
  respondToFriendRequest,
  getFriendRequests,
  getSentFriendRequests,
  getFriends,
  removeFriend,
  // Blocks
  blockUser,
  unblockUser,
  getBlockedUsers,
  isBlocked,
  // Reports
  createReport,
  getReports,
  updateReportStatus,
  // Notifications
  createNotification,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadNotificationCount,
  // Compatibility
  upsertCompatibilityScore,
  getCompatibilityScore,
  getTopCompatibilityScores,
  // Events
  getEvents,
  rsvpToEvent,
  getEventRsvps,
  getUserEventRsvps,
  // Saved Profiles
  saveProfile,
  unsaveProfile,
  getSavedProfiles,
  isProfileSaved,
  // Daily Picks
  getDailyPicks,
  setDailyPicks,
  // Conversation Starters
  createConversationStarters,
  getConversationStarters,
  // Badges
  awardBadge,
  getProfileBadges,
  getAllBadgeTypes,
  // Campus Graph
  getCampusGraphEdges,
  getMutualConnections,
  // Search
  searchProfiles,
  // Discovery
  getDiscoveryProfiles,
  getRecommendedProfiles,
  // Study Buddy
  getStudyBuddyMatches,
  // Startup
  getStartupMatches,
  // Chat Redirect
  getChatRedirectInfo,
  createOrGetDMChannel,
  // Admin
  getAdminStats,
  getAllUsersForAdmin,
  suspendUser,
  unsuspendUser,
  verifyUser,
};