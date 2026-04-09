# client (HTTP - ThunderClient)
# db - clean db per test
# auth_header - (logged-in token helper)

import pytest
from app import create_app
from extensions import db

@pytest.fixture
def client(create_app):
    return create_app.test_client()