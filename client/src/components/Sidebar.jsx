import Wrapper from "../assets/wrappers/Sidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import NavigationLinks from "./NavigationLinks";
import SmallUserCard from "./SmallUserCard";

export default function Sidebar() {
  const { user, showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <SmallUserCard user={user} />
          <NavigationLinks />
        </div>
      </div>
    </Wrapper>
  );
}
