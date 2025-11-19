import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const data = [
  { hour: '8 AM', target: 100, actual: 90 },
  { hour: '9 AM', target: 100, actual: 95 },
  { hour: '10 AM', target: 100, actual: 80 },
  { hour: '11 AM', target: 100, actual: 105 },
];

export default function TargetVsActualChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="target" stroke="#34D399" />
        <Line type="monotone" dataKey="actual" stroke="#F87171" />
      </LineChart>
    </ResponsiveContainer>
  );
}
