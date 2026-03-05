# consider querying the database by note or tag
# move beyond CRUD - real apps search, filter, and note relationships and tags

from flask import Blueprint, request, jsonify
from app import db

note_bp = Blueprint("note", __name__, url_prefix='/api/note')

@note_bp.route("/", methods=["GET"])
def create_note():
    data = request.get_json()

    if not data:
        return jsonify({"Invalid JSON"}), 400
    
    db.session.add(note)
    db.session.commit()

    return jsonify({"Success"}), 200