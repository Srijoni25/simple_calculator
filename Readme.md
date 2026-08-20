Simple React + Python (FastAPI) calculator

Structure:
- backend/
  - main.py
  - requirements.txt
- frontend/
  - package.json
  - vite.config.js
  - index.html
  - src/
    - main.jsx
    - App.jsx
    - index.css

Run backend:
1. cd backend
2. python -m venv venv
3. source venv/bin/activate  # use venv\Scripts\activate on Windows
4. pip install -r requirements.txt
5. uvicorn main:app --reload --port 8000

Run frontend:
1. cd frontend
2. npm install
3. npm run dev
4. Open the URL printed by Vite (usually http://localhost:5173)

The frontend sends requests to http://localhost:8000/calc (CORS allowed).
