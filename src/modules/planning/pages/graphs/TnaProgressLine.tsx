import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const tnaProgressData = [
    { date: 'Jun 10', completed: 2 },
    { date: 'Jun 11', completed: 5 },
    { date: 'Jun 12', completed: 4 },
    { date: 'Jun 13', completed: 6 },
];

export default function TnaProgressLine() {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={tnaProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#34D399" />
            </LineChart>
        </ResponsiveContainer>
    );
}
