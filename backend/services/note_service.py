from extensions import db
from models.notes import Note
from models.tags import Tag

def create_note(user_id, data):
    title = data.get("title")
    content = data.get("content")
    language = data.get("language")

    if not title or not content or not language:
        raise ValueError("Missing required fields")

    note = Note(
        title=title,
        content=content,
        language=language,
        user_id=user_id,
    )

    tag_names = data.get("tags") or []
    attach_tags(note, tag_names)

    db.session.add(note)
    db.session.commit()

    return note

def update_note(note, data):
    if "title" in data:
        note.title = data["title"]

    if "content" in data:
        note.content = data["content"]

    if "language" in data:
        note.language = data["language"]

    if "tags" in data:
        attach_tags(note, data["tags"])

    db.session.commit()

    return note

def attach_tags(note, tag_names):
    note.tags.clear()

    for name in tag_names:
        normalized_name = name.strip().lower()

        if not normalized_name:
            continue

        tag = Tag.query.filter_by(name=normalized_name).first()

        if not tag:
            tag = Tag(name=normalized_name)
            db.session.add(tag)

        note.tags.append(tag)