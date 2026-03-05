from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), Unique=True, nullable=False)
    email = db.Column(db.String(120), Unique=True, nullable=False)
    password_hash = db.Column(db.String(40), Unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

