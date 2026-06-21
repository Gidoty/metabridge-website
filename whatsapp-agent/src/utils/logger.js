// ═══════════════════════════════════════════════════════════════════
// LOGGER — thin wrapper so every module logs consistently.
// In development (NODE_ENV != "production") logs are pretty-printed
// with colours. In production, raw JSON is written to stdout so PM2
// can capture it cleanly without the pino-pretty worker overhead.
// ═══════════════════════════════════════════════════════════════════
const pino = require("pino");

const isProd = process.env.NODE_ENV === "production";

const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
  },
  isProd
    ? undefined // production: raw JSON to stdout, captured by PM2
    : pino.transport({
        target: "pino-pretty",
        options: { colorize: true, translateTime: "SYS:HH:MM:ss", ignore: "pid,hostname" },
      })
);

module.exports = logger;
