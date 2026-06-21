// ═══════════════════════════════════════════════════════════════════
// FEATURE: MODERATION
// Two-layer approach: (1) instant, free, rule-based pre-filter for
// obvious spam, (2) AI judgment for anything ambiguous — e.g. an
// off-topic but not-spam message, or a heated conversation that
// needs gentle redirection rather than deletion.
// ═══════════════════════════════════════════════════════════════════
const claude = require("../ai/claudeClient");
const { quickSpamCheck } = require("../utils/spamDetector");
const { sendText } = require("../whatsapp/sender");
const config = require("../config/config");
const logger = require("../utils/logger");

const MODERATION_SYSTEM_PROMPT =
  "You are a content moderator for a student community WhatsApp group at a digital " +
  "skills academy. You will be shown one message. Respond with EXACTLY one word: " +
  "'SPAM' if it is spam/scam/unrelated advertising, 'OFFTOPIC' if it is harmless but " +
  "unrelated to learning and could derail the group, or 'OK' if it is a normal, " +
  "appropriate message. Do not explain your answer — respond with only the single word.";

/**
 * Runs full moderation on a message: fast rule-based check first,
 * AI check only if the fast check didn't already flag it.
 * @returns {Promise<{ verdict: "SPAM"|"OFFTOPIC"|"OK", reason: string }>}
 */
async function moderateMessage(messageText) {
  const quick = quickSpamCheck(messageText);
  if (quick.isSpam) {
    return { verdict: "SPAM", reason: quick.reason };
  }

  // Skip an AI call for very short, clearly benign messages (cost/latency optimisation).
  if (messageText.trim().length < 12) {
    return { verdict: "OK", reason: null };
  }

  const aiVerdict = await claude.ask(MODERATION_SYSTEM_PROMPT, messageText, { maxTokens: 8 });
  const cleaned = (aiVerdict || "OK").trim().toUpperCase();

  if (cleaned.includes("SPAM")) return { verdict: "SPAM", reason: "AI flagged as spam" };
  if (cleaned.includes("OFFTOPIC")) return { verdict: "OFFTOPIC", reason: "AI flagged as off-topic" };
  return { verdict: "OK", reason: null };
}

// ── Admin alert rate-limiting ─────────────────────────────────────────
// A spam burst (e.g. 10 messages in 30 seconds) must not generate 10
// separate admin DMs — that itself looks like bot behaviour and floods
// the admin. One alert per group per minute is enough.
const ALERT_COOLDOWN_MS = 60_000;
const lastAlertTime = {}; // keyed by groupId

function shouldSendAlert(groupId) {
  const now = Date.now();
  if (now - (lastAlertTime[groupId] || 0) < ALERT_COOLDOWN_MS) return false;
  lastAlertTime[groupId] = now;
  return true;
}

/**
 * Acts on a moderation verdict: deletes if configured and possible,
 * then notifies admins (rate-limited to one alert per group per minute).
 * @param {import("@whiskeysockets/baileys").WASocket} sock
 * @param {string} groupId
 * @param {object} messageKey - The Baileys message key, needed to delete.
 * @param {{verdict: string, reason: string}} result
 * @param {string} senderNumber
 */
async function actOnVerdict(sock, groupId, messageKey, result, senderNumber) {
  if (result.verdict === "OK") return;

  logger.info({ groupId, senderNumber, verdict: result.verdict, reason: result.reason }, "Moderation flag");

  if (result.verdict === "SPAM" && config.moderation.autoDelete) {
    try {
      await sock.sendMessage(groupId, { delete: messageKey });
      logger.info({ groupId }, "Spam message deleted");
    } catch (err) {
      logger.error(
        { err: err.message },
        "Could not delete message — bot likely isn't a group admin. " +
        "Make the bot's number a group admin in WhatsApp, or leave autoDelete:false " +
        "and handle removals manually using the alerts below."
      );
    }
  }

  // Alert admins — but at most once per group per minute to prevent
  // a spam burst from turning into an alert storm of its own.
  if (!shouldSendAlert(groupId)) {
    logger.info({ groupId }, "Skipping admin alert — within cooldown window");
    return;
  }

  for (const adminNumber of config.adminNumbers) {
    const adminJid = `${adminNumber}@s.whatsapp.net`;
    await sendText(
      sock,
      adminJid,
      `⚠️ Moderation alert in group:\nVerdict: ${result.verdict}\nReason: ${result.reason}\nFrom: ${senderNumber}`
    );
  }
}

module.exports = { moderateMessage, actOnVerdict };
