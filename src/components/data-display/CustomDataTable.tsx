import { useTheme } from "@/hooks/useTheme";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { toTitleCase } from "@/utils/caseFormat";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { PaginationObject, perPageOptions } from "../../types/global";
import FeatherIcon from "../FeatherIcon";
import Button from "../form/Button";
import SelectDropdown from "../form/SelectDropdown";
import Pagination from "./Pagination";

export type Column<T> = {
    key: keyof T;
    header: string;
    width?: string;
    visible?: boolean;
    align?: "left" | "center" | "right";
    render?: (item: T, rowIndex: number) => React.ReactNode;
    paddingNone?: boolean;
};

type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
    fixedHeight?: string;
    fixedWidth?: string;
    containerClass?: string;
    tableClass?: string;
    bordered?: boolean;
    haveBreadcrumb?: boolean;
    columnsButton?: boolean;
    perPageDropdown?: boolean;
    buttons?: React.ReactNode;
    paginationObject?: PaginationObject<T>;
    loading?: boolean;
    showSerialNumber?: boolean;
    showBasedOnRowVisibleProperty?: boolean;
    onPageChange?: (page: number) => void;
    onPerPageChange?: (page: number) => void;

};

export function CustomDataTable<T>({
    columns,
    data,
    fixedHeight = "",
    fixedWidth = "w-full",
    containerClass = "",
    tableClass = "",
    bordered = true,
    loading = false,
    columnsButton = false,
    perPageDropdown = false,
    paginationObject,
    buttons,
    haveBreadcrumb,
    showSerialNumber = true,
    showBasedOnRowVisibleProperty = false,
    onPageChange,
    onPerPageChange,

}: DataTableProps<T>) {

    const slColumn: Column<T> = {
        key: "__sl" as keyof T,
        header: "SL",
        width: "w-6",
        visible: showSerialNumber,
        align: "center",
        paddingNone: false,
        render: (_, rowIndex) => rowIndex + 1
    };

    // Merge SL column with user columns
    const initialColumns = showSerialNumber
        ? [slColumn, ...columns]
        : columns;


    const [columnStates, setColumnStates] = useState(() =>
        initialColumns.map((col) => ({ ...col, visible: col.visible ?? true }))
    );

    const [showColumnMenu, setShowColumnMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { rowsPerPage, setRowsPerPage } = useTheme();
    const { setActions } = useDashboardActions();


    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (showColumnMenu) {
            setShowColumnMenu(false);
        }
        // Trigger global dropdown close event
        window.dispatchEvent(new CustomEvent("closeAllDropdowns"));
    };

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as Node;

            // If clicked outside both dropdown AND button, close menu
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
    }; // column toggle

    const visibleCols = columnStates.filter((col) => col.visible);
    const borderClass = bordered
        ? "border border-gray-200 dark:border-gray-700"
        : "";

    const handlePerPage = (val: string) => {
        setRowsPerPage(val as string);
        if (onPerPageChange) {
            onPerPageChange(Number(val))
        }
    }


    useEffect(() => {
        setActions(
            <div className="flex flex-wrap justify-end gap-1 px-2">
                {columnsButton && (
                    <div className="inline-block">
                        <Button
                            ref={buttonRef}
                            onClick={() => setShowColumnMenu((prev) => !prev)}
                            size="sm"
                        >
                            <FeatherIcon icon={PlusCircle} /> Columns
                        </Button>
                    </div>
                )}
                {perPageDropdown && (
                    <div className="flex items-center gap-2">
                        <label htmlFor="rows-per-page" className="whitespace-nowrap">
                            Per page:
                        </label>
                        <SelectDropdown
                            options={perPageOptions}
                            value={rowsPerPage}
                            isSameKeyValue={true}
                            onChange={(val) => handlePerPage(val as string)}
                            placeholder="-"
                            className="w-[60px]"
                        />
                    </div>
                )}
                {buttons && <div className="flex items-center gap-2">{buttons}</div>}
            </div>
        );
        return () => setActions(null);
    }, [rowsPerPage]);

    // setActions,
    // columnsButton,
    // perPageDropdown,
    // perPageOptions,
    // rowsPerPage,
    // buttons,

    return (
        <div className={`relative ${fixedWidth} ${containerClass}`}>

            {/* Column Toggle */}

            {showColumnMenu && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 -top-12 z-99999 mt-0 w-70 column-menu rounded shadow-lg sm:-right-4 sm:-top-11 max-sm:-left-0 max-sm:-top-10 max-sm:w-full"
                >
                    <ul className="max-h-60 overflow-y-auto text-13-4">
                        {columnStates.map((col) => (
                            <li key={col.key as string} className="px-3 py-1 hover:bg-column-menu-hover">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={col.visible}
                                        onChange={() => toggleColumn(col.key)}
                                    />
                                    {col.header}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Table */}
            <div className={``}>
                {/* <div className={`w-full ${fixedHeight !== "" ? `overflow-x-auto ${fixedHeight}` : ""} dark:border-gray-700 rounded`}> */}
                <div className={`w-full overflow-x-auto ${fixedHeight !== "" ? `overflow-y-auto ${fixedHeight}` : ""} dark:border-gray-700 rounded`}
                    onScroll={handleScroll}
                >
                    <table
                        className={`min-w-full table-auto border-collapse text-left data-table ${tableClass} ${borderClass}`}
                    >
                        <thead className="sticky top-0 z-1">
                            <tr>
                                {visibleCols.map((col) => (
                                    <th
                                        key={col.key as string}
                                        className={`py-[6px] px-[8px] !important text-sm font-semibold whitespace-nowrap text-${col.align ?? "left"} ${col.width ?? "min-w-[150px]"}`}
                                    >
                                        {toTitleCase(col.header)}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="">
                            {data.length > 0 ? (
                                data.map((item, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className={`transition ${rowIndex % 2 === 0 ? "odd" : "even"} 
                                        ${showBasedOnRowVisibleProperty && (item as any)["isHiddenRow"] ? 'hidden' : ''}`}
                                    >
                                        {
                                            visibleCols.map((col) => (
                                                <td
                                                    key={col.key as string}
                                                    className={`${col.paddingNone ? 'px-0' : 'px-1'} h-[30px] !important text-13-4 dark:border-gray-700 whitespace-nowrap text-${col.align ?? "left"} ${col.width ?? "w-auto"}`}
                                                >
                                                    {col.render ? col.render(item, rowIndex) : (item as any)[col.key]}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={visibleCols.length}
                                        className=" !important text-center dark:border-gray-700"
                                    >
                                        {loading ? 'Data loading..' : 'No data available'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>

            {
                paginationObject &&
                <Pagination
                    paginationObject={paginationObject}
                    onPageChange={(page) => onPageChange && onPageChange(page)}
                />
            }

        </div >
    );
}
