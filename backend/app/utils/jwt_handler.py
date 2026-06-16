print("JWT HANDLER LOADED")
import jwt
from datetime import datetime, timedelta
from app.config.settings import JWT_SECRET_KEY
from datetime import datetime, timedelta, UTC


def create_access_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.now(UTC) + timedelta(days=1)

    return jwt.encode(
        payload,
        JWT_SECRET_KEY,
        algorithm="HS256"
    )


def verify_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=["HS256"]
        )

        return payload

    except jwt.ExpiredSignatureError:
        return None

    except jwt.InvalidTokenError:
        return None