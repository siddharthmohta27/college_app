const crypto = require("crypto");
const { pool } = require("../config/db");

// In-memory fallback cache for OTPs in case DB is offline/unreachable
const memoryOtpStore = new Map();

// Helper: Clean up expired memory OTPs every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of memoryOtpStore.entries()) {
    if (val.expiresAt < now) {
      memoryOtpStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Generate a cryptographically secure 6-digit OTP code
 */
function generateOtpCode() {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Send an OTP code to user's email
 * @param {string} email
 * @param {string} otpType - 'signup_verification' | 'pec_link'
 * @returns {Promise<{ success: boolean, message: string, debugOtp?: string }>}
 */
async function sendOtp(email, otpType = "signup_verification") {
  const cleanEmail = email.toLowerCase().trim();
  const otpCode = generateOtpCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  console.log(`\n========================================`);
  console.log(`📧 [OTP SERVICE] Dispatching OTP for: ${cleanEmail}`);
  console.log(`🔑 OTP Code: [ ${otpCode} ] | Type: ${otpType}`);
  console.log(`⏳ Expires at: ${expiresAt.toISOString()}`);
  console.log(`========================================\n`);

  // Attempt database insertion
  let dbSaved = false;
  try {
    if (pool) {
      await pool.query(
        `INSERT INTO email_otps (email, otp_code, otp_type, expires_at, verified, attempts)
         VALUES ($1, $2, $3, $4, false, 0)`,
        [cleanEmail, otpCode, otpType, expiresAt]
      );
      dbSaved = true;
    }
  } catch (err) {
    console.warn("⚠️  [OTP Service] DB save failed, fallback to in-memory store:", err.message);
  }

  // Always keep in memory store as fallback
  const storeKey = `${cleanEmail}:${otpType}`;
  memoryOtpStore.set(storeKey, {
    otpCode,
    expiresAt: expiresAt.getTime(),
    attempts: 0,
    verified: false,
  });

  // If SMTP is configured in environment, send actual email
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer = require("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const subject =
        otpType === "pec_link"
          ? "PEC Account Verification Code — Campus Connect"
          : "Your Campus Connect Verification Code";

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Campus Connect" <noreply@pec.edu.in>`,
        to: cleanEmail,
        subject,
        text: `Your verification code is ${otpCode}. It will expire in 10 minutes.`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; rounded: 8px;">
            <h2 style="color: #6366f1;">Campus Connect Verification</h2>
            <p>Use the following 6-digit code to verify your email address:</p>
            <div style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #1e293b; padding: 12px; background: #f1f5f9; text-align: center; border-radius: 6px;">
              ${otpCode}
            </div>
            <p style="color: #64748b; font-size: 13px; margin-top: 16px;">This code expires in 10 minutes. If you did not request this, please ignore this email.</p>
          </div>
        `,
      });
      console.log(`✅ [OTP Service] SMTP Email sent successfully to ${cleanEmail}`);
    } catch (mailErr) {
      console.error("❌ [OTP Service] SMTP delivery failed:", mailErr.message);
    }
  }

  return {
    success: true,
    message: `Verification code sent to ${cleanEmail}`,
    // Return debugOtp in development or testing
    debugOtp: process.env.NODE_ENV !== "production" ? otpCode : undefined,
  };
}

/**
 * Verify an OTP code
 * @param {string} email
 * @param {string} otpCode
 * @param {string} otpType
 * @returns {Promise<{ valid: boolean, message: string }>}
 */
async function verifyOtp(email, otpCode, otpType = "signup_verification") {
  const cleanEmail = email.toLowerCase().trim();
  const inputOtp = (otpCode || "").toString().trim();
  const storeKey = `${cleanEmail}:${otpType}`;

  // 1. Try DB verification first
  try {
    if (pool) {
      const res = await pool.query(
        `SELECT id, otp_code, expires_at, verified, attempts
         FROM email_otps
         WHERE email = $1 AND otp_type = $2 AND verified = false
         ORDER BY created_at DESC
         LIMIT 1`,
        [cleanEmail, otpType]
      );

      if (res.rows.length > 0) {
        const record = res.rows[0];

        if (record.attempts >= 5) {
          return { valid: false, message: "Too many failed attempts. Please request a new OTP." };
        }

        if (new Date() > new Date(record.expires_at)) {
          return { valid: false, message: "Verification code has expired. Please request a new code." };
        }

        if (record.otp_code !== inputOtp) {
          await pool.query(`UPDATE email_otps SET attempts = attempts + 1 WHERE id = $1`, [record.id]);
          return { valid: false, message: "Invalid verification code. Please try again." };
        }

        // Mark OTP as verified
        await pool.query(`UPDATE email_otps SET verified = true WHERE id = $1`, [record.id]);
        memoryOtpStore.delete(storeKey);
        return { valid: true, message: "Email verified successfully." };
      }
    }
  } catch (err) {
    console.warn("⚠️  [OTP Service] DB verification failed, checking in-memory store:", err.message);
  }

  // 2. Memory store verification fallback
  const memRecord = memoryOtpStore.get(storeKey);
  if (!memRecord) {
    return { valid: false, message: "No active verification code found for this email. Please request a new code." };
  }

  if (memRecord.attempts >= 5) {
    memoryOtpStore.delete(storeKey);
    return { valid: false, message: "Too many failed attempts. Please request a new OTP." };
  }

  if (Date.now() > memRecord.expiresAt) {
    memoryOtpStore.delete(storeKey);
    return { valid: false, message: "Verification code has expired. Please request a new code." };
  }

  if (memRecord.otpCode !== inputOtp) {
    memRecord.attempts += 1;
    return { valid: false, message: "Invalid verification code. Please try again." };
  }

  memRecord.verified = true;
  memoryOtpStore.delete(storeKey);
  return { valid: true, message: "Email verified successfully." };
}

module.exports = {
  generateOtpCode,
  sendOtp,
  verifyOtp,
};
