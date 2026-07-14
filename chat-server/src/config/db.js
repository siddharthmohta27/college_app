require("dotenv").config();
const { Pool } = require("pg");

// Create a connection pool
// If DATABASE_URL is set in .env, use it. Otherwise fall back to individual params.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_URL && process.env.DATABASE_URL.includes("localhost")
      ? false
      : process.env.DATABASE_URL
        ? { rejectUnauthorized: false } // Required for cloud providers like Neon / Supabase
        : false,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("⚠️  PostgreSQL connection error:", err.message);
  console.error("   Dating features will be unavailable until DB is connected.");
});

module.exports = pool;
