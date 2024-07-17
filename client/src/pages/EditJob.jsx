import { useLoaderData, useParams } from "react-router-dom";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

import Wrapper from "../assets/wrappers/AddJobsPage";
import RowForm from "../components/RowForm";
import RowSelect from "../components/RowSelect";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    console.log("Error", error);
    toast.error(error.response.data.message);
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success("Job edited successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditJob = () => {
  const params = useParams();
  console.log("Params 2: ", params);
  const { job } = useLoaderData();
  console.log("Jobs 2: ", job);
  return (
    <Wrapper>
      <Form method="post" className="form">
        <div className="form-header">
          <h4 className="form-title">edit job</h4>
          <button type="submit" className="btn form-btn">
            Update
          </button>
        </div>
        <div className="form-center">
          <RowForm type="text" name="position" defaultValue={job.position} />
          <RowForm type="text" name="company" defaultValue={job.company} />
          <RowForm
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />
          <RowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <RowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="jobDescription" className="form-label">
            Job Description
          </label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            className="form-textarea"
            rows="4"
            defaultValue={job.jobDescription}
          ></textarea>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
