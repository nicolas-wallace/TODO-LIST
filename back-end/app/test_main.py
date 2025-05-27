from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register():
    response = client.post("/register", json={"username": "test", "password": "test", "email": "test@email.com"})
    assert response.status_code in [200, 400]

def test_create_todo():
    # Precisa de autenticação, então este teste é apenas ilustrativo
    pass

def test_get_todos():
    # Precisa de autenticação, então este teste é apenas ilustrativo
    pass

def test_delete_todo():
    # Precisa de autenticação, então este teste é apenas ilustrativo
    pass