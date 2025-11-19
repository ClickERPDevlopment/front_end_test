import React, { useState, useRef, useEffect } from "react";
import Button from "../form/Button";
import FeatherIcon from "../FeatherIcon";
import { PlusCircle, Move } from "react-feather";
import { toTitleCase } from "@/utils/caseFormat";

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
    onSort?: (sortedData: T[]) => void;
    showBasedOnRowVisibleProperty?: boolean;
    sortable?: boolean;
    loading?: boolean;
};

export function SortableCustomDataTable<T>({
    columns,
    data,
    fixedHeight = "max-h-60",
    fixedWidth = "w-full",
    containerClass = "",
    tableClass = "",
    bordered = true,
    loading = false,
    columnsButton = false,
    onSort,
    showBasedOnRowVisibleProperty=false,
    sortable = false
}: DataTableProps<T>) {
    const [columnStates, setColumnStates] = useState(() =>
        columns.map((col) => ({ ...col, visible: col.visible ?? true }))
    );
    const [localData, setLocalData] = useState([...data]);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [draggedOverItem, setDraggedOverItem] = useState<number | null>(null);

    const [showColumnMenu, setShowColumnMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Sync local data when prop changes
    useEffect(() => {
        setLocalData([...data]);
    }, [data]);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as Node;

            if (
                dropdownRef.current &&
                buttonRef.current &&
                !dropdownRef.current.contains(target) &&
                !buttonRef.current.contains(target)) {
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

    const handleDragStart = (index: number) => {
        setDraggedItem(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedItem === null || draggedItem === index) return;
        setDraggedOverItem(index);
    };

    const handleDrop = () => {
        if (draggedItem === null || draggedOverItem === null) return;

        const newData = [...localData];
        const [removed] = newData.splice(draggedItem, 1);
        newData.splice(draggedOverItem, 0, removed);

        setLocalData(newData);
        setDraggedItem(null);
        setDraggedOverItem(null);

        if (onSort) {
            onSort(newData);
        }
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
        setDraggedOverItem(null);
    };

    const visibleCols = columnStates.filter((col) => col.visible);
    const borderClass = bordered
        ? "border border-gray-200 dark:border-gray-700"
        : "";

    return (
        <div className={`relative ${fixedWidth} ${containerClass}`}>
            {/* Column Toggle */}
            <div className="relative inline-block text-left mb-2 ml-2">
                {columnsButton && (
                    <Button
                        ref={buttonRef}
                        onClick={() => setShowColumnMenu((prev) => !prev)}
                        size="sm"
                        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded"
                    >
                        <FeatherIcon icon={PlusCircle} /> Columns
                    </Button>
                )}

                {showColumnMenu && (
                    <div
                        ref={dropdownRef}
                        className="absolute z-50 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg"
                    >
                        <ul className="py-2 max-h-60 overflow-y-auto text-sm">
                            {columnStates.map((col) => (
                                <li key={col.key as string} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
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

            {/* Table */}
            <div className={``}>
                <div className={`w-full overflow-x-auto ${fixedHeight !== "" ? `overflow-y-auto ${fixedHeight}` : ""} dark:border-gray-700 rounded`}>
                    <table
                        className={`min-w-full table-auto border-collapse text-left data-table ${tableClass} ${borderClass}`}
                    >
                        <thead className="sticky top-0 z-1">
                            <tr>
                                {sortable && <th className="w-8 px-2 py-1 border-b border-gray-200 dark:border-gray-700"></th>}
                                {visibleCols.map((col) => (
                                    <th
                                        key={col.key as string}
                                        className={`py-[6px] px-[8px] !important text-sm font-semibold whitespace-nowrap text-${col.align ?? "left"} ${col.width ?? "min-w-[150px]"}`}
                                    >
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((item, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className={`transition ${rowIndex % 2 === 0 ? "odd" : "even"} 
                                        ${showBasedOnRowVisibleProperty && (item as any)["isHiddenRow"] ? 'hidden' : ''}`}
                                        draggable={sortable}
                                        onDragStart={() => sortable && handleDragStart(rowIndex)}
                                        onDragOver={(e) => sortable && handleDragOver(e, rowIndex)}
                                        onDrop={sortable ? handleDrop : undefined}
                                        onDragEnd={sortable ? handleDragEnd : undefined}
                                    >
                                        {sortable && (
                                            <td className="px-2 py-1 border-b border-gray-200 dark:border-gray-700 cursor-move">
                                                <Move className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                                            </td>
                                        )}
                                        {visibleCols.map((col) => (
                                            <td
                                                key={col.key as string}
                                                className={`px-2 h-[30px] !important text-13-4 dark:border-gray-700 whitespace-nowrap text-${col.align ?? "left"} ${col.width ?? "w-auto"}`}
                                            >
                                                {col.render ? col.render(item, rowIndex) : (item as any)[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={visibleCols.length + 1}
                                        className="px-2 py-1 text-center text-gray-400 border border-gray-300 dark:border-gray-700"
                                    >
                                        {loading ? 'Data loading..' : 'No data available'}
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}