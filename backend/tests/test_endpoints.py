from fastapi.testclient import TestClient
from api import app
from io import BytesIO


client = TestClient(app)


def test_get_example_data():
    response = client.get("/data")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list), "Expected response to be a list"
    assert "author" in data[0], "Expected postcard data to contain an 'author'"

def test_upload_file():
    file_data = BytesIO(b"test file content")
    file_data.name = "test.txt"
    response = client.post(
        "/upload",
        files={"file": ("test.txt", file_data, "text/plain")},
        data={"author": "John", "recipient": "Doe", "title": "Test Postcard", "message": "Test message"},
    )

    assert response.status_code == 200
    response_data = response.json()
    assert "file_name" in response_data, "Expected file name in response"
    assert response_data["message"] == "File and data uploaded successfully", "Expected successful upload message"