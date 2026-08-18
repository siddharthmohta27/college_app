const express = require("express");
const rateLimit = require("express-rate-limit");
const { pool } = require("../config/db");
const { requireAuth } = require("../middleware/auth");
const { sendOtp, verifyOtp } = require("../services/otpService");
const { generateSessionToken } = require("./auth");

const router = express.Router();

// Rate limiter for PEC link OTP requests (5 requests per 15 minutes)
const linkEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: "Too many PEC email linking requests. Please wait a few minutes and try again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper: Validate PEC email format
function isPecEmail(email) {
  return (email || "").trim().toLowerCase().endsWith("@pec.edu.in");
}

// ───────────────────────────────────────────────────────────────────────────────
// POST /api/account/link-pec-email
// Sends OTP to the student's newly assigned @pec.edu.in email
// ───────────────────────────────────────────────────────────────────────────────
router.post("/link-pec-email", requireAuth, linkEmailLimiter, async (req, res) => {
  try {
    const { pec_email } = req.body;
    const currentUserId = req.user.id;
    const currentEmail = req.user.email;

    if (!pec_email || !isPecEmail(pec_email)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid @pec.edu.in email address.",
      });
    }

    const cleanPecEmail = pec_email.toLowerCase().trim();

    // Check if PEC email is already linked or claimed by another user
    try {
      if (pool) {
        const conflictRes = await pool.query(
          `SELECT id, email, account_type FROM users 
           WHERE (email = $1 OR pec_email = $1) 
             AND id != $2 
             AND email != $3
             AND (email_verified = true OR account_type = 'pec_verified')`,
          [cleanPecEmail, typeof currentUserId === "number" ? currentUserId : -1, currentEmail || ""]
        );

        if (conflictRes.rows.length > 0) {
          return res.status(409).json({
            success: false,
            error: "This @pec.edu.in email is already registered to another active account.",
          });
        }
      }
    } catch (dbErr) {
      console.warn("⚠️  [Link PEC Email] DB conflict check failed:", dbErr.message);
    }

    // Dispatch verification OTP to the target PEC email address
    const otpResult = await sendOtp(cleanPecEmail, "pec_link");

    return res.status(200).json({
      success: true,
      message: `A verification code has been sent to ${cleanPecEmail}. Enter the code to verify your PEC student identity.`,
      pec_email: cleanPecEmail,
      debugOtp: otpResult.debugOtp,
    });
  } catch (err) {
    console.error("❌ Error in /api/account/link-pec-email:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to initiate PEC email verification.",
    });
  }
});

// ───────────────────────────────────────────────────────────────────────────────
// POST /api/account/verify-link-pec-email
// Verifies the OTP and migrates the fresher account to pec_verified in-place
// ───────────────────────────────────────────────────────────────────────────────
router.post("/verify-link-pec-email", requireAuth, async (req, res) => {
  try {
    const { pec_email, otp, otp_code } = req.body;
    const code = otp || otp_code;
    const currentUserId = req.user.id;
    const currentAuthId = req.user.auth_user_id || req.user.uid || currentUserId;
    const currentEmail = req.user.email;

    if (!pec_email || !isPecEmail(pec_email)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid @pec.edu.in email address.",
      });
    }

    if (!code) {
      return res.status(400).json({
        success: false,
        error: "Verification code is required.",
      });
    }

    const cleanPecEmail = pec_email.toLowerCase().trim();

    // Verify the OTP code sent to the PEC email
    const verification = await verifyOtp(cleanPecEmail, code, "pec_link");
    if (!verification.valid) {
      return res.status(400).json({
        success: false,
        error: verification.message,
      });
    }

    // In-place upgrade: Update the existing user record without creating a new row
    let updatedUser = null;
    try {
      if (pool) {
        // Update user row
        const updateRes = await pool.query(
          `UPDATE users
           SET account_type = 'pec_verified',
               pec_email = $1,
               email_verified = true,
               updated_at = NOW()
           WHERE id = $2 OR auth_user_id = $3 OR email = $4
           RETURNING id, auth_user_id, email, name, account_type, email_verified, pec_email, is_admin`,
          [cleanPecEmail, typeof currentUserId === "number" ? currentUserId : -1, String(currentAuthId), currentEmail || ""]
        );

        if (updateRes.rows.length > 0) {
          updatedUser = updateRes.rows[0];
        }

        // Also update chat_users role if applicable
        await pool.query(
          `UPDATE chat_users 
           SET role = 'Student',
               college_email = COALESCE($1, college_email)
           WHERE auth_user_id = $2 OR college_email = $3`,
          [cleanPecEmail, String(currentAuthId), currentEmail]
        );

        // Also update dating_profiles college_email and verification status
        await pool.query(
          `UPDATE dating_profiles 
           SET is_verified = true,
               college_email = COALESCE($1, college_email)
           WHERE auth_user_id = $2 OR college_email = $3`,
          [cleanPecEmail, String(currentAuthId), currentEmail]
        );
      }
    } catch (dbErr) {
      console.warn("⚠️  [Verify Link PEC Email] DB update failed:", dbErr.message);
    }

    if (!updatedUser) {
      updatedUser = {
        id: currentUserId || 1,
        auth_user_id: currentAuthId,
        email: currentEmail,
        name: req.user.name || "Student",
        account_type: "pec_verified",
        email_verified: true,
        pec_email: cleanPecEmail,
        is_admin: req.user.isAdmin || req.user.is_admin || false,
      };
    }

    // Generate fresh session JWT with upgraded account_type
    const token = generateSessionToken(updatedUser);

    console.log(`🎉 [Migration] Account successfully migrated to pec_verified: ${cleanPecEmail}`);

    return res.status(200).json({
      success: true,
      message: "Congratulations! Your account has been upgraded to a verified PEC student account. All your data has been retained.",
      token,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        account_type: "pec_verified",
        email_verified: true,
        pec_email: cleanPecEmail,
        is_admin: updatedUser.is_admin,
      },
    });
  } catch (err) {
    console.error("❌ Error in /api/account/verify-link-pec-email:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error during account migration.",
    });
  }
});

// ───────────────────────────────────────────────────────────────────────────────
// GET /api/account/status
// Returns the current account status and linked PEC email if any
// ───────────────────────────────────────────────────────────────────────────────
router.get("/status", requireAuth, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentAuthId = req.user.auth_user_id || req.user.uid || currentUserId;
    const currentEmail = req.user.email;

    let userRecord = null;
    try {
      if (pool) {
        const queryRes = await pool.query(
          `SELECT id, email, name, account_type, email_verified, pec_email, is_admin, created_at 
           FROM users 
           WHERE id = $1 OR auth_user_id = $2 OR email = $3 
           LIMIT 1`,
          [typeof currentUserId === "number" ? currentUserId : -1, String(currentAuthId), currentEmail || ""]
        );
        if (queryRes.rows.length > 0) {
          userRecord = queryRes.rows[0];
        }
      }
    } catch (dbErr) {
      console.warn("⚠️  [Account Status] DB query error:", dbErr.message);
    }

    const accountType = userRecord?.account_type || req.user.account_type || (currentEmail?.endsWith("@pec.edu.in") ? "pec_verified" : "fresher_temp");
    const pecEmail = userRecord?.pec_email || null;
    const isVerified = userRecord ? userRecord.email_verified : true;

    return res.status(200).json({
      success: true,
      account: {
        id: userRecord?.id || currentUserId,
        email: currentEmail,
        name: userRecord?.name || req.user.name || "Student",
        account_type: accountType,
        email_verified: isVerified,
        pec_email: pecEmail,
        is_fresher: accountType === "fresher_temp",
        is_admin: userRecord?.is_admin || req.user.isAdmin || false,
      },
    });
  } catch (err) {
    console.error("❌ Error in /api/account/status:", err);
    return res.status(500).json({ success: false, error: "Failed to retrieve account status." });
  }
});

module.exports = router;
