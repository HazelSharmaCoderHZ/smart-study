from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Smart Study Companion API",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",
    "https://smart-study-umber.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from app.routes import study

app.include_router(
    study.router,
    prefix="/api/study",
    tags=["Study"]
)
from app.config.database import client
from app.routes.auth import router as auth_router
from app.routes import chat
app.include_router(
    chat.router,
    prefix="/api/chat",
    tags=["Chat"]
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

