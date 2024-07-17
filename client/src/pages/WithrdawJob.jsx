import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export async function action({ params }) {
  console.log("Withdraw: ", params);
  try {
    await customFetch.post(`/applications/withdraw/${params.id}`);
    toast.success("You have withdrawn from an application...");
  } catch (error) {
    toast.error(error.response.data.message);
  }
  return redirect("/dashboard/saved-jobs");
}
