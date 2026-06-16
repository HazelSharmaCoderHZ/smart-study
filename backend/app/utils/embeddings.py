from sentence_transformers import SentenceTransformer

model = None


def get_model():
    global model

    if model is None:
        print("Loading SentenceTransformer model...")
        model = SentenceTransformer(
            "sentence-transformers/all-MiniLM-L6-v2"
        )
        print("Model loaded successfully!")

    return model


def get_embedding(text):
    model = get_model()
    return model.encode(text).tolist()