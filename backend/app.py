from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes.health import health_bp
from routes.auth import auth_bp
from routes.notes import notes_bp

# create the database without the app and initialize later
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

# Database configuration
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///polynotes.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Connect SQL to app
    db.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(health_bp)
    app.register_blueprint(notes_bp)
    
    return app
