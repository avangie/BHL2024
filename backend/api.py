from fastapi import FastAPI, Query
from typing import Dict, List, Optional

# Create an instance of the FastAPI application
app = FastAPI()

# Define example data to return
example_data = {
    "message": "Hello, World!",
    "author": "FastAPI Example",
    "items": [
        {"id": 1, "name": "Item 1"},
        {"id": 2, "name": "Item 2"},
        {"id": 3, "name": "Item 3"},
        {"id": 4, "name": "Item 4"},
    ],
}


def get_data_from_gpt(
    from_time: Optional[str] = None,
    to_time: Optional[str] = None,
    tags: Optional[List[str]] = None,
    get_top: Optional[int] = None,
):
    prompt = (
        f'Chcę zobaczyć {get_top} najważniejszych informacji z przedziału czasowego od {from_time} do {to_time} na temat {", ".join(tags)}.'
        + "Chciałbym te dane otrzymać w formacie JSON w następującej strukturze: jest to lista obiektów, gdzie każdy obiekt zawiera pola: "
        + '"short_name": string, "full_description": string, "time": string".'
    )


# Define a GET endpoint
@app.get("/data", response_model=Dict)
def get_example_data(
    from_time: Optional[str] = Query(None, description="Start time in ISO format"),
    to_time: Optional[str] = Query(None, description="End time in ISO format"),
    tags: Optional[List[str]] = Query(None, description="List of tags to filter items"),
    get_top: Optional[int] = Query(None, description="Number of top items to return"),
):
    filtered_items = example_data["items"]

    if tags:
        filtered_items = [item for item in filtered_items if item["name"] in tags]

    # Construct response with filtered items
    response = {
        "message": example_data["message"],
        "author": example_data["author"],
        "filtered_items": filtered_items,
        "from_time": from_time,
        "to_time": to_time,
    }
    return response


# To run the server, use: `uvicorn filename:app --reload` (replace `filename` with the name of this file)
