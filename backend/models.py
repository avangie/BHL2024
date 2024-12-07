from dataclasses import dataclass, field

from backend.database import Base
import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy import create_engine


@dataclass
class Pocztowka:
    author: str = ""
    recipient: str = ""
    title: str = ""
    message: str = ""
    time: str = ""
    files: list[str] = field(default_factory=lambda: [])


TAGS = ["family", "Earth", "Poland", "Europe"]
SORT_BY = ["time_asc", "time_desc"]


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True)  # Klucz główny
    date = Column(DateTime, default=datetime.datetime.utcnow)  # Data wiadomości
    sender = Column(String(100))  # Nadawca
    text = Column(Text)  # Tekst wiadomości
    image = Column(String(200))  # Ścieżka do obrazu (zmiana z LargeBinary)

    def __init__(self, sender, text, date=None, image=None):
        if date is None:
            date = datetime.datetime.utcnow()
        self.sender = sender
        self.text = text
        self.date = date
        self.image = image

    def __repr__(self):
        return f"<Message(id={self.id}, sender={self.sender}, date={self.date}, text={self.text[:20]}, image={self.image})>"


def message_to_pocztowka(message: Message) -> Pocztowka:
    return Pocztowka(
        author=message.sender,
        message=message.text,
        time=message.date,
        files=[message.image],
    )


def pocztowka_to_message(pocztowka: Pocztowka) -> Message:
    return Message(
        sender=pocztowka.author,
        text=pocztowka.message,
        date=pocztowka.time,
        image=pocztowka.files[0],
    )


def get_session():
    engine = create_engine("sqlite:///new_messages.db", echo=True)
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    return session


def add_message(session, sender, text, date, image=None):
    message = Message(sender=sender, text=text, date=date, image=image)
    session.add(message)
    session.commit()
    print(f"Message from {sender} added at {message.date}")
