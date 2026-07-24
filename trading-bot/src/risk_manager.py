"""Risk management: this is the part that actually protects capital.

Responsibilities:
  - size every position off a fixed % of equity risked against the ATR stop
    distance, capped by a max leverage
  - track today's realized PnL and halt new entries once the daily loss
    limit is hit
  - trip a circuit breaker after N consecutive losing trades, requiring a
    manual reset before the bot will trade again
State is persisted to a small JSON file so restarts don't reset the day's
loss counters or the circuit breaker.
"""
import json
import os
from datetime import date, datetime
from typing import Optional, Tuple

import config
from src.logger import get_logger

log = get_logger("risk_manager")


def _default_state(equity: float) -> dict:
    return {
        "date": date.today().isoformat(),
        "daily_start_equity": equity,
        "daily_realized_pnl": 0.0,
        "consecutive_losses": 0,
        "halted": False,
        "halt_reason": "",
    }


class RiskManager:
    def __init__(self, state_file: str = config.STATE_FILE):
        self.state_file = state_file
        self.state = self._load_state()

    def _load_state(self) -> dict:
        if os.path.exists(self.state_file):
            with open(self.state_file) as f:
                return json.load(f)
        return _default_state(0.0)

    def _save_state(self) -> None:
        state_dir = os.path.dirname(self.state_file)
        if state_dir:
            os.makedirs(state_dir, exist_ok=True)
        with open(self.state_file, "w") as f:
            json.dump(self.state, f, indent=2)

    def _roll_day_if_needed(self, current_equity: float, as_of: Optional[date] = None) -> None:
        today = (as_of or date.today()).isoformat()
        if self.state.get("date") != today:
            log.info("New trading day (%s), resetting daily loss counter", today)
            self.state = _default_state(current_equity)
            self.state["date"] = today
            self._save_state()

    def can_trade(self, current_equity: float, as_of: Optional[date] = None) -> Tuple[bool, str]:
        self._roll_day_if_needed(current_equity, as_of)

        if self.state["halted"]:
            return False, f"halted: {self.state['halt_reason']}"

        if self.state["daily_start_equity"] > 0:
            daily_loss_pct = -self.state["daily_realized_pnl"] / self.state["daily_start_equity"]
            if daily_loss_pct >= config.DAILY_LOSS_LIMIT_PCT:
                self.state["halted"] = True
                self.state["halt_reason"] = (
                    f"daily loss limit hit ({daily_loss_pct:.2%} >= "
                    f"{config.DAILY_LOSS_LIMIT_PCT:.2%})"
                )
                self._save_state()
                return False, self.state["halt_reason"]

        if self.state["consecutive_losses"] >= config.MAX_CONSECUTIVE_LOSSES:
            self.state["halted"] = True
            self.state["halt_reason"] = (
                f"{self.state['consecutive_losses']} consecutive losses"
            )
            self._save_state()
            return False, self.state["halt_reason"]

        return True, "ok"

    def calculate_position_size(
        self, equity: float, entry_price: float, stop_loss_price: float
    ) -> float:
        """Returns contract quantity, sized so a stop-out loses exactly
        RISK_PER_TRADE_PCT of equity, capped so notional never exceeds
        MAX_LEVERAGE * equity."""
        stop_distance = abs(entry_price - stop_loss_price)
        if stop_distance <= 0 or equity <= 0:
            return 0.0

        risk_amount = equity * config.RISK_PER_TRADE_PCT
        qty_by_risk = risk_amount / stop_distance

        max_notional = equity * config.MAX_LEVERAGE
        qty_by_leverage = max_notional / entry_price

        return max(0.0, min(qty_by_risk, qty_by_leverage))

    def record_trade_result(
        self, pnl: float, equity_after: float, as_of: Optional[date] = None
    ) -> None:
        self._roll_day_if_needed(equity_after, as_of)
        self.state["daily_realized_pnl"] += pnl
        if pnl < 0:
            self.state["consecutive_losses"] += 1
        else:
            self.state["consecutive_losses"] = 0
        self._save_state()
        log.info(
            "Trade result recorded: pnl=%.2f daily_pnl=%.2f consecutive_losses=%d",
            pnl,
            self.state["daily_realized_pnl"],
            self.state["consecutive_losses"],
        )

    def reset_circuit_breaker(self) -> None:
        """Manual reset after reviewing why the breaker tripped."""
        self.state["halted"] = False
        self.state["halt_reason"] = ""
        self.state["consecutive_losses"] = 0
        self._save_state()
        log.info("Circuit breaker manually reset")
