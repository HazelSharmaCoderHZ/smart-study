from datetime import datetime

from app.config.database import db

chat_collection = db["chat_history"]


def save_chat(user_email, question, answer):

    chat_collection.insert_one({
        "user_email": user_email,
        "question": question,
        "answer": answer,
        "created_at": datetime.utcnow()
    })


def get_chat_history(user_email):

    chats = list(
        chat_collection.find(
            {"user_email": user_email},
            {"_id": 0}
        ).sort("created_at", -1)
    )

    return chats