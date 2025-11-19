import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, } from "recharts";

const delayCauseData = [
    { name: "Fabric Delay", value: 12 },
    { name: "Approval Pending", value: 7 },
    { name: "Trim Short", value: 5 },
    { name: "Late PO", value: 3 },
    { name: "Machine Issue", value: 2 },
];

const COLORS = ["#F87171", "#FBBF24", "#60A5FA", "#A78BFA", "#34D399"];

export default function DelayCausePieChart() {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={delayCauseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                >
                    {delayCauseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}
