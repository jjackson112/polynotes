# turn on testing mode + use an in-memory db (fresh every test run)
# yields back control to pytest

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