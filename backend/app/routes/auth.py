from datetime import datetime, timedelta
import random

from fastapi import APIRouter, HTTPException, Depends

from app.models.user import (
    UserSignup,
    UserLogin,
    VerifyOTPRequest,
    ResendOTPRequest,
)
from app.services.auth_service import (
    create_user,
    get_user_by_email,
    update_user_otp,
    verify_otp,
)
from app.services.email_service import send_otp_email
from app.utils.password import hash_password, verify_password
from app.utils.jwt_handler import create_access_token
from app.utils.auth_dependency import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


def _generate_otp() -> str:
    return f"{random.randint(0, 999999):06d}"


def _otp_expiry() -> datetime:
    return datetime.utcnow() + timedelta(minutes=10)


@router.post("/signup")
async def signup(user: UserSignup):
    existing_user = get_user_by_email(user.email)

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)
    otp = _generate_otp()
    expires_at = _otp_expiry()

    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "is_verified": False,
        "otp_code": otp,
        "otp_expires_at": expires_at,
    }

    create_user(user_data)
    await send_otp_email(user.email, otp)

    return {"message": "User registered successfully. Check your email for the OTP."}


@router.post("/verify-otp")
async def verify_otp_route(payload: VerifyOTPRequest):
    existing_user = get_user_by_email(payload.email)

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if existing_user.get("is_verified"):
        raise HTTPException(status_code=400, detail="User already verified")

    result = verify_otp(payload.email, payload.otp)

    if result.matched_count == 0:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    return {"message": "Email verified successfully"}


@router.post("/resend-otp")
async def resend_otp_route(payload: ResendOTPRequest):
    existing_user = get_user_by_email(payload.email)

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if existing_user.get("is_verified"):
        raise HTTPException(status_code=400, detail="User already verified")

    otp = _generate_otp()
    expires_at = _otp_expiry()
    update_user_otp(payload.email, otp, expires_at)
    await send_otp_email(payload.email, otp)

    return {"message": "OTP resent successfully. Check your email."}


@router.post("/login")
def login(user: UserLogin):
    existing_user = get_user_by_email(user.email)

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not existing_user["is_verified"]:
        raise HTTPException(status_code=401, detail="Please verify your email first")

    if not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token({"email": existing_user["email"]})

    return {"access_token": token, "token_type": "bearer"}


@router.get("/profile")
def profile(current_user=Depends(get_current_user)):
    return {"user": current_user}
