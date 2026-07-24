"""Bar-by-bar backtest of the strategy + risk manager over historical data.

Pulls public OHLCV from Binance (no API key needed for market data) and
simulates trades exactly the way bot.py would open/manage/close them,
including position sizing and the daily-loss / consecutive-loss halts.
Stops/targets are assumed to fill at their exact price if a bar's
high/low touches them, and a flat taker fee is charged on both legs.

Usage:
    python backtest.py --symbol BTC/USDT:USDT --timeframe 15m --days 90
"""
import argparse
import os
from datetime import datetime, timedelta, timezone

import ccxt
import pandas as pd

import config
from src.risk_manager import RiskManager
from src.strategy import generate_signal
from src.logger import get_logger

log = get_logger("backtest")

FEE_RATE = 0.0004  # ~4bps taker fee per side, typical for Binance USDM futures
STARTING_EQUITY = 10_000.0
WARMUP_BARS = max(config.EMA_SLOW, config.ADX_PERIOD, config.ATR_PERIOD) + 5


def fetch_history(symbol: str, timeframe: str, days: int) -> pd.DataFrame:
    exchange = ccxt.binanceusdm({"enableRateLimit": True})
    since = exchange.parse8601(
        (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
    )
    all_candles = []
    while True:
        batch = exchange.fetch_ohlcv(symbol, timeframe=timeframe, since=since, limit=1000)
        if not batch:
            break
        all_candles.extend(batch)
        since = batch[-1][0] + 1
        if len(batch) < 1000:
            break
    df = pd.DataFrame(all_candles, columns=["timestamp", "open", "high", "low", "close", "volume"])
    df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
    return df.drop_duplicates(subset="timestamp").reset_index(drop=True)


def run_backtest(df: pd.DataFrame) -> dict:
    state_path = os.path.join(os.path.dirname(__file__), "data", "_backtest_state.json")
    if os.path.exists(state_path):
        os.remove(state_path)
    risk = RiskManager(state_file=state_path)

    equity = STARTING_EQUITY
    equity_curve = [equity]
    peak_equity = equity
    max_drawdown = 0.0

    position = None  # dict with direction/entry/qty/stop/target
    trades = []

    for i in range(WARMUP_BARS, len(df)):
        window = df.iloc[: i + 1]
        bar = df.iloc[i]
        as_of = bar["timestamp"].date()

        if position:
            hit_stop = (
                bar["low"] <= position["stop"] if position["direction"] == "long"
                else bar["high"] >= position["stop"]
            )
            hit_target = (
                bar["high"] >= position["target"] if position["direction"] == "long"
                else bar["low"] <= position["target"]
            )
            exit_price = None
            if hit_stop:
                exit_price = position["stop"]
            elif hit_target:
                exit_price = position["target"]

            if exit_price is not None:
                direction_sign = 1 if position["direction"] == "long" else -1
                gross_pnl = direction_sign * (exit_price - position["entry"]) * position["qty"]
                fees = FEE_RATE * position["qty"] * (position["entry"] + exit_price)
                net_pnl = gross_pnl - fees
                equity += net_pnl
                risk.record_trade_result(net_pnl, equity, as_of=as_of)
                trades.append({"pnl": net_pnl, "exit": "stop" if hit_stop else "target"})
                position = None

        equity_curve.append(equity)
        peak_equity = max(peak_equity, equity)
        if peak_equity > 0:
            max_drawdown = max(max_drawdown, (peak_equity - equity) / peak_equity)

        if position is None:
            can_trade, reason = risk.can_trade(equity, as_of=as_of)
            if not can_trade:
                continue
            signal = generate_signal(window)
            if signal.direction:
                qty = risk.calculate_position_size(equity, signal.entry_price, signal.stop_loss)
                if qty > 0:
                    position = {
                        "direction": signal.direction,
                        "entry": signal.entry_price,
                        "stop": signal.stop_loss,
                        "target": signal.take_profit,
                        "qty": qty,
                    }

    wins = [t for t in trades if t["pnl"] > 0]
    losses = [t for t in trades if t["pnl"] <= 0]
    gross_profit = sum(t["pnl"] for t in wins)
    gross_loss = -sum(t["pnl"] for t in losses)

    return {
        "total_trades": len(trades),
        "wins": len(wins),
        "losses": len(losses),
        "win_rate": len(wins) / len(trades) if trades else 0.0,
        "starting_equity": STARTING_EQUITY,
        "ending_equity": equity,
        "total_return_pct": (equity - STARTING_EQUITY) / STARTING_EQUITY,
        "max_drawdown_pct": max_drawdown,
        "profit_factor": gross_profit / gross_loss if gross_loss > 0 else float("inf"),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--symbol", default=config.SYMBOL)
    parser.add_argument("--timeframe", default=config.TIMEFRAME)
    parser.add_argument("--days", type=int, default=90)
    args = parser.parse_args()

    log.info("Fetching %d days of %s %s history...", args.days, args.symbol, args.timeframe)
    df = fetch_history(args.symbol, args.timeframe, args.days)
    log.info("Fetched %d candles", len(df))

    results = run_backtest(df)

    print("\n--- Backtest results ---")
    print(f"Symbol/timeframe:   {args.symbol} {args.timeframe} ({args.days}d)")
    print(f"Total trades:       {results['total_trades']}")
    print(f"Win rate:           {results['win_rate']:.1%}")
    print(f"Starting equity:    {results['starting_equity']:.2f}")
    print(f"Ending equity:      {results['ending_equity']:.2f}")
    print(f"Total return:       {results['total_return_pct']:.2%}")
    print(f"Max drawdown:       {results['max_drawdown_pct']:.2%}")
    print(f"Profit factor:      {results['profit_factor']:.2f}")


if __name__ == "__main__":
    main()
