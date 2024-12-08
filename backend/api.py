from uuid import uuid4
from fastapi import FastAPI, Form, Query
from datetime import date
from fastapi.staticfiles import StaticFiles
from dateutil.relativedelta import relativedelta
from fastapi.middleware.cors import CORSMiddleware

from common import Postcard, get_all_postcards_from_db, add_postcard_to_db, logger
from openaihandler import get_data_from_gpt
from fastapi import UploadFile, File

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
) -> list[Postcard]:
    postcards: list[Postcard] = get_all_postcards_from_db()
    postcards = [
        postcard
        for postcard in postcards
        if postcard.time >= from_time and postcard.time <= to_time
    ]
    return postcards


@app.get("/data", response_model=list[Postcard])
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
    parsed_get_top = get_top if get_top else 30
    parsed_sort_by = sort_by if sort_by else "time_asc"

    logger.info(
        f"Parsed input parameters: from_time={parsed_from_time}, to_time={parsed_to_time}, tags={parsed_tags}, get_top={parsed_get_top}"
    )

    if "family" in parsed_tags:
        postcards = get_data_from_db(parsed_from_time, parsed_to_time)
    else:
        postcards = get_data_from_gpt(
            parsed_from_time, parsed_to_time, parsed_tags, parsed_get_top
        )

    if parsed_sort_by == "time_asc":
        postcards.sort(key=lambda x: x.time)
    else:
        postcards.sort(key=lambda x: x.time, reverse=True)
    postcards = postcards[:parsed_get_top]

    logger.info(f"Return response: {postcards}")

    response = [p.__dict__ for p in postcards]
    return response


@app.post("/upload")
async def upload_file(
    author: str = Form(...),
    recipient: str = Form(...),
    title: str = Form(...),
    message: str = Form(...),
    file: UploadFile = File(...),
):
    try:
        # Save the uploaded file
        file_name = f"{uuid4().hex}.{file.filename.split('.')[-1]}"
        file_path = f"assets/{file_name}"

        # Save the file to disk
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        postcard = Postcard(
            author=author,
            recipient=recipient,
            title=title,
            message=message,
            time=date.today(),
            file=file_name,
        )

        add_postcard_to_db(postcard, file_name)

        return {"message": "File and data uploaded successfully", "file_name": file_name}
    
    except Exception as e:
        logger.error(f"Error uploading file: {str(e)}")
        return {"message": "Failed to upload the file", "error": str(e)}
