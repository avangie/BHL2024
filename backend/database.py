from sqlalchemy import create_engine, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime
import random

Base = declarative_base()

from common import Message


def create_db():
    engine = create_engine("sqlite:///new_messages.db", echo=True)
    Base.metadata.create_all(engine)
    return engine


def add_message(session, sender, text, date, image=None):
    message = Message(sender=sender, text=text, date=date, image=image)
    session.add(message)
    session.commit()
    print(f"Message from {sender} added at {message.date}")


def get_all_messages(session) -> list[Message]:
    messages = session.query(Message).all()
    for msg in messages:
        print(msg)
    return messages


senders = [
    "John",
    "Mary",
    "Alice",
    "Bob",
    "Sophia",
    "David",
    "Emma",
    "Michael",
    "Olivia",
    "James",
]


def generate_message(sender, date):
    messages = [
        "Today was a beautiful day, the sun was shining, and I spent the afternoon with family. It really felt like a peaceful moment after a stressful week.",
        "I can't believe it! Our baby was born today, and everything went smoothly. We're overjoyed and can't wait to bring him home. His name is Lucas.",
        "The weather was really gloomy today, it rained all day. But it gave me the chance to reflect on life and the people I care about.",
        "My grandmother passed away today. It's been a hard day, but I'm glad she lived a full life. I will miss her dearly.",
        "Today, I attended a wedding of two of my close friends. It was such a beautiful ceremony. Their love for each other is inspiring.",
        "It feels like everything is changing so quickly. Work has been demanding, and I haven't had time for myself lately. I need to take a break soon.",
        "I just finished a big project at work, and it went better than I expected! I'm proud of myself for sticking with it.",
        "I spent the day with my old friends. We went hiking and had a picnic at the top of the hill. It was so refreshing to reconnect with them.",
        "The year has gone by so fast, I can't believe it's already almost Christmas. Time really does fly. I'm starting to feel nostalgic about the past year.",
        "I got a new puppy today! His name is Max, and he's so playful. I can't wait to train him and watch him grow.",
        "It's been a quiet day. I went for a walk in the park, and there was a beautiful sunset. Sometimes, small moments like this remind me of how beautiful life is.",
        "Today, I received the promotion I’ve been working for! All the hard work has finally paid off. I'm feeling excited about what the future holds.",
        "I visited the hospital today. My cousin's wife just gave birth to twins! It's going to be a challenge, but they’re so happy.",
        "I had a difficult conversation with my boss today. Things at work haven't been going well lately, but I'm determined to find a solution.",
        "Today was one of those days when I felt completely exhausted. I think I need to take some time for self-care and get some rest.",
        "Our family celebrated Thanksgiving together today. It was a wonderful time, full of laughter and delicious food. We’re all so grateful for each other.",
        "I had an argument with my best friend today. It's been on my mind all day, and I feel conflicted. I hope we can resolve it soon.",
        "I started a new book today, and it's fascinating! I love getting lost in a good story, it’s one of my favorite ways to unwind.",
        "My little sister graduated from college today! I’m so proud of her and everything she’s accomplished. She's going to do great things in life.",
        "It’s been a year since my father passed away. I visited his grave today, and it felt like he was still with me in spirit. Time heals, but the memories stay.",
        "I ran my first marathon today! It was tough, but I finished. I’m so proud of myself and the people who supported me along the way.",
    ]
    return random.choice(messages)


def generate_random_date():
    end_date = datetime.datetime.now()
    start_date = end_date - datetime.timedelta(days=270)
    random_seconds = random.randint(0, int((end_date - start_date).total_seconds()))
    random_date = start_date + datetime.timedelta(seconds=random_seconds)

    return random_date.strftime("%Y-%m-%d %H:%M:%S")


def generate_and_add_messages(session):
    for _ in range(20):
        sender = random.choice(senders)
        date = generate_random_date()
        text = generate_message(sender, date)
        add_message(session, sender, text, date)


def update_message(session, message_id, new_image):
    message = session.query(Message).filter(Message.id == message_id).first()
    if message:
        message.date_str = new_image
        session.commit()
        print(f"Message with id {message_id} has been updated.")
    else:
        print(f"Message with id {message_id} not found.")


def main():
    engine = create_db()
    Session = sessionmaker(bind=engine)
    session = Session()

    for i in range(1, 21):
        new_message_image = generate_random_date()
        update_message(session, i, new_message_image)
    get_all_messages(session)


if __name__ == "__main__":
    main()
