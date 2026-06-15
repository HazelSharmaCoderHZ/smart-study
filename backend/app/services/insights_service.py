from app.config.database import db

test_collection = db["test_results"]


def get_insights(user_email):

    results = list(
        test_collection.find(
            {"user_email": user_email}
        )
    )

    if not results:
        return {
            "best_topic": None,
            "weak_topic": None
        }

    topic_scores = {}

    for result in results:

        topic = result["topic"]

        if topic not in topic_scores:
            topic_scores[topic] = []

        topic_scores[topic].append(
            result["percentage"]
        )

    averages = {
        topic: sum(scores) / len(scores)
        for topic, scores
        in topic_scores.items()
    }

    best_topic = max(
        averages,
        key=averages.get
    )

    weak_topic = min(
        averages,
        key=averages.get
    )

    return {
        "best_topic": {
            "topic": best_topic,
            "score": round(
                averages[best_topic]
            )
        },
        "weak_topic": {
            "topic": weak_topic,
            "score": round(
                averages[weak_topic]
            )
        }
    }