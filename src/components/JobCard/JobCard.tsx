import type { Job } from "../../types/job";
import "./JobCard.css"

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  console.log(job)
  return (
    <div className="JobCard_Container">
      <h2 className="JobCard_Title">{job.title}</h2>
      <h4 className="JobCard_Company">{job.company}</h4>

      <div className="JobCard_Footer">
        <div className="JobCard_Info">
          <span className="JobCard_Tag">{job.schedule}</span>
          {job.posted && <span className="JobCard_Tag">{job.posted}</span>}
          <span className="JobCard_Location">{job.location}</span>
        </div>
        <button>
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Job
          </a>
        </button>

      </div>




    </div>
  );
}