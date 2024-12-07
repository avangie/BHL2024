from dataclasses import dataclass, field
from sqlalchemy import Column, DateTime, Integer, String, Text, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import datetime
from datetime import date
import uuid

Base = declarative_base()


@dataclass
class Pocztowka:
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    author: str = ""
    recipient: str = ""
    title: str = ""
    message: str = ""
    time: date = date.today()
    file: str = ""


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True)
    date = Column(String(100))
    sender = Column(String(100))
    text = Column(Text)
    image = Column(String(200))
    date_str = Column(String(100))

    def __init__(self, sender, text, date_str=None, image=None):
        if date_str is None:
            date_str = str(date.today())
        self.sender = sender
        self.text = text
        self.date_str = date_str
        self.image = image

    def __repr__(self):
        return f"<Message(id={self.id}, sender={self.sender}, date={self.date}, text={self.text[:20]}, image={self.image})>"


def get_session():
    engine = create_engine("sqlite:///new_messages.db", echo=True)
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    return session


def add_message(session, sender, text, date_str, image=None):
    message = Message(sender=sender, text=text, date_str=date_str, image=image)
    session.add(message)
    session.commit()
    print(f"Message from {sender} added at {date_str}")


def add_message_from_input(sender, text, image=None):
    session = get_session()
    date = datetime.datetime.utcnow()
    add_message(session, sender, text, date, image)
    session.close()


def message_to_pocztowka(message: Message) -> Pocztowka:
    return Pocztowka(
        author=message.sender,
        message=message.text,
        time=date.fromisoformat(message.date_str.split(" ")[0]),
        file=message.image,
    )


def pocztowka_to_message(pocztowka: Pocztowka) -> Message:
    return Message(
        sender=pocztowka.author,
        text=pocztowka.message,
        date=pocztowka.time,
        image=pocztowka.file,
    )


def get_all_messages_from_db():
    session = get_session()

    messages = session.query(Message).all()

    session.close()

    return [
        {
            "id": msg.id,
            "date": msg.date,
            "sender": msg.sender,
            "text": msg.text,
            "image": msg.image,
        }
        for msg in messages
    ]


def get_all_pocztowki_from_db():
    session = get_session()

    messages = session.query(Message).all()

    session.close()

    return [message_to_pocztowka(msg) for msg in messages]


# Przykładowe użycie
# if __name__ == "__main__":
#     # Dodajemy wiadomość
#     #add_message_from_input("John", "This is a test message", "assets/images/test.jpg")

#     # Pobieramy wszystkie wiadomości z bazy danych
#     messages = get_all_messages_from_db()

#     # Wyświetlamy wiadomości
#     for msg in messages:
#         print(msg)
