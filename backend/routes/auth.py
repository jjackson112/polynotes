# Login + Register logic - routes specifically
# Login route verifies credentials + returns the JWT
# Register route hashes the password + saves the new user to the database
import jwt
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
from models.user import User
from flask_jwt_extended import JWTManager

notes_bp = Blueprint("notes", __name__, url_prefix='/api/notes')

@notes_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
