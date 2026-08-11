const { verifyFirebaseToken, getUserIdFromToken } = require("../config/db");

// ──────────────────────────────────────────────────────────────
// REST API Middleware
// ──────────────────────────────────────────────────────────────

/**
 * requireAuth - Protects REST endpoints
 * Verifies Supabase JWT from Authorization header
 * Attaches req.user = { id, email, ... }
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

  verifyFirebaseToken(token)
    .then((decoded) => {
      if (!decoded.email || !decoded.email.toLowerCase().endsWith("@pec.edu.in")) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Only @pec.edu.in email domain is allowed",
        });
      }
      const isAdmin = decoded.admin === true;
      req.user = {
        id: getUserIdFromToken(decoded),
        email: decoded.email,
        role: isAdmin ? "admin" : (decoded.role || "authenticated"),
        isAdmin,
        ...decoded,
      };
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

  verifyFirebaseToken(token)
    .then((decoded) => {
      if (!decoded.email || !decoded.email.toLowerCase().endsWith("@pec.edu.in")) {
        req.user = null;
        return next();
      }
      const isAdmin = decoded.admin === true;
      req.user = {
        id: getUserIdFromToken(decoded),
        email: decoded.email,
        role: isAdmin ? "admin" : (decoded.role || "authenticated"),
        isAdmin,
        ...decoded,
      };
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
 * Token can be sent via:
 * 1. auth: { token } in connection options
 * 2. query string: ?token=...
 * 3. Authorization header (handled by socket.io-client)
 */
function socketAuth(socket, next) {
  // Try to get token from auth object (preferred)
  let token = socket.handshake.auth?.token;

  // Fallback: query string
  if (!token && socket.handshake.query?.token) {
    token = socket.handshake.query.token;
  }

  // Fallback: Authorization header (some clients send this)
  if (!token && socket.handshake.headers?.authorization?.startsWith("Bearer ")) {
    token = socket.handshake.headers.authorization.slice(7);
  }

  if (!token) {
    return next(new Error("Authentication required"));
  }

  verifyFirebaseToken(token)
    .then((decoded) => {
      if (!decoded.email || !decoded.email.toLowerCase().endsWith("@pec.edu.in")) {
        return next(new Error("Only @pec.edu.in email domain is allowed"));
      }
      const isAdmin = decoded.admin === true;
      socket.user = {
        id: getUserIdFromToken(decoded),
        email: decoded.email,
        role: isAdmin ? "admin" : (decoded.role || "authenticated"),
        isAdmin,
        ...decoded,
      };
      next();
    })
    .catch((err) => {
      console.error("❌ Socket auth failed:", err.message);
      next(new Error("Invalid or expired token"));
    });
}

module.exports = {
  requireAuth,
  optionalAuth,
  socketAuth,
  requireAdmin,
};

/**
 * requireAdmin - Protects admin-only endpoints
 * Requires user to have admin custom claim in Firebase token
 */
function requireAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      error: "Forbidden",
      message: "Admin access required",
    });
  }
  next();
}
