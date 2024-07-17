import Wrapper from "../assets/wrappers/LandingPage";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import main from "../assets/images/main-image.svg";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h2>
            Job <span>Finding</span> App
          </h2>
          <p>
            Welcome to <b>JobQuest.com</b>, your ultimate destination for
            finding your dream job. Our innovative platform connects you with
            top employers, offering a wide range of job opportunities tailored
            to your skills and interests. Whether you're starting your career or
            looking to make a change, JobQuest.com is here to guide you on your
            journey to success. Explore, apply, and embark on your next career
            adventure with us. Join JobQuest.com today and take the first step
            towards achieving your professional goals.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};
export default Landing;
