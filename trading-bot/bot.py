"""Main polling loop.

Three safety tiers, controlled entirely by .env:
  DRY_RUN=true (default)         -> fully local simulation, nothing ever
                                     touches an exchange. Good first smoke test.
  USE_TESTNET=true, DRY_RUN=false -> real orders on Binance Futures TESTNET
                                     (fake money, real exchange mechanics).
  USE_TESTNET=false, DRY_RUN=false,
  LIVE_TRADING_CONFIRMED=I_UNDERSTAND_THE_RISK
                                  -> real orders on mainnet with real funds.

Only ever run this against a strategy you have already validated with
backtest.py and then observed for a while on testnet.
"""
import json
import os
import time
from datetime import datetime, timezone

import config
from src.exchange_client import ExchangeClient
from src.indicators import ohlcv_to_dataframe
from src.risk_manager import RiskManager
from src.strategy import generate_signal
from src.logger import get_logger
from src import notifier

log = get_logger("bot")

PAPER_STARTING_EQUITY = 10_000.0


def write_position_state(mode: str, equity: float, last_price: float, position) -> None:
    """Persists a snapshot the dashboard can read from a separate process.
    Best-effort: a write failure here should never take down the trading loop."""
    try:
        state_dir = os.path.dirname(config.POSITION_FILE)
        if state_dir:
            os.makedirs(state_dir, exist_ok=True)
        with open(config.POSITION_FILE, "w") as f:
            json.dump(
                {
                    "mode": mode,
                    "symbol": config.SYMBOL,
                    "timeframe": config.TIMEFRAME,
                    "equity": equity,
                    "last_price": last_price,
                    "position": position,
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                },
                f,
                indent=2,
            )
    except OSError as exc:
        log.warning("Could not write position state file: %s", exc)


def describe_mode() -> str:
    if config.DRY_RUN:
        return "DRY RUN (fully simulated, no exchange calls)"
    if config.USE_TESTNET:
        return "TESTNET (Binance Futures sandbox, fake money)"
    if config.is_live_trading_allowed():
        return "LIVE (real funds - mainnet)"
    return "BLOCKED: not testnet, not dry-run, and LIVE_TRADING_CONFIRMED not set correctly"


def run():
    log.info("Starting bot | mode=%s | symbol=%s | timeframe=%s",
              describe_mode(), config.SYMBOL, config.TIMEFRAME)

    if not config.DRY_RUN and not config.USE_TESTNET and not config.is_live_trading_allowed():
        log.error(
            "Refusing to start: USE_TESTNET is false and LIVE_TRADING_CONFIRMED "
            "is not set to the exact confirmation phrase. Set DRY_RUN=true or "
            "USE_TESTNET=true, or explicitly confirm live trading in .env."
        )
        return

    exchange = ExchangeClient()
    risk = RiskManager()
    exchange.set_leverage(config.SYMBOL, config.MAX_LEVERAGE)

    paper_equity = PAPER_STARTING_EQUITY
    position = None  # {direction, entry, stop, target, qty}

    notifier.send(f"Trading bot started | mode={describe_mode()} | {config.SYMBOL} {config.TIMEFRAME}")
    write_position_state(describe_mode(), paper_equity, 0.0, None)

    while True:
        try:
            equity = paper_equity if config.DRY_RUN else exchange.fetch_balance_usdt()

            ohlcv = exchange.fetch_ohlcv(config.SYMBOL, config.TIMEFRAME, limit=200)
            df = ohlcv_to_dataframe(ohlcv)
            last_price = float(df.iloc[-1]["close"])
            last_high = float(df.iloc[-1]["high"])
            last_low = float(df.iloc[-1]["low"])

            if position:
                hit_stop = (
                    last_low <= position["stop"] if position["direction"] == "long"
                    else last_high >= position["stop"]
                )
                hit_target = (
                    last_high >= position["target"] if position["direction"] == "long"
                    else last_low <= position["target"]
                )
                if hit_stop or hit_target:
                    exit_price = position["stop"] if hit_stop else position["target"]
                    sign = 1 if position["direction"] == "long" else -1
                    pnl = sign * (exit_price - position["entry"]) * position["qty"]

                    exchange.close_position_market(config.SYMBOL, position["direction"], position["qty"])
                    if config.DRY_RUN:
                        paper_equity += pnl
                    risk.record_trade_result(pnl, paper_equity if config.DRY_RUN else exchange.fetch_balance_usdt())

                    reason = "stop-loss" if hit_stop else "take-profit"
                    log.info("Position closed via %s | pnl=%.2f", reason, pnl)
                    notifier.send(f"Closed {position['direction']} {config.SYMBOL} via {reason} | pnl={pnl:.2f}")
                    position = None

            if position is None:
                can_trade, reason = risk.can_trade(equity)
                if not can_trade:
                    log.warning("Trading halted: %s", reason)
                else:
                    signal = generate_signal(df)
                    if signal.direction:
                        qty = risk.calculate_position_size(equity, signal.entry_price, signal.stop_loss)
                        if qty > 0:
                            exchange.place_market_order_with_protection(
                                config.SYMBOL, "buy" if signal.direction == "long" else "sell",
                                qty, signal.stop_loss, signal.take_profit,
                            )
                            position = {
                                "direction": signal.direction,
                                "entry": signal.entry_price,
                                "stop": signal.stop_loss,
                                "target": signal.take_profit,
                                "qty": qty,
                            }
                            log.info(
                                "Opened %s %s qty=%.6f entry=%.2f stop=%.2f target=%.2f | %s",
                                signal.direction, config.SYMBOL, qty,
                                signal.entry_price, signal.stop_loss, signal.take_profit, signal.reason,
                            )
                            notifier.send(
                                f"Opened {signal.direction} {config.SYMBOL} qty={qty:.6f} "
                                f"entry={signal.entry_price:.2f} stop={signal.stop_loss:.2f} "
                                f"target={signal.take_profit:.2f}"
                            )

            write_position_state(describe_mode(), equity, last_price, position)

        except Exception as exc:  # keep the loop alive; log and notify, don't crash-loop silently
            log.exception("Error in main loop: %s", exc)
            notifier.send(f"Bot error: {exc}")

        time.sleep(config.POLL_INTERVAL_SECONDS)


if __name__ == "__main__":
    run()
