from datetime import datetime
from app.config.database import db

users_collection = db["users"]


def get_user_by_email(email: str):
    return users_collection.find_one({"email": email})


def create_user(user_data: dict):
    return users_collection.insert_one(user_data)

def update_user_otp(email: str, otp: str, expires_at: datetime):
    return users_collection.update_one(
        {"email": email},
        {
            "$set": {
                "otp_code": otp,
                "otp_expires_at": expires_at,
                "is_verified": False,
            }
        }
    )


def verify_otp(email: str, otp: str):
    return users_collection.update_one(
        {
            "email": email,
            "otp_code": otp,
            "otp_expires_at": {"$gt": datetime.utcnow()},
        },
        {
            "$set": {"is_verified": True},
            "$unset": {"otp_code": "", "otp_expires_at": ""},
        }
    )