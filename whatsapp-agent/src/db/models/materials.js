// ═══════════════════════════════════════════════════════════════════
// MATERIALS MODEL
// ═══════════════════════════════════════════════════════════════════
const db = require("../db");

function addMaterial({ cohortId = "default-cohort", title, description, filePath, linkUrl, moduleTag, addedBy }) {
  const stmt = db.prepare(`
    INSERT INTO materials (cohort_id, title, description, file_path, link_url, module_tag, added_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(cohortId, title, description || null, filePath || null, linkUrl || null, moduleTag || null, addedBy || null);
}

function getMaterialsByModule(moduleTag, cohortId = "default-cohort") {
  return db
    .prepare("SELECT * FROM materials WHERE cohort_id = ? AND module_tag = ? ORDER BY added_at DESC")
    .all(cohortId, moduleTag);
}

function searchMaterials(keyword, cohortId = "default-cohort") {
  const like = `%${keyword}%`;
  return db
    .prepare(
      `SELECT * FROM materials WHERE cohort_id = ? AND (title LIKE ? OR description LIKE ? OR module_tag LIKE ?)
       ORDER BY added_at DESC`
    )
    .all(cohortId, like, like, like);
}

function getAllMaterials(cohortId = "default-cohort") {
  return db
    .prepare("SELECT * FROM materials WHERE cohort_id = ? ORDER BY added_at DESC")
    .all(cohortId);
}

module.exports = { addMaterial, getMaterialsByModule, searchMaterials, getAllMaterials };
