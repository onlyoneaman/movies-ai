import pandas as pd
import os
from concurrent.futures import ThreadPoolExecutor
from qdrant_client import QdrantClient, models
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

print("Initializing...")

# Load environment variables from .env file
load_dotenv()

def get_point(row):
    return models.Record(
        id=row["id"],
        vector=encoder.encode(row["Description"]),
        payload={
            "movie_id": row["id"],
            "Name": row["Name"],
            "PosterLink": row["PosterLink"],
            "Genres": row["Genres"],
            "Actors": row["Actors"],
            "Director": row["Director"],
            "Description": row["Description"],
            "Keywords": row["Keywords"],
            "year": row["year"],
        },
    )

qdrant_url = os.environ.get("QDRANT_URL", "")
qdrant_key = os.environ.get("QDRANT_KEY", "")

MOVIES_FILENAME = "./data/movies_data.csv"
WIKI_MOVIES_FILENAME = "./data/wiki_movie_plots_deduped.csv"

COLLECTION_NAME = os.environ.get("COLLECTION_NAME", "moviesdb")

qdrant_client = QdrantClient(
    url=qdrant_url,
    api_key=qdrant_key,
)

it = 0

# Use Local Memory
# qdrant_client = QdrantClient(":memory:")

encoder = SentenceTransformer("all-MiniLM-L6-v2")

def main():
    # Load and prepare dataset
    print("Loading dataset...")
    useCols = [
        'id', 'Name', 'PosterLink', 'Genres', 'Actors', 
        'Director','Description', 'DatePublished', 'Keywords',
        'RatingValue', 'url'
    ]
    df=pd.read_csv(
        MOVIES_FILENAME, 
        usecols = useCols,
        parse_dates = ["DatePublished"]
    )
    df["year"] = df["DatePublished"].dt.year.fillna(0).astype(int)
    df.drop(["DatePublished"], axis=1, inplace=True)
    df = df[df.year > 1970]

    # Plot dataset
    print("Loading Plots...")
    plots = pd.read_csv(WIKI_MOVIES_FILENAME)
    plots = plots[plots['Release Year'] > 1970]
    plots = plots[plots.duplicated(subset=['Title', 'Release Year', 'Plot']) == False]
    plots = plots[plots.duplicated(subset=['Title', 'Release Year']) == False]
    plots = plots[['Title', 'Plot', 'Release Year']]
    plots.columns = ['Name', 'Plot', 'year']

    # Merge
    print("Merging datasets...")
    df = df.merge(plots, on=['Name', 'year'], how='left').fillna('')
    df.reset_index(drop=True, inplace=True)

    print("Number of movies:", len(df))

    print("Creating Collection...")
    qdrant_client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=models.VectorParams(
            size=encoder.get_sentence_embedding_dimension(),  # Vector size is defined by used model
            distance=models.Distance.COSINE,
        ),
    )

    records = []

    def create_record(row):
        record = get_point(row)
        records.append(record)
        global it
        it += 1
        print("Adding record", it, "of", len(df))

    # Create a ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=10) as executor:
        # Submit tasks to the executor
        for _, row in df.iterrows():
            executor.submit(create_record, row)

    print("Adding data...", len(records))
    qdrant_client.upload_records(
        collection_name=COLLECTION_NAME,
        records=records,
    )

    print("Done!")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(e)
        print("Error!")
