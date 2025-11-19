import React from "react";

const statusColorMap: Record<string, string> = {
    onTime: "bg-green-400",
    delayed: "bg-yellow-400",
    critical: "bg-red-500",
};

const dates = ["Jun 17", "Jun 18", "Jun 19", "Jun 20", "Jun 21"];
const tasks = [
    { name: "Fabric In-house", status: ["onTime", "onTime", "delayed", "delayed", "onTime"] },
    { name: "Cutting", status: ["onTime", "onTime", "onTime", "critical", "critical"] },
    { name: "Sewing", status: ["delayed", "onTime", "onTime", "onTime", "onTime"] },
    { name: "Finishing", status: ["onTime", "onTime", "delayed", "onTime", "critical"] },
];

export default function TnaHeatmap() {
    return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow w-full overflow-x-auto max-w-full">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
                TNA Heatmap (Task vs Date)
            </h2>

            <table className="min-w-max table-auto border-collapse text-sm">
                <thead>
                    <tr>
                        <th className="p-2 border border-gray-200 bg-gray-100 dark:bg-gray-800 text-left">Task</th>
                        {dates.map((date) => (
                            <th
                                key={date}
                                className="p-2 border border-gray-200 bg-gray-100 dark:bg-gray-800 text-center"
                            >
                                {date}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="p-2 border border-gray-200 text-left">{task.name}</td>
                            {task.status.map((status, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`p-2 border border-gray-200 text-center ${statusColorMap[status]}`}
                                ></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
