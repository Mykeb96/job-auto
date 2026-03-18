from serpapi import GoogleSearch
import json
import time
import urllib.parse
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("SERPAPI_API_KEY")
if not API_KEY:
    raise RuntimeError("Missing SERPAPI_API_KEY (set it in .env or environment variables).")

# Default job titles if none are provided from the frontend
job_titles = [
    "frontend developer",
    "backend developer",
    "full stack developer",
    "software engineer",
    "web developer",
]

# Default locations if none are provided from the frontend
locations = [
    "United States",
    "San Francisco, CA",
    "New York, NY",
    "Seattle, WA",
    "Austin, TX",
    "Boston, MA",
    "Chicago, IL",
    "Denver, CO",
    "Los Angeles, CA",
    "Portland, OR",
    "Remote",
]


def run_scraper(job_title: str, requested_locations: List[str]) -> List[dict]:
    if job_title and job_title.strip():
        titles_to_search = [job_title.strip()]
    else:
        titles_to_search = job_titles

    if requested_locations:
        locations_to_search = requested_locations
    else:
        locations_to_search = locations

    all_jobs: List[dict] = []
    seen_jobs = set()

    for title in titles_to_search:
        for location in locations_to_search:
            print(f"\nSearching: {title} in {location}")

            params = {
                "engine": "google_jobs",
                "q": title,
                "location": location,
                "hl": "en",
                "api_key": API_KEY,
            }

            next_page_token = None

            while True:
                if next_page_token:
                    params["next_page_token"] = next_page_token
                else:
                    params.pop("next_page_token", None)

                search = GoogleSearch(params)
                results = search.get_dict()

                jobs_results = results.get("jobs_results", [])

                if not jobs_results:
                    print("No jobs returned.")
                    break

                for job in jobs_results:
                    title_name = job.get("title")
                    company = job.get("company_name")
                    location_name = job.get("location")

                    job_key = f"{title_name}_{company}_{location_name}"

                    if job_key in seen_jobs:
                        continue

                    seen_jobs.add(job_key)

                    url = None

                    # Apply links (best)
                    if job.get("apply_options"):
                        url = job["apply_options"][0].get("link")

                    # Direct link
                    elif job.get("link"):
                        url = job.get("link")

                    # Related links
                    elif job.get("related_links"):
                        for link_obj in job.get("related_links"):
                            if link_obj.get("link"):
                                url = link_obj.get("link")
                                break

                    # Google Jobs card using job_id
                    if not url and job.get("job_id"):
                        job_id = job.get("job_id")
                        query = urllib.parse.quote_plus(title_name or "")
                        url = (
                            "https://www.google.com/search?ibp=htl;jobs"
                            f"&q={query}#htivrt=jobs&htidocid={job_id}"
                        )

                    # Fallback search
                    if not url:
                        url = "https://www.google.com/search?q=" + urllib.parse.quote_plus(
                            f"{title_name or ''} {company or ''}"
                        )

                    job_data = {
                        "title": title_name,
                        "company": company,
                        "location": location_name,
                        "via": job.get("via"),
                        "description": job.get("description"),
                        "posted": job.get("detected_extensions", {}).get("posted_at"),
                        "schedule": job.get("detected_extensions", {}).get("schedule_type"),
                        "url": url,
                    }

                    all_jobs.append(job_data)

                print(f"Collected jobs so far: {len(all_jobs)}")

                next_page_token = results.get("search_metadata", {}).get("next_page_token")

                if not next_page_token:
                    break

                time.sleep(1)

    with open("google_jobs_combined.json", "w", encoding="utf-8") as f:
        json.dump(all_jobs, f, indent=2)

    print("\nFinished!")
    print(f"Total jobs saved: {len(all_jobs)}")
    print("File saved: google_jobs_combined.json")

    return all_jobs


if __name__ == "__main__":
    run_scraper("", [])