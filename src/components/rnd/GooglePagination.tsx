import React from "react";

interface GooglePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxVisiblePages?: number; // Maximum number of visible page buttons
}

const RNDGooglePagination: React.FC<GooglePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  maxVisiblePages = 5,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) onPageChange(page);
  };

  // Generate visible page numbers
  const getVisiblePages = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
      >
        Previous
      </button>

      {/* First Page */}
      {!visiblePages.includes(1) && (
        <>
          <button
            onClick={() => handlePageClick(1)}
            className={`px-4 py-2 ${
              currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded-md`}
          >
            1
          </button>
          <span className="px-2">...</span>
        </>
      )}

      {/* Visible Pages */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-4 py-2 ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-md`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {!visiblePages.includes(totalPages) && (
        <>
          <span className="px-2">...</span>
          <button
            onClick={() => handlePageClick(totalPages)}
            className={`px-4 py-2 ${
              currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded-md`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default RNDGooglePagination;