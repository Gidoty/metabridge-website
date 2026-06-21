// ═══════════════════════════════════════════════════════════════════
// FEATURE: MATERIAL SHARING
// Students can request materials with "!materials [module]" or
// "!materials" for a full list. Admins add materials via the admin
// command handler (see src/whatsapp/messageHandler.js).
// ═══════════════════════════════════════════════════════════════════
const { searchMaterials, getAllMaterials, getMaterialsByModule } = require("../db/models/materials");
const { sendText, sendDocument } = require("../whatsapp/sender");
const logger = require("../utils/logger");

function formatMaterialList(materials) {
  if (materials.length === 0) return "No materials found matching that request.";
  return materials
    .map((m, i) => {
      const tag = m.module_tag ? ` [${m.module_tag}]` : "";
      const link = m.link_url
        ? `\n   🔗 ${m.link_url}`
        : m.file_path
        ? `\n   📎 (file — reply "!get ${m.id}" to receive it)`
        : "";
      return `${i + 1}. *${m.title}*${tag}${link}`;
    })
    .join("\n\n");
}

/**
 * Handles a "!materials [optional module/keyword]" request.
 * @param {import("@whiskeysockets/baileys").WASocket} sock
 * @param {string} groupId
 * @param {string} query - Text after the command, may be empty.
 * @param {string} cohortId
 */
async function handleMaterialsRequest(sock, groupId, query, cohortId) {
  const trimmed = (query || "").trim();
  let results;

  if (!trimmed) {
    results = getAllMaterials(cohortId);
  } else {
    results = getMaterialsByModule(trimmed, cohortId);
    if (results.length === 0) results = searchMaterials(trimmed, cohortId);
  }

  await sendText(sock, groupId, `📚 *Course Materials*\n\n${formatMaterialList(results)}`);
}

/**
 * Handles a "!get [materialId]" request to receive an actual file.
 */
async function handleGetMaterialFile(sock, groupId, materialId, cohortId) {
  const all = getAllMaterials(cohortId);
  const material = all.find((m) => String(m.id) === String(materialId));

  if (!material) {
    await sendText(sock, groupId, "Couldn't find that material — check the number with !materials first.");
    return;
  }

  if (!material.file_path) {
    await sendText(sock, groupId, `"${material.title}" is a link, not a file: ${material.link_url}`);
    return;
  }

  try {
    await sendDocument(sock, groupId, material.file_path, `${material.title}.pdf`, material.description || "");
  } catch (err) {
    logger.error({ err: err.message }, "Failed to send material file");
    await sendText(sock, groupId, "Sorry, something went wrong sending that file. An admin has been notified.");
  }
}

module.exports = { handleMaterialsRequest, handleGetMaterialFile };
