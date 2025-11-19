import React from "react";
import { ProductionData, LineData } from "../pages/report/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, } from "recharts";
import { Bold } from "react-feather";

interface Props {
    data: ProductionData;
}

const cellStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
};

const LinewiseProductionGraph: React.FC<Props> = ({ data }) => {
    const allLines: LineData[] = data.floors.flatMap((floor) => floor.lines);

    // Prepare data for the graph
    const chartData = allLines.map((line) => ({
        line: line.line,
        Target: line.totalTarget,
        Achieve: line.totalAchieve,
    }));

    const barWidth = Math.max(chartData.length * 80, 500);

    return (
        <>
            {/* Target vs Achive (Linewise) */}
            <div className="flex max-w-auto">
                {/* Table */}
                <div className="w-1/4 overflow-x-auto">
                    <h3 className="mt-6 text-center font-bold">Line-wise Table</h3>
                    <table
                        style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            border: "1px solid #ccc",
                            marginTop: "20px",
                        }}
                    >
                        <thead style={{ backgroundColor: "#f0f0f0" }}>
                            <tr>
                                <th style={cellStyle}>Line Name</th>
                                <th style={cellStyle}>Line Chief</th>
                                <th style={cellStyle}>Target</th>
                                <th style={cellStyle}>Achieve</th>
                                <th style={cellStyle}>Difference</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allLines.length > 0 ? (
                                allLines.map((line, idx) => (
                                    <tr key={idx}>
                                        <td style={cellStyle}>{line.line}</td>
                                        <td style={cellStyle}>{line.lineChief || "-"}</td>
                                        <td style={cellStyle}>{line.totalTarget}</td>
                                        <td style={cellStyle}>{line.totalAchieve}</td>
                                        <td style={cellStyle}>{line.difference}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} style={{ ...cellStyle, textAlign: "center" }}>
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Bar Graph */}
                <div className="w-2/4 overflow-x-auto">
                    <div style={{ width: `${barWidth}px` }}>
                        <h3 className="mt-6 text-center font-bold">Target vs Achieve (Line-wise)</h3>
                        <BarChart
                            width={barWidth}
                            height={400}
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="line" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Target" fill="#4285F4" label={{ position: "top" }} />
                            <Bar dataKey="Achieve" fill="#34A853" label={{ position: "top" }} />
                        </BarChart>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LinewiseProductionGraph;
