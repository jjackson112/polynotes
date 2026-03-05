from app import db

note_tags = db.Table(
    "note_tags",
    db.Column("note_id", db.Integer, db.ForeignKey("notes.id")),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id"))
)

class Note_Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }