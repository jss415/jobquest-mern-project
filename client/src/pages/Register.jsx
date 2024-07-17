import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import RowForm from "../components/RowForm";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <RowForm type="text" name="name" />
        <RowForm type="text" name="lastName" labelText="last name" />
        <RowForm type="email" name="email" />
        <RowForm type="password" name="password" />
        <RowForm
          type="password"
          name="passwordConfirm"
          labelText="confirm your password"
        />
        <RowForm type="text" name="location" labelText="location" />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>Already a member?</p>
        <Link to="/login">Login now</Link>
      </Form>
    </Wrapper>
  );
};
export default Register;
