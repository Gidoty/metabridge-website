// ═══════════════════════════════════════════════════════════════════
// SCHEDULER — wires every time-based feature to node-cron using the
// schedule defined in src/config/config.js.
//
// Call startScheduledJobs(sockRef) ONCE after the first successful
// connection. Pass the sockRef object (not the socket itself) so that
// cron callbacks always use sockRef.current — the live socket after any
// reconnect — rather than holding a stale reference to a dead socket.
// ═══════════════════════════════════════════════════════════════════
const cron = require("node-cron");
const config = require("../config/config");
const logger = require("../utils/logger");

const { sendDailyNudges } = require("../features/dailyNudges");
const { checkDeadlineReminders, checkLectureReminders } = require("../features/reminders");
const { sendWeeklyDigests } = require("../features/summarization");

/**
 * @param {{ current: import("@whiskeysockets/baileys").WASocket }} sockRef
 */
function startScheduledJobs(sockRef) {
  const tz = config.schedule.timezone;

  cron.schedule(
    config.schedule.dailyNudge,
    () => {
      if (!sockRef.current) return;
      logger.info("Running scheduled job: daily nudges");
      sendDailyNudges(sockRef.current).catch((err) =>
        logger.error({ err: err.message }, "Daily nudge job failed")
      );
    },
    { timezone: tz }
  );

  cron.schedule(
    config.schedule.deadlineCheck,
    () => {
      if (!sockRef.current) return;
      logger.info("Running scheduled job: deadline reminders");
      checkDeadlineReminders(sockRef.current).catch((err) =>
        logger.error({ err: err.message }, "Deadline reminder job failed")
      );
    },
    { timezone: tz }
  );

  // Lecture reminders are time-sensitive (offset in minutes), so this
  // runs every 5 minutes rather than at fixed daily times.
  cron.schedule(
    "*/5 * * * *",
    () => {
      if (!sockRef.current) return;
      checkLectureReminders(sockRef.current).catch((err) =>
        logger.error({ err: err.message }, "Lecture reminder job failed")
      );
    },
    { timezone: tz }
  );

  cron.schedule(
    config.schedule.weeklySummary,
    () => {
      if (!sockRef.current) return;
      logger.info("Running scheduled job: weekly digest");
      sendWeeklyDigests(sockRef.current).catch((err) =>
        logger.error({ err: err.message }, "Weekly digest job failed")
      );
    },
    { timezone: tz }
  );

  logger.info(
    { timezone: tz },
    "All scheduled jobs registered: daily nudges, deadline checks, lecture reminders (every 5 min), weekly digest."
  );
}

module.exports = { startScheduledJobs };
