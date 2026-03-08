# Login + Register logic - routes specifically
# Login route verifies credentials + returns the JWT
# Register route hashes the password + saves the new user to the database
import jwt
from flask import request, jsonify
import datetime
from models.user import User

@notes_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'error': "Invalid username or password"}), 401

@notes_bp.route("/register", methods=["POST"])
def register():
