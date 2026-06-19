# backend/routes/auth_protected.py

from flask import Blueprint, jsonify
from services.token import token_required

auth_protected_bp = Blueprint(
    "auth_protected",
    __name__,
    url_prefix="/api/auth"
)

@auth_protected_bp.route("/protected", methods=["GET"])
@token_required
def protected(current_user):
    return jsonify({
        "message": f"Hello {current_user.username}, your token is valid!"
    }), 200