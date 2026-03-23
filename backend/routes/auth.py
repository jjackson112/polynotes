# Login + Register logic - authentication routes specifically
# Login route verifies credentials + returns the JWT
# Register route hashes the password + saves the new user to the database
import jwt
import os
from extensions import db
from flask import Blueprint, request, jsonify
import datetime
from models.user import User

auth_bp = Blueprint("auth", __name__, url_prefix='/api/auth')

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'error': "Invalid username or password"}), 401

    secret = os.getenv('SECRET_KEY')
    if not secret:
        return jsonify({"error": "Server misconfiguration"}), 500 

    # Generate JWT token
    token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, secret, algorithm='HS256')

    if isinstance(token, bytes):
        token = token.decode('utf-8')
    
    return jsonify({
        'token': token,
        'user': user.to_dict() # Helpful to send user info back on login
    }), 200

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    email = data.get('email', '').strip()

    if not username.strip() or not password.strip() or not email.strip():
        return jsonify({'error': "Username, email, and password are required"}), 400

    # old line created a new local object instead of querying the database
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({'error': "Username has already been taken."}), 400
    
    new_user = User(username=username, email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': "User registered successfully."}), 201