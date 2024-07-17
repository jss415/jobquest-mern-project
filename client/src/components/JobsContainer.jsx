import { useState, useEffect } from "react";

import Wrapper from "../assets/wrappers/AllJobsPage";
import Job from "./Job";

import { useAllJobsContext } from "../pages/AllJobs";

import { formatDistanceToNow } from "date-fns";
import Pagination from "./Pagination";
import ApplyFollowButton from "./ApplyFollowButton";
import { useDashboardContext } from "../pages/DashboardLayout";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, numOfPages, currentPage, totalJobs } = data;

  const { user } = useDashboardContext();

  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const isFollowing = user.followedJobs.includes(selectedJob._id);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="column">
        {jobs.map((job) => (
          <div key={job._id} onClick={() => handleJobClick(job)}>
            <Job {...job} context="dashboard" />
          </div>
        ))}
        {numOfPages > 1 && <Pagination />}
      </div>
      <div className="column">
        {selectedJob ? (
          <div className="job-description">
            <header className="description-header">
              <div className="company-icon">
                {selectedJob.company.charAt(0)}
              </div>
              <h5 className="company-name">{selectedJob.company}</h5>
            </header>
            <h5 className="company-position">{selectedJob.position}</h5>
            <div className="company-details">
              <div>{selectedJob.jobLocation}, </div>
              <div>
                {formatDistanceToNow(new Date(selectedJob.createdAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
            <ApplyFollowButton
              jobId={selectedJob._id}
              isFollowing={isFollowing}
            />
            <p>{selectedJob.jobDescription}</p>
          </div>
        ) : (
          <p>Select a job from the left column to see details here.</p>
        )}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
