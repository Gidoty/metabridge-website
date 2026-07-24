"""Indicator calculations, built on the `ta` package (pure pandas, no C deps)."""
import pandas as pd
from ta.momentum import RSIIndicator
from ta.trend import EMAIndicator, ADXIndicator
from ta.volatility import AverageTrueRange

import config


def ohlcv_to_dataframe(ohlcv: list) -> pd.DataFrame:
    df = pd.DataFrame(
        ohlcv, columns=["timestamp", "open", "high", "low", "close", "volume"]
    )
    df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
    return df


def add_indicators(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["ema_fast"] = EMAIndicator(df["close"], window=config.EMA_FAST).ema_indicator()
    df["ema_slow"] = EMAIndicator(df["close"], window=config.EMA_SLOW).ema_indicator()
    df["rsi"] = RSIIndicator(df["close"], window=config.RSI_PERIOD).rsi()
    df["atr"] = AverageTrueRange(
        df["high"], df["low"], df["close"], window=config.ATR_PERIOD
    ).average_true_range()
    df["adx"] = ADXIndicator(
        df["high"], df["low"], df["close"], window=config.ADX_PERIOD
    ).adx()
    return df
