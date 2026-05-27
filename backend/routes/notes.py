# consider querying the database by note or tag
# move beyond CRUD - real apps search, filter, and note relationships and tags
# fetching data, updating fields, deleting rows - not business logic

from flask import Blueprint, request, jsonify
from extensions import db
from models.notes import Note
from models.tags import Tag
from models.favorites import Favorite
from services.token import token_required
import services.note_service as note_service
from validation.note_validation import validate_create_note
from validation.note_validation import validate_update_note
from validation.note_validation import ALLOWED_LANGUAGES

notes_bp = Blueprint("notes", __name__, url_prefix='/api/notes')

@notes_bp.route("", methods=["POST"])
@token_required
def create_note(current_user):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    error = validate_create_note(data)

    if error:
        return jsonify({"error": error}), 400
    
    note = note_service.create_note(current_user.id, data)

    return jsonify(note.to_dict()), 201

# Flask reads from top to bottom - GET language before note has an id
@notes_bp.route("/languages", methods=["GET"])
def get_language():
    return jsonify(ALLOWED_LANGUAGES), 200

# single-resource endpoint - simplifies frontend logic + prevents unnecessary large queries
@notes_bp.route("/<int:note_id>", methods=["GET"])
@token_required
def get_single_note(current_user, note_id):
    note = Note.query.filter_by(id=note_id, user_id=current_user.id).first_or_404()

    return jsonify(note.to_dict()), 200

@notes_bp.route("", methods=["GET"])
@token_required
def get_notes_list(current_user):
    language = request.args.get("language")
    tag = request.args.get("tag")
    search = request.args.get("search")
    
    query = Note.query.filter_by(user_id=current_user.id)
    
    if language:
        query = query.filter_by(language=language)

    if tag:
        query = query.join(Note.tags).filter(Tag.name == tag)

    if search:
        query = query.filter(
            db.or_(
                Note.title.ilike(f"%{search}%"),
                Note.content.ilike(f"%{search}%")
            )
        )
    
    page = request.args.get("page", 1, type=int)
    per_page = min(
        request.args.get("per_page", 20, type=int), # limit is slightly inconsistent
        1000
    )

    # add ordering to pagination order
    query = query.order_by(Note.created_at.desc())

    # Flask has built-in paginate() to replace all() 
    # return pagination object - the container - that has the data - the items attribute
    pagination = query.paginate(page=page, per_page=per_page, error_out=False) 

    return jsonify({
        "page": pagination.page,
        "per_page": pagination.per_page,
        "total": pagination.total,
        "pages": pagination.pages,
        "items": [note.to_dict() for note in pagination.items],
        "has_next": pagination.has_next,
        "has_prev": pagination.has_prev
    }), 200

@notes_bp.route("/<int:note_id>", methods=["PATCH"])
@token_required
def update_note(current_user, note_id):
    # Fetch the note but verify owner - filter by user id
    note = Note.query.filter_by(id=note_id, user_id=current_user.id).first_or_404()

    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400
    
    error = validate_update_note(data)
    if error:
        return jsonify({"error": error}), 400

    note = note_service.update_note(note, data)
    return jsonify(note.to_dict()), 200

@notes_bp.route("/<int:note_id>", methods=["DELETE"])
@token_required
def delete_note(current_user, note_id):

    # if the note exists but belongs to another person, a 404 error appears
    note = Note.query.filter_by(id=note_id, user_id=current_user.id).first_or_404()

    db.session.delete(note)
    db.session.commit()

    return "", 204 # or return "", 204 - request succeeded but no content returned

@notes_bp.route("/favorites", methods=["GET"])
@token_required
def get_favorites(current_user):
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    note_ids = [f.note_id for f in favorites]

    return jsonify(note_ids)

@notes_bp.route("/favorites/<int:note_id>", methods=["POST"]) 
@token_required
def toggle_favorite(current_user, note_id):
    note = Note.query.filter_by(
        id=note_id,
        user_id=current_user.id
    ).first_or_404()

    favorite = Favorite.query.filter_by(
        user_id=current_user.id,
        note_id=note_id
    ).first()

    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"favorited": False}), 200
    
    new_fav = Favorite(user_id=current_user.id, note_id=note_id)
    db.session.add(new_fav)
    db.session.commit()

    return jsonify({"favorited": True}), 200
