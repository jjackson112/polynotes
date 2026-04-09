from flask import Blueprint, jsonify
from services.token import token_required

auth_protected_bp = Blueprint("auth_protected", __name__, url_prefix='/api/auth')

# Add a protected route to test decorator 
# 401 for requests with an invalid token or an absent one
@auth_protected_bp.route("/protected", methods=["GET"])
@token_required
def protected_route(user):
    return jsonify({"message": f"Hello {user.username}, your token is valid!"})