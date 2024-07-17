import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 1.5;
    margin-right: 2rem;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .form-btn {
    align-self: end;
    display: grid;
    place-items: center;
  }
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    margin-right: 32px;
  }
  .form-textarea {
    width: 100%;
    resize: vertical;
  }
`;

export default Wrapper;
