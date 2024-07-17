import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  height: calc(-300px + 100vh);
  margin: 0 auto;

  .column {
    flex: 1;
    overflow-y: auto; /* Enable vertical scrolling */
    padding-right: 20px;
  }

  .job-description {
    background: var(--background-secondary-color);
    padding: 1.5rem;
    overflow-x: hidden;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    height: 100%;
  }

  .description-header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .company-icon {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.25rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 1rem;
  }

  .company-position {
    margin-bottom: 0.5rem;
  }

  .company-details {
    display: flex;
    align-items: center;
    position: relative;
    color: var(--text-secondary-color);
    margin-bottom: 2rem;
  }
`;

export default Wrapper;
