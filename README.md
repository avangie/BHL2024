## Run app
Add .env file in backend directory with following content:

```
export OPENAI_API_KEY="your_openai_api_key"
```
Then run following commands in backend directory:
```
source .env
fastapi run
```
Then in another terminal window run following command in frontend directory:
```
yarn dev
```

### When app is running
- frontend can be found at [localhost:3000](localhost:3000)
- backend can be found at [localhost:8000](localhost:8000)

## Implementation

In the project we use fastapi and sqlite3 on the backend side, and next.js on the frontend.
