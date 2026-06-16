from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

uri = os.getenv("MONGODB_URI")
print(f"Connecting to: {uri[:40]}...")

try:
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)
    result = client.admin.command("ping")
    print("SUCCESS - MongoDB connected!", result)
except Exception as e:
    print(f"FAILED - {e}")