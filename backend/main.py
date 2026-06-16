from fastapi import FastAPI

print("MAIN LOADED")

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Backend running"}