import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/ProfileForm";
import Logo from "../components/Logo";
import RowForm from "../components/RowForm";
import customFetch from "../utils/customFetch";
import { useDashboardContext } from "../pages/DashboardLayout";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const file = formData.get("avatar");
  if (file && file.size > 50000) {
    toast.error("Image size is too big");
    return null;
  }
  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/dashboard");
};

const Profile = () => {
  const { user } = useDashboardContext();
  console.log("This is the current user: ", user);

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <div className="form-header">
          <h4>Update your Profile</h4>
          <button type="submit" className="btn form-btn">
            Update
          </button>
        </div>
        <div className="form-center">
          <RowForm type="text" name="name" defaultValue={user.name} />
          <RowForm
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={user.lastName}
          />
          <RowForm type="email" name="email" defaultValue={user.email} />
          <RowForm
            type="text"
            name="location"
            labelText="location"
            defaultValue={user.location}
          />
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
