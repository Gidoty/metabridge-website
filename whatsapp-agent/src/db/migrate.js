// ═══════════════════════════════════════════════════════════════════
// MIGRATE — standalone script that initialises (or re-applies) the
// database schema without starting the full bot. Useful to verify the
// DB is set up correctly before the first run, or after pulling an
// update that added new tables.
//
// Usage: npm run migrate
// ═══════════════════════════════════════════════════════════════════
require("dotenv").config();

// Importing db.js is enough — it opens the database and calls initSchema()
// on require, which runs schema.sql with CREATE TABLE IF NOT EXISTS for
// every table. Safe to run multiple times.
require("./db");

console.log("Migration complete.");
