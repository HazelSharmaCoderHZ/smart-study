from app.config.database import db
import os

notes_collection = db["notes"]
quiz_collection = db["quizzes"]
test_collection = db["test_results"]


def get_analytics(user_email):

    notes_count = notes_collection.count_documents(
        {"user_email": user_email}
    )

    quizzes_count = quiz_collection.count_documents(
        {"user_email": user_email}
    )

    tests_count = test_collection.count_documents(
        {"user_email": user_email}
    )

    results = list(
        test_collection.find(
            {"user_email": user_email}
        )
    )

    average_score = 0

    if results:
        average_score = round(
            sum(
                r["percentage"]
                for r in results
            ) / len(results)
        )

    user_folder = os.path.join(
        "uploads",
        user_email
    )

    pdf_count = 0

    if os.path.exists(user_folder):
        pdf_count = len(
            [
                file
                for file in os.listdir(user_folder)
                if file.endswith(".pdf")
            ]
        )

    return {
        "pdfs_uploaded": pdf_count,
        "notes_generated": notes_count,
        "quizzes_generated": quizzes_count,
        "tests_taken": tests_count,
        "average_score": average_score
    }