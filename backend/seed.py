from app import db, create_app
from models.user import User  
from models.notes import Note

def seed_data():
    with create_app.app_context():
        print("Dropping all tables...")
        db.drop_all()

        print("Creating tables...")
        db.create_all()

        print("Seeding data...")

        user1 = User(username="jazz", email="jazz@example.com")
        note1 = User(
            "title": "",
            "language": "",
            "tags": ""
        )

        db.session.add_all([user1, note1])
        db.session.commit()

        print("Seeding complete!")

if __name__ == "__main__":
    seed_data()