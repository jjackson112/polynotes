# no need for separate JSON file - db already has permanent storage
# Note model is the class, the routes are the blueprint
# db session commits changes

from app import db
from models.notes import Note
from models.tags import Tag

# create notes
def create_note(user_id, data):

    note = Note(
        title=data.get("title"),
        content=data.get("content"),
        language=data.get("language"),
        user_id=user_id,
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
    
# list notes
# update notes
# delete notes

