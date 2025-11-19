import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const transactionData = [
    { date: 'Jun 10', debit: 60000, credit: 45000 },
    { date: 'Jun 11', debit: 80000, credit: 75000 },
    { date: 'Jun 12', debit: 70000, credit: 62000 },
];

export default function DailyTransactionBar() {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="debit" fill="#4ADE80" />
                <Bar dataKey="credit" fill="#F87171" />
            </BarChart>
        </ResponsiveContainer>
    );
}
