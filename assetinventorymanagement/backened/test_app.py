# test_app.py

import pytest
import json
from app import app, db, User  # Assumes your Flask app and models are in app.py

# Configure a test client using an in-memory SQLite database.
@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    client = app.test_client()
    with app.app_context():
        db.create_all()
        yield client
        db.session.remove()
        db.drop_all()

def create_user(name, email, role, password):
    """
    Helper function to create a test user.
    """
    user = User(name=name, email=email, role=role)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return user

def test_login_logout(client):
    # Create a test user with the role 'Employee'.
    # Note: In your login endpoint, numeric role "3" maps to "Employee".
    with app.app_context():
        create_user('testuser', 'testuser@example.com', 'Employee', 'password')

    # Test login.
    login_payload = {
        'name': 'testuser',
        'password': 'password',
        'role': '3'  # "3" maps to "Employee"
    }
    response = client.post('/assetinventorymanagement/login', json=login_payload)
    assert response.status_code == 200, "Login should be successful with correct credentials"
    data = response.get_json()
    assert 'Logged in successfully' in data.get('message', '')

    # Test logout.
    response = client.post('/logout')
    assert response.status_code == 200, "Logout should be successful"
    data = response.get_json()
    assert 'Logged out successfully' in data.get('message', '')
