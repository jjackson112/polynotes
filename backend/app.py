from dotenv import load_dotenv
import os
from flask import Flask
from extensions import db
from routes.health import health_bp
from routes.auth import auth_bp
from routes.notes import notes_bp
from routes.auth_protected import auth_protected_bp
from flask_cors import CORS

def create_app():
    # load variables from .env
    load_dotenv()

    app = Flask(__name__)

    # force Flask to show real error
    app.config["DEBUG"] = True

    # stop 308 redirecting - OPTIONS preflight issues
    app.url_map.strict_slashes = False

    CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})

    # Database configuration
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "fallback_dev_secret")
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///polynotes.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Init DB - connect 
    db.init_app(app)

    # with app.app_context():
    #    db.create_all()

    # Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(health_bp)
    app.register_blueprint(notes_bp)
    app.register_blueprint(auth_protected_bp)

    return app