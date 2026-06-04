from fastapi_mail import ConnectionConfig, FastMail, MessageSchema
from app.config.settings import EMAIL_ADDRESS, EMAIL_PASSWORD

config = ConnectionConfig(
    MAIL_USERNAME=EMAIL_ADDRESS,
    MAIL_PASSWORD=EMAIL_PASSWORD,
    MAIL_FROM=EMAIL_ADDRESS,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT=587,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
)

fast_mail = FastMail(config)


async def send_otp_email(email: str, otp: str):
    message = MessageSchema(
        subject="Smart Study Companion OTP Verification",
        recipients=[email],
        body=(
            "<h2>Smart Study Companion</h2>"
            "<p>Your one-time verification code is:</p>"
            f"<h1>{otp}</h1>"
            "<p>This code expires in 10 minutes.</p>"
        ),
        subtype="html",
    )

    await fast_mail.send_message(message)
