// ═══════════════════════════════════════════════════════════════════
// WHATSAPP CONNECTION — establishes and maintains the Baileys session.
// On first run, scan the printed QR code with WhatsApp on the bot's
// phone (Linked Devices → Link a Device). The session is then saved
// to ./data/auth/ and reused on every restart — no repeat scanning
// unless that folder is deleted or the device is unlinked.
// ═══════════════════════════════════════════════════════════════════
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
} = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");
const path = require("path");
const logger = require("../utils/logger");

const AUTH_DIR = path.join(__dirname, "../../data/auth");

// Exponential backoff for reconnects: 5s → 10s → 20s → 40s → 60s cap.
function reconnectDelay(attempt) {
  return Math.min(5000 * Math.pow(2, attempt), 60_000);
}

/**
 * Starts (or restarts, on disconnect) the WhatsApp socket connection.
 * @param {(sock: import("@whiskeysockets/baileys").WASocket, isReconnect: boolean) => void} onReady
 *   Called once the connection is open. isReconnect is false on the very first open.
 * @param {number} [attempt=0] - Internal reconnect counter for backoff.
 */
async function connectToWhatsApp(onReady, attempt = 0) {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: {
      creds: state.creds,
      // Cached signal store reduces decryption overhead and prevents the key
      // churn that can trigger anti-bot heuristics on Meta's servers.
      keys: makeCacheableSignalKeyStore(state.keys, logger.child({ module: "signal-store" })),
    },
    printQRInTerminal: false,
    logger: logger.child({ module: "baileys" }, { level: "warn" }),

    // ── Anti-ban settings ─────────────────────────────────────────────────
    // Do NOT mark the account as online the moment we connect.
    // A real user may open WhatsApp but stay on a different screen for a while.
    markOnlineOnConnect: false,

    // Don't pull full chat history. Requesting history is unusually heavy
    // for a "Web" client and is one of the behaviours Meta flags.
    syncFullHistory: false,

    // Disable link preview generation — it fires outbound HTTP requests for
    // every URL the bot sends, adds latency, and looks mechanical.
    generateHighQualityLinkPreview: false,

    // Keepalive ping every 30 s — maintains the TCP connection without sending
    // visible messages, same as an idle browser tab.
    keepAliveIntervalMs: 30_000,

    // Timeout for the initial WebSocket handshake.
    connectTimeoutMs: 60_000,

    // Realistic browser fingerprint matching a current Chrome desktop session.
    browser: ["Metabridge Assistant", "Chrome", "124.0.0"],
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("\n📱  Scan this QR code with WhatsApp (Linked Devices → Link a Device):\n");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      logger.warn({ statusCode, shouldReconnect, attempt }, "WhatsApp connection closed");

      if (shouldReconnect) {
        const delay = reconnectDelay(attempt);
        logger.info({ delayMs: delay }, "Reconnecting with exponential backoff...");
        setTimeout(() => connectToWhatsApp(onReady, attempt + 1), delay);
      } else {
        logger.error(
          "Logged out from WhatsApp (device unlinked). Delete ./data/auth and restart " +
          "to pair again with a fresh QR code."
        );
      }
    } else if (connection === "open") {
      logger.info("✅ Connected to WhatsApp.");
      onReady(sock, attempt > 0);
    }
  });

  return sock;
}

module.exports = { connectToWhatsApp };
