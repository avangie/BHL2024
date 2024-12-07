from fastapi import FastAPI, Query
from datetime import date
from dateutil.relativedelta import relativedelta
from backend.models import TAGS, Message, Pocztowka
from database import get_all_messages, add_message


app = FastAPI()


def get_data_from_db(
    from_time: date,
    to_time: date,
    tags: list[str],
    get_top: int,
) -> list[Pocztowka]:

    messages: list[Message] = get_all_messages()
    messages = [
        message
        for message in messages
        if message.date >= from_time and message.date <= to_time
    ]
    pocztowki = [
        Pocztowka(
            author=message.sender,
            message=message.text,
            time=message.date,
            files=[message.image],
        )
        for message in messages
    ]
    pocztowki = [
        pocztowka
        for pocztowka in pocztowki
        if pocztowka.time >= from_time and pocztowka.time <= to_time
    ]

    return [
        Pocztowka(
            author="author",
            # recipient="recipient",
            title="title",
            message="message",
            time="time",
            files=["file1", "file2"],
        ),
        Pocztowka(
            author="author2",
            # recipient="recipient2",
            title="title2",
            message="message2",
            time="time2",
            files=["file3", "file4"],
        ),
    ]


def get_data_from_gpt(
    from_time: date,
    to_time: date,
    tags: list[str],
    get_top: int,
) -> list[Pocztowka]:
    prompt = (
        f'Chcę zobaczyć {get_top} najważniejszych informacji z przedziału czasowego od {from_time} do {to_time} na temat {", ".join(tags)}.'
        + "Chciałbym te dane otrzymać w formacie JSON w następującej strukturze: jest to lista obiektów, gdzie każdy obiekt zawiera pola: "
        + '"title": string, "message": string, "time": string".'
    )
    return [Pocztowka()]


# Define a GET endpoint
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
    parsed_from_time = None
    parsed_to_time = None
    parsed_from_time = (
        date.fromisoformat(from_time)
        if from_time
        else date.today() - relativedelta(years=40)
    )
    parsed_to_time = date.fromisoformat(to_time) if to_time else date.today()
    parsed_tags = [tag for tag in tags if tag in TAGS] if tags else []
    parsed_get_top = get_top if get_top else 10

    print(
        f"przeparsowalem do: from_time={parsed_from_time}, to_time={parsed_to_time}, tags={parsed_tags}, get_top={parsed_get_top}"
    )

    pocztowki = get_data_from_db(
        parsed_from_time, parsed_to_time, parsed_tags, parsed_get_top
    )

    response = [p.__dict__ for p in pocztowki]
    return response


# To run the server, use: `uvicorn filename:app --reload` (replace `filename` with the name of this file)
