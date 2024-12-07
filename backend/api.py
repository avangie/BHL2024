from fastapi import FastAPI, Query
from typing import Dict, List, Optional
from datetime import date

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


TAGS = ["rodzina", "Ziemia", "Polska"]


# Define a GET endpoint
@app.get("/data", response_model=Dict)
def get_example_data(
    from_time: Optional[str] = Query(None, description="Start time in ISO format"),
    to_time: Optional[str] = Query(None, description="End time in ISO format"),
    tags: Optional[List[str]] = Query(None, description="List of tags to filter items"),
    get_top: Optional[int] = Query(None, description="Number of top items to return"),
):
    print(
        f"dostalem zapytanie z parametrami: from_time={from_time}, to_time={to_time}, tags={tags}, get_top={get_top}"
    )
    parsed_from_time = None
    parsed_to_time = None
    try:
        parsed_from_time = date.fromisoformat(from_time)
    except:
        pass
    try:
        parsed_to_time = date.fromisoformat(to_time)
    except:
        pass
    parsed_tags = [tag for tag in tags if tag in TAGS] if tags else []
    parsed_get_top = get_top if get_top else 10

    print(
        f"przeparsowalem do: from_time={parsed_from_time}, to_time={parsed_to_time}, tags={parsed_tags}, get_top={parsed_get_top}"
    )

    filtered_items = example_data["items"]
    x = None
    y = None
    try:
        x = date.fromisoformat(from_time)
    except:
        pass
    try:
        y = date.fromisoformat(to_time)
    except:
        pass

    if tags:
        filtered_items = [item for item in filtered_items if item["name"] in tags]

    # Construct response with filtered items
    response = {
        "message": example_data["message"],
        "author": example_data["author"],
        "filtered_items": filtered_items,
        "from_time": from_time,
        "to_time": to_time,
        "x": x.strftime("%Y-%m-%d-%H-%M") if x else None,
        "y": y,
    }
    return response


# To run the server, use: `uvicorn filename:app --reload` (replace `filename` with the name of this file)
