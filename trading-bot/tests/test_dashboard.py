import base64
import json

import config
import dashboard


def _auth_header(username, password):
    creds = base64.b64encode(f"{username}:{password}".encode()).decode()
    return {"Authorization": f"Basic {creds}"}


def test_build_status_with_no_files(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "STATE_FILE", str(tmp_path / "state.json"))
    monkeypatch.setattr(config, "POSITION_FILE", str(tmp_path / "position.json"))
    monkeypatch.setattr(config, "LOG_FILE", str(tmp_path / "bot.log"))

    status = dashboard.build_status()

    assert status["position"] is None
    assert status["log_lines"] == []
    assert status["halted"] is False


def test_build_status_computes_long_unrealized_pnl(tmp_path, monkeypatch):
    position_file = tmp_path / "position.json"
    position_file.write_text(json.dumps({
        "mode": "TESTNET", "symbol": "BTC/USDT:USDT", "timeframe": "15m",
        "equity": 10000, "last_price": 101.0,
        "position": {"direction": "long", "entry": 100.0, "stop": 98.0, "target": 104.0, "qty": 2.0},
        "updated_at": "2026-01-01T00:00:00+00:00",
    }))
    monkeypatch.setattr(config, "STATE_FILE", str(tmp_path / "state.json"))
    monkeypatch.setattr(config, "POSITION_FILE", str(position_file))
    monkeypatch.setattr(config, "LOG_FILE", str(tmp_path / "bot.log"))

    status = dashboard.build_status()

    assert status["position"]["unrealized_pnl"] == 2.0  # (101-100)*2


def test_build_status_computes_short_unrealized_pnl(tmp_path, monkeypatch):
    position_file = tmp_path / "position.json"
    position_file.write_text(json.dumps({
        "mode": "TESTNET", "symbol": "BTC/USDT:USDT", "timeframe": "15m",
        "equity": 10000, "last_price": 95.0,
        "position": {"direction": "short", "entry": 100.0, "stop": 104.0, "target": 92.0, "qty": 2.0},
        "updated_at": "2026-01-01T00:00:00+00:00",
    }))
    monkeypatch.setattr(config, "STATE_FILE", str(tmp_path / "state.json"))
    monkeypatch.setattr(config, "POSITION_FILE", str(position_file))
    monkeypatch.setattr(config, "LOG_FILE", str(tmp_path / "bot.log"))

    status = dashboard.build_status()

    assert status["position"]["unrealized_pnl"] == 10.0  # (100-95)*2 short


def test_reflects_risk_state(tmp_path, monkeypatch):
    state_file = tmp_path / "state.json"
    state_file.write_text(json.dumps({
        "date": "2026-01-01", "daily_start_equity": 10000.0,
        "daily_realized_pnl": -120.0, "consecutive_losses": 2,
        "halted": True, "halt_reason": "daily loss limit hit",
    }))
    monkeypatch.setattr(config, "STATE_FILE", str(state_file))
    monkeypatch.setattr(config, "POSITION_FILE", str(tmp_path / "position.json"))
    monkeypatch.setattr(config, "LOG_FILE", str(tmp_path / "bot.log"))

    status = dashboard.build_status()

    assert status["halted"] is True
    assert status["halt_reason"] == "daily loss limit hit"
    assert status["consecutive_losses"] == 2


def test_index_requires_auth():
    client = dashboard.app.test_client()
    resp = client.get("/")
    assert resp.status_code == 401


def test_index_rejects_wrong_credentials():
    client = dashboard.app.test_client()
    resp = client.get("/", headers=_auth_header("wrong", "creds"))
    assert resp.status_code == 401


def test_index_allows_correct_credentials(tmp_path, monkeypatch):
    monkeypatch.setattr(config, "STATE_FILE", str(tmp_path / "state.json"))
    monkeypatch.setattr(config, "POSITION_FILE", str(tmp_path / "position.json"))
    monkeypatch.setattr(config, "LOG_FILE", str(tmp_path / "bot.log"))
    client = dashboard.app.test_client()

    resp = client.get("/", headers=_auth_header(config.DASHBOARD_USERNAME, config.DASHBOARD_PASSWORD))

    assert resp.status_code == 200


def test_api_status_requires_auth():
    client = dashboard.app.test_client()
    resp = client.get("/api/status")
    assert resp.status_code == 401


def test_manifest_is_public_and_valid_json():
    client = dashboard.app.test_client()
    resp = client.get("/manifest.json")
    assert resp.status_code == 200
    assert resp.get_json()["name"] == "Trading Bot Dashboard"
