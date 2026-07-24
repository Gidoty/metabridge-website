import pandas as pd

import config
from src import strategy

WARMUP = max(config.EMA_SLOW, config.ADX_PERIOD, config.ATR_PERIOD) + 5


def _df_with(prev: dict, curr: dict) -> pd.DataFrame:
    rows = [
        {"close": 100 + i, "high": 100 + i + 1, "low": 100 + i - 1, "volume": 1,
         "ema_fast": 100, "ema_slow": 100, "rsi": 50, "adx": 25, "atr": 2}
        for i in range(WARMUP)
    ]
    rows.append(prev)
    rows.append(curr)
    return pd.DataFrame(rows)


def _patch(monkeypatch, df):
    monkeypatch.setattr(strategy, "add_indicators", lambda raw_df: df)


def test_long_signal_on_bullish_cross_with_filters_passing(monkeypatch):
    prev = {"close": 100, "high": 101, "low": 99, "ema_fast": 99, "ema_slow": 100, "rsi": 55, "adx": 25, "atr": 2}
    curr = {"close": 101, "high": 102, "low": 100, "ema_fast": 100.5, "ema_slow": 100, "rsi": 58, "adx": 26, "atr": 2}
    df = _df_with(prev, curr)
    _patch(monkeypatch, df)

    signal = strategy.generate_signal(df)

    assert signal.direction == "long"
    assert signal.stop_loss < signal.entry_price < signal.take_profit


def test_short_signal_on_bearish_cross_with_filters_passing(monkeypatch):
    prev = {"close": 100, "high": 101, "low": 99, "ema_fast": 100, "ema_slow": 99, "rsi": 45, "adx": 25, "atr": 2}
    curr = {"close": 99, "high": 100, "low": 98, "ema_fast": 98.5, "ema_slow": 99, "rsi": 40, "adx": 26, "atr": 2}
    df = _df_with(prev, curr)
    _patch(monkeypatch, df)

    signal = strategy.generate_signal(df)

    assert signal.direction == "short"
    assert signal.take_profit < signal.entry_price < signal.stop_loss


def test_no_signal_when_no_crossover(monkeypatch):
    prev = {"close": 100, "high": 101, "low": 99, "ema_fast": 101, "ema_slow": 100, "rsi": 55, "adx": 25, "atr": 2}
    curr = {"close": 101, "high": 102, "low": 100, "ema_fast": 102, "ema_slow": 100, "rsi": 58, "adx": 26, "atr": 2}
    df = _df_with(prev, curr)
    _patch(monkeypatch, df)

    signal = strategy.generate_signal(df)

    assert signal.direction is None


def test_bullish_cross_blocked_when_overbought(monkeypatch):
    prev = {"close": 100, "high": 101, "low": 99, "ema_fast": 99, "ema_slow": 100, "rsi": 65, "adx": 25, "atr": 2}
    curr = {"close": 101, "high": 102, "low": 100, "ema_fast": 100.5, "ema_slow": 100, "rsi": 75, "adx": 26, "atr": 2}
    df = _df_with(prev, curr)
    _patch(monkeypatch, df)

    signal = strategy.generate_signal(df)

    assert signal.direction is None


def test_bullish_cross_blocked_when_not_trending(monkeypatch):
    prev = {"close": 100, "high": 101, "low": 99, "ema_fast": 99, "ema_slow": 100, "rsi": 55, "adx": 15, "atr": 2}
    curr = {"close": 101, "high": 102, "low": 100, "ema_fast": 100.5, "ema_slow": 100, "rsi": 58, "adx": 16, "atr": 2}
    df = _df_with(prev, curr)
    _patch(monkeypatch, df)

    signal = strategy.generate_signal(df)

    assert signal.direction is None


def test_not_enough_history_returns_no_signal():
    tiny_df = pd.DataFrame(
        [{"close": 100, "high": 101, "low": 99, "volume": 1} for _ in range(5)]
    )
    signal = strategy.generate_signal(tiny_df)
    assert signal.direction is None
