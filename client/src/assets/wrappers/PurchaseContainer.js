import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;
  overflow: auto;

  .card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 1px 1px 10px 1px #ddd;
    margin-bottom: 1rem;
    max-width: 300px;
    padding: 1rem 0;
    position: relative;
    width: 100%;
    text-align: center;

    .most-popular {
      font-size: 15px;
      font-weight: 700;
      background-color: #9b59b6;
      color: #fff;
      padding: 0.25em 1rem;
      border-radius: 15px;
      text-transform: uppercase;
    }

    &.free {
      border-top: 6px solid #1abc9c;
    }

    &.basic {
      border-top: 6px solid #3498db;
    }

    &.medium {
      border-top: 6px solid #9b59b6;
    }

    &.pro {
      border-top: 6px solid #f1c40f;
    }
  }
  .card {
    &-description,
    &-billing,
    &-features,
    &-action {
      padding: 15px;
    }

    &-description {
      h2 {
        font-size: 26px;
        margin-bottom: 0.5rem;
      }
    }

    &-billing {
      background-color: #ecf0f1;

      p {
        margin-bottom: 0.5rem;
      }

      .price {
        font-size: 24px;
        font-weight: 400;
      }
    }

    &-features {
      min-height: 150px;

      ul li {
        margin-bottom: 0.5rem;
      }
    }

    &-action {
      > button {
        border: 3px solid #3498db;
        background-color: transparent;
        color: #3498db;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        padding: 0.5rem 0;
        width: 100%;
        transition: 0.3s ease all;
      }

      > button:hover {
        transition: 0.3s ease all;
        background-color: #3498db;
        color: #fff;
      }
    }
  }
`;

export default Wrapper;
