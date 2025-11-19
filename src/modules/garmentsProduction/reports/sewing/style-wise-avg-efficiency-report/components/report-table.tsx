import { IStyleWiseAvgEfficiencyReport } from "../style-wise-avg-efficiency-report-type";

function ReportTable({ data }: { data: IStyleWiseAvgEfficiencyReport[] }) {
  const totalRunDays = data.reduce((acc, item) => {
    return acc + item.RUNNIN_DAYS;
  }, 0);

  const totalProd = data.reduce((acc, item) => {
    return acc + item.SEWINGOUTPUT;
  }, 0);

  const totalRunMC = data.reduce((acc, item) => {
    return acc + item.LAYOUTMC;
  }, 0);

  const totalActualHour = data.reduce((acc, item) => {
    return acc + item.ACTUALHOURS;
  }, 0);

  const totalQtyPerHour = totalProd / totalActualHour;

  const totalEarningMin = data.reduce((acc, item) => {
    return acc + item.EARNINGMIN;
  }, 0);

  const totalAvailableMin = data.reduce((acc, item) => {
    return acc + item.AVAILABLEMIN;
  }, 0);

  const totalOpeartor = data.reduce((acc, item) => {
    return acc + item.OPERATOR;
  }, 0);

  return (
    <>
      {data.map((item, index) => (
        <tr key={index} className="text-center">
          <td className="border border-gray-300 p-1">{item.BUYERNAME}</td>
          <td className="border border-gray-300 p-1">{item.PONO}</td>
          <td className="border border-gray-300 p-1">{item.STYLENO}</td>
          <td className="border border-gray-300 p-1">{item.RUNNIN_DAYS}</td>
          <td className="border border-gray-300 p-1">{item.SMVSEWING}</td>

          <td className="border border-gray-300 p-1">{item.SEWINGOUTPUT}</td>

          <td className="border border-gray-300 p-1">{item.RUNNINGMC}</td>

          <td className="border border-gray-300 p-1">{item.OPERATOR}</td>

          <td className="border border-gray-300 p-1 text-center">
            {item.ACTUALHOURS}
          </td>
          <td className="border border-gray-300 p-1 text-center">
            {(item.SEWINGOUTPUT / item.ACTUALHOURS).toFixed(2)}
          </td>

          <td className="border border-gray-300 p-1 text-center">
            {((item.EARNINGMIN * 100) / item.AVAILABLEMIN).toFixed(2)}
          </td>
        </tr>
      ))}
      {
        <tr className="text-center  bg-indigo-200">
          <td className="border border-gray-300 p-1 font-bold" colSpan={3}>
            Total
          </td>
          <td className="border border-gray-300 p-1">{totalRunDays}</td>
          <td className="border border-gray-300 p-1">{data[0]?.SMVSEWING}</td>
          <td className="border border-gray-300 p-1">{totalProd}</td>
          <td className="border border-gray-300 p-1">
            {(totalRunMC / data.length).toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">
            {(totalOpeartor / data.length).toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">{totalActualHour}</td>
          <td className="border border-gray-300 p-1">
            {totalQtyPerHour.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">
            {((totalEarningMin * 100) / totalAvailableMin).toFixed(2)}
          </td>
        </tr>
      }
    </>
  );
}

export default ReportTable;
