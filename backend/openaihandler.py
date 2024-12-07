import json
from common import Pocztowka, logger
from datetime import date
from openai import OpenAI

client = OpenAI()


def get_data_from_gpt(
    from_time: date,
    to_time: date,
    tags: list[str],
    get_top: int,
) -> list[Pocztowka]:

    prompt = (
        f"I want to see {get_top} most important events from the time range {from_time} "
        + f"to {to_time} about {', '.join(tags)}. The response should be exclusively in JSON format compliant with the class: "
        + '{"title": "...", "message": "...", "time": "YYYY-MM-DD"}'
    )

    response = client.chat.completions.create(
        model="gpt3.5-turbo", messages=[{"role": "user", "content": prompt}]
    )

    logger.info(f"Got response from GPT-3: {response}")

    flag = False
    for i in range(10):
        for j in range(-1, -10, -1):
            try:
                d = json.loads(response.choices[0].message.content[i:j])
                flag = True
                break
            except:
                continue
        if flag:
            break

    logger.info(f"Parsed data from GPT-3: {d}")

    return [Pocztowka(**x) for x in d]
