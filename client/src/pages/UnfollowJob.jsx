import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export async function action({ params }) {
  try {
    await customFetch.post(`/users/unfollow/${params.id}`);
    toast.success("Unfollowing job...");
  } catch (error) {
    toast.error(error.response.data.message);
  }
  return redirect("/dashboard/saved-jobs");
}
