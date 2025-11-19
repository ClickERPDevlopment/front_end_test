import React, { useState, useRef, useEffect } from "react";
import Button from "../form/Button";
import FeatherIcon from "../FeatherIcon";
import { PlusCircle } from "react-feather";

export type Column<T> = {
  key: keyof T;
  header: string;
  width?: string;
  visible?: boolean;
  align?: "left" | "center" | "right";
  render?: (item: T, rowIndex: number) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  fixedHeight?: string;
  fixedWidth?: string;
  containerClass?: string;
  tableClass?: string;
  bordered?: boolean;
  columnsButton?: boolean;
  rowsPerPage?: number;
};

export function StaticPaginatedDatatable<T>({
  columns,
  data,
  fixedHeight = "max-h-60",
  fixedWidth = "w-full",
  containerClass = "",
  tableClass = "",
  bordered = true,
  columnsButton = false,
  rowsPerPage = 10
}: DataTableProps<T>) {
  const [columnStates, setColumnStates] = useState(() =>
    columns.map((col) => ({ ...col, visible: col.visible ?? true }))
  );
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        setShowColumnMenu(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const toggleColumn = (key: keyof T) => {
    setColumnStates((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const visibleCols = columnStates.filter((col) => col.visible);

  const borderClass = bordered
    ? "border border-gray-200 dark:border-gray-700"
    : "";

  const changePage = (nextPage: number) => {
    if (nextPage >= 1 && nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }
  };

  return (
    <div className={`relative ${fixedWidth} ${containerClass}`}>
      <div className="flex justify-between items-center mb-2">
        {columnsButton && (
          <div className="relative inline-block text-left">
            <Button
              ref={buttonRef}
              onClick={() => setShowColumnMenu((prev) => !prev)}
              size="sm"
              className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded"
            >
              <FeatherIcon icon={PlusCircle} /> Columns
            </Button>

            {showColumnMenu && (
              <div
                ref={dropdownRef}
                className="absolute z-50 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg"
              >
                <ul className="py-2 max-h-60 overflow-y-auto text-sm">
                  {columnStates.map((col) => (
                    <li
                      key={col.key as string}
                      className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={col.visible}
                          onChange={() => toggleColumn(col.key)}
                          className="accent-blue-500"
                        />
                        {col.header}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <div className="text-sm">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      <div className={`overflow-x-auto`}>
        <div className={`overflow-y-auto ${fixedHeight}`}>
          <table
            className={`min-w-full table-fixed text-sm text-left text-gray-700 dark:text-gray-300 ${tableClass} ${borderClass}`}
          >
            <thead className="sticky top-0 z-10 text-xs uppercase bg-gray-100 dark:bg-gray-800">
              <tr>
                {visibleCols.map((col) => (
                  <th
                    key={col.key as string}
                    className={`px-2 py-1 font-bold border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-${col.align ?? "left"} ${col.width ?? "w-auto"}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="transition hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {visibleCols.map((col) => (
                    <td
                      key={col.key as string}
                      className={`px-2 py-1 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap ${col.width ?? "w-auto"} text-${col.align ?? "left"}`}
                    >
                      {col.render
                        ? col.render(item, rowIndex)
                        : (item as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td
                    colSpan={visibleCols.length}
                    className="text-center py-4 text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center gap-2 mt-2 text-sm">
        <Button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          size="sm"
        >
          Prev
        </Button>
        <Button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
