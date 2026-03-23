from dotenv import load_dotenv
import os
from flask import Flask
from extensions import db
from routes.health import health_bp
from routes.auth import auth_bp
from routes.notes import notes_bp

def create_app():
    # load variables from .env
    load_dotenv()
    app = Flask(__name__)

# Database configuration
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "fallback_dev_secret")
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///polynotes.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Connect SQL to app
    db.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(health_bp)
    app.register_blueprint(notes_bp)
    
    return app
