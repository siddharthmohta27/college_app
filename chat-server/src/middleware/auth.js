const jwt = require("jsonwebtoken");
const { verifyFirebaseToken, getUserIdFromToken } = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET || "campus_connect_jwt_secret_key_2026";

/**
 * Helper to decode and verify either Firebase JWT or Server JWT token
 */
async function verifyAnyToken(token) {
  // 1. Try Firebase Admin verification first if configured
  try {
    const decoded = await verifyFirebaseToken(token);
    const isPec = decoded.email && decoded.email.toLowerCase().endsWith("@pec.edu.in");
    const accountType = decoded.account_type || (isPec ? "pec_verified" : "fresher_temp");
    const isAdmin = decoded.admin === true || decoded.isAdmin === true || decoded.role === "admin";

    return {
      id: getUserIdFromToken(decoded),
      auth_user_id: getUserIdFromToken(decoded),
      email: decoded.email,
      role: isAdmin ? "admin" : (decoded.role || "authenticated"),
      account_type: accountType,
      email_verified: decoded.email_verified !== false,
      isAdmin,
      is_admin: isAdmin,
      ...decoded,
    };
  } catch (firebaseErr) {
    // 2. Fall back to Server JWT verification
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const isPec = decoded.email && decoded.email.toLowerCase().endsWith("@pec.edu.in");
      const accountType = decoded.account_type || (isPec ? "pec_verified" : "fresher_temp");
      const isAdmin = decoded.is_admin === true || decoded.isAdmin === true || decoded.role === "admin";

      return {
        id: decoded.id || decoded.auth_user_id,
        auth_user_id: decoded.auth_user_id || decoded.id,
        email: decoded.email,
        role: isAdmin ? "admin" : (decoded.role || "authenticated"),
        account_type: accountType,
        email_verified: decoded.email_verified !== false,
        isAdmin,
        is_admin: isAdmin,
        ...decoded,
      };
    } catch (jwtErr) {
      throw new Error(`Token verification failed: ${jwtErr.message}`);
    }
  }
}

// ──────────────────────────────────────────────────────────────
// REST API Middleware
// ──────────────────────────────────────────────────────────────

/**
 * requireAuth - Protects REST endpoints
 * Accepts both PEC verified students and fresher temporary accounts
 * Attaches req.user = { id, email, account_type, email_verified, isAdmin, ... }
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Missing or invalid Authorization header",
    });
  }

  const token = authHeader.slice(7); // Remove "Bearer "

  verifyAnyToken(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.error("❌ JWT verification failed:", err.message);
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid or expired token",
      });
    });
}

/**
 * optionalAuth - Attaches user if token present, but doesn't require it
 */
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.slice(7);

  verifyAnyToken(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(() => {
      req.user = null;
      next();
    });
}

// ──────────────────────────────────────────────────────────────
// Socket.io Middleware
// ──────────────────────────────────────────────────────────────

/**
 * socketAuth - Validates JWT during Socket.io handshake
 */
function socketAuth(socket, next) {
  let token = socket.handshake.auth?.token;

  if (!token && socket.handshake.query?.token) {
    token = socket.handshake.query.token;
  }

  if (!token && socket.handshake.headers?.authorization?.startsWith("Bearer ")) {
    token = socket.handshake.headers.authorization.slice(7);
  }

  if (!token) {
    return next(new Error("Authentication required"));
  }

  verifyAnyToken(token)
    .then((user) => {
      socket.user = user;
      next();
    })
    .catch((err) => {
      console.error("❌ Socket auth failed:", err.message);
      next(new Error("Invalid or expired token"));
    });
}

/**
 * requireAdmin - Protects admin-only endpoints
 */
function requireAdmin(req, res, next) {
  if (!req.user || (!req.user.isAdmin && !req.user.is_admin && req.user.role !== "admin")) {
    return res.status(403).json({
      error: "Forbidden",
      message: "Admin access required",
    });
  }
  next();
}

module.exports = {
  requireAuth,
  optionalAuth,
  socketAuth,
  requireAdmin,
  verifyAnyToken,
};

