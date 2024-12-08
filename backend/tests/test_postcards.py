import pytest
from cmmn import get_all_postcards_from_db, Postcard
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from database import create_db


@pytest.fixture
def setup_db():
    # Create an in-memory SQLite database for testing
    engine = create_db()
    Session = sessionmaker(bind=engine)
    session = Session()

    postcard = Postcard(author="John", recipient="Doe", title="Sample Postcard", message="Hello!", time="2024-12-08")
    session.add(postcard)
    session.commit()

    yield session

    session.query(Postcard).delete()
    session.commit()
    session.close()


def test_get_all_postcards_from_db(setup_db):
    postcards = get_all_postcards_from_db()
    assert len(postcards) > 0, "Should return at least one postcard"
    assert postcards[0].author == "John", "Postcard author should be 'John'"


def test_add_postcard_to_db(setup_db):
    session = setup_db
    postcard = Postcard(author="Jane", recipient="Smith", title="Test Postcard", message="Test message", time="2024-12-08")
    add_postcard_to_db(postcard)

    postcards = get_all_postcards_from_db()
    assert len(postcards) > 0, "The postcard should be added to the database"
    assert postcards[-1].author == "Jane", "The last added postcard should be by 'Jane'"
    session.close()