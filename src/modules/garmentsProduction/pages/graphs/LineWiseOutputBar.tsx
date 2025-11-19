import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { line: 'Line 1', output: 250 },
  { line: 'Line 2', output: 300 },
  { line: 'Line 3', output: 200 },
];

export default function LineWiseOutputBar() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="line" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="output" fill="#60A5FA" />
      </BarChart>
    </ResponsiveContainer>
  );
}
