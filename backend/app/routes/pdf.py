from fastapi import APIRouter

print("PDF FILE LOADED")

router = APIRouter()

@router.get("/test")
def test():
    return {"message": "pdf works"}