## Run app

### Installation
> This is a Work in Progress build of the app. 
To install the Last Nine Months app, follow these steps:
1. Clone our repository from [BHL2024 GitHub repo](https://github.com/avangie/BHL2024).
2. Add .env file in backend directory with following content:
> Change <your_openai_api_key> to your openai api key.
```
export OPENAI_API_KEY="your_openai_api_key"
```
3. Run the following commands in backend directory:
```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
source .env
fastapi run
```
4. Start the frontend by running the following commands in front directory.
```bash
npm install
npm build
npm start
```
5. Start the documentation by running the following commands in docs directory:
```
mkdocs serve -a localhost:8001
```

### When app is running
- frontend can be found at [localhost:3000](localhost:3000)
- backend can be found at [localhost:8000](localhost:8000)
- documentation can be found at [localhost:8001](localhost:8001)

## Implementation

In the project we use fastapi and sqlite3 on the backend side, and next.js on the frontend.
