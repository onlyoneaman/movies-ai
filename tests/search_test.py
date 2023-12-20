from qdrant_client import QdrantClient
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
import os

load_dotenv()

qdrant_url = os.environ.get("QDRANT_URL", "")
qdrant_key = os.environ.get("QDRANT_KEY", "")

COLLECTION_NAME = os.environ.get("COLLECTION_NAME", "moviesdb")

qdrant_client = QdrantClient(
    url=qdrant_url,
    api_key=qdrant_key,
)

query = "car race"

encoder = SentenceTransformer("all-MiniLM-L6-v2")

hits = qdrant_client.search(
    collection_name=COLLECTION_NAME,
    query_vector=encoder.encode(query),
    limit=5  # Return 5 closest points
)

for hit in hits:
    print(hit.payload["Name"])
