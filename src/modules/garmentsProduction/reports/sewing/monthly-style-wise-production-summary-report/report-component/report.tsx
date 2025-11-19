/* eslint-disable @typescript-eslint/no-explicit-any */
import { MonthlyStyleWiseProductionSummaryReportType } from "../monthly-style-wise-production-summary-report-type";
import ReportTable from "./report-table";

function Report({
  data,
}: {
  data: MonthlyStyleWiseProductionSummaryReportType[];
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: MonthlyStyleWiseProductionSummaryReportType[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) result[key] = { items: [] };
      result[key].items.push(item);
      return result;
    }, {} as Record<string, { items: MonthlyStyleWiseProductionSummaryReportType[] }>);
  }

  let groupedByBuyer = groupBy(data, ["SEWING_MONTH"]);

  const uniqueKeysArray = Array.from(uniqueKeys);

  const firstHeader = ["Buyer", "Style", "Sew. Production Qty", "CM Pcs", "Earn CM"];

  const header = firstHeader;

  const productionQty = data.reduce((acc, item) => acc + item.SEWING_OUTPUT, 0);
  const earnCM = data.reduce((acc, item) => acc + item.SEWING_OUTPUT * item.CM, 0);

  return (
    <div style={{ fontFamily: "" }}>
      <div>
        <div className="text-sm mt-1">
          <table className="data-table border-collapse border border-gray-950 w-full">
            <thead>
              <tr>
                {header.map((item) => (
                  <th key={item} className="border border-gray-950 p-1">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {uniqueKeysArray.map((key) => (
                <ReportTable
                  key={key}
                  data={groupedByBuyer[key].items}
                />
              ))}

              <tr className="font-bold">
                <td colSpan={2} className="border text-end border-gray-950 p-1">
                  Grand Total
                </td>
                <td className="border text-end border-gray-950 p-1">
                  {productionQty.toFixed(2)}
                </td>
                <td className="border border-gray-950 p-1">
                  { }
                </td>
                <td className="border border-gray-950 p-1 text-end">
                  {earnCM.toFixed(3)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;
