// ═══════════════════════════════════════════════════════════════════
// STUDENTS MODEL
// ═══════════════════════════════════════════════════════════════════
const db = require("../db");

function upsertStudent(phoneNumber, displayName, cohortId = "default-cohort") {
  const stmt = db.prepare(`
    INSERT INTO students (phone_number, display_name, cohort_id)
    VALUES (?, ?, ?)
    ON CONFLICT(phone_number) DO UPDATE SET
      display_name = excluded.display_name,
      is_active = 1
  `);
  return stmt.run(phoneNumber, displayName, cohortId);
}

function getActiveStudents(cohortId = "default-cohort") {
  return db
    .prepare("SELECT * FROM students WHERE cohort_id = ? AND is_active = 1")
    .all(cohortId);
}

function deactivateStudent(phoneNumber) {
  return db
    .prepare("UPDATE students SET is_active = 0 WHERE phone_number = ?")
    .run(phoneNumber);
}

module.exports = { upsertStudent, getActiveStudents, deactivateStudent };
