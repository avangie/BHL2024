from fastapi import FastAPI, Query
from datetime import date
from dateutil.relativedelta import relativedelta
from models import add_message, get_session, TAGS, SORT_BY, Pocztowka


app = FastAPI()


def get_data_from_db(
    from_time: date,
    to_time: date,
    get_top: int,
    sort_by: str,
) -> list[Pocztowka]:
    pocztowki: list[Pocztowka] = get_all_pocztowki()
    pocztowki = [
        pocztowka
        for pocztowka in pocztowki
        if pocztowka.time >= from_time and pocztowka.time <= to_time
    ]
    if sort_by == "time_asc":
        pocztowki.sort(key=lambda x: x.time)
    else:
        pocztowki.sort(key=lambda x: x.time, reverse=True)
    return pocztowki[:get_top]


# def get_data_from_gpt(
#    from_time: date,
#    to_time: date,
#    tags: list[str],
#    get_top: int,
# ) -> list[Pocztowka]:
#    prompt = (
#        f'Chcę zobaczyć {get_top} najważniejszych informacji z przedziału czasowego od {from_time} do {to_time} na temat {", ".join(tags)}.'
#        + "Chciałbym te dane otrzymać w formacie JSON w następującej strukturze: jest to lista obiektów, gdzie każdy obiekt zawiera pola: "
#        + '"title": string, "message": string, "time": string".'
#    )
#    return [Pocztowka()]


@app.get("/data", response_model=list[Pocztowka])
def get_example_data(
    from_time: str | None = Query(None, description="Start time in ISO format"),
    to_time: str | None = Query(None, description="End time in ISO format"),
    tags: list[str] | None = Query(None, description="List of tags to filter items"),
    get_top: int | None = Query(None, description="Number of top items to return"),
    sort_by: str | None = Query(None, description="Field to sort by"),
):
    print(
        f"dostalem zapytanie z parametrami: from_time={from_time}, to_time={to_time}, tags={tags}, get_top={get_top}"
    )
    parsed_from_time = (
        date.fromisoformat(from_time)
        if from_time
        else date.today() - relativedelta(years=40)
    )
    parsed_to_time = date.fromisoformat(to_time) if to_time else date.today()
    parsed_tags = [tag for tag in tags if tag in TAGS] if tags else []
    parsed_get_top = get_top if get_top else 10
    parsed_sort_by = sort_by if sort_by else "time_desc"

    print(
        f"przeparsowalem do: from_time={parsed_from_time}, to_time={parsed_to_time}, tags={parsed_tags}, get_top={parsed_get_top}"
    )

    pocztowki = get_data_from_db(
        parsed_from_time, parsed_to_time, parsed_get_top, parsed_sort_by
    )

    response = [p.__dict__ for p in pocztowki]
    return response


@app.post("/upload")
async def upload_file(pocztowka: Pocztowka):
    print(f"Otrzymałem pocztówkę: {pocztowka}")
    # session = get_session()
    # add_message(
    #    session, pocztowka.author, pocztowka.message, pocztowka.time, pocztowka.file
    # )
