// ═══════════════════════════════════════════════════════════════════
// METABRIDGE WHATSAPP AGENT — CENTRAL CONFIGURATION
// Edit this file to control which groups the bot manages, when it
// sends scheduled messages, and who its admins are. No other file
// should need editing for day-to-day operation.
// ═══════════════════════════════════════════════════════════════════
require("dotenv").config();

module.exports = {
  // ── Bot identity ──────────────────────────────────────────────
  botName: "Metabridge Assistant",

  // ── Admin phone numbers (WhatsApp format: countrycode + number, no +) ──
  // These numbers can issue admin commands to the bot in DM (e.g. !broadcast, !addmaterial)
  adminNumbers: (process.env.ADMIN_NUMBERS || "")
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean),

  // ── Groups the bot actively manages ──────────────────────────────
  // groupId is the WhatsApp group JID, e.g. "123456789-1234567890@g.us"
  // Find it by running the bot once and checking logs when a message
  // arrives in the target group (see README "Finding a Group ID").
  managedGroups: [
    {
      groupId: process.env.COHORT_GROUP_ID || "",
      label: "Current Cohort — Main Group",
      cohortId: "default-cohort",
      features: {
        dailyNudges: true,
        faqAnswering: true,
        moderation: true,
        reminders: true,
        summarization: true,
        materialSharing: true,
      },
    },
  ],

  // ── Scheduling (cron syntax, server-local timezone — see TIMEZONE below) ──
  schedule: {
    timezone: process.env.TIMEZONE || "Africa/Lagos",
    dailyNudge: "0 8 * * *",        // 8:00 AM every day
    deadlineCheck: "0 9,17 * * *",  // 9 AM and 5 PM — checks for deadlines due soon
    lectureReminderOffsetMins: 60,  // remind students 60 minutes before a lecture
    weeklySummary: "0 18 * * 0",    // 6 PM every Sunday — weekly group digest
  },

  // ── Moderation settings ──────────────────────────────────────────
  moderation: {
    enabled: true,
    // Messages matching these patterns are auto-flagged for review/removal.
    // Kept intentionally simple and editable — the AI moderation layer
    // (src/features/moderation.js) handles nuanced cases beyond these.
    spamKeywords: ["click here", "forex", "crypto signal", "investment opportunity", "work from home guaranteed"],
    maxLinksPerMessage: 2,
    // If true, the bot DELETES flagged messages (requires the bot account
    // to be a group admin in WhatsApp). If false, it only alerts admins.
    autoDelete: false,
    autoDeleteRequiresGroupAdmin: true,
  },

  // ── Rate limiting / human-like behaviour (IMPORTANT for account safety) ──
  // Baileys connects as an unofficial client. Sending messages too fast or
  // too mechanically is the single biggest cause of numbers getting banned.
  // Do not remove these delays without understanding the risk (see README).
  rateLimit: {
    minDelayMs: 1500,   // minimum pause before sending any message
    maxDelayMs: 4000,   // randomised up to this, to look human
    maxMessagesPerMinute: 8,
  },

  // ── AI (Claude) settings ──────────────────────────────────────────
  ai: {
    model: "claude-sonnet-4-6",
    maxTokens: 1024,
    // System behaviour for FAQ answering — edit freely for your tone.
    faqSystemPrompt:
      "You are the Metabridge Academy community assistant inside a student WhatsApp group. " +
      "Answer questions about course content, schedules, and academy policy clearly and " +
      "briefly (WhatsApp messages should rarely exceed 6-8 lines). If you are not confident " +
      "in an answer, say so plainly and suggest the student ask an instructor directly — " +
      "never invent a deadline, price, or policy detail you are not certain of.",
  },

  // ── Database ──────────────────────────────────────────────────────
  dbPath: process.env.DB_PATH || "./data/metabridge.db",
};
