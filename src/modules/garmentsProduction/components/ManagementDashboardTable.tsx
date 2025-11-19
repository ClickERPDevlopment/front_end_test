import React from "react";
import { DashboardData } from '../pages/report/typesManagement';

interface Props {
    data: DashboardData;
}

const ManagementDashboardTable: React.FC<Props> = ({ data }) => {
    const months = Object.keys(data.managementDashboard);

    return (
        <div className="overflow-x-auto">
            <table className="border border-gray-300 rounded-lg w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Management Dashboard</th>
                        {months.map((month) => (
                            <th key={month} className="p-2 border text-center">
                                {month}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.keyMap.map((row) => {
                        // If empty, render a header row that spans across all columns.
                        if (!row.key) {
                            // Grouped row
                            return (
                                <tr key={row.label} className="bg-gray-200">
                                    <td
                                        colSpan={months.length + 1}
                                        className="p-2 border font-semibold text-left"
                                    >
                                        {row.label}
                                    </td>
                                </tr>
                            );
                        }
                        // If not empty, render the normal row.
                        // Normal row
                        return (
                            <tr key={row.label} className="hover:bg-gray-50">
                                <td className="p-2 border font-medium">{row.label}</td>
                                {months.map((month) => {
                                    const monthData = data.managementDashboard[month];
                                    const value = monthData[row.key] ?? "-";
                                    return (
                                        <td key={month} className="p-2 border text-center">
                                            {value}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ManagementDashboardTable;
