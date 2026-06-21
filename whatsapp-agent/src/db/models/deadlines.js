// ═══════════════════════════════════════════════════════════════════
// DEADLINES & LECTURES MODEL
// ═══════════════════════════════════════════════════════════════════
const db = require("../db");

// ── Deadlines ──────────────────────────────────────────────
function addDeadline({ cohortId = "default-cohort", title, description, dueAt }) {
  return db
    .prepare(`INSERT INTO deadlines (cohort_id, title, description, due_at) VALUES (?, ?, ?, ?)`)
    .run(cohortId, title, description || null, dueAt);
}

function getDeadlinesDueWithin(hours, cohortId = "default-cohort") {
  return db
    .prepare(
      `SELECT * FROM deadlines
       WHERE cohort_id = ?
         AND due_at BETWEEN datetime('now') AND datetime('now', '+' || ? || ' hours')`
    )
    .all(cohortId, hours);
}

function markReminderSent(deadlineId, column) {
  // column must be one of the two known reminder flags — guarded against injection.
  const allowed = ["reminder_sent_24h", "reminder_sent_1h"];
  if (!allowed.includes(column)) throw new Error(`Invalid reminder column: ${column}`);
  return db.prepare(`UPDATE deadlines SET ${column} = 1 WHERE id = ?`).run(deadlineId);
}

function getUpcomingDeadlines(cohortId = "default-cohort", limit = 5) {
  return db
    .prepare(
      `SELECT * FROM deadlines WHERE cohort_id = ? AND due_at > datetime('now')
       ORDER BY due_at ASC LIMIT ?`
    )
    .all(cohortId, limit);
}

// ── Lectures ──────────────────────────────────────────────
function addLecture({ cohortId = "default-cohort", title, startsAt, linkUrl }) {
  return db
    .prepare(`INSERT INTO lectures (cohort_id, title, starts_at, link_url) VALUES (?, ?, ?, ?)`)
    .run(cohortId, title, startsAt, linkUrl || null);
}

function getLecturesStartingWithin(minutes, cohortId = "default-cohort") {
  return db
    .prepare(
      `SELECT * FROM lectures
       WHERE cohort_id = ? AND reminder_sent = 0
         AND starts_at BETWEEN datetime('now') AND datetime('now', '+' || ? || ' minutes')`
    )
    .all(cohortId, minutes);
}

function markLectureReminderSent(lectureId) {
  return db.prepare("UPDATE lectures SET reminder_sent = 1 WHERE id = ?").run(lectureId);
}

module.exports = {
  addDeadline,
  getDeadlinesDueWithin,
  markReminderSent,
  getUpcomingDeadlines,
  addLecture,
  getLecturesStartingWithin,
  markLectureReminderSent,
};
