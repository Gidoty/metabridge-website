// ═══════════════════════════════════════════════════════════════════
// DATABASE CONNECTION — initialises SQLite and applies schema.sql
// on first run. Every other module imports `db` from here.
// ═══════════════════════════════════════════════════════════════════
const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");
const config = require("../config/config");
const logger = require("../utils/logger");

const dbDir = path.dirname(config.dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(config.dbPath);
db.pragma("journal_mode = WAL"); // safer for a long-running process

function initSchema() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");
  db.exec(schemaSql);
  logger.info("Database schema verified/applied.");
}

initSchema();

module.exports = db;
