import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const pieData = [
    { name: 'Liabilities', value: 450000 },
    { name: 'Assets', value: 850000 },
];

const COLORS = ['#F87171', '#34D399'];

export default function LiabilitiesAssetsPie() {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                >
                    {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}
