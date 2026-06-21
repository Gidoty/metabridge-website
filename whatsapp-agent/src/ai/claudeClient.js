// ═══════════════════════════════════════════════════════════════════
// CLAUDE CLIENT — single shared wrapper around the Anthropic SDK.
// Every AI-powered feature (FAQ answering, summarisation, moderation
// judgment, nudge generation) calls through this file so model
// settings and error handling stay consistent in one place.
// ═══════════════════════════════════════════════════════════════════
const Anthropic = require("@anthropic-ai/sdk");
const config = require("../config/config");
const logger = require("../utils/logger");

if (!process.env.ANTHROPIC_API_KEY) {
  logger.warn(
    "ANTHROPIC_API_KEY is not set. AI features (FAQ answering, summarisation, " +
    "moderation judgment, nudge generation) will not work until it is added to .env"
  );
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * Send a single-turn request to Claude and return the plain text reply.
 * @param {string} systemPrompt - System instructions for this call.
 * @param {string} userMessage - The user-turn content.
 * @param {object} [opts] - Optional overrides: maxTokens, model.
 * @returns {Promise<string|null>} The text response, or null on failure.
 */
async function ask(systemPrompt, userMessage, opts = {}) {
  try {
    const response = await client.messages.create({
      model: opts.model || config.ai.model,
      max_tokens: opts.maxTokens || config.ai.maxTokens,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    return textBlock ? textBlock.text.trim() : null;
  } catch (err) {
    logger.error({ err: err.message }, "Claude API call failed");
    return null;
  }
}

module.exports = { ask };
