from flask import request, jsonify
import os
import jwt
from models.user import User

# JWT is stateless - not stored in db - has 3 parts
# Payload is the data - user_id, etc.
# Signature - created by taking the header + payload + secret key and hashing them
# only the server knows the secret key

# when user wants to see the token the frontend sends that token to the header
# decorator (token_required) - decodes the token, verifies the signature, and pulls the user_id and attaches the User object to the request

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Authorization header tells system it's a JWT
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            token = auth_header.split(" ")[1] if " " in auth_header else auth_header

        if not token:
            return jsonify({'error', 'Token is missing'}), 401
        
        try:
            data = jwt.decode(token, os.getenv('SECRET_KEY'), algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'error': 'Token is invalid or expired!'}), 401

        return f(current_user, *args, **kwargs)
    return decorated