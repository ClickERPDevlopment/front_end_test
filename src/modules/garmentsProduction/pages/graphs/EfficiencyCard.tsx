type Props = { efficiency: number };

export default function EfficiencyCard({ efficiency }: Props) {
  return (
    <>
      <div className="text-4xl font-bold text-blue-500">{efficiency}%</div>
      <div className="h-2 mt-4 bg-gray-300 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${efficiency}%` }}
        />
      </div>
    </>
  );
}
