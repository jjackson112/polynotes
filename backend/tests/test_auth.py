# SoC for testing routes

def test_health(client):
    res = client.get("/api/health")
    assert res.status_code == 200 # assert means must be true

def test_protected_route(client, new_user):
    res = client.get("/api/protected", headers=new_user["headers"])
    assert res.status_code == 200

def test_protected_no_token(client):
    res = client.get("/api/protected")
    assert res.status_code == 401

def test_protected_invalid_token(client):
    res = client.get(
        "/api/protected",
        headers={"Authorization": "Bearer invalidtoken"}
    )
    assert res.status_code == 401