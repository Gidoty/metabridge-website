"""Central configuration, loaded from environment variables (.env)."""
import os
from dotenv import load_dotenv

load_dotenv()


def _bool(name: str, default: bool) -> bool:
    val = os.getenv(name)
    if val is None:
        return default
    return val.strip().lower() in ("1", "true", "yes", "on")


def _float(name: str, default: float) -> float:
    val = os.getenv(name)
    return float(val) if val else default


def _int(name: str, default: int) -> int:
    val = os.getenv(name)
    return int(val) if val else default


# --- Exchange / safety ---
BINANCE_API_KEY = os.getenv("BINANCE_API_KEY", "")
BINANCE_API_SECRET = os.getenv("BINANCE_API_SECRET", "")
USE_TESTNET = _bool("USE_TESTNET", True)
DRY_RUN = _bool("DRY_RUN", True)
LIVE_TRADING_CONFIRMED = os.getenv("LIVE_TRADING_CONFIRMED", "")
LIVE_CONFIRMATION_PHRASE = "I_UNDERSTAND_THE_RISK"

# --- Market ---
SYMBOL = os.getenv("SYMBOL", "BTC/USDT:USDT")
TIMEFRAME = os.getenv("TIMEFRAME", "15m")
POLL_INTERVAL_SECONDS = _int("POLL_INTERVAL_SECONDS", 60)

# --- Strategy: EMA crossover + RSI/ADX filters + ATR-based exits ---
EMA_FAST = _int("EMA_FAST", 12)
EMA_SLOW = _int("EMA_SLOW", 26)
RSI_PERIOD = _int("RSI_PERIOD", 14)
RSI_OVERBOUGHT = _float("RSI_OVERBOUGHT", 70)
RSI_OVERSOLD = _float("RSI_OVERSOLD", 30)
ADX_PERIOD = _int("ADX_PERIOD", 14)
ADX_MIN_TREND_STRENGTH = _float("ADX_MIN_TREND_STRENGTH", 20)
ATR_PERIOD = _int("ATR_PERIOD", 14)
ATR_STOP_MULT = _float("ATR_STOP_MULT", 1.5)
ATR_TP_MULT = _float("ATR_TP_MULT", 2.5)

# --- Risk management ---
RISK_PER_TRADE_PCT = _float("RISK_PER_TRADE_PCT", 0.01)  # 1% of equity per trade
MAX_LEVERAGE = _int("MAX_LEVERAGE", 5)
DAILY_LOSS_LIMIT_PCT = _float("DAILY_LOSS_LIMIT_PCT", 0.03)  # halt for the day at -3%
MAX_CONSECUTIVE_LOSSES = _int("MAX_CONSECUTIVE_LOSSES", 4)
MAX_OPEN_POSITIONS = _int("MAX_OPEN_POSITIONS", 1)

# --- Notifications ---
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")

# --- Paths ---
STATE_FILE = os.path.join(os.path.dirname(__file__), "state.json")
LOG_FILE = os.path.join(os.path.dirname(__file__), "logs", "bot.log")


def is_live_trading_allowed() -> bool:
    """Real orders only fire when testnet is off, dry-run is off, AND the
    explicit confirmation phrase is set. Any one of these missing keeps the
    bot in a safe, non-order-placing mode."""
    return (
        not USE_TESTNET
        and not DRY_RUN
        and LIVE_TRADING_CONFIRMED == LIVE_CONFIRMATION_PHRASE
    )
