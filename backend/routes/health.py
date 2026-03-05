# Blueprint acts as a detachable set of routes so app.py is not bogged down
# jsonify returns a dict directly in Flask - valid json data as HTTP

from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__, url_prefix='/api')

@health_bp.route("/health")
def health():
    return jsonify(status="online")