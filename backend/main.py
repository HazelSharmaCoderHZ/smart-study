from fastapi import FastAPI
from app.config.database import client
from app.routes.auth import router as auth_router

app = FastAPI(
    title="Smart Study Companion API",
    version="1.0.0"
)

app.include_router(auth_router)
from app.routes.pdf import router as pdf_router
app.include_router(pdf_router, prefix="/api/pdf", tags=["PDF"])

@app.get("/")
def home():
    return {
        "message": "Smart Study Companion Backend Running"
    }


@app.get("/test-db")
def test_database():
    try:
        client.admin.command("ping")

        return {
            "status": "success",
            "message": "MongoDB connected successfully"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }