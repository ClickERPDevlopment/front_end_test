import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const capacityPlanData = [
    { date: 'Jun 10', planned: 800, capacity: 1000 },
    { date: 'Jun 11', planned: 950, capacity: 1000 },
    { date: 'Jun 12', planned: 700, capacity: 1000 },
];

export default function PlanningCapacityBar() {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={capacityPlanData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="capacity" fill="#60A5FA" />
                <Bar dataKey="planned" fill="#FBBF24" />
            </BarChart>
        </ResponsiveContainer>
    );
}
