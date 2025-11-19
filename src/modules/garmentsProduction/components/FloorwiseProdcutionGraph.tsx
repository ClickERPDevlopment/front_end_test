import React from "react";
import { ProductionData, FloorData } from "../pages/report/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, } from "recharts";

interface Props {
    data: ProductionData;
}

const cellStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
};

const FloorwiseProductionGraph: React.FC<Props> = ({ data }) => {
    // Prepare chart + table data: Aggregate per floor
    const chartData = data.floors.map((floor: FloorData) => {
        const totalTarget = floor.lines.reduce((sum, line) => sum + line.totalTarget, 0);
        const totalAchieve = floor.lines.reduce((sum, line) => sum + line.totalAchieve, 0);
        const difference = totalAchieve - totalTarget;

        return {
            floor: floor.floorName,
            Target: totalTarget,
            Achieve: totalAchieve,
            Difference: difference,
        };
    });

    const barWidth = Math.max(chartData.length * 100, 500);

    return (
        <div className="flex max-w-auto mt-10">
            {/* Table */}
            <div className="w-1/4 overflow-x-auto">
                <h3 className="text-center font-bold mb-2">Floor-wise Table</h3>
                <table
                    style={{
                        borderCollapse: "collapse",
                        width: "100%",
                        border: "1px solid #ccc",
                    }}
                >
                    <thead style={{ backgroundColor: "#f0f0f0" }}>
                        <tr>
                            <th style={cellStyle}>Floor</th>
                            <th style={cellStyle}>Target</th>
                            <th style={cellStyle}>Achieve</th>
                            <th style={cellStyle}>Difference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chartData.length > 0 ? (
                            chartData.map((floor, idx) => (
                                <tr key={idx}>
                                    <td style={cellStyle}>{floor.floor}</td>
                                    <td style={cellStyle}>{floor.Target}</td>
                                    <td style={cellStyle}>{floor.Achieve}</td>
                                    <td style={cellStyle}>{floor.Difference}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} style={{ ...cellStyle, textAlign: "center" }}>
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Bar Chart */}
            <div className="w-2/4 overflow-x-auto">
                <div style={{ width: `${barWidth}px` }}>
                    <h3 className="text-center font-bold mb-4">Target vs Achieve (Floor-wise)</h3>
                    <BarChart
                        width={barWidth}
                        height={400}
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="floor" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Target" fill="#4285F4" label={{ position: "top" }} />
                        <Bar dataKey="Achieve" fill="#34A853" label={{ position: "top" }} />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default FloorwiseProductionGraph;
