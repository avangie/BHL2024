from fastapi import FastAPI, Query
from datetime import date
from fastapi.staticfiles import StaticFiles
from dateutil.relativedelta import relativedelta
from fastapi.middleware.cors import CORSMiddleware

from common import Pocztowka, get_all_pocztowki_from_db, add_pocztowka_to_db, logger
from openaihandler import get_data_from_gpt

app = FastAPI()
app.mount("/assets", StaticFiles(directory="assets"), name="assets")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_data_from_db(
    from_time: date,
    to_time: date,
) -> list[Pocztowka]:
    pocztowki: list[Pocztowka] = get_all_pocztowki_from_db()
    pocztowki = [
        pocztowka
        for pocztowka in pocztowki
        if pocztowka.time >= from_time and pocztowka.time <= to_time
    ]
    return pocztowki


@app.get("/data", response_model=list[Pocztowka])
def get_example_data(
    from_time: str | None = Query(None, description="Start time in ISO format"),
    to_time: str | None = Query(None, description="End time in ISO format"),
    tags: list[str] | None = Query(None, description="List of tags to filter items"),
    get_top: int | None = Query(None, description="Number of top items to return"),
    sort_by: str | None = Query(None, description="Field to sort by"),
):

    logger.info(
        f"Input parameters: from_time={from_time}, to_time={to_time}, tags={tags}, get_top={get_top}"
    )

    parsed_from_time = (
        date.fromisoformat(from_time)
        if from_time
        else date.today() - relativedelta(years=5)
    )
    parsed_to_time = date.fromisoformat(to_time) if to_time else date.today()
    parsed_tags = tags if tags else ["family"]
    parsed_get_top = get_top if get_top else 10
    parsed_sort_by = sort_by if sort_by else "time_asc"

    logger.info(
        f"Parsed input parameters: from_time={parsed_from_time}, to_time={parsed_to_time}, tags={parsed_tags}, get_top={parsed_get_top}"
    )

    if "family" in parsed_tags:
        pocztowki = get_data_from_db(parsed_from_time, parsed_to_time)
    else:
        pocztowki = get_data_from_gpt(
            parsed_from_time, parsed_to_time, parsed_tags, parsed_get_top
        )

    if parsed_sort_by == "time_asc":
        pocztowki.sort(key=lambda x: x.time)
    else:
        pocztowki.sort(key=lambda x: x.time, reverse=True)
    pocztowki = pocztowki[:parsed_get_top]

    logger.info(f"Return response: {pocztowki}")

    response = [p.__dict__ for p in pocztowki]
    return response


@app.post("/upload")
async def upload_file(pocztowka: Pocztowka):

    logger.info(f"Incoming pocztowka: {pocztowka}")

    add_pocztowka_to_db(pocztowka)
