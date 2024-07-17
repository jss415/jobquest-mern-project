import { createContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";
import JobsContainer from "../components/JobsContainer";
import SearchContainer from "../components/SearchContainer";
import { useContext } from "react";

export const loader = async ({ request }) => {
  try {
    console.log("Request URL: ", request.url);
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log("params: ", params);
    const { data } = await customFetch.get("/jobs", { params });
    return {
      data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />;
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
