import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  max-width: 1000px;
  background: var(--background-secondary-color);
  padding: 1rem 1rem 0rem 1rem;
  margin: 0 auto;
  margin-bottom: 2rem;

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: auto auto;
  }

  .form-top {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    align-items: center;
  }

  .form-bottom {
    display: grid;
    grid-template-columns: repeat(3, 1fr) auto auto;
    gap: 1rem;
    align-items: center;
  }

  .form-row {
    margin-bottom: 1.5rem;
  }

  .reset {
    margin-top: 12px;
    text-decoration: none;
    color: var(--primary-500);
    transition: color 0.3s ease;

    &:hover {
      color: var(--primary-700); /* Slightly darker teal for hover effect */
    }
  }

  .search {
    margin-top: 12px;
  }
`;

export default Wrapper;
