# Login + Register logic - authentication routes specifically
# Login route verifies credentials + returns the JWT
# Register route hashes the password + saves the new user to the database
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
import os
from extensions import db
from flask import Blueprint, request, jsonify, current_app
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

    secret = current_app.config['SECRET_KEY']
    if not secret:
        return jsonify({"error": "Server misconfiguration"}), 500 

    # Generate JWT token - payload (data)
    # access only token
    token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, secret, algorithm='HS256') # HS256 to decode and catch expired/invalid tokens
    
    refresh_token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=5)
    }, secret, algorithm='HS256')

    if isinstance(token, bytes):
        token = token.decode('utf-8')
    
    return jsonify({
        'token': token,
        'refresh_token' : refresh_token,
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

# refresh endpoint validates the user, but gives them a new access token without logging in again
# used sparingly compared to the access token
@auth_bp.route("/refresh", methods=['POST'])
def refresh():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Data not found"}), 401
    
    refresh_token = data.get("refresh_token")
    if not refresh_token:
        return jsonify({"error": "Missing refresh token"}), 401
    
    try:
        secret = current_app.config['SECRET_KEY']
        if not secret:
            return jsonify({'error': 'Server configuration error (Secret Key missing)'}), 500

        payload = jwt.decode(refresh_token, secret, algorithms=["HS256"])
        user = db.session.get(User, payload["user_id"]) 

        if not user:
            return jsonify({'error': 'User not found!'}), 404
        
        # issue new token
        new_access_token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, secret, algorithm='HS256')

        if isinstance(refresh_token, bytes):
            refresh_token = refresh_token.decode('utf-8')

        return jsonify({"token": new_access_token}), 200
            
    except ExpiredSignatureError:
        return jsonify({'error': 'Token is invalid or expired! Login in again.'}), 401
    
    except InvalidTokenError:
        return jsonify({'error': 'Invalid token!'}), 401
    
    except Exception as e:
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500


# stateless JWT, nothing happens server-side
# @auth_bp.route("/logout", methods=["POST"])
# def logout():
#    return jsonify({"message": "Logged out successfully. Token removed from client"}), 200