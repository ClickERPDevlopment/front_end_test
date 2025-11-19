import React, { useMemo, useState } from "react";
import { Search } from "react-feather"; 
import InputBox from "./InputBox";
import PaginationWithInput from "./PaginationWithInput";
import GooglePagination from "./GooglePagination";

interface TableProps {
  headers: string[];
  rows: string[][];
  className?: string;
  rowClassName?: string;
  pagination?: boolean;
  rowsPerPage?: number;
  paginationType?: "basic" | "input" | "google";
  searchable?: boolean;
  searchPlaceholder?: string; // Custom placeholder for search
}

const RNDTable: React.FC<TableProps> = ({
  headers,
  rows,
  className = "",
  rowClassName = "",
  pagination = false,
  rowsPerPage = 10,
  paginationType = "input",
  searchable = false,
  searchPlaceholder = "Search...",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = useMemo(() => {
    if (!searchTerm || !searchable) return rows;
    
    return rows.filter(row => 
      row.some(cell => 
        cell.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [rows, searchTerm, searchable]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = pagination ? filteredRows.slice(startIndex, endIndex) : filteredRows;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className={`flex flex-col ${className}`}>
        {searchable && (
          <div className="relative w-full max-w-md m-1">
            <InputBox
              className="w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-5 w-5 text-gray-400" />}
              value={searchTerm}
              placeholder={searchPlaceholder}
              type="text"
              size="sm"
              showClearButton // Enable clear button
              onClear={() => setSearchTerm("")} // Clear handler
            />
          </div>
        )}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mx-1">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className={`${rowClassName} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
                >
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="px-6 py-4 text-center">
                  <div className="text-gray-500 dark:text-gray-400">
                    {searchTerm ? "No results found for your search" : "No data available"}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && filteredRows.length > 0 && (
        <div className="m-1 flex justify-center">
          <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {/* {paginationType === "basic" && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )} */}
            {paginationType === "input" && (
              <PaginationWithInput
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
            {paginationType === "google" && (
              <GooglePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RNDTable;