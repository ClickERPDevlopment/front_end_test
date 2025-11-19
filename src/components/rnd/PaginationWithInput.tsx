import React, { useState, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const RNDPaginationWithInput: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const [pageInput, setPageInput] = useState(currentPage.toString());

  // Sync input value with currentPage
  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput, 10);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setPageInput(currentPage.toString()); // Reset to current page if input is invalid
    }
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
      >
        Previous
      </button>

      <form onSubmit={handlePageInputSubmit} className="flex items-center gap-2">
        <span>Page</span>
        <input
          type="number"
          value={pageInput}
          onChange={handlePageInputChange}
          min={1}
          max={totalPages}
          className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
        />
        <span>of {totalPages}</span>
      </form>

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

export default RNDPaginationWithInput;