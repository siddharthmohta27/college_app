const { pool } = require("./chat-server/src/config/db");

pool
  .query("SELECT NOW() as now")
  .then((r) => console.log("DB OK:", r.rows[0]))
  .catch((e) => console.error("Error:", e.message))
  .finally(() => pool.end());
