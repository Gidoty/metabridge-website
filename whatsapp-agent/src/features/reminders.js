// ═══════════════════════════════════════════════════════════════════
// FEATURE: REMINDERS (deadlines + lectures)
// Checked on a schedule (see src/scheduler/cronJobs.js). Sends a
// reminder once per threshold per item — flags in the DB prevent
// duplicate reminders on every check.
// ═══════════════════════════════════════════════════════════════════
const {
  getDeadlinesDueWithin,
  markReminderSent,
  getLecturesStartingWithin,
  markLectureReminderSent,
} = require("../db/models/deadlines");
const { sendText } = require("../whatsapp/sender");
const config = require("../config/config");
const logger = require("../utils/logger");

function formatDueTime(isoString) {
  return new Date(isoString).toLocaleString("en-NG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Checks for deadlines due within 24h and 1h windows and sends a
 * reminder to each managed group exactly once per threshold.
 */
async function checkDeadlineReminders(sock) {
  for (const group of config.managedGroups) {
    if (!group.features.reminders || !group.groupId) continue;

    const due24h = getDeadlinesDueWithin(24, group.cohortId);
    for (const d of due24h) {
      if (d.reminder_sent_24h) continue;
      await sendText(
        sock,
        group.groupId,
        `⏰ *Reminder:* "${d.title}" is due ${formatDueTime(d.due_at)} — that's within 24 hours.\n${d.description || ""}`.trim()
      );
      markReminderSent(d.id, "reminder_sent_24h");
    }

    const due1h = getDeadlinesDueWithin(1, group.cohortId);
    for (const d of due1h) {
      if (d.reminder_sent_1h) continue;
      await sendText(
        sock,
        group.groupId,
        `🚨 *Last call:* "${d.title}" is due ${formatDueTime(d.due_at)} — less than an hour left!`
      );
      markReminderSent(d.id, "reminder_sent_1h");
    }
  }
}

/**
 * Checks for lectures starting soon and sends one reminder per lecture.
 */
async function checkLectureReminders(sock) {
  for (const group of config.managedGroups) {
    if (!group.features.reminders || !group.groupId) continue;

    const offsetMins = config.schedule.lectureReminderOffsetMins;
    const upcoming = getLecturesStartingWithin(offsetMins, group.cohortId);

    for (const lecture of upcoming) {
      const linkLine = lecture.link_url ? `\nJoin here: ${lecture.link_url}` : "";
      await sendText(
        sock,
        group.groupId,
        `📚 *Upcoming lecture:* "${lecture.title}" starts at ${formatDueTime(lecture.starts_at)}.${linkLine}`
      );
      markLectureReminderSent(lecture.id);
    }
  }
  logger.info("Lecture reminder check complete.");
}

module.exports = { checkDeadlineReminders, checkLectureReminders };
