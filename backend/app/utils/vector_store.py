from app.config.chroma import collection

def store_chunks(chunks, filename, user_id):
    from app.utils.embeddings import get_embedding

    print("STORING USER:", repr(user_id))

    for idx, chunk in enumerate(chunks):

        embedding = get_embedding(chunk)

        collection.add(
            ids=[f"{user_id}_{filename}_{idx}"],
            embeddings=[embedding],
            documents=[chunk],
            metadatas=[{
                "source": filename,
                "user_id": str(user_id)
            }]
        )

    print("Total documents in DB:", collection.count())