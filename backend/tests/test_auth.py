# client (HTTP - ThunderClient)
# db - clean db per test
# auth_header - (logged-in token helper)

import pytest
from app import create_app
from extensions import db

@pytest.fixture
def client(create_app):
    return create_app.test_client()

# test client fixture
def test_health(client):
    res = client.get("/api/health")
    assert res.status_code == 200

# db fixture
@pytest.fixture
def db_session(create_app):
    with app.app_context():
        db.create_all()
        yield db
        db.drop_all()

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

    token = login_res.json["token"]

    return {
        "token": token,
        "headers": {"Authorization": f"Bearer {token}"}
    }