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
        yield db
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

    token = login_res.json["token"]

    return {
        "token": token,
        "headers": {"Authorization": f"Bearer {token}"}
    }
