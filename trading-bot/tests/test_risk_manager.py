from datetime import date

import config
from src.risk_manager import RiskManager


def make_risk_manager(tmp_path):
    return RiskManager(state_file=str(tmp_path / "state.json"))


def test_position_size_respects_risk_per_trade(tmp_path):
    risk = make_risk_manager(tmp_path)
    equity = 10_000.0
    entry = 100.0
    stop = 98.0  # $2 stop distance

    qty = risk.calculate_position_size(equity, entry, stop)

    expected_risk_amount = equity * config.RISK_PER_TRADE_PCT
    assert qty * (entry - stop) == expected_risk_amount


def test_position_size_capped_by_max_leverage(tmp_path):
    risk = make_risk_manager(tmp_path)
    equity = 10_000.0
    entry = 100.0
    stop = 99.999  # tiny stop distance -> risk-based sizing would be huge

    qty = risk.calculate_position_size(equity, entry, stop)

    max_notional = equity * config.MAX_LEVERAGE
    assert qty * entry <= max_notional + 1e-6


def test_zero_stop_distance_returns_zero_size(tmp_path):
    risk = make_risk_manager(tmp_path)
    qty = risk.calculate_position_size(10_000.0, 100.0, 100.0)
    assert qty == 0.0


def test_daily_loss_limit_halts_trading(tmp_path):
    risk = make_risk_manager(tmp_path)
    equity = 10_000.0
    today = date(2026, 1, 1)

    can_trade, _ = risk.can_trade(equity, as_of=today)
    assert can_trade is True

    loss = equity * config.DAILY_LOSS_LIMIT_PCT
    risk.record_trade_result(-loss, equity - loss, as_of=today)

    can_trade, reason = risk.can_trade(equity - loss, as_of=today)
    assert can_trade is False
    assert "daily loss limit" in reason


def test_daily_loss_counter_resets_next_day(tmp_path):
    risk = make_risk_manager(tmp_path)
    day1 = date(2026, 1, 1)
    day2 = date(2026, 1, 2)
    equity = 10_000.0

    loss = equity * config.DAILY_LOSS_LIMIT_PCT
    risk.record_trade_result(-loss, equity - loss, as_of=day1)
    can_trade, _ = risk.can_trade(equity - loss, as_of=day1)
    assert can_trade is False

    can_trade, reason = risk.can_trade(equity, as_of=day2)
    assert can_trade is True, reason


def test_consecutive_loss_circuit_breaker_trips(tmp_path):
    risk = make_risk_manager(tmp_path)
    today = date(2026, 1, 1)
    equity = 10_000.0

    small_loss = equity * 0.001  # small enough to not trip the daily loss limit
    for _ in range(config.MAX_CONSECUTIVE_LOSSES):
        risk.record_trade_result(-small_loss, equity, as_of=today)

    can_trade, reason = risk.can_trade(equity, as_of=today)
    assert can_trade is False
    assert "consecutive losses" in reason


def test_manual_reset_clears_circuit_breaker(tmp_path):
    risk = make_risk_manager(tmp_path)
    today = date(2026, 1, 1)
    equity = 10_000.0

    small_loss = equity * 0.001
    for _ in range(config.MAX_CONSECUTIVE_LOSSES):
        risk.record_trade_result(-small_loss, equity, as_of=today)
    can_trade, _ = risk.can_trade(equity, as_of=today)
    assert can_trade is False

    risk.reset_circuit_breaker()

    can_trade, reason = risk.can_trade(equity, as_of=today)
    assert can_trade is True, reason


def test_winning_trade_resets_consecutive_loss_counter(tmp_path):
    risk = make_risk_manager(tmp_path)
    today = date(2026, 1, 1)
    equity = 10_000.0

    risk.record_trade_result(-10.0, equity, as_of=today)
    risk.record_trade_result(-10.0, equity, as_of=today)
    assert risk.state["consecutive_losses"] == 2

    risk.record_trade_result(50.0, equity, as_of=today)
    assert risk.state["consecutive_losses"] == 0
