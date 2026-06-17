import google.generativeai as genai
from app.config.settings import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

def get_embedding(text):

    response = genai.embed_content(
        model="models/gemini-embedding-2",
        content=text
    )

    return response["embedding"]