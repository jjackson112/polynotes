# create tags + attach tags to notes
# find existing tags
# avoid reduplicating tags

from app import db
from models.tags import Tag

def get_or_create_tags(tag_names):
    # get all tags where name is in the list 
    # if tag_names = ["python", "flask", "backend"] → Tag.name.in_(tag_names)
    existing_tags = Tag.query.filter(Tag.name.in_(tag_names)).all()
    existing_names = {tag.name for tag in existing_tags}

    new_tags = []

    for name in tag_names:
        if name not in existing_names:
            tag = Tag(name=name)
            db.session.add(tag)
            new_tags.append(tag)

        return existing_tags + new_tags
    
def attach_tags(note, tag_names):
    note.tags.clear()

    tags = get_or_create_tags(tag_names)

    for tag in tags:
        note.tags.append(tag)
