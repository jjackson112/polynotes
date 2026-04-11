# turn on testing mode + use an in-memory db (fresh every test run)
# yields back control to pytest
# client (HTTP - ThunderClient)
# db - clean db per test
# auth_header - (logged-in token helper)

import pytest
from app import create_app
from extensions import db

@pytest.fixture
def app():
    app = create_app()

    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",  # fast test DB
        "WTF_CSRF_ENABLED": False,
    })

    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

# test client fixture
@pytest.fixture
def client(app):
    return app.test_client()

# auth helper texture
# no more repeating register/login for each test
@pytest.fixture
def new_user(client):
    client.post("/api/register", json={
        "email": "jazz@example.com",
        "username": "jazz",
        "password": "password123"
    })

    login_res = client.post("/api/login", json={
        "username": "jazz",
        "password": "password123"
    })

    # do not assume that login always works
    # token = login_res.get_json()["token"]
    assert login_res.status_code == 200
    data = login_res.get_json()
    assert access_token in data # a successful login must return the token

    access_token = data["access_token"]

    return {
        "access_token": data["access_token"],
        "refresh_token": data["refresh_token"],
        "headers": {"Authorization": f"Bearer {data['access_token']}"}
    }

# refresh fixture
def test_refresh_token(client, new_user):
    res = client.post("/api/refresh", json={
        "refresh_token": new_user["refresh_token"]
    })

    assert res.status_code == 200
    data = res.get_json()
    assert "access_token" in data

# test for invalid or expired refresh tokens
def test_refresh_invalid_token():
    res = client.post("/api/refresh", json={
        "refresh_token": "fake"
    })

    assert res.status_code == 401