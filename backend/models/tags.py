from app import db

note_tags = db.Table(
    "note_tags",
    db.Column("note_id", db.Integer, db.ForeignKey("note.id")),
    db.Column("tag_id", db.Integer, db.ForeignKey("tag.id"))
)

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }