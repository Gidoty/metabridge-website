"""Trend-following strategy: EMA crossover for direction, RSI + ADX as
filters to avoid chasing exhausted moves or trading in a choppy range,
ATR for volatility-scaled stop-loss / take-profit distance.

This is a reasonable, explainable starting point for a first bot - not a
guaranteed-profitable edge. Validate it on the backtester and testnet
before ever pointing it at real funds, and expect to tune or replace it.
"""
from dataclasses import dataclass
from typing import Optional

import pandas as pd

import config
from src.indicators import add_indicators


@dataclass
class Signal:
    direction: Optional[str]  # "long", "short", or None
    entry_price: float
    stop_loss: float
    take_profit: float
    reason: str


def generate_signal(raw_df: pd.DataFrame) -> Signal:
    min_bars = max(config.EMA_SLOW, config.ADX_PERIOD, config.ATR_PERIOD) + 2
    if len(raw_df) < min_bars:
        return Signal(None, 0, 0, 0, "not enough history")

    df = add_indicators(raw_df)
    prev, curr = df.iloc[-2], df.iloc[-1]
    price = float(curr["close"])
    atr = float(curr["atr"])

    if pd.isna(atr) or atr <= 0:
        return Signal(None, price, 0, 0, "atr unavailable")

    bullish_cross = prev["ema_fast"] <= prev["ema_slow"] and curr["ema_fast"] > curr["ema_slow"]
    bearish_cross = prev["ema_fast"] >= prev["ema_slow"] and curr["ema_fast"] < curr["ema_slow"]
    trending = curr["adx"] >= config.ADX_MIN_TREND_STRENGTH

    if bullish_cross and trending and curr["rsi"] < config.RSI_OVERBOUGHT:
        return Signal(
            direction="long",
            entry_price=price,
            stop_loss=price - config.ATR_STOP_MULT * atr,
            take_profit=price + config.ATR_TP_MULT * atr,
            reason=f"EMA bullish cross, ADX={curr['adx']:.1f}, RSI={curr['rsi']:.1f}",
        )

    if bearish_cross and trending and curr["rsi"] > config.RSI_OVERSOLD:
        return Signal(
            direction="short",
            entry_price=price,
            stop_loss=price + config.ATR_STOP_MULT * atr,
            take_profit=price - config.ATR_TP_MULT * atr,
            reason=f"EMA bearish cross, ADX={curr['adx']:.1f}, RSI={curr['rsi']:.1f}",
        )

    return Signal(None, price, 0, 0, "no qualifying crossover")
