# consider querying the database by note or tag
# move beyond CRUD - real apps search, filter, and note relationships and tags
# fetching data, updating fields, deleting rows - not business logic

from flask import Blueprint, request, jsonify
from app import db
from models.notes import Note
from models.tags import Tag
from services.token import token_required
from services.note_service import create_note

notes_bp = Blueprint("notes", __name__, url_prefix='/api/notes')

@notes_bp.route("/", methods=["POST"])
@token_required
def create_note(current_user):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400
    
    note = note_service.create_note(current_user.id, data)
    
    return jsonify(note.to_dict()), 201

# single-resource endpoint - simplifies frontend logic + prevents unnecessary large queries
@notes_bp.route("/int:<note_id>", methods=["GET"])
@token_required
def get_single_note(note_id, current_user):
    note = Note.query.filter_by(id=note_id, user_id=current_user.id).first_or_404()

    return jsonify(note.to_dict()), 200

@notes_bp.route("/", methods=["GET"])
@token_required
def get_note(current_user):
    language = request.args.get("language")
    tag = request.args.get("tag")
    
    query = Note.query.filter_by(Note.user_id == current_user.id)
    
    if language:
        query = query.filter_by(language=language)

    if tag:
        query = query.join(Note.tags).filter(Tag.name == tag)
    
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("limit", 20, type=int)

    # Flask has built-in paginate() to replace all() 
    # return pagination object - the container - that has the data - the items attribute
    notes = query.paginate(page=page, per_page=per_page, error_out=False) 

    return jsonify({
        "page": notes.page,
        "per_page": notes.per_page,
        "total": notes.total,
        "pages": notes.pages,
        "items": [note.to_dict() for note in notes.items]
    }), 200

@notes_bp.route("/<int:note_id>", methods=["PATCH"])
@token_required
def update_note(note_id, current_user):
    # Fetch the note but verify owner - filter by user id
    note = Note.query.filter_by(id=note_id, user_id=current_user.id).first_or_404()

    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    return jsonify(note.to_dict()), 200

@notes_bp.route("/<int:note_id>", methods=["DELETE"])
@token_required
def delete_note(note_id, current_user):

    # if the note exists but belongs to another person, a 404 error appears
    note = Note.query.filter_by(id=note_id, user_id=current_user.id).first_or_404()

    db.session.delete(note)
    db.session.commit()

    return jsonify({"message":"Note deleted"}), 200 # or return "", 204 - request succeeded but no content returned
