from fastapi import APIRouter, Depends
from app.config.chroma import collection
from app.models.chat import AskRequest
from app.services.rag_service import retrieve_context
from app.services.gemini_service import generate_answer
from app.utils.auth_dependency import get_current_user
from app.services.chat_service import (
    save_chat,
    get_chat_history
)

router = APIRouter()




router = APIRouter()

@router.get("/whoami")
def whoami(
    current_user=Depends(get_current_user)
):
    return current_user
    
@router.get("/test-rag")
def test_rag(
    question: str,
    current_user=Depends(get_current_user)
):

    context = retrieve_context(
        question,
        current_user["email"]
    )

    return {
        "context": context
    }


@router.post("/ask")
def ask_question(
    request: AskRequest,
    current_user=Depends(get_current_user)
):

    context = retrieve_context(
        request.question,
        current_user["email"]
    )

    answer = generate_answer(
        context,
        request.question
    )

    save_chat(
        current_user["email"],
        request.question,
        answer
    )

    return {
        "question": request.question,
        "answer": answer
    }

            
@router.get("/history")
def chat_history(
    current_user=Depends(get_current_user)
):

    chats = get_chat_history(
        current_user["email"]
    )

    return chats

@router.get("/debug-chroma")
def debug_chroma():
    return collection.get()

@router.get("/debug-user")
def debug_user(
    current_user=Depends(get_current_user)
):
    return {
        "email": current_user["email"]
    }