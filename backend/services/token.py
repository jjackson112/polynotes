import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
from flask import request, jsonify, current_app
from extensions import db
from functools import wraps
from models.user import User

# JWT is stateless - not stored in db - has 3 parts
# Payload is the data - user_id, etc.
# Signature - created by taking the header + payload + secret key and hashing them
# only the server knows the secret key

# when user wants to see the token the frontend sends that token to the header
# decorator (token_required) - decodes the token, verifies the signature, and pulls the user_id and attaches the User object to the request

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs): # args - extra positional arguments, kwargs - extra named arguments
        token = None

        # Authorization header check tells system it's a JWT
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            # handles bearer and just token
            token = auth_header.split(" ")[1] if " " in auth_header else auth_header

        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            # Try to get secret from Flask config first, then Environment
            secret = current_app.config['SECRET_KEY']
            if not secret:
                return jsonify({'error': 'Server configuration error (Secret Key missing)'}), 500
            
            data = jwt.decode(token, secret, algorithms=['HS256'])
            
            # User.query.filter_by(id=data['user_id']).first() could work too
            current_user = db.session.get(User, data["user_id"]) 

            if not current_user:
                return jsonify({'error': 'User not found!'}), 404
            
        except ExpiredSignatureError:
            return jsonify({'error': 'Token is invalid or expired!'}), 401
        
        except InvalidTokenError:
            return jsonify({'error': 'Invalid token!'}), 401
        
        except Exception as e:
            return jsonify({'error': f'Unexpected error: {str(e)}'}), 500

        # pass the current_user object into the route function
        return f(current_user, *args, **kwargs)
    return decorated
