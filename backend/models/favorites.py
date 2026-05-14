from extensions import db
from datetime import datetime

# favorites table is modeled how Reddit saves posts or Instagram bookmarks
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    note_id = db.Column(db.Integer, db.ForeignKey("note.id"), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint("user_id", "note_id"),
    )