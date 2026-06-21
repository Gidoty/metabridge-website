// ═══════════════════════════════════════════════════════════════════
// FEATURE: FAQ ANSWERING
// Detects when a group message is a question directed at the bot
// (mention or trigger phrase) and answers it, grounded in the
// cohort's stored FAQ entries so it doesn't invent policy details.
// ═══════════════════════════════════════════════════════════════════
const claude = require("../ai/claudeClient");
const { getFaqContextBlock } = require("../db/models/faqs");
const { sendText } = require("../whatsapp/sender");
const config = require("../config/config");
const logger = require("../utils/logger");

const TRIGGER_PATTERNS = [
  /^@?assistant\b/i,
  /^@?bot\b/i,
  /^hey metabridge\b/i,
];

/**
 * Returns true if this message looks like it's directed at the bot.
 * Combine with botJid mention-detection upstream in messageHandler.js
 * for full accuracy (Baileys exposes mentionedJid on the message).
 */
function isDirectedAtBot(text) {
  if (!text) return false;
  return TRIGGER_PATTERNS.some((re) => re.test(text.trim()));
}

function stripTrigger(text) {
  let cleaned = text.trim();
  for (const re of TRIGGER_PATTERNS) {
    cleaned = cleaned.replace(re, "").trim();
  }
  return cleaned.replace(/^[,:\-\s]+/, "");
}

/**
 * Handles a single FAQ-style question and sends the answer back to the group.
 * @param {import("@whiskeysockets/baileys").WASocket} sock
 * @param {string} groupId
 * @param {string} questionText
 * @param {string} cohortId
 */
async function handleFaqQuestion(sock, groupId, questionText, cohortId) {
  const question = stripTrigger(questionText);
  if (!question) return;

  const faqContext = getFaqContextBlock(cohortId);
  const systemPrompt =
    config.ai.faqSystemPrompt +
    "\n\nHere is the academy's current FAQ knowledge base for this cohort:\n\n" +
    faqContext +
    "\n\nUse this knowledge base as your primary source of truth. If the question " +
    "isn't covered by it and you aren't otherwise confident, say you're not sure " +
    "and suggest asking an instructor — do not guess at policy, prices, or dates.";

  const answer = await claude.ask(systemPrompt, question);

  if (!answer) {
    logger.warn({ groupId, question }, "FAQ answer generation failed");
    return;
  }

  await sendText(sock, groupId, answer);
}

module.exports = { isDirectedAtBot, handleFaqQuestion, stripTrigger };
