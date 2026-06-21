// ═══════════════════════════════════════════════════════════════════
// ENTRY POINT
// Run with: npm start   (or `pm2 start ecosystem.config.js` in production)
// First run prints a QR code — scan it with WhatsApp on the bot's
// phone (Settings → Linked Devices → Link a Device). After that the
// session persists in ./data/auth and reconnects automatically.
// ═══════════════════════════════════════════════════════════════════
require("dotenv").config();
const logger = require("./utils/logger");
const config = require("./config/config");
const { connectToWhatsApp } = require("./whatsapp/connection");
const { handleIncomingMessage } = require("./whatsapp/messageHandler");
const { startScheduledJobs } = require("./scheduler/cronJobs");
const db = require("./db/db");

function validateConfig() {
  const problems = [];

  if (config.adminNumbers.length === 0) {
    problems.push("No ADMIN_NUMBERS set in .env — nobody will be able to issue admin commands.");
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    problems.push("No ANTHROPIC_API_KEY set in .env — FAQ answering, summarisation, and AI moderation will not work.");
  }
  if (config.managedGroups.every((g) => !g.groupId)) {
    problems.push("No group has a groupId set — the bot won't manage any group yet. See README 'Finding a Group ID'.");
  }

  if (problems.length > 0) {
    logger.warn("⚠️  Configuration warnings (the bot will still start):");
    problems.forEach((p) => logger.warn(`   - ${p}`));
  }
}

// ── Graceful shutdown ────────────────────────────────────────────────
// PM2 sends SIGINT on `pm2 stop` and SIGTERM on `pm2 delete`. We catch
// both so the SQLite WAL is flushed and the DB closed cleanly before exit,
// rather than relying on Node's process teardown to do it.
function shutdown(signal) {
  logger.info({ signal }, "Received shutdown signal — stopping gracefully...");
  try {
    db.close();
    logger.info("Database closed.");
  } catch {
    // already closed or never opened — safe to ignore
  }
  // Give any in-flight send operations a moment to finish or time out.
  setTimeout(() => {
    logger.info("Exiting.");
    process.exit(0);
  }, 3000);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// ── Main ─────────────────────────────────────────────────────────────
// The scheduled jobs (cron) must only be registered ONCE for the lifetime
// of the process. On reconnect, connectToWhatsApp fires onReady again with
// a new sock object — so we keep a stable sockRef and update it in-place so
// the already-registered cron callbacks always send through the live socket.
async function main() {
  logger.info("Starting Metabridge WhatsApp Agent...");
  validateConfig();

  const sockRef = { current: null };

  await connectToWhatsApp((sock, isReconnect) => {
    sockRef.current = sock;

    // Always (re-)register the message listener on the new sock — the old
    // sock is dead, so its listener goes with it.
    sock.ev.on("messages.upsert", async ({ messages }) => {
      for (const msg of messages) {
        try {
          await handleIncomingMessage(sockRef.current, msg);
        } catch (err) {
          logger.error({ err: err.message }, "Error handling incoming message");
        }
      }
    });

    // Cron jobs run only once — they reference sockRef.current so they
    // automatically use the live socket after any reconnect.
    if (!isReconnect) {
      startScheduledJobs(sockRef);
    }

    logger.info("🚀 Metabridge WhatsApp Agent is fully running.");
  });
}

main().catch((err) => {
  logger.error({ err: err.message, stack: err.stack }, "Fatal error on startup");
  process.exit(1);
});
