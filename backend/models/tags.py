from app import db

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }