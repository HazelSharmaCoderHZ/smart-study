import json
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.services.analytics_service import (
    get_analytics
)
from app.utils.auth_dependency import get_current_user
from app.services.rag_service import retrieve_context
from app.services.gemini_service import generate_answer
from app.services.notes_service import save_note, get_notes
from app.services.quiz_service import save_quiz, get_quizzes
from app.services.test_service import (
    save_test_result,
    get_test_results
)
router = APIRouter()
from app.services.insights_service import (
    get_insights
)

class NotesRequest(BaseModel):
    topic: str
class TestResultRequest(BaseModel):
    topic: str
    score: int
    total: int
    percentage: float

def parse_quiz(raw_quiz: str):
    """Helper function to clean markdown wrappers and parse JSON."""
    clean_json = raw_quiz.replace("```json", "").replace("```", "").strip()
    return json.loads(clean_json)

@router.post("/generate-notes")
def generate_notes(
    request: NotesRequest,
    current_user=Depends(get_current_user)
):
    context = retrieve_context(
        request.topic,
        current_user["email"]
    )

    prompt = f"""
    Create detailed study notes on:
    {request.topic}

    Use the following context:
    {context}

    Format:
    Topic
    Definition
    Key Concepts
    Important Points
    Summary
    """

    notes = generate_answer(context, prompt)

    save_note(
        current_user["email"],
        request.topic,
        notes
    )

    return {
        "topic": request.topic,
        "notes": notes
    }

@router.post("/generate-quiz")
def generate_quiz(
    request: NotesRequest,
    current_user=Depends(get_current_user)
):
    context = retrieve_context(
        request.topic,
        current_user["email"]
    )

    prompt = f"""
    Generate exactly 10 MCQs.

    Return ONLY valid JSON.
    Format:

    [
        {{
            "question": "...",
            "options": [
                "A",
                "B",
                "C",
                "D"
            ],
            "answer": "A"
        }}
    ]

    Topic:
    {request.topic}

    Context:
    {context}
    """
    raw_quiz = generate_answer(context, prompt)
    
    # Fixed: Parse the quiz data before saving it
    quiz = parse_quiz(raw_quiz)

    save_quiz(
        current_user["email"],
        request.topic,
        quiz
    )
    
    return {
        "topic": request.topic,
        "quiz": quiz
    }

@router.get("/notes")
def fetch_notes(
    current_user=Depends(get_current_user)
):
    return get_notes(current_user["email"])

@router.get("/quizzes")
def fetch_quizzes(
    current_user=Depends(get_current_user)
):
    return get_quizzes(current_user["email"])

@router.post("/generate-mock-test")
def generate_mock_test(
    request: NotesRequest,
    current_user=Depends(get_current_user)
):
    context = retrieve_context(
        request.topic,
        current_user["email"]
    )

    prompt = f"""
    Generate exactly 10 MCQs.

    Return ONLY valid JSON.

    Format:

    [
      {{
        "question": "Question text",
        "options": [
          "Option A",
          "Option B",
          "Option C",
          "Option D"
        ],
        "answer": "Correct Option"
      }}
    ]

    Topic:
    {request.topic}

    Context:
    {context}

    Do not include markdown.
    Do not include explanation.
    Return only JSON.
    """

    response = generate_answer(context, prompt)

    try:
        # If Gemini still returns markdown blocks, clean them
        clean_response = response.replace("```json", "").replace("```", "").strip()
        quiz = json.loads(clean_response)

        return {
            "topic": request.topic,
            "questions": quiz
        }

    except Exception as e:
        return {
            "error": str(e),
            "raw_response": response
        }


@router.post("/save-test-result")
def save_result(
    request: TestResultRequest,
    current_user=Depends(get_current_user)
):

    save_test_result(
        current_user["email"],
        request.topic,
        request.score,
        request.total,
        request.percentage
    )

    return {
        "message": "Result saved successfully"
    }

@router.get("/test-results")
def fetch_results(
    current_user=Depends(get_current_user)
):

    return get_test_results(
        current_user["email"]
    )

@router.get("/analytics")
def analytics(
    current_user=Depends(get_current_user)
):

    return get_analytics(
        current_user["email"]
    )

@router.get("/insights")
def insights(
    current_user=Depends(get_current_user)
):

    return get_insights(
        current_user["email"]
    )