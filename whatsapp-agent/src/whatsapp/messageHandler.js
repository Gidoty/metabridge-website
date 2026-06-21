// ═══════════════════════════════════════════════════════════════════
// MESSAGE HANDLER — the router. Every incoming message passes through
// here. It decides: is this an admin command? A student command?
// A question for the FAQ feature? Or just normal chat to log and
// moderate? This is the file to extend if you add a 7th feature.
// ═══════════════════════════════════════════════════════════════════
const config = require("../config/config");
const logger = require("../utils/logger");
const { sendText } = require("./sender");

const { isDirectedAtBot, handleFaqQuestion } = require("../features/faqAnswering");
const { moderateMessage, actOnVerdict } = require("../features/moderation");
const { sendGroupSummary } = require("../features/summarization");
const { handleMaterialsRequest, handleGetMaterialFile } = require("../features/materialSharing");
const { logMessage } = require("../db/models/messageLog");
const { addMaterial } = require("../db/models/materials");
const { addDeadline, addLecture } = require("../db/models/deadlines");
const { addFaq } = require("../db/models/faqs");
const { upsertStudent } = require("../db/models/students");

function getGroupConfig(groupId) {
  return config.managedGroups.find((g) => g.groupId === groupId);
}

function isAdmin(phoneNumber) {
  return config.adminNumbers.includes(phoneNumber);
}

/** Extracts plain text from a Baileys message object, across message types. */
function extractText(msg) {
  return (
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    msg.message?.imageMessage?.caption ||
    msg.message?.videoMessage?.caption ||
    ""
  );
}

// ── Admin commands (DM only) ──────────────────────────────────────
// Format: !command|field1|field2|...  (pipe-separated to keep parsing simple
// and avoid ambiguity with natural commas/text in titles and descriptions)
async function handleAdminCommand(sock, senderNumber, text) {
  const replyTo = `${senderNumber}@s.whatsapp.net`;
  const [command, ...rest] = text.trim().split("|").map((s) => s.trim());

  try {
    switch (command.toLowerCase()) {
      case "!addmaterial": {
        const [title, description, filePathOrLink, moduleTag] = rest;
        const isLink = filePathOrLink && filePathOrLink.startsWith("http");
        addMaterial({
          title,
          description,
          filePath: isLink ? null : filePathOrLink,
          linkUrl: isLink ? filePathOrLink : null,
          moduleTag,
          addedBy: senderNumber,
        });
        await sendText(sock, replyTo, `✅ Material added: "${title}"`);
        break;
      }
      case "!adddeadline": {
        const [title, description, dueAtIso] = rest;
        addDeadline({ title, description, dueAt: dueAtIso });
        await sendText(sock, replyTo, `✅ Deadline added: "${title}" due ${dueAtIso}`);
        break;
      }
      case "!addlecture": {
        const [title, startsAtIso, linkUrl] = rest;
        addLecture({ title, startsAt: startsAtIso, linkUrl });
        await sendText(sock, replyTo, `✅ Lecture added: "${title}" at ${startsAtIso}`);
        break;
      }
      case "!addfaq": {
        const [question, answer, tags] = rest;
        addFaq(question, answer, tags || "");
        await sendText(sock, replyTo, `✅ FAQ added: "${question}"`);
        break;
      }
      case "!broadcast": {
        const [messageText] = rest;
        for (const group of config.managedGroups) {
          if (!group.groupId) continue;
          await sendText(sock, group.groupId, messageText);
        }
        await sendText(sock, replyTo, "✅ Broadcast sent to all managed groups.");
        break;
      }
      case "!help": {
        await sendText(
          sock,
          replyTo,
          "Admin commands (DM only):\n" +
            "!addmaterial|Title|Description|FilePathOrURL|ModuleTag\n" +
            "!adddeadline|Title|Description|2026-07-01T23:59:00\n" +
            "!addlecture|Title|2026-07-01T18:00:00|https://zoom.link\n" +
            "!addfaq|Question|Answer|tag1,tag2\n" +
            "!broadcast|Message to send to all groups"
        );
        break;
      }
      default:
        await sendText(sock, replyTo, `Unknown command "${command}". Send !help for the list.`);
    }
  } catch (err) {
    logger.error({ err: err.message, command }, "Admin command failed");
    await sendText(sock, replyTo, `❌ Command failed: ${err.message}`);
  }
}

// ── Student/group commands ──────────────────────────────────────
async function handleGroupCommand(sock, groupId, cohortId, command, argText) {
  switch (command.toLowerCase()) {
    case "!materials":
      await handleMaterialsRequest(sock, groupId, argText, cohortId);
      return true;
    case "!get":
      await handleGetMaterialFile(sock, groupId, argText.trim(), cohortId);
      return true;
    case "!summary":
      await sendGroupSummary(sock, groupId, 24);
      return true;
    default:
      return false;
  }
}

/**
 * Main entry point — call this from index.js for every incoming message.
 * @param {import("@whiskeysockets/baileys").WASocket} sock
 * @param {object} msg - A single message from messages.upsert
 */
async function handleIncomingMessage(sock, msg) {
  if (!msg.message || msg.key.fromMe) return;

  const text = extractText(msg).trim();
  if (!text) return;

  const remoteJid = msg.key.remoteJid;
  const isGroup = remoteJid.endsWith("@g.us");
  const senderNumber = (isGroup ? msg.key.participant : remoteJid)?.split("@")[0];

  // ── DM admin commands ──────────────────────────────────────
  if (!isGroup) {
    if (isAdmin(senderNumber) && text.startsWith("!")) {
      await handleAdminCommand(sock, senderNumber, text);
    }
    return; // bot does not otherwise respond to random DMs
  }

  // ── Group messages ──────────────────────────────────────
  const groupConfig = getGroupConfig(remoteJid);
  if (!groupConfig) return; // not a managed group — ignore entirely

  const senderName = msg.pushName || senderNumber;
  upsertStudent(senderNumber, senderName, groupConfig.cohortId);

  // Slash-style commands take priority over moderation/FAQ logic.
  if (text.startsWith("!")) {
    const [command, ...argParts] = text.split(" ");
    const argText = argParts.join(" ");
    const handled = await handleGroupCommand(sock, remoteJid, groupConfig.cohortId, command, argText);
    if (handled) return;
  }

  // Log every non-command message for the summarisation feature.
  logMessage(remoteJid, senderNumber, senderName, text);

  // Moderation (if enabled for this group).
  if (groupConfig.features.moderation && config.moderation.enabled) {
    const result = await moderateMessage(text);
    if (result.verdict !== "OK") {
      await actOnVerdict(sock, remoteJid, msg.key, result, senderNumber);
      if (result.verdict === "SPAM") return; // don't also treat it as an FAQ question
    }
  }

  // FAQ answering — only if the message is clearly directed at the bot.
  if (groupConfig.features.faqAnswering && isDirectedAtBot(text)) {
    await handleFaqQuestion(sock, remoteJid, text, groupConfig.cohortId);
  }
}

module.exports = { handleIncomingMessage };
