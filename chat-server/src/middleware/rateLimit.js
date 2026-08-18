const rateLimit = require("express-rate-limit");

// Stricter rate limit for write operations (swipes, likes, messages, etc.)
const writeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 write requests per minute
  message: { error: "Too many requests, please slow down" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Moderate rate limit for read-heavy endpoints
const readLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 read requests per minute
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

// Very strict rate limit for sensitive operations (reports, blocks, admin)
const sensitiveLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 sensitive requests per minute
  message: { error: "Too many requests, please slow down" },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  writeLimiter,
  readLimiter,
  sensitiveLimiter,
};