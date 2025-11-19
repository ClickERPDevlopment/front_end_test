import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import { DashboardData } from "../pages/report/typesManagement";

interface Props {
    data: DashboardData;
    title?: string;
}
const ManagementBarChart: React.FC<Props> = ({ data, title }) => {
    // total column will not be displayed in  bar chart so filtered out
    const months = Object.keys(data.managementDashboard).filter((m) => m !== "Total");

    // Format data for recharts
    const chartData = months.map((month) => ({
        month,
        orders: data.managementDashboard[month].confirmed_ordered,
        exports: data.managementDashboard[month].monthly_export_pcs,
    }));

    return (
        <div className="w-[800px] h-[400px]">
            {title && (
                <h2 className="text-lg font-semibold text-center mb-4">{title}</h2>
            )}
            <ResponsiveContainer>
                <BarChart
                    key={JSON.stringify(chartData)}
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="orders"
                        name="Monthly Orders (pcs)"
                        fill="#4f46e5"
                        isAnimationActive={true}
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                    />
                    <Bar
                        dataKey="exports"
                        name="Monthly Exports (pcs)"
                        fill="#10b981"
                        isAnimationActive={true}
                        animationBegin={300}
                        animationDuration={1500}
                        animationEasing="ease-out"
                    />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
};

export default ManagementBarChart;
