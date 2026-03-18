# Job Auto

Full-stack job search app:

- **Frontend**: React + TypeScript + Vite
- **Backend**: FastAPI + Uvicorn
- **Job data source**: [SerpApi](https://serpapi.com/) Google Jobs engine

Users can enter a **job title** and select one or more **locations**. The backend runs the scraper, writes results to `google_jobs_combined.json`, and the frontend displays the updated jobs list.

---

## Prerequisites

- **Node.js** (for the frontend)
- **Python 3.10+** (recommended) for the backend
- A **SerpApi API key** (free/paid plans available)

---

## 1) Get a SerpApi API key

1. Create an account on SerpApi: `https://serpapi.com/`
2. Copy your API key from your dashboard

This app expects the key in an environment variable named **`SERPAPI_API_KEY`**.

---

## 2) Backend setup (FastAPI)

From the project root:

```bash
python -m pip install -r backend/requirements.txt
```

### Configure environment variables

Create `backend/.env`:

```env
SERPAPI_API_KEY=YOUR_SERPAPI_KEY_HERE
```

Make sure `.env` is ignored by git (already recommended):

```gitignore
backend/.env
.env
```

### Run the backend

```bash
cd backend
python -m uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

Backend endpoints:

- **`GET /jobs`**: returns the jobs currently saved in `google_jobs_combined.json`
- **`POST /search`**: accepts `{ "job_title": string, "locations": string[] }`, runs the scraper, returns the new jobs list

---

## 3) Frontend setup (React + Vite)

From the project root:

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and calls the backend on `http://localhost:8000`.

---

## Common issues

### `uvicorn` not recognized

Use:

```bash
python -m uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

Or reinstall backend deps:

```bash
python -m pip install -r backend/requirements.txt
```

### Missing `SERPAPI_API_KEY`

If you see an error like “Missing SERPAPI_API_KEY”, create `backend/.env` and add your key:

```env
SERPAPI_API_KEY=YOUR_SERPAPI_KEY_HERE
```

---

## Notes

- Scraping can take a little time depending on query/locations and pagination.
- `google_jobs_combined.json` is written by `backend/scraper.py` and read by `backend/api.py`.
