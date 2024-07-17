import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;

  .page-btn {
    background: transparent;
    border: 1px solid var(--primary-500);
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    border-radius: var(--border-radius);
    cursor: pointer;
    margin: 0 0.25rem;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background: var(--primary-500);
      color: var(--white);
    }

    &:focus {
      outline: 2px solid var(--primary-300);
    }

    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  }

  .active {
    background: var(--primary-500);
    color: var(--white);
  }
`;

export default Wrapper;
