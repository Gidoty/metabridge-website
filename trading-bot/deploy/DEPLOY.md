# Deploying the bot so it runs 24/7 regardless of your phone

This puts the bot (and its dashboard) on a small always-on server, the
same way Binance's own stop-loss/take-profit orders keep working
whether or not your phone is on. Your phone becomes something you check
in on (via the dashboard and/or Telegram alerts), not something the bot
depends on to keep running.

## 1. Get a VPS

Any small Ubuntu 22.04/24.04 server works. Cheapest reasonable options:
DigitalOcean, Hetzner, Vultr, or AWS Lightsail — all have a ~$5-6/mo
tier which is more than enough (the bot is lightweight). Pick a region
close to Binance's servers (Tokyo/Singapore) if latency matters to you;
for the strategy in this repo (15m+ timeframes) it doesn't meaningfully.

You'll end up with a public IP and root SSH access.

## 2. Initial server setup

SSH in as root, then:

```bash
adduser bot          # creates a non-root user, follow the prompts
usermod -aG sudo bot
ufw allow OpenSSH
ufw enable
```

Log out and back in as `bot` from here on (`ssh bot@<server-ip>`).

## 3. Install prerequisites

```bash
sudo apt update && sudo apt install -y python3 python3-venv python3-pip git
```

## 4. Get the code onto the server

```bash
git clone https://<YOUR_GITHUB_TOKEN>@github.com/Gidoty/metabridge-website.git
cd metabridge-website
git checkout claude/crypto-futures-trading-bot-h5u5c0
cd trading-bot
```

(A GitHub Personal Access Token with `repo` scope is needed since this
is a private repo — generate one at GitHub → Settings → Developer
settings → Personal access tokens.)

## 5. Install dependencies

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 6. Configure

```bash
cp .env.example .env
nano .env
```

Fill in:
- `BINANCE_API_KEY` / `BINANCE_API_SECRET` — start with **testnet** keys
  (https://testnet.binancefuture.com). Keep `USE_TESTNET=true`.
- `DASHBOARD_USERNAME` / `DASHBOARD_PASSWORD` — required; the dashboard
  refuses to start without both.
- Optionally `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` for phone alerts.

## 7. Install the systemd services

These make the bot and dashboard start on boot and auto-restart if they
crash.

```bash
# from trading-bot/
sed "s/<DEPLOY_USER>/bot/g" deploy/trading-bot.service | sudo tee /etc/systemd/system/trading-bot.service
sed "s/<DEPLOY_USER>/bot/g" deploy/trading-bot-dashboard.service | sudo tee /etc/systemd/system/trading-bot-dashboard.service

sudo systemctl daemon-reload
sudo systemctl enable --now trading-bot
sudo systemctl enable --now trading-bot-dashboard
```

(If your Linux username isn't `bot`, or the repo isn't cloned to
`/home/bot/metabridge-website`, edit the two `.service` files to match
before copying them — they hardcode `WorkingDirectory`, `EnvironmentFile`,
and `ExecStart` paths.)

Check they're running:

```bash
sudo systemctl status trading-bot
sudo systemctl status trading-bot-dashboard
journalctl -u trading-bot -f          # live bot log
journalctl -u trading-bot-dashboard -f
```

## 8. Reach the dashboard from your phone

The dashboard binds to `127.0.0.1` only by default — it is **not**
reachable from the internet as-is, on purpose. Two ways to actually get
to it from your phone:

### Option A — SSH tunnel (quick, zero extra setup)

Using an SSH client app on your phone (e.g. Termius, or Termux with
`openssh`):

```bash
ssh -L 8080:127.0.0.1:8080 bot@<server-ip>
```

Then open `http://127.0.0.1:8080` in your phone's browser while the
tunnel is connected. Downside: you have to reopen the tunnel each time,
so it's not a tap-the-icon experience.

### Option B — real HTTPS URL (recommended if you want it "like an app")

This is what makes "Add to Home Screen" actually behave like an app icon.
You need a domain name pointing at the server — a free one from
[DuckDNS](https://www.duckdns.org) works fine if you don't have one.

```bash
sudo apt install -y caddy   # see https://caddyserver.com/docs/install if not in apt
```

Edit `/etc/caddy/Caddyfile`:

```
yourdomain.duckdns.org {
    reverse_proxy 127.0.0.1:8080
}
```

```bash
sudo systemctl restart caddy
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

Caddy automatically provisions and renews a Let's Encrypt HTTPS
certificate. Visit `https://yourdomain.duckdns.org` on your phone, log
in with your dashboard username/password, then use your browser's
"Add to Home Screen" — it'll behave like a standalone app icon, using
the manifest and icon already built into the dashboard.

**Never open port 8080 directly to the internet** — it has no TLS, so
your dashboard password would travel in plaintext. Always go through
Option A or B.

## 9. Updating the bot later

```bash
cd ~/metabridge-website
git pull origin claude/crypto-futures-trading-bot-h5u5c0
cd trading-bot
source venv/bin/activate
pip install -r requirements.txt
sudo systemctl restart trading-bot trading-bot-dashboard
```

## Before you go anywhere near live trading

Re-read the risk settings in `.env` (`RISK_PER_TRADE_PCT`,
`MAX_LEVERAGE`, `DAILY_LOSS_LIMIT_PCT`) and confirm the backtest and
testnet results actually look reasonable — none of this deployment
tooling makes the strategy itself any safer or more profitable.
