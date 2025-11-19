import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { section: 'Cutting', wip: 500 },
  { section: 'Sewing', wip: 800 },
  { section: 'Finishing', wip: 300 },
];

export default function WIPBar() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart layout="vertical" data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="section" type="category" />
        <Tooltip />
        <Bar dataKey="wip" fill="#F59E0B" />
      </BarChart>
    </ResponsiveContainer>
  );
}
