import { useState, createContext, useContext } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import NavigationBar from "../components/NavigationBar";
import Wrapper from "../assets/wrappers/Dashboard";
import Sidebar from "../components/Sidebar";

import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/dashboard");
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
  };

  return (
    <DashboardContext.Provider
      value={{ showSidebar, toggleSidebar, user, logoutUser }}
    >
      <Wrapper>
        <main className="dashboard">
          <Sidebar />
          <div>
            <NavigationBar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
