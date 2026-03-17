# no need for separate JSON file - db already has permanent storage
# Note model is the class, the routes are the blueprint
# db session commits changes

from app import db
from models.notes import Note
from models.tags import Tag

def attach_tags(note, tag_names):
    # attach tags to a note, creating them if needed
    note.tags.clear()

    for name in tag_names:
        tag = Tag.query.filter_by(name=name).first()

        if not tag:
            tag = Tag(name=name)
            db.session.add(tag)

        note.tags.append(tag)

# create notes - managed relationships + enforcing that tags must exist
def create_note(user_id, data):

    note = Note(
        title=data.get("title"),
        content=data.get("content"),
        language=data.get("language"),
        user_id=user_id,
    )
    
    tag_names = data.get("tags", [])
    attach_tags(note, tag_names)
    
    db.session.add(note)
    db.session.commit()

    return note
    
# list notes - fine in routes

# update notes - fetch data logic remains in routes
def update_note(note, data):
    
    # change the fields now - don't just fetch, read JSON + commit the note
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
# delete notes - fine in routes
