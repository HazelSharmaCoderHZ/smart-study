model = None

def get_embedding(text):
    global model

    if model is None:
        print("LOADING MODEL...")

        from sentence_transformers import SentenceTransformer

        model = SentenceTransformer(
            "sentence-transformers/all-MiniLM-L6-v2"
        )

    return model.encode(text).tolist()

def get_model():
    global model

    if model is None:
        from sentence_transformers import SentenceTransformer

        print("Loading SentenceTransformer model...")

        model = SentenceTransformer(
            "sentence-transformers/all-MiniLM-L6-v2"
        )

        print("Model loaded successfully!")

    return model