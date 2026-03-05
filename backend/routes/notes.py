# consider querying the database by note or tag
# move beyond CRUD - real apps search, filter, and note relationships and tags

from flask import Blueprint, request, jsonify
from app import db
from models.notes import Note

notes_bp = Blueprint("notes", __name__, url_prefix='/api/notes')

@notes_bp.route("/<int:user_id>", methods=["GET"])
def get_note(user_id):
    language = request.args.get("language")
    tag = request.args.get("tags")
    
    query = Note.query.filter_by(user_id=user_id)
    
    if language:
        query = query.query.filter_by(language=language)

    if tag:
        query =Note.query.join(Note.tags).filter(Tag.name ==tag)
    
    notes = query.all()

    results =[]

    return jsonify({"Success"}), 200


@notes_bp.route("/", methods=["POST"])
def create_note():
    data = request.get_json()

    if not data:
        return jsonify({"Invalid JSON"}), 400
    
    db.session.add()
    db.session.commit()
    
    return jsonify({"Success"}), 201