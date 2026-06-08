import google.generativeai as genai

from app.config.settings import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_answer(context, question):

    prompt = f"""
You are an AI Study Assistant.

Answer ONLY using the provided context.

If the answer cannot be found in the context, reply:

"I could not find the answer in the uploaded documents."

Keep answers concise and educational.

Context:
{context}

Question:
{question}

Answer:
"""

    response = model.generate_content(prompt)

    return response.text

    