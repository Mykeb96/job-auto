import type { Job } from "../types/job";

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch("http://localhost:8000/jobs");
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

type SearchPayload = {
  job_title: string;
  locations: string[];
};

export async function searchJobs(payload: SearchPayload): Promise<Job[]> {
  const res = await fetch("http://localhost:8000/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to search jobs");
  return res.json();
}