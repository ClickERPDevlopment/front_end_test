/* eslint-disable @typescript-eslint/no-explicit-any */

import moment from "moment";
import { MonthlyStyleWiseProductionSummaryReportType } from "../monthly-style-wise-production-summary-report-type";


function ReportTable({
  data
}: {
  data: MonthlyStyleWiseProductionSummaryReportType[];
}) {

  const productionQty = data.reduce((acc, item) => acc + item.SEWING_OUTPUT, 0);
  const earnCM = data.reduce((acc, item) => acc + item.SEWING_OUTPUT * item.CM, 0);

  return (
    <>
      <tr>
        <td colSpan={5} className="border text-center border-gray-950 p-1 font-bold">
          {data[0]?.SEWING_MONTH}
        </td>
      </tr>
      {
        data?.map((item, index) => (
          <tr key={index}>
            <td className="border text-start border-gray-950 p-1">
              {item.BUYER_NAME}
            </td>
            <td className="border text-start border-gray-950 p-1">
              {item.STYLENO}
            </td>
            <td className="border text-end border-gray-950 p-1">
              {item.SEWING_OUTPUT}
            </td>
            <td className="border text-end border-gray-950 p-1">
              {item.CM.toFixed(3)}
            </td>
            <td className="border text-end border-gray-950 p-1">
              {(item.SEWING_OUTPUT * item.CM).toFixed(3)}
            </td>
          </tr>
        ))
      }
      <tr className="font-bold">
        <td colSpan={2} className="border text-end border-gray-950 p-1">
          Total
        </td>
        <td className="border text-end border-gray-950 p-1">
          {productionQty.toFixed(3)}
        </td>
        <td className="border border-gray-950 p-1">
          { }
        </td>
        <td className="border border-gray-950 p-1 text-end">
          {earnCM.toFixed(3)}
        </td>
      </tr>
    </>
  );
}

export default ReportTable;
