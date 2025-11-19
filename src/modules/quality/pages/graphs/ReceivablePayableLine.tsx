import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const lineData = [
    { date: 'Jun 10', receivable: 120000, payable: 90000 },
    { date: 'Jun 11', receivable: 100000, payable: 95000 },
    { date: 'Jun 12', receivable: 130000, payable: 100000 },
];

export default function ReceivablePayableLine() {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="receivable" stroke="#60A5FA" strokeWidth={2} />
                <Line type="monotone" dataKey="payable" stroke="#FBBF24" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
}
