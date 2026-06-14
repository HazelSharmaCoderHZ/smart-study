from datetime import datetime
from app.config.database import db

quiz_collection = db["quizzes"]


def save_quiz(user_email, topic, quiz):

    quiz_collection.insert_one({
        "user_email": user_email,
        "topic": topic,
        "quiz": quiz,
        "created_at": datetime.utcnow()
    })


def get_quizzes(user_email):

    return list(
        quiz_collection.find(
            {"user_email": user_email},
            {"_id": 0}
        ).sort("created_at", -1)
    )