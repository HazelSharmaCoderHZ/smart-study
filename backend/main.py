from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import study, chat
from app.routes.auth import router as auth_router
from app.routes.pdf import router as pdf_router
from app.config.database import client

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

app.include_router(
    study.router,
    prefix="/api/study",
    tags=["Study"]
)

app.include_router(
    chat.router,
    prefix="/api/chat",
    tags=["Chat"]
)

app.include_router(auth_router)

app.include_router(
    pdf_router,
    prefix="/api/pdf",
    tags=["PDF"]
)

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

import google.generativeai as genai

@app.get("/models")
def list_models():
    models = []

    for model in genai.list_models():
        models.append({
            "name": model.name,
            "methods": model.supported_generation_methods
        })

    return models


@app.get("/test-embedding")
def test_embedding():

    from app.utils.embeddings import get_embedding

    embedding = get_embedding("Hello world")

    return {
        "length": len(embedding)
    }