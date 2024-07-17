import { useLocation, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";
import Wrapper from "../assets/wrappers/Pagination";

export default function Pagination() {
  const { data } = useAllJobsContext();
  const { currentPage, numOfPages } = data;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const pages = [];

  if (numOfPages <= 5) {
    // Show all page numbers if there are 5 or less
    for (let i = 1; i <= numOfPages; i++) {
      pages.push(i);
    }
  } else {
    // Show the first two pages, current page, and the last two pages
    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
    }

    if (currentPage > 2) pages.push(currentPage - 1);
    pages.push(currentPage);

    if (currentPage < numOfPages - 1) pages.push(currentPage + 1);

    if (currentPage < numOfPages - 2) {
      if (currentPage < numOfPages - 3) pages.push("...");
      pages.push(numOfPages);
    }
  }

  const handlePageClick = (pageNumber) => {
    if (pageNumber === "...") return;
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < numOfPages) {
      handlePageClick(currentPage + 1);
    }
  };

  return (
    <Wrapper>
      <button
        className="btn page-btn"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pages.map((pageNumber, index) => (
        <button
          className={`btn page-btn ${pageNumber === currentPage && "active"}`}
          key={index}
          onClick={() => handlePageClick(pageNumber)}
          disabled={pageNumber === "..."}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="btn page-btn"
        onClick={handleNextClick}
        disabled={currentPage === numOfPages}
      >
        &gt;
      </button>
    </Wrapper>
  );
}
