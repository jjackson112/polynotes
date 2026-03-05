from app import db

note_tags = db.Table(
    "note_tags",
    db.Column("note_id", db.Integer, db.ForeignKey("note.id")),
    db.Column("tag_id", db.Integer, db.ForeignKey("tag.id"))
)