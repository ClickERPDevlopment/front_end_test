/* eslint-disable @typescript-eslint/no-explicit-any */
import { OperationBulletinMCDayWiseTargetReportType } from "../operation-bulletin-mc-day-wise-target-report-type";

function OperationBulletinMCDayWiseTarget({
  data,
}: {
  data: OperationBulletinMCDayWiseTargetReportType[];
}) {

  //set table header
  const firstHeader = [
    "Day",
    "Target %",
    "Hourly Target (Pcs)",
    "8 Hour (Pcs)",
  ];


  return (
    <table className="border-collapse border border-gray-300  w-[100%] mt-3">
      <thead className="sticky top-0 print:static bg-white print:bg-transparent">
        <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
          {firstHeader?.map((item) =>
            <th className="border border-gray-950 p-0.5">{item}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-950 p-0.5">{item.DAY}</td>
              <td className="border border-gray-950 p-0.5">{item.TARGET_PER}</td>
              <td className="border border-gray-950 p-0.5">{item.HOURLY_TARGET}</td>
              <td className="border border-gray-950 p-0.5">{item.TOTAL_QTY}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default OperationBulletinMCDayWiseTarget;
