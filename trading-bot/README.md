# Crypto Futures Trading Bot

A Binance Futures (USDM) trading bot: EMA-crossover trend-following
strategy, ATR-scaled stops/targets, and a risk manager that sizes
positions off a fixed % of equity, halts on a daily loss limit, and trips
a circuit breaker after consecutive losses.

**This is a starting point, not a guaranteed-profitable system.** No bot
"makes more profit and minimizes losses" automatically — the strategy
here needs to be backtested, watched on testnet, and tuned (or replaced)
before it should ever touch real money. Trading futures with leverage can
lose your entire deposited margin, and losses can happen faster than a
human can react. Only risk capital you can afford to lose.

## What's here

```
trading-bot/
  config.py            # all tunables, loaded from .env
  bot.py                # live/testnet/paper polling loop
  backtest.py           # historical simulation + stats
  dashboard.py           # read-only phone/web dashboard (Flask)
  templates/dashboard.html
  static/                # PWA icons
  deploy/                # systemd units + DEPLOY.md (run it 24/7 on a VPS)
  src/
    exchange_client.py  # ccxt wrapper around Binance USDM futures
    indicators.py        # EMA / RSI / ADX / ATR
    strategy.py           # signal generation (entry direction + stop/target)
    risk_manager.py       # position sizing + daily loss halt + circuit breaker
    notifier.py           # optional Telegram alerts
    logger.py
  tests/                 # unit tests (no network calls)
```

## 1. Setup

```bash
cd trading-bot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

### Get Binance Futures **testnet** API keys (do this first, not mainnet keys)

1. Go to https://testnet.binancefuture.com and log in with a GitHub account
   (this is a separate sandbox account from your real Binance account — it
   funds you with fake USDT).
2. Generate an API key/secret from the testnet dashboard.
3. Put them in `.env`:
   ```
   BINANCE_API_KEY=your_testnet_key
   BINANCE_API_SECRET=your_testnet_secret
   USE_TESTNET=true
   DRY_RUN=false
   ```

Leave `USE_TESTNET=true` until you've watched the bot trade for a while
and are comfortable with its behavior.

## 2. Backtest first

Before running anything live or on testnet, see how the strategy would
have performed historically (uses Binance's public market data, no API
key required):

```bash
python backtest.py --symbol BTC/USDT:USDT --timeframe 15m --days 180
```

Prints total trades, win rate, total return, max drawdown, and profit
factor. Try a few symbols/timeframes/date ranges — a strategy that only
looks good on one narrow window is not a strategy, it's a curve-fit.
Adjust the parameters in `.env` (or `config.py` defaults) and re-run.

## 3. Paper trade the live loop (no exchange calls at all)

The default `.env` has `DRY_RUN=true`, which never sends anything to any
exchange — it fetches real live prices, generates real signals, and
simulates fills/PnL entirely in memory. Good first smoke test to confirm
the bot runs without errors:

```bash
python bot.py
```

Watch `trading-bot/logs/bot.log` for entries/exits and reasoning.

## 4. Run on Binance testnet (real order flow, fake money)

Once the dry run looks sane, set `DRY_RUN=false` (keep `USE_TESTNET=true`)
and run again. This places real orders against Binance's sandbox — a much
closer test of real-world mechanics (fills, fees, rate limits) with zero
financial risk.

## 5. Going live (optional, real funds)

Only after you're satisfied with backtest + testnet results:

1. Set `USE_TESTNET=false` and put in real mainnet API keys (trading
   permission only — never enable withdrawals on a bot's API key).
2. Set `DRY_RUN=false`.
3. Set `LIVE_TRADING_CONFIRMED=I_UNDERSTAND_THE_RISK` — the bot refuses to
   place real orders without this exact phrase, so a live run is always a
   deliberate choice, never an accident from a misconfigured `.env`.
4. Start small. Lower `RISK_PER_TRADE_PCT` and `MAX_LEVERAGE` in `.env`
   below the defaults until you trust it with your own money.

## Risk controls (config.py / .env)

| Setting | Default | What it does |
|---|---|---|
| `RISK_PER_TRADE_PCT` | 1% | Max equity lost if a single trade hits its stop |
| `MAX_LEVERAGE` | 5x | Hard cap on position notional vs. equity |
| `DAILY_LOSS_LIMIT_PCT` | 3% | Bot stops opening new trades for the rest of the day once hit |
| `MAX_CONSECUTIVE_LOSSES` | 4 | Circuit breaker — halts until you manually call `reset_circuit_breaker()` |

State (daily PnL, consecutive losses, halt status) persists in
`state.json` so a bot restart doesn't quietly reset your daily loss
counter.

## Optional: Telegram alerts

Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env` (create a bot
via @BotFather) to get a message on every trade open/close and on errors.

## Running 24/7 and checking it from your phone

`bot.py` needs to run continuously on a machine that's always on — a
phone alone can't reliably do this (background-process limits, battery
optimization). See **`deploy/DEPLOY.md`** for putting the bot on a small
always-on VPS with systemd (auto-restart on crash/reboot).

That same guide covers `dashboard.py` — a read-only, password-protected
web page (status, open position, risk state, recent log) built to be
added to your phone's home screen like an app. It never places orders
itself; it only reads the state files `bot.py` writes.

```bash
# quick local test (not for real use — binds to localhost only)
DASHBOARD_USERNAME=you DASHBOARD_PASSWORD=choose_one python dashboard.py
```

## Running tests

```bash
pip install pytest
pytest
```

## Known limitations / next steps

- Single symbol, single position at a time — no portfolio-level logic.
- The EMA/RSI/ADX/ATR strategy is a reasonable, explainable default, not
  a proven edge. Expect to iterate on it using the backtester.
- `bot.py` monitors positions by polling and comparing price to
  stop/target locally; on testnet/live it also places exchange-side
  stop-market/take-profit-market orders as a backstop in case the bot
  process itself goes down.
- No slippage modeling beyond a flat fee assumption in the backtester —
  real fills, especially on stop orders during fast moves, can be worse.
