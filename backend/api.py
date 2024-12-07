from fastapi import FastAPI
from typing import Dict

# Create an instance of the FastAPI application
app = FastAPI()

# Define example data to return
example_data = {
    "message": "Hello, World!",
    "author": "FastAPI Example",
    "items": [{"id": 1, "name": "Item 1"}, {"id": 2, "name": "Item 2"}],
}


# Define a GET endpoint
@app.get("/data", response_model=Dict)
def get_example_data():
    """
    A simple GET endpoint that returns example data.
    """
    return example_data


# To run the server, use: `uvicorn filename:app --reload` (replace `filename` with the name of this file)
