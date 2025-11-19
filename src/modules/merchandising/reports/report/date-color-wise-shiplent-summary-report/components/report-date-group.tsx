/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateColorWiseShiplentSummaryReportType } from "../date-color-wise-shiplent-summary-report-type";
import ReportBuyerGroup from "./report-buyer-group";

function ReportDateGroup({
  data,
}: {
  data: DateColorWiseShiplentSummaryReportType[];
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: DateColorWiseShiplentSummaryReportType[],
    keys: string[]
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface GroupedByDate {
    [key: string]: {
      items: DateColorWiseShiplentSummaryReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["BUYER"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalOrderQty = data.reduce((sum, item) => sum + item.ORDER_QTY, 0);
  const totalShipmentQty = data.reduce((sum, item) => sum + item.SHIPMENTQTY, 0);
  const totalValue = data.reduce((sum, item) => sum + (item.SHIPMENTQTY * item.FOB), 0);

  return (
    <>
      {
        uniqueKeysArray.map((key) => {
          const group = groupedByDate[key];
          return <>
            <ReportBuyerGroup data={group?.items}></ReportBuyerGroup>
          </>
        }
        )
      }

      <tr className="text-center bg-emerald-100 font-bold">
        <td colSpan={6} className="border border-gray-300 p-1 text-right">Date Wise Total</td>
        <td className="border border-gray-300 p-1 text-right">{totalOrderQty}</td>
        <td className="border border-gray-300 p-1">{ }</td>
        <td className="border border-gray-300 p-1">{ }</td>
        <td className="border border-gray-300 p-1 text-right">{totalShipmentQty}</td>
        <td className="border border-gray-300 p-1">{ }</td>
        <td className="border border-gray-300 p-1 text-right">{totalValue.toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportDateGroup;
