# create tags + attach tags to notes
# avoid reduplicating tags
# find existing tags

from app import db
from models.tags import Tag

existing_tags = Tag.query.filter_by().all()
existing_names = {tag.name for tag in existing_tags}

new_tags = []

for name in tag_names:
    if name not in existing_names:
        tag = Tag(name=name)
        db.session.add(tag)
        new_tags.append(tag)

    return existing_tags + new_tags