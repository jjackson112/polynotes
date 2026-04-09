# SoC for testing routes

def test_health(client):
    res = client.get("/api/health")
    assert res.status_code == 200 # assert means must be true

def test_protected_route(client, new_user):
    res = client.get("/api/protected", headers=new_user["headers"])
    assert res.status_code == 200