from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# create the database without the app and initialize later
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

# Database configuration
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///polynotes.db"

# Connect SQL to app
    db.init_app(app)

    db.session.add()
    db.session.commit()

    return app
