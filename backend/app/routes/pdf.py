print("PDF STEP 1")

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends
)

print("PDF STEP 2")

from app.utils.pdf_extractor import extract_text_from_pdf
from app.utils.text_chunker import chunk_text
from app.utils.auth_dependency import get_current_user

import os
import shutil

print("PDF STEP 3")

router = APIRouter()

UPLOAD_DIR = "uploads"


@router.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):

    if not file.filename.endswith(".pdf"):
        return {
            "error": "Only PDF files allowed"
        }

    user_email = current_user["email"]

    user_folder = os.path.join(
        UPLOAD_DIR,
        user_email
    )

    os.makedirs(
        user_folder,
        exist_ok=True
    )

    file_path = os.path.join(
        user_folder,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    text = extract_text_from_pdf(
        file_path
    )

    chunks = chunk_text(text)

    from app.utils.vector_store import store_chunks

    store_chunks(
        chunks,
        file.filename,
        user_email
    )

    return {
        "message": "PDF uploaded and indexed successfully",
        "filename": file.filename,
        "characters_extracted": len(text),
        "chunks_created": len(chunks)
    }


@router.get("/count")
def count_docs():

    from app.config.chroma import collection

    return {
        "count": collection.count()
    }


@router.get("/my-pdfs")
async def get_my_pdfs(
    current_user=Depends(get_current_user)
):

    user_email = current_user["email"]

    user_folder = os.path.join(
        UPLOAD_DIR,
        user_email
    )

    if not os.path.exists(user_folder):
        return []

    pdfs = []

    for filename in os.listdir(user_folder):

        if filename.endswith(".pdf"):
            pdfs.append({
                "filename": filename
            })

    return pdfs


@router.delete("/delete-pdf/{filename}")
async def delete_pdf(
    filename: str,
    current_user=Depends(get_current_user)
):

    user_email = current_user["email"]

    file_path = os.path.join(
        UPLOAD_DIR,
        user_email,
        filename
    )

    if os.path.exists(file_path):
        os.remove(file_path)

    return {
        "message": "PDF deleted successfully"
    }


@router.get("/test-search")
def test_search(
    current_user=Depends(get_current_user)
):

    from app.utils.embeddings import get_embedding
    from app.config.chroma import collection

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


@router.get("/debug-chroma")
def debug_chroma():

    from app.config.chroma import collection

    return collection.get()