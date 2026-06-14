from datetime import datetime
from app.config.database import db

test_collection = db["test_results"]


def save_test_result(
    user_email,
    topic,
    score,
    total,
    percentage
):
    test_collection.insert_one({
        "user_email": user_email,
        "topic": topic,
        "score": score,
        "total": total,
        "percentage": percentage,
        "created_at": datetime.utcnow()
    })


def get_test_results(user_email):
    return list(
        test_collection.find(
            {"user_email": user_email},
            {"_id": 0}
        ).sort("created_at", -1)
    )