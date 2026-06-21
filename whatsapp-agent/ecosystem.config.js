// ═══════════════════════════════════════════════════════════════════
// PM2 ECOSYSTEM CONFIG — production process management.
//
// Install PM2 globally once:
//   npm install -g pm2
//
// First-time start (inside whatsapp-agent/):
//   pm2 start ecosystem.config.js
//
// To make PM2 survive a server reboot:
//   pm2 startup          ← follow the printed command
//   pm2 save
//
// Other useful commands:
//   pm2 logs metabridge-bot      ← tail live logs
//   pm2 status                   ← health overview
//   pm2 restart metabridge-bot   ← rolling restart (no downtime)
//   pm2 stop metabridge-bot      ← graceful stop (sends SIGINT)
//   pm2 delete metabridge-bot    ← remove from PM2 process list
// ═══════════════════════════════════════════════════════════════════

module.exports = {
  apps: [
    {
      name: "metabridge-bot",
      script: "src/index.js",

      // MUST be 1. Running more than one instance would open multiple
      // Baileys sessions from the same auth state and corrupt the session.
      instances: 1,

      // Never restart on file changes — watch mode is for development only.
      // In production, deploy changes manually and do `pm2 restart`.
      watch: false,

      // Restart automatically on crash. The exponential backoff prevents a
      // crash loop from hammering WhatsApp's servers (another ban trigger).
      autorestart: true,
      exp_backoff_restart_delay: 100, // starts at 100 ms, doubles each time
      max_restarts: 15,

      // If the process exits faster than this on startup, PM2 counts it as
      // an unstable restart rather than a normal one. 30 seconds is plenty
      // for the Baileys handshake and DB init to complete.
      min_uptime: "30s",

      // Restart if memory climbs above 512 MB — Baileys can leak memory over
      // very long uptimes on busy groups. PM2 will restart cleanly.
      max_memory_restart: "512M",

      // Environment for production runs.
      env: {
        NODE_ENV: "production",
        // .env is still loaded by dotenv in src/index.js — this just sets
        // NODE_ENV so the logger skips pino-pretty and writes raw JSON.
      },

      // Log files — PM2 writes stdout/stderr here. Rotate with pm2-logrotate
      // (npm install -g pm2-logrotate) to avoid unbounded disk usage.
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,

      // Graceful shutdown: PM2 sends SIGINT on `pm2 stop`. The process has
      // this many milliseconds to flush the DB and exit before PM2 force-kills.
      kill_timeout: 5000,
    },
  ],
};
