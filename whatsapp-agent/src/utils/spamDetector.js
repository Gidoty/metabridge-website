// ═══════════════════════════════════════════════════════════════════
// SPAM DETECTOR — fast, free, rule-based first pass. Catches the
// obvious cases without an AI call. Anything ambiguous is left for
// the AI moderation layer (src/features/moderation.js) to judge.
// ═══════════════════════════════════════════════════════════════════
const config = require("../config/config");

function countLinks(text) {
  const matches = text.match(/https?:\/\/\S+/gi);
  return matches ? matches.length : 0;
}

function containsSpamKeyword(text) {
  const lower = text.toLowerCase();
  return config.moderation.spamKeywords.some((kw) => lower.includes(kw.toLowerCase()));
}

/**
 * Quick rule-based check. Returns { isSpam, reason } — reason is null if clean.
 * This does NOT call the AI; it's a fast pre-filter only.
 */
function quickSpamCheck(messageText) {
  if (!messageText || typeof messageText !== "string") {
    return { isSpam: false, reason: null };
  }

  const linkCount = countLinks(messageText);
  if (linkCount > config.moderation.maxLinksPerMessage) {
    return { isSpam: true, reason: `Contains ${linkCount} links (limit ${config.moderation.maxLinksPerMessage})` };
  }

  if (containsSpamKeyword(messageText)) {
    return { isSpam: true, reason: "Matched a known spam keyword" };
  }

  // All-caps shouting with significant length is a common spam pattern.
  const letters = messageText.replace(/[^a-zA-Z]/g, "");
  if (letters.length > 20 && letters === letters.toUpperCase()) {
    return { isSpam: true, reason: "Excessive capitalisation" };
  }

  return { isSpam: false, reason: null };
}

module.exports = { quickSpamCheck, countLinks, containsSpamKeyword };
