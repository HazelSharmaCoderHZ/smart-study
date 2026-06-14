from datetime import datetime
from app.config.database import db

notes_collection = db["notes"]


def save_note(user_email, topic, notes):

    notes_collection.insert_one({
        "user_email": user_email,
        "topic": topic,
        "notes": notes,
        "created_at": datetime.utcnow()
    })


def get_notes(user_email):

    return list(
        notes_collection.find(
            {"user_email": user_email},
            {"_id": 0}
        ).sort("created_at", -1)
    )