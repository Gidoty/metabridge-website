# Metabridge WhatsApp Community Engagement Agent

A WhatsApp bot for Metabridge Academy's student community groups. It:

- 💡 Sends daily learning nudges ("Today's concept: hashing explained simply…")
- ❓ Answers FAQs inside the group, grounded in your own FAQ knowledge base
- 🛡️ Moderates discussions (flags/removes spam, alerts admins)
- ⏰ Reminds students of deadlines and upcoming assignments
- 📋 Summarises long group chats into a short digest (on-demand or weekly)
- 📚 Shares course materials and lecture reminders on request

It connects to WhatsApp using **Baileys**, an unofficial library — there is no
Meta Business approval process and no per-message cost, but read the **Account
Safety** section below before you connect a real number.

---

## ⚠️ Read This First: Account Safety

Baileys connects as an unofficial WhatsApp Web client. WhatsApp can detect and
ban numbers that behave like bots. This project includes built-in protections,
but they only help if you also follow these rules:

1. **Use a dedicated number, not your main admission/support number.** Buy or
   repurpose a separate SIM for this bot. If it ever gets banned, your real
   business number is untouched.
2. **Don't remove the rate-limiting in `src/whatsapp/sender.js`.** It adds
   randomised human-like delays and caps messages per minute. This is the
   single biggest factor in whether a number survives.
3. **Start in one group, not ten.** Run it in your main cohort group for a
   couple of weeks before expanding — this gives you a real read on stability.
4. **Auto-delete is OFF by default** (`config.moderation.autoDelete = false`).
   Turning it on requires the bot's number to be a **group admin**, and a
   bot account actively deleting messages is exactly the kind of behaviour
   that draws WhatsApp's attention fastest. Consider leaving it off and just
   using the admin alerts to manually remove spam yourself at first.

None of this guarantees the number won't ever be flagged — it's an unofficial
integration, and that risk doesn't fully go away. If your community grows large
or this becomes mission-critical, migrating to the official WhatsApp Business
Cloud API later is the long-term-safe path (a bigger lift: Meta business
verification + cost per conversation, but no ban risk).

---

## Project Structure

```
src/
├── index.js              Entry point — start here to understand the flow
├── config/config.js       ALL settings live here: groups, schedule, admins
├── whatsapp/
│   ├── connection.js       Baileys session management (QR pairing, reconnects)
│   ├── messageHandler.js   Routes every incoming message to the right feature
│   └── sender.js            Rate-limited outgoing messages (account safety)
├── features/                One file per capability — see Architecture below
├── ai/claudeClient.js       Shared Claude API wrapper
├── db/                       SQLite schema, connection, and per-table models
├── scheduler/cronJobs.js     Wires daily/weekly jobs to node-cron
└── utils/                    Logger and the rule-based spam pre-filter
```

---

## Setup

### 1. Prerequisites

- Node.js 20 or later
- An Anthropic API key — https://console.anthropic.com
- A dedicated WhatsApp number (see Account Safety above) with WhatsApp
  installed on a phone you control

### 2. Install

```bash
cd metabridge-whatsapp-agent
npm install
```

### 3. Configure

```bash
cp .env.example .env
```

Edit `.env`:
- `ANTHROPIC_API_KEY` — your Claude API key
- `ADMIN_NUMBERS` — your phone number(s), comma-separated, digits only
  (e.g. `2348012345678`)
- `TIMEZONE` — defaults to `Africa/Lagos`, change if needed

Leave `COHORT_GROUP_ID` blank for now — see step 5.

### 4. First run — link the WhatsApp account

```bash
npm start
```

A QR code prints in your terminal. On the bot's phone:
**WhatsApp → Settings → Linked Devices → Link a Device** → scan it.

Once connected you'll see `✅ Connected to WhatsApp.` in the logs. The session
is saved to `data/auth/` and reused automatically on every future restart —
you only scan once, unless that folder is deleted or you unlink the device.

### 5. Finding a Group ID

With the bot running and connected, send any message in your target WhatsApp
group from your own phone. Watch the terminal logs — `messageHandler.js` logs
won't show it by default, so temporarily add this line near the top of
`handleIncomingMessage` in `src/whatsapp/messageHandler.js`:

```js
console.log("Group JID:", msg.key.remoteJid);
```

Copy the printed JID (looks like `123456789012345678@g.us`) into `.env` as
`COHORT_GROUP_ID`, then remove the console.log line and restart.

### 6. Add your bot as a group participant

Add the bot's WhatsApp number to your cohort group like any normal member. For
auto-delete moderation to work, it additionally needs to be made a **group
admin** (Group Info → tap the bot → Make Group Admin).

---

## Admin Commands

Sent as a **direct message** to the bot from a number listed in
`ADMIN_NUMBERS`. Fields are pipe-separated (`|`) to avoid ambiguity with
commas in normal text.

| Command | Format |
|---|---|
| Add material | `!addmaterial\|Title\|Description\|FilePathOrURL\|ModuleTag` |
| Add deadline | `!adddeadline\|Title\|Description\|2026-07-01T23:59:00` |
| Add lecture | `!addlecture\|Title\|2026-07-01T18:00:00\|https://zoom.link` |
| Add FAQ entry | `!addfaq\|Question\|Answer\|tag1,tag2` |
| Broadcast to all groups | `!broadcast\|Your message here` |
| List commands | `!help` |

Dates use ISO 8601 format (`YYYY-MM-DDTHH:MM:SS`) in the timezone set in `.env`.

## Student Commands (inside the group)

| Command | What it does |
|---|---|
| `@bot your question` or `hey metabridge, ...` | Ask the FAQ assistant a question |
| `!materials` | List all course materials |
| `!materials Module 3` | List materials tagged for a specific module |
| `!get 4` | Receive the actual file for material #4 |
| `!summary` | Get a summary of the last 24 hours of group chat |

---

## Running It 24/7

This process needs to stay running continuously to actually send scheduled
nudges/reminders and respond in real time. `npm start` alone will stop the
moment you close your terminal or your computer sleeps. Options, roughly
cheapest/simplest to most robust:

- **A cheap always-on VPS** (e.g. a $5-6/month droplet/instance) running the
  process under `pm2` (`npm i -g pm2 && pm2 start src/index.js --name metabridge-bot`)
  so it auto-restarts on crash and on server reboot.
- **An old phone or spare machine left on at the office**, same `pm2` approach.
- A platform like Railway or Render, though persistent WhatsApp sessions and
  background cron work best on a tool that gives you a real, always-on
  filesystem for `data/auth/` — check this before committing to one.

Wherever it runs, make sure `data/auth/` and `data/*.db` persist across
restarts (they're gitignored on purpose — back them up separately, don't rely
on git for this).

---

## Architecture: How a Message Flows

1. `connection.js` receives a raw message via Baileys' `messages.upsert` event.
2. `index.js` passes it to `messageHandler.js`.
3. `messageHandler.js` decides: admin DM command? Group slash-command
   (`!materials`, `!summary`)? Otherwise — log it, run moderation, then check
   if it's directed at the bot for FAQ answering.
4. Every outgoing reply goes through `sender.js`, which enforces the
   rate-limiting described in Account Safety.
5. `scheduler/cronJobs.js` independently fires the time-based features
   (nudges, deadline/lecture reminders, weekly digest) without needing an
   incoming message to trigger them.

---

## Troubleshooting

**QR code keeps reappearing / never connects** — Delete `data/auth/` and
restart for a completely fresh pairing attempt.

**"Could not delete message" in logs** — The bot's number isn't a group admin.
Either make it one, or leave `autoDelete: false` in `config.js` and handle
removals manually using the admin alerts.

**Claude calls failing** — Check `ANTHROPIC_API_KEY` is set correctly in `.env`
and that you have available credit on the Anthropic account.

**Bot got logged out / banned** — This is the real risk of an unofficial
library, covered above. Re-pair with a fresh number if needed, and revisit
the Account Safety checklist before reconnecting.
