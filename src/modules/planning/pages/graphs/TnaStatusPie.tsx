import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const tnaStatusData = [
    { name: 'Completed', value: 14 },
    { name: 'Pending', value: 6 },
    { name: 'Delayed', value: 3 },
];

const COLORS = ['#34D399', '#60A5FA', '#F87171'];

export default function TnaStatusPie() {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={tnaStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                >
                    {tnaStatusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}
