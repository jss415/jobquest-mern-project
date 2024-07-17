import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;

  .apply {
    background-color: #1da1f2;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    font-size: 16px;
    font-weight: bold;

    .icon {
      margin-right: 8px;
    }
  }

  .follow {
    background-color: #ffffff;
    color: #1da1f2;
    border: 2px solid #1da1f2;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    outline: none;
    font-weight: 600;
    font-size: 16px;
  }
`;

export default Wrapper;
