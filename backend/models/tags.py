from app import db
from models.note_tags import note_tags

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    notes = db.relationship("Note", secondary=note_tags, back_populates="tags")
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }