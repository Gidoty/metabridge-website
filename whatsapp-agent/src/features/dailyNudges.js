// ═══════════════════════════════════════════════════════════════════
// FEATURE: DAILY LEARNING NUDGES
// Sends one short "today's concept" style message per day per group.
// Pulls from a queue of pre-written nudges (the `nudges` table) if
// available; otherwise asks Claude to generate one, so admins never
// have to pre-write every single day's content by hand.
// ═══════════════════════════════════════════════════════════════════
const db = require("../db/db");
const claude = require("../ai/claudeClient");
const { sendText } = require("../whatsapp/sender");
const config = require("../config/config");
const logger = require("../utils/logger");

function getNextQueuedNudge(cohortId) {
  return db
    .prepare("SELECT * FROM nudges WHERE cohort_id = ? AND used = 0 ORDER BY id ASC LIMIT 1")
    .get(cohortId);
}

function markNudgeUsed(nudgeId) {
  return db.prepare("UPDATE nudges SET used = 1 WHERE id = ?").run(nudgeId);
}

const NUDGE_GENERATION_PROMPT =
  "You write short, engaging daily learning nudges for a WhatsApp student group at a " +
  "digital skills academy (cybersecurity, data analytics, AI/prompt engineering, " +
  "blockchain). Write ONE nudge: a single interesting concept explained simply in " +
  "3-5 sentences, friendly and motivating in tone, suitable to post as-is in a " +
  "WhatsApp group. Do not include a greeting or sign-off — just the content.";

async function generateFallbackNudge(moduleTag) {
  const topicHint = moduleTag
    ? `Focus on a concept relevant to: ${moduleTag}.`
    : "Choose any foundational concept across the academy's subjects.";
  return claude.ask(NUDGE_GENERATION_PROMPT, topicHint, { maxTokens: 300 });
}

/**
 * Sends today's nudge to every managed group with dailyNudges enabled.
 * Prefers a pre-written, admin-curated nudge from the queue; falls
 * back to AI generation only if the queue is empty.
 */
async function sendDailyNudges(sock) {
  for (const group of config.managedGroups) {
    if (!group.features.dailyNudges || !group.groupId) continue;

    const queued = getNextQueuedNudge(group.cohortId);
    let content;

    if (queued) {
      content = queued.content;
      markNudgeUsed(queued.id);
    } else {
      content = await generateFallbackNudge(null);
      if (!content) {
        logger.warn({ group: group.label }, "Could not generate fallback nudge — skipping today");
        continue;
      }
    }

    await sendText(sock, group.groupId, `💡 *Today's concept:*\n\n${content}`);
  }
}

module.exports = { sendDailyNudges };
