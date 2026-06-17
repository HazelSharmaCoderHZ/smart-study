from fastapi import FastAPI

print("MAIN LOADED")

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Backend running"}

from app.routes.auth import router as auth_router
from app.routes.chat import router