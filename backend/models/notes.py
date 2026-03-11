from app import db
from datetime import datetime
from models.note_tags import note_tags

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(1000), nullable=False)
    language = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # foreign key exists 
    user = db.relationship("User", back_populates="notes")
    tags = db.relationship("Tag", secondary=note_tags, backref="tags")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "content": self.content,
            "language": self.language,
            "tags": [t.name for t in self.tags],
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }