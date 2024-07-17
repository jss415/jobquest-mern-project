import React, { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import { useLocation } from "react-router-dom";

import Job from "../components/Job";
import Wrapper from "../assets/wrappers/SavedJobsPage";
import Spinner from "../components/Spinner";
import styled from "styled-components";

export const loader = async (tab) => {
  const endpoint =
    tab === "Applied" ? "/applications/stats" : "/users/getFollowedJobs";
  const data = await customFetch.get(endpoint);
  return data;
};

export default function SavedJobs() {
  const [currentTab, setCurrentTab] = useState("Saved");
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await loader(currentTab);
      setJobData(data);
      setLoading(false);
    };
    fetchData();
  }, [currentTab, location.key]);

  if (loading) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }

  if (!jobData || !jobData.data.data || jobData.data.data.length === 0) {
    return (
      <Wrapper>
        <div className="tabs">
          <button
            className={currentTab === "Saved" ? "active" : ""}
            onClick={() => setCurrentTab("Saved")}
          >
            Saved
          </button>
          <button
            className={currentTab === "Applied" ? "active" : ""}
            onClick={() => setCurrentTab("Applied")}
          >
            Applied
          </button>
        </div>
        <h4>My {currentTab} Jobs</h4>
        <p>No jobs {currentTab.toLowerCase()}.</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="tabs">
        <button
          className={currentTab === "Saved" ? "active" : ""}
          onClick={() => setCurrentTab("Saved")}
        >
          Saved
        </button>
        <button
          className={currentTab === "Applied" ? "active" : ""}
          onClick={() => setCurrentTab("Applied")}
        >
          Applied
        </button>
      </div>
      <h4>My {currentTab} Jobs</h4>
      <p>
        {jobData.data.data.length} jobs {currentTab.toLowerCase()}.
      </p>
      <section className="jobs-grid">
        {jobData.data.data.map((item) => (
          <React.Fragment key={item._id}>
            {currentTab === "Applied" ? (
              <Job
                _id={item._id}
                position={item.position}
                company={item.company}
                jobLocation={item.jobLocation}
                jobType={item.jobType}
                createdAt={item.createdAt}
                jobStatus={item.jobStatus}
                context="applied"
              />
            ) : (
              <Job
                _id={item._id}
                position={item.position}
                company={item.company}
                jobLocation={item.jobLocation}
                jobType={item.jobType}
                createdAt={item.createdAt}
                jobStatus={item.jobStatus}
                context="saved"
              />
            )}
          </React.Fragment>
        ))}
      </section>
    </Wrapper>
  );
}
