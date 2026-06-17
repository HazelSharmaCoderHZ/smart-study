from google.generativeai import embed_content
import google.generativeai as genai

from app.config.settings import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)


def get_embedding(text):

    response = embed_content(
        model="models/embedding-001",
        content=text,
        task_type="retrieval_document"
    )

    return response["embedding"]