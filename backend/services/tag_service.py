# create tags + attach tags to notes
# avoid reduplicating tags
# find existing tags

from app import db
from models.tags import Tag

existing_tags = Tag.query.filter_by().all()
existing_names = {tag.name for tag in existing_tags}


