import React from "react";
import { Column } from "@/components/data-display/CustomDataTable";

interface ReportTableProps<T> {
    columns: Column<T>[];
    rows: T[];
    negativeTextColor?: string;
}

const ReportTable = <T,>({ columns, rows, negativeTextColor = "" }: ReportTableProps<T>) => {
    return (
        <table className="w-full bg-white shadow-md rounded-lg table-auto overflow-hidden">
            <thead className="bg-green-700 text-white">
                <tr>
                    {columns.map((col) => (
                        <th
                            key={col.key.toString()}
                            className={`px-4 py-2 text-sm font-semibold tracking-wide ${col.align === "center"
                                    ? "text-center"
                                    : col.align === "right"
                                        ? "text-right"
                                        : "text-left"
                                }`}
                        >
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                 {rows.map((row, i) => (
                    <tr
                        key={i}
                        className="hover:bg-gray-50 transition-colors duration-150"
                    >
                        {columns.map((col, index) => {
                            const value = col.render ? col.render(row, index) : (row as any)[col.key];
                            const isNegative = typeof value === "number" && value < 0;

                            return (
                                <td
                                    key={col.key.toString()}
                                    className={`px-4 py-2 text-sm ${col.align === "center"
                                        ? "text-center"
                                        : col.align === "right"
                                            ? "text-right"
                                            : "text-left"
                                    } ${isNegative ? negativeTextColor : "text-gray-700"}`}
                                >
                                    {value}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReportTable;
