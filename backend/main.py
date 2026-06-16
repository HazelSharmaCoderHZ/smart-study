from fastapi import FastAPI

app = FastAPI()

from app.routes.auth import router as auth_router

app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "alive"}