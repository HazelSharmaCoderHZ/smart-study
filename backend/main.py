from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

print("STEP 1: FastAPI imports loaded")

app = FastAPI(
    title="Smart Study Companion API",
    version="1.0.0"
)

print("STEP 2: FastAPI app created")

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

print("STEP 3: CORS configured")

print("STEP 4: Importing study routes...")
from app.routes import study
print("STEP 5: Study routes imported")

app.include_router(
    study.router,
    prefix="/api/study",
    tags=["Study"]
)

print("STEP 6: Importing database...")
from app.config.database import client
print("STEP 7: Database imported")

print("STEP 8: Importing auth routes...")
from app.routes.auth import router as auth_router
print("STEP 9: Auth routes imported")

print("STEP 10: Importing chat routes...")
from app.routes import chat
print("STEP 11: Chat routes imported")

app.include_router(
    chat.router,
    prefix="/api/chat",
    tags=["Chat"]
)

app.include_router(auth_router)

print("STEP 12: Importing PDF routes...")
from app.routes.pdf import router as pdf_router
print("STEP 13: PDF routes imported")

app.include_router(
    pdf_router,
    prefix="/api/pdf",
    tags=["PDF"]
)

print("STEP 14: All routers registered")


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


print("STEP 15: Application startup complete")