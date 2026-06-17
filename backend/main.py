from fastapi import FastAPI
from app.routes.chat import router as chat_router
from app.routes.pdf import router as pdf_router

app = FastAPI()

app.include_router(
    chat_router,
    prefix="/api/chat",
    tags=["Chat"]
)

app.include_router(
    pdf_router,
    prefix="/api/pdf",
    tags=["PDF"]
)

@app.get("/")
def home():
    return {"message": "working"}