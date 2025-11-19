/* eslint-disable @typescript-eslint/no-explicit-any */
import { OperationBulletinReportType } from "../operation-bulletin-report-type";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

function ReportChart({
  data,
}: {
  data: OperationBulletinReportType[];
}) {



  const groupedDataMap = new Map<
    string,
    {
      operationName: string;
      totalAllottedMP: number;
      capacityHr: number;
      efficiency: number;
    }
  >();

  data.forEach((item) => {
    const key = item.OPERATIONNAME;

    if (!groupedDataMap.has(key)) {
      groupedDataMap.set(key, {
        operationName: item.OPERATIONNAME,
        totalAllottedMP: item.ALLOTTEDMP,
        capacityHr: item.CAPACITYHR,
        efficiency: item.TARGERPERHOUR,
      });
    } else {
      const existing = groupedDataMap.get(key)!;
      existing.totalAllottedMP += item.ALLOTTEDMP;
    }
  });

  console.log("Grouped Data Map:", groupedDataMap);

  const chartData = Array.from(groupedDataMap.values()).map((item, index) => ({
    index: index + 1,
    operationName: item.operationName,
    capacityUtilized: Math.round(item.totalAllottedMP * item.capacityHr),
    efficiency: item.efficiency,
  }));



  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white border p-2 rounded shadow text-sm">
          <p><strong>Operation:</strong> {dataPoint.operationName}</p>
          <p><strong>Process Target:</strong> {dataPoint.capacityUtilized}</p>
          <p><strong>Target:</strong> {dataPoint.efficiency}</p>
        </div>
      );
    }
    return null;
  };

  const generateLineChart = (title: string, chartData: any[]) => (
    <div className="my-1 bg-white">
      <h2 className="text-base font-semibold text-center mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorProcess" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4B0082" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#4B0082" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#006400" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#006400" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="index"
            label={{
              value: "Operation No",
              position: "insideBottom",
              offset: -2,
              fontSize: 10,
              fontWeight: "bold",
              color: "#0000",
            }}
            tick={{ fontSize: 10 }}
          />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 10 }} />

          <Line
            type="monotone"
            dataKey="capacityUtilized"
            stroke="#4B0082"
            strokeWidth={1.5}
            name="Process Target"
            dot={false}
            fillOpacity={1}
            fill="url(#colorProcess)"
          />
          <Line
            type="monotone"
            dataKey="efficiency"
            stroke="#006400"
            strokeWidth={1.5}
            name="Target"
            dot={false}
            fillOpacity={1}
            fill="url(#colorTarget)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );



  return (
    <div>
      {generateLineChart("", chartData)}
    </div>
  );
}

export default ReportChart;
