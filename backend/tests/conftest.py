import pytest
from app import create_app 

@pytest.fixture
def app():
    app = create_app()

    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",  # fast test DB
        "WTF_CSRF_ENABLED": False,
    })

    yield app