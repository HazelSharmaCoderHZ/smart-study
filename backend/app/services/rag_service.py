from app.config.chroma import collection

def retrieve_context(question, user_email):

    from app.utils.embeddings import get_embedding

    print("RETRIEVING USER:", repr(user_email))

    query_embedding = get_embedding(question)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=5,
        where={
            "user_id": user_email
        }
    )

    documents = results["documents"][0]

    if not documents:
        return ""

    return "\n\n".join(documents)