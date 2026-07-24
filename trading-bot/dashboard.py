"""Read-only phone/web dashboard for the trading bot.

Runs as its own process alongside bot.py, reading the same state files
(state.json, position.json, logs/bot.log) rather than sharing memory with
it - so the dashboard can crash/restart independently of the bot and vice
versa. It never places orders or talks to the exchange itself.

Protected by HTTP Basic Auth. Refuses to start unless a username and
password are configured, since by default it's meant to be reachable
from your phone - see deploy/DEPLOY.md for how to expose it safely
(SSH tunnel, or a reverse proxy for a real HTTPS URL).
"""
import json
import sys
from functools import wraps

from flask import Flask, Response, jsonify, render_template, request

import config
from src.logger import get_logger

log = get_logger("dashboard")
app = Flask(__name__)


def read_json_file(path: str, default):
    try:
        with open(path) as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return default


def tail_log(path: str, n: int = 40):
    try:
        with open(path) as f:
            lines = f.readlines()
        return [line.rstrip("\n") for line in lines[-n:]]
    except FileNotFoundError:
        return []


def build_status() -> dict:
    risk_state = read_json_file(config.STATE_FILE, {})
    bot_state = read_json_file(
        config.POSITION_FILE,
        {"mode": "not started yet", "symbol": config.SYMBOL, "timeframe": config.TIMEFRAME,
         "equity": None, "last_price": None, "position": None, "updated_at": None},
    )

    position = bot_state.get("position")
    if position and bot_state.get("last_price"):
        last_price = bot_state["last_price"]
        sign = 1 if position["direction"] == "long" else -1
        position = dict(position)
        position["unrealized_pnl"] = round(sign * (last_price - position["entry"]) * position["qty"], 2)

    return {
        "mode": bot_state.get("mode"),
        "symbol": bot_state.get("symbol"),
        "timeframe": bot_state.get("timeframe"),
        "equity": bot_state.get("equity"),
        "last_price": bot_state.get("last_price"),
        "updated_at": bot_state.get("updated_at"),
        "position": position,
        "daily_realized_pnl": risk_state.get("daily_realized_pnl"),
        "consecutive_losses": risk_state.get("consecutive_losses"),
        "halted": risk_state.get("halted", False),
        "halt_reason": risk_state.get("halt_reason", ""),
        "log_lines": tail_log(config.LOG_FILE),
    }


def require_auth(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        auth = request.authorization
        if not auth or auth.username != config.DASHBOARD_USERNAME or auth.password != config.DASHBOARD_PASSWORD:
            return Response(
                "Authentication required", 401, {"WWW-Authenticate": 'Basic realm="Trading Bot Dashboard"'}
            )
        return view(*args, **kwargs)

    return wrapped


@app.route("/")
@require_auth
def index():
    return render_template("dashboard.html", status=build_status())


@app.route("/api/status")
@require_auth
def api_status():
    return jsonify(build_status())


@app.route("/manifest.json")
def manifest():
    return jsonify(
        {
            "name": "Trading Bot Dashboard",
            "short_name": "TradeBot",
            "start_url": "/",
            "display": "standalone",
            "background_color": "#0d1421",
            "theme_color": "#0d1421",
            "icons": [
                {"src": "/static/icon-192.png", "sizes": "192x192", "type": "image/png"},
                {"src": "/static/icon-512.png", "sizes": "512x512", "type": "image/png"},
            ],
        }
    )


def _ensure_configured() -> None:
    """Runs at import time so this check applies whether the app is started
    via `python dashboard.py` or a WSGI server like gunicorn importing
    dashboard:app directly."""
    if not config.DASHBOARD_USERNAME or not config.DASHBOARD_PASSWORD:
        log.error(
            "Refusing to start: DASHBOARD_USERNAME and DASHBOARD_PASSWORD must "
            "both be set in .env. This dashboard is designed to be reachable "
            "from your phone, so it must not run without credentials."
        )
        sys.exit(1)


_ensure_configured()


def main():
    log.info("Dashboard starting on %s:%s", config.DASHBOARD_HOST, config.DASHBOARD_PORT)
    app.run(host=config.DASHBOARD_HOST, port=config.DASHBOARD_PORT)


if __name__ == "__main__":
    main()
