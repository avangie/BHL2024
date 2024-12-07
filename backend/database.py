from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

Base = declarative_base()

class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    date = Column(DateTime, default=datetime.datetime.utcnow)
    sender = Column(String(100))
    text = Column(Text)
    image = Column(LargeBinary)

    def __init__(self, sender, text, image=None):
        self.sender = sender
        self.text = text
        self.image = image

    def __repr__(self):
        return f"<Message(id={self.id}, sender={self.sender}, date={self.date}, text={self.text[:20]})>"

def create_db():
    engine = create_engine('sqlite:///messages.db', echo=True)
    Base.metadata.create_all(engine)
    return engine

def add_message(session, sender, text, image=None):
    message = Message(sender=sender, text=text, image=image)
    session.add(message)
    session.commit()
    print(f"Message from {sender} added at {message.date}")

def get_all_messages(session):
    messages = session.query(Message).all()
    for msg in messages:
        print(msg)

def main():
    engine = create_db()
    Session = sessionmaker(bind=engine)
    session = Session()

    add_message(session, "Alice", "Hello, this is a test message!")

    get_all_messages(session)

if __name__ == "__main__":
    main()
