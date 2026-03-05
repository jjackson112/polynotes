from app import db
from datetime import datetime

class Notes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), Unique=True, nullable=False)
    title = db.Column(db.String(50), Unique=False, nullable=False)
    content = db.Column(db.String(1000), Unique=False, nullable=False)
    language = db.Column(db.String(50), Unique=False, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
