// ═══════════════════════════════════════════════════════════════════
// FAQ MODEL — the knowledge base the FAQ-answering feature grounds
// its responses in, so it answers from real academy policy rather
// than the model guessing.
// ═══════════════════════════════════════════════════════════════════
const db = require("../db");

function addFaq(question, answer, tags = "", cohortId = "default-cohort") {
  return db
    .prepare(`INSERT INTO faqs (cohort_id, question, answer, tags) VALUES (?, ?, ?, ?)`)
    .run(cohortId, question, answer, tags);
}

function getAllFaqs(cohortId = "default-cohort") {
  return db.prepare("SELECT * FROM faqs WHERE cohort_id = ?").all(cohortId);
}

/**
 * Builds a compact text block of all FAQs for this cohort, to be
 * injected into the Claude prompt as grounding context.
 */
function getFaqContextBlock(cohortId = "default-cohort") {
  const faqs = getAllFaqs(cohortId);
  if (faqs.length === 0) return "(No FAQ entries have been added yet.)";
  return faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");
}

module.exports = { addFaq, getAllFaqs, getFaqContextBlock };
