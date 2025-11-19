/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateWiseShiplentSummaryReportType } from "../date-wise-shiplent-summary-report-type";
import ReportSubGroup from "./report-sub-group";

function ReportBuyerGroup({
  data,
}: {
  data: DateWiseShiplentSummaryReportType[];
}) {


  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: DateWiseShiplentSummaryReportType[],
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
      items: DateWiseShiplentSummaryReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["BUYER", "STYLENAME", "STYLENO", "ITEMUOM"]);
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
            <ReportSubGroup data={group?.items}></ReportSubGroup>
          </>
        }
        )
      }

      <tr className="text-center font-bold bg-emerald-100">
        <td colSpan={5} className="border border-gray-300 p-1 text-right">Buyer Wise Total</td>
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

export default ReportBuyerGroup;
