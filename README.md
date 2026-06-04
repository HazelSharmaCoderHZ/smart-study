# smart-study

Smart Study Companion backend now uses Gmail SMTP OTP verification for signup.

## Backend Email Verification Setup

Add these environment variables in `backend/.env`:

- `EMAIL_ADDRESS=` your Gmail address
- `EMAIL_PASSWORD=` your Gmail App Password

Existing authentication flow remains unchanged for:

- JWT login
- password hashing
- protected routes
- MongoDB connection

## New Auth Endpoints

- `POST /auth/signup`
- `POST /auth/verify-otp`
- `POST /auth/resend-otp`
- `POST /auth/login`
 
