import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

import Wrapper from "../assets/wrappers/AddJobsPage";
import RowForm from "../components/RowForm";
import RowSelect from "../components/RowSelect";
import { JOB_TYPE, JOB_STATUS } from "../../../utils/constants";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    toast.success("Job added successfully");
    return redirect("all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddJob = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <div className="form-header">
          <h4 className="form-title">add job</h4>
          <button type="submit" className="btn form-btn">
            Submit Job
          </button>
        </div>
        <div className="form-center">
          <RowForm type="text" name="position" />
          <RowForm type="text" name="company" />
          <RowForm type="text" labelText="job location" name="jobLocation" />
          <RowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <RowSelect
            name="jobType"
            labelText="job type"
            defaultValue={JOB_TYPE.FULL_TIME}
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
          ></textarea>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
