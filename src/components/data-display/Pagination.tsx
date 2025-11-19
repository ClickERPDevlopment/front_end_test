import { useTheme } from "@/hooks/useTheme";
import React from "react";

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationObject<T = any> {
  currentPage: number;
  data: T[];
  firstPageUrl: string;
  from: number;
  totalPages: number;
  lastPage: number;
  lastPageUrl: string;
  nextPageUrl: string | null;
  path: string;
  perPage: number;
  previousPageUrl: string | null;
  to: number;
  total: number;
}

interface PaginationProps {
  paginationObject?: PaginationObject;
  onPageChange: (page: number) => void;
  className?: string;
}


const Pagination: React.FC<PaginationProps> = ({
  paginationObject,
  onPageChange,
  className = "",
}) => {
  if (!paginationObject) return null;

  const { currentPage, totalPages, total } = paginationObject;

  const { paginationStyle } = useTheme()

  const handlePageChange = (page: number) => {
    
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };

  const getGoogleStylePages = (
    currentPage: number,
    totalPages: number,
    maxVisible = 5
  ): (number | string)[] => {
    if (totalPages <= 1) return [];
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = maxVisible;
    } else if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages: (number | string)[] = [];

    // Always show first page
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Always show last page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };


  return (
    <div className={`flex items-center justify-center flex-wrap gap-2 mt-4 ${className}`}>
      {(paginationStyle === "simple" || paginationStyle === "google" || paginationStyle === "numbers" || paginationStyle === "links") && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
      )}

      {paginationStyle === "simple" && (
        <span className="px-2 py-1 text-sm text-gray-800 dark:text-gray-200">
          Page {currentPage} of {totalPages}
        </span>
      )}

      {paginationStyle === "google" && (
        <>
          {getGoogleStylePages(currentPage, totalPages).map((page, index) => {
            if (typeof page === 'string') {
              return (
                <span key={`ellipsis-${index}`} className="px-2 py-1 text-gray-600 dark:text-gray-300">
                  {page}
                </span>
              );
            }
            return (
              <button
                key={`page-${page}`}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded 
              ${page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
              >
                {page}
              </button>
            );
          })}
        </>
      )}

      {paginationStyle === "numbers" && (
        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded 
          ${page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
          >
            {page}
          </button>
        ))
      )}

      {paginationStyle === "input" && (
        <>
          <span className="px-2 text-gray-800 dark:text-gray-200">Go to page:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            defaultValue={currentPage}
            onBlur={(e) => handlePageChange(Number(e.target.value))}
            className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded"
          />
          <span className="px-2 text-gray-800 dark:text-gray-200">of {totalPages}</span>
        </>
      )}

      {paginationStyle === "loadMore" && currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Load More
        </button>
      )}

      {(paginationStyle === "simple" || paginationStyle === "google" || paginationStyle === "numbers" || paginationStyle === "links") && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      )}
    </div>

  );
};

export default Pagination;
