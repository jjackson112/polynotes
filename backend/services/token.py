from flask import request, jsonify
import os
import jwt
from models.user import User

# JWT is stateless - not stored in db - has 3 parts
# Header tells system it's a JWT
# Payload is the data - user_id, etc.
# Signature - created by taking the header + payload + secret key and hashing them
# only the server knows the secret key

# when user wants to see the token the frontend sends that token to the header
# decorator (token_required) - decodes the token, verifies tehe signature, and pulls the user_id and attaches the User object to the request