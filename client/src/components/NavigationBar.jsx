import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";

import { useDashboardContext } from "../pages/DashboardLayout";
import LogoutBox from "./LogoutBox";

export default function NavigationBar() {
  const { toggleSidebar, logoutUser } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
        </div>
        <div className="btn-container">
          <LogoutBox />
        </div>
      </div>
    </Wrapper>
  );
}
