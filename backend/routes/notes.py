# consider querying the database by note or tag
# move beyond CRUD - real apps search, filter, and note relationships and tags

from flask import Blueprint, request, jsonify
from app import db
from models.notes import Note
from models.tags import Tag
from services.token import token_required

notes_bp = Blueprint("notes", __name__, url_prefix='/api/notes')

@notes_bp.route("/", methods=["GET"])
@token_required
def get_note(current_user):
    language = request.args.get("language")
    tag = request.args.get("tag")
    
    query = Note.query.filter_by(user_id=current_user.id)
    
    if language:
        query = query.filter_by(language=language)

    if tag:
        query = query.join(Note.tags).filter(Tag.name == tag)
    
    page = request.args.get("page", type=int)
    per_page = request.args.get("limit", 20, type=int)

    # Flask has built-in paginate() to replace all() 
    # return pagination object - the container - that has the data - the items attribute
    notes = query.paginate(page=page, per_page=per_page) 

    return jsonify([note.to_dict() for note in notes.items]), 200


@notes_bp.route("/", methods=["POST"])
@token_required
def create_note(current_user):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400
    
    note = Note(
        title=data.get("title"),
        content=data.get("content"),
        language=data.get("language"),
        user_id=current_user.id,
    )

    tag_names = data.get("tags", [])

    for name in tag_names:
        tag = Tag.query.filter_by(name=name).first()
    
        if not tag:
            tag = Tag(name=name)
            db.session.add(tag)

        note.tags.append(tag)
    
    db.session.add(note)
    db.session.commit()
    
    return jsonify(note.to_dict()), 201

@notes_bp.route("/<int:note_id>", methods=["PATCH"])
@token_required
def update_note(note_id, current_user):
    # Fetch the note but verify owner - filter by user id
    note = Note.query.filter_by(id=note_id, user_id=current_user.id).first_or_404()

    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400
    
    # change the fields now - don't just fetch, read JSON + commit the note
    if "title" in data:
        note.title = data["title"]
    
    if "content" in data:
        note.content = data["content"]

    if "language" in data:
        note.language = data["language"]

    # update tags - optional
    # clear tag + attach new ones
    if "tags" in data:

        note.tags.clear()

    for name in data["tags"]:
        tag = Tag.query.filter_by(name=name).first()

        if not tag:
            tag = Tag(name=name)
            db.session.add(tag)

        note.tags.append(tag)
    
    db.session.commit()

    return jsonify(note.to_dict()), 200

@notes_bp.route("/<int:note_id>", methods=["DELETE"])
@token_required
def delete_note(note_id, current_user):

    # if the note exists but belongs to another person, a 404 error appears
    note = Note.query.filter_by(id=note_id, user_id=current_user).first_or_404()

    db.session.delete(note)
    db.session.commit()

    return jsonify({"message":"Note deleted"}), 200 # or return "", 204 - request succeeded but no content returned
