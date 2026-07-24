"""Optional Telegram alerts. Silently does nothing if not configured."""
import requests

import config
from src.logger import get_logger

log = get_logger("notifier")


def send(message: str) -> None:
    if not config.TELEGRAM_BOT_TOKEN or not config.TELEGRAM_CHAT_ID:
        return
    url = f"https://api.telegram.org/bot{config.TELEGRAM_BOT_TOKEN}/sendMessage"
    try:
        requests.post(
            url,
            json={"chat_id": config.TELEGRAM_CHAT_ID, "text": message},
            timeout=10,
        )
    except requests.RequestException as exc:
        log.warning("Telegram notification failed: %s", exc)
