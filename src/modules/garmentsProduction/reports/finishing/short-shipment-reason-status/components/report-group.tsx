/* eslint-disable @typescript-eslint/no-explicit-any */
import { IShortShipmentReasonStatus } from "../short-shipment-reason-status-type";
import ReportTable from "./report-table";
function ReportGroup({
  data,
  firstHeader,
}: {
  data: IShortShipmentReasonStatus[];
  firstHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IShortShipmentReasonStatus[], keys: string[]) {
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

  interface GroupedByBuyer {
    [key: string]: {
      items: IShortShipmentReasonStatus[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, ["STYLE_NO"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalOrderQty = data.reduce((acc, item) => {
    return acc + item.ORDER_QTY;
  }, 0);

  const totalCuttingrQty = data.reduce((acc, item) => {
    return acc + item.CUTTING_QTY;
  }, 0);

  const totalSewingQty = data.reduce((acc, item) => {
    return acc + item.SEWING_QTY;
  }, 0);

  const totalShipmentQty = data.reduce((acc, item) => {
    return acc + item.SHIPMENT_QTY;
  }, 0);

  const totalShortExcessQty = data.reduce((acc, item) => {
    return acc + (item.ORDER_QTY - item.SHIPMENT_QTY);
  }, 0);

  const totalAffectedQty = data.reduce((acc, item) => {
    return acc + item.AFFECTED_QTY;
  }, 0);

  return (
    <div className="mb-2">
      <div className="flex items-center font-semibold">
        <p>BUYER: {data[0]?.BUYER_NAME}</p>
      </div>
      <table className="border-collapse border border-gray-300  w-[100%]">
        <thead>
          <tr className="bg-lime-200 text-center">
            {firstHeader?.map((item) => (
              <th className="border border-gray-300 p-1">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueKeysArray?.map((key) => (
            <ReportTable
              key={key}
              data={groupedByBuyer[key].items}
              firstHeader={firstHeader}
            ></ReportTable>
          ))}
          <tr className="text-center bg-sky-200">
            <td className="border border-gray-300 p-1 font-bold" colSpan={2}>
              Grand Total
            </td>
            <td className="border border-gray-300 p-1">{totalOrderQty}</td>
            <td className="border border-gray-300 p-1">{totalCuttingrQty}</td>
            <td className="border border-gray-300 p-1">{totalSewingQty}</td>
            <td className="border border-gray-300 p-1">{totalShipmentQty}</td>
            <td className="border border-gray-300 p-1">
              {totalShortExcessQty}
            </td>
            <td className="border border-gray-300 p-1"></td>
            <td className="border border-gray-300 p-1"></td>
            <td className="border border-gray-300 p-1">{totalAffectedQty}</td>
            <td className="border border-gray-300 p-1"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportGroup;
