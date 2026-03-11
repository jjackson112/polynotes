from app import db, create_app
from models.user import User  
from models.notes import Note
from models.tags import Tag # even if not used it must be imported so that SQLAlchemy can register the table

def seed_data():
    app = create_app()

    with app.app_context():
        print("Dropping all tables...")
        db.drop_all()

        print("Creating tables...")
        db.create_all()

        print("Seeding data...")

        user1 = User(
            username="jazz", 
            email="jazz@example.com"
        )

        note1 = Note(
            title = "Primera nota",
            content = "Estoy aprendiendo Flask",
            language = "es",
        )

        tag1 = Tag(
            name = "español"
        )

        note1.tags.append(tag1)

        db.session.add_all([user1, note1, tag1])
        db.session.commit()

        print("Seeding complete!")

if __name__ == "__main__":
    seed_data()