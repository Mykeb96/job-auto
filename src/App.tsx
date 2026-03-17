import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "./api/jobs";
import JobCard from "./components/JobCard/JobCard";
import type { Job } from "./types/job";
import "../src/styles/App.css"
import FilterTool from "./components/FilterTool/FilterTool";
import { postedAgeHours } from "./utils/postedAge";
import Navigation from "./components/Navigation/Navigation";
import SearchModal from "./components/SearchModal/SearchModal";

function App() {
  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const [search] = useState("");
  const [location] = useState("All");
  const [roleFilter, setRoleFilter] = useState<"full-time" | "contractor" | "both">("both");
  const [postedMaxHours, setPostedMaxHours] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false)

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = location === "All" || job.location.includes(location);

      const schedule = (job.schedule ?? "").toLowerCase();
      const matchesRole =
        roleFilter === "both" ||
        (roleFilter === "full-time" && schedule.includes("full")) ||
        (roleFilter === "contractor" && (schedule.includes("contract") || schedule.includes("contractor")));

      const matchesPosted = (() => {
        if (postedMaxHours == null) return true;
        const age = postedAgeHours(job.posted);
        if (age == null) return false;
        return age <= postedMaxHours;
      })();

      return matchesSearch && matchesLocation && matchesRole && matchesPosted;
    });
  }, [jobs, search, location, roleFilter, postedMaxHours]);

  if (isLoading) return <div className="p-8">Loading jobs...</div>;

  return (
    <div className="Container">
      <Navigation 
        showModal={showModal} 
        setShowModal={setShowModal}
      />
      <FilterTool
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        postedMaxHours={postedMaxHours}
        onPostedMaxHoursChange={setPostedMaxHours}
      />
      <div className="Job_List">
        {filteredJobs.map((job: Job, index: number) => <JobCard key={index} job={job}/>)}
      </div>
      <div className="Footer">
        <span className="results_count">Results: {filteredJobs.length}</span>
      </div>
      {showModal && 
        <SearchModal 
          showModal={showModal}
          setShowModal={setShowModal}
        />
      }
    </div>
  )
}

export default App
