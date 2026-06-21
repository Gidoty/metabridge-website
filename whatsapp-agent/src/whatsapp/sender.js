// ═══════════════════════════════════════════════════════════════════
// SENDER — every outgoing message goes through here, never directly
// through sock.sendMessage(). This file is the primary account-safety
// layer: typing simulation, randomised human-like delays, and a hard
// cap on messages per minute. Do not bypass this layer.
// ═══════════════════════════════════════════════════════════════════
const config = require("../config/config");
const logger = require("../utils/logger");

let sentTimestamps = []; // sliding window for the per-minute cap

function randomDelay() {
  const { minDelayMs, maxDelayMs } = config.rateLimit;
  return Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForRateLimitSlot() {
  const now = Date.now();
  sentTimestamps = sentTimestamps.filter((t) => now - t < 60_000);

  if (sentTimestamps.length >= config.rateLimit.maxMessagesPerMinute) {
    const oldestInWindow = sentTimestamps[0];
    const waitMs = 60_000 - (now - oldestInWindow) + 250;
    logger.warn({ waitMs }, "Rate limit reached — pausing before next send");
    await sleep(waitMs);
  }
}

/**
 * Simulate a human typing the message before sending it.
 *
 * This is the single most effective anti-ban measure beyond rate-limiting.
 * WhatsApp clients emit a "composing" presence when a user starts typing and
 * "paused" when they stop. Skipping this makes every outgoing message appear
 * to materialise instantly with no prior typing signal — a strong bot tell.
 *
 * Typing duration is proportional to message length (≈60 chars/sec), capped
 * at 8 seconds so no single message blocks the send queue too long.
 */
async function simulateTyping(sock, jid, messageLength) {
  try {
    const typingMs = Math.min(Math.max(1000, messageLength * 17), 8000);
    await sock.sendPresenceUpdate("composing", jid);
    await sleep(typingMs);
    await sock.sendPresenceUpdate("paused", jid);
    // Small gap after "paused" before the message arrives — real users have
    // a brief moment between stopping typing and pressing send.
    await sleep(300 + Math.random() * 400);
  } catch {
    // Presence updates are best-effort. A failure here must never block sending.
  }
}

/**
 * Send a plain text message to a chat (group or individual).
 * @param {import("@whiskeysockets/baileys").WASocket} sock
 * @param {string} jid - The WhatsApp JID (group or individual chat ID).
 * @param {string} text
 */
async function sendText(sock, jid, text) {
  await waitForRateLimitSlot();
  await sleep(randomDelay());
  await simulateTyping(sock, jid, text.length);

  try {
    await sock.sendMessage(jid, { text });
    sentTimestamps.push(Date.now());
    logger.info({ jid, preview: text.slice(0, 60) }, "Message sent");
  } catch (err) {
    logger.error({ jid, err: err.message }, "Failed to send message");
  }
}

/**
 * Send a document/file (e.g. a course material PDF).
 * @param {import("@whiskeysockets/baileys").WASocket} sock
 * @param {string} jid
 * @param {string} filePath - Absolute path to the file.
 * @param {string} fileName - Display name for the file.
 * @param {string} [caption]
 */
async function sendDocument(sock, jid, filePath, fileName, caption = "") {
  await waitForRateLimitSlot();
  await sleep(randomDelay());
  // Brief composing window before the attachment arrives — mirrors how the
  // WhatsApp client shows "sending…" for a moment before a file appears.
  await simulateTyping(sock, jid, 40);

  try {
    await sock.sendMessage(jid, {
      document: { url: filePath },
      fileName,
      caption,
      mimetype: "application/octet-stream",
    });
    sentTimestamps.push(Date.now());
    logger.info({ jid, fileName }, "Document sent");
  } catch (err) {
    logger.error({ jid, fileName, err: err.message }, "Failed to send document");
  }
}

module.exports = { sendText, sendDocument };
