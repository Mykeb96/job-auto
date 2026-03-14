import type { Job } from "../types/job";

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch("http://localhost:8000/jobs");
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}