import styled from "styled-components";

const Wrapper = styled.section`
  .jobs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
  }
  h4 {
    margin: 0;
    font-weight: 400;
    line-height: 1;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
  p {
    font-size: 18px;
    color: #666;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  .tabs {
    display: flex;
    margin-bottom: 20px;

    button {
      background: none;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 16px;
      position: relative;
      transition: color 0.3s;

      &:hover {
        color: #007bff;
      }

      &.active {
        color: #007bff;
        font-weight: bold;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #007bff;
        }
      }
    }
  }
`;

export default Wrapper;
