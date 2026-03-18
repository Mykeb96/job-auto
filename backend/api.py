from fastapi import FastAPI
from typing import List
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware
from scraper import run_scraper

app = FastAPI()


class SearchRequest(BaseModel):
    job_title: str
    locations: List[str]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/search")
async def search_jobs(payload: SearchRequest):
    jobs = run_scraper(payload.job_title, payload.locations)
    return jobs


@app.get("/jobs")
def get_jobs():
    with open("google_jobs_combined.json", "r", encoding="utf-8") as f:
        return json.load(f)