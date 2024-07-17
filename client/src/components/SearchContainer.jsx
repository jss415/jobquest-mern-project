import { Form, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/SearchContainer";
import RowForm from "./RowForm";
import RowSelect from "./RowSelect";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";

const SearchContainer = () => {
  return (
    <Wrapper>
      <Form noValidate className="form">
        <div className="form-top">
          <RowForm type="text" name="keyword" />
          <RowForm type="text" labelText="job location" name="jobLocation" />
        </div>
        <div className="form-bottom">
          <RowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue="all"
          />
          <RowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue="all"
          />
          <RowSelect
            name="sort"
            defaultValue="newest"
            list={[...Object.values(JOB_SORT_BY)]}
          />
          <button type="submit" className="btn form-btn search">
            Submit
          </button>
          <Link to="/dashboard/all-jobs" className="reset search">
            Reset
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
