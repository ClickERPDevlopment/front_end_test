import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";

const taskCompletionData = [
    { status: "Completed", count: 25 },
    { status: "In Progress", count: 10 },
    { status: "Delayed", count: 5 },
];

export default function TaskCompletionStatusBar() {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={taskCompletionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="status" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#34D399" name="Tasks" />
            </BarChart>
        </ResponsiveContainer>
    );
}
