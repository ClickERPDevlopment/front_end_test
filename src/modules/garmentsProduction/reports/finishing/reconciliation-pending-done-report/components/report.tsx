/* eslint-disable @typescript-eslint/no-explicit-any */
import { IReconsiliationPendingDoneReport } from "../reconciliation-pending-done-report";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import ReportRow from "./report-row";

function Report({
  data,
  searchParams,
}: {
  data: IReconsiliationPendingDoneReport[];
  searchParams: { isDate: boolean | undefined; toDate: any; fromDate: any };
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IReconsiliationPendingDoneReport[], keys: string[]) {
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
      items: IReconsiliationPendingDoneReport[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, ["BUYER_NAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "STYLE",
    "PO",
    "SHIPDATE",
    "ORDER QTY",
    "CUTTING QTY",
    "SHIP QTY",
    "RC DUE QTY",
    "RC DONE QTY",
  ];

  const totalOrderQty = data.reduce((acc, item) => acc + item.ORDER_QTY, 0);
  const totalShipmentQty = data.reduce(
    (acc, item) => acc + item.SHIPMENT_QTY,
    0
  );
  const totalReconQty = data.reduce((acc, item) => acc + item.RECON_QTY, 0);
  const totalCuttingQty = data.reduce((acc, item) => acc + item.CUTTING_QTY, 0);

  return (
    <div className="px-10 text-sm">
      <div className="p-2">
        <ReportHeader
          data={data[0]}
          searchParams={{
            isDate: searchParams?.isDate,
            toDate: searchParams?.toDate,
            fromDate: searchParams?.fromDate,
          }}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr className="bg-lime-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportRow key={key} data={groupedByBuyer[key].items}></ReportRow>
            ))}
            <tr className="font-bold">
              <td className="border border-gray-300 p-1 text-sm text-center">
                Grand Total
              </td>
              <td className="border border-gray-300 p-1 text-sm text-center"></td>
              <td className="border border-gray-300 p-1 text-sm text-center"></td>
              <td className="border border-gray-300 p-1 text-sm text-center">
                {totalOrderQty}
              </td>
              <td className="border border-gray-300 p-1 text-sm text-center">
                {totalCuttingQty}
              </td>
              <td className="border border-gray-300 p-1 text-sm text-center">
                {totalShipmentQty}
              </td>
              <td className="border border-gray-300 p-1 text-sm text-center">
                {totalCuttingQty - totalShipmentQty}
              </td>
              <td className="border border-gray-300 p-1 text-sm text-center">
                {totalReconQty}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
