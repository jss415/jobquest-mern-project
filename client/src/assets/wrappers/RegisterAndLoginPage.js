import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
    margin-top: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
  a {
    color: var(--primary-500);
    text-transform: capitalize;
    margin-top: 1rem;
    display: block;
    text-align: center; /* Center horizontally */
  }
`;
export default Wrapper;
