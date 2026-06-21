// ═══════════════════════════════════════════════════════════════════
// FEATURE: SUMMARISATION
// Two triggers: (1) scheduled weekly digest (cron), and (2) on-demand
// — any group member can type "!summary" to get a recap of the last
// 24 hours, handled in messageHandler.js.
// ═══════════════════════════════════════════════════════════════════
const claude = require("../ai/claudeClient");
const { getRecentTranscript, pruneOldMessages } = require("../db/models/messageLog");
const { sendText } = require("../whatsapp/sender");
const config = require("../config/config");
const logger = require("../utils/logger");

const SUMMARY_SYSTEM_PROMPT =
  "You summarise WhatsApp group conversations from a student community at a digital " +
  "skills academy. Produce a short summary as a WhatsApp message: 3-6 bullet points " +
  "covering the key topics discussed, any unresolved questions, and any decisions or " +
  "announcements made. Be concise — this is read on a phone. Do not include every " +
  "message, only what genuinely matters.";

/**
 * Generates and sends a summary of recent group activity.
 * @param {import("@whiskeysockets/baileys").WASocket} sock
 * @param {string} groupId
 * @param {number} sinceHours - How far back to summarise.
 */
async function sendGroupSummary(sock, groupId, sinceHours = 24) {
  const transcript = getRecentTranscript(groupId, sinceHours);

  if (!transcript || transcript.trim().length < 30) {
    await sendText(sock, groupId, "Not enough recent conversation to summarise yet.");
    return;
  }

  const summary = await claude.ask(SUMMARY_SYSTEM_PROMPT, transcript, { maxTokens: 500 });

  if (!summary) {
    logger.warn({ groupId }, "Summary generation failed");
    return;
  }

  const label = sinceHours <= 24 ? "Last 24 Hours" : `Last ${Math.round(sinceHours / 24)} Days`;
  await sendText(sock, groupId, `📋 *Group Summary — ${label}*\n\n${summary}`);
}

/**
 * Weekly digest job — summarises the last 7 days for every managed
 * group with summarisation enabled, then prunes old logged messages.
 */
async function sendWeeklyDigests(sock) {
  for (const group of config.managedGroups) {
    if (!group.features.summarization || !group.groupId) continue;
    await sendGroupSummary(sock, group.groupId, 24 * 7);
  }
  pruneOldMessages(14);
  logger.info("Weekly digests sent and old messages pruned.");
}

module.exports = { sendGroupSummary, sendWeeklyDigests };
