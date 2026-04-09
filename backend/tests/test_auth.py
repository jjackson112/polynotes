# client (HTTP - ThunderClient)
# db - clean db per test
# auth_header - (logged-in token helper)

import pytest
from app import create_app
from extensions import db

@pytest.fixture
def client(create_app):
    return create_app.test_client()

def test_health(client):
    res = client.get("/api/health")
    assert res.status_code == 200

@pytest.fixture
def db_session(create_app):
    with app.app_context():
        db.create_all()
        yield db
        db.drop_all()