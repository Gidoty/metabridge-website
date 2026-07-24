"""Thin wrapper around ccxt's Binance USDM futures client.

Testnet mode is the default everywhere in this project. Real orders only
ever leave this module through place_market_order_with_protection(), and
that function refuses to run unless config.is_live_trading_allowed() is
True or the caller is explicitly in dry-run/testnet mode.
"""
import ccxt

import config
from src.logger import get_logger

log = get_logger("exchange")


class ExchangeClient:
    def __init__(self):
        self.exchange = ccxt.binanceusdm(
            {
                "apiKey": config.BINANCE_API_KEY,
                "secret": config.BINANCE_API_SECRET,
                "enableRateLimit": True,
                "options": {"defaultType": "future"},
            }
        )
        if config.USE_TESTNET:
            self.exchange.set_sandbox_mode(True)
            log.info("Exchange client connected to Binance Futures TESTNET")
        else:
            log.warning("Exchange client connected to Binance Futures MAINNET")

    def fetch_ohlcv(self, symbol: str, timeframe: str, limit: int = 200):
        return self.exchange.fetch_ohlcv(symbol, timeframe=timeframe, limit=limit)

    def fetch_balance_usdt(self) -> float:
        if config.DRY_RUN:
            return 0.0
        balance = self.exchange.fetch_balance()
        return float(balance.get("USDT", {}).get("total", 0.0))

    def fetch_open_positions(self, symbol: str):
        if config.DRY_RUN:
            return []
        positions = self.exchange.fetch_positions([symbol])
        return [p for p in positions if float(p.get("contracts") or 0) != 0]

    def set_leverage(self, symbol: str, leverage: int) -> None:
        if config.DRY_RUN:
            log.info("[DRY RUN] would set leverage %sx on %s", leverage, symbol)
            return
        self.exchange.set_leverage(leverage, symbol)

    def place_market_order_with_protection(
        self,
        symbol: str,
        side: str,
        amount: float,
        stop_loss_price: float,
        take_profit_price: float,
    ) -> dict:
        """Places a market entry plus reduce-only stop-loss and take-profit
        orders. Guarded so it can never fire an order against a real account
        unless every safety switch has been deliberately flipped."""
        if config.DRY_RUN or not config.is_live_trading_allowed():
            log.info(
                "[DRY RUN / TESTNET] %s %s %s | SL=%.2f TP=%.2f",
                side.upper(),
                amount,
                symbol,
                stop_loss_price,
                take_profit_price,
            )
            if config.DRY_RUN:
                return {"dry_run": True, "side": side, "amount": amount}

        entry = self.exchange.create_order(symbol, "market", side, amount)

        opposite = "sell" if side == "buy" else "buy"
        sl_order = self.exchange.create_order(
            symbol,
            "stop_market",
            opposite,
            amount,
            params={"stopPrice": stop_loss_price, "reduceOnly": True},
        )
        tp_order = self.exchange.create_order(
            symbol,
            "take_profit_market",
            opposite,
            amount,
            params={"stopPrice": take_profit_price, "reduceOnly": True},
        )
        return {"entry": entry, "stop_loss": sl_order, "take_profit": tp_order}

    def close_position_market(self, symbol: str, side: str, amount: float) -> dict:
        opposite = "sell" if side == "buy" else "buy"
        if config.DRY_RUN or not config.is_live_trading_allowed():
            log.info("[DRY RUN / TESTNET] close %s %s %s", opposite, amount, symbol)
            return {"dry_run": True}
        return self.exchange.create_order(
            symbol, "market", opposite, amount, params={"reduceOnly": True}
        )
