import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import Logo from "../components/Logo";
import RowForm from "../components/RowForm";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Login = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <RowForm type="email" name="email" />
        <RowForm type="password" name="password" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register NOW
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
