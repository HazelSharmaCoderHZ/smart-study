from fastapi import APIRouter, UploadFile, File
from app.utils.pdf_extractor import extract_text_from_pdf
from app.utils.text_chunker import chunk_text
import os
import shutil
from app.config.chroma import collection

router = APIRouter()

UPLOAD_DIR = "uploads"

from fastapi import Depends
from app.utils.auth_dependency import get_current_user

@router.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):

    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files allowed"}

    user_email = current_user["email"]

    user_folder = os.path.join(
        UPLOAD_DIR,
        user_email
    )

    os.makedirs(user_folder, exist_ok=True)

    file_path = os.path.join(
        user_folder,
        file.filename
    )
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text_from_pdf(file_path)

    chunks = chunk_text(text)
    from app.utils.vector_store import store_chunks

    store_chunks(
        chunks,
        file.filename,
        current_user["email"]
    )
    print(chunks[:2])  # temporary for testing

    return {
        "message": "PDF uploaded and indexed successfully",
        "filename": file.filename,
        "characters_extracted": len(text),
        "chunks_created": len(chunks)
    }

from app.utils.embeddings import get_embedding

@router.get("/test-search")
def test_search(
    current_user=Depends(get_current_user)
):

    query_embedding = get_embedding(
        "What is DBMS?"
    )

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3,
        where={
            "user_id": current_user["email"]
        }
    )

    return results

    query_embedding = get_embedding("What is DBMS?")

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3,
        where={"user_id": user_id}
    )

    return results

from app.config.chroma import collection

@router.get("/count")
def count_docs():
    return {
        "count": collection.count()
    }