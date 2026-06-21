// ═══════════════════════════════════════════════════════════════════
// MESSAGE LOG MODEL — rolling log feeding the summarisation feature.
// ═══════════════════════════════════════════════════════════════════
const db = require("../db");

function logMessage(groupId, senderNumber, senderName, messageText, flaggedAsSpam = false) {
  return db
    .prepare(
      `INSERT INTO message_log (group_id, sender_number, sender_name, message_text, flagged_as_spam)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(groupId, senderNumber, senderName || null, messageText, flaggedAsSpam ? 1 : 0);
}

function getRecentMessages(groupId, sinceHours = 24) {
  return db
    .prepare(
      `SELECT * FROM message_log
       WHERE group_id = ? AND sent_at > datetime('now', '-' || ? || ' hours')
       ORDER BY sent_at ASC`
    )
    .all(groupId, sinceHours);
}

/**
 * Formats recent messages as a compact transcript for the summarisation
 * prompt, e.g. "Amaka: question about module 3\nTunde: thanks!"
 */
function getRecentTranscript(groupId, sinceHours = 24) {
  const rows = getRecentMessages(groupId, sinceHours);
  return rows
    .filter((r) => !r.flagged_as_spam)
    .map((r) => `${r.sender_name || r.sender_number}: ${r.message_text}`)
    .join("\n");
}

function pruneOldMessages(olderThanDays = 14) {
  return db
    .prepare(`DELETE FROM message_log WHERE sent_at < datetime('now', '-' || ? || ' days')`)
    .run(olderThanDays);
}

module.exports = { logMessage, getRecentMessages, getRecentTranscript, pruneOldMessages };
