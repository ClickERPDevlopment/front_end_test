/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
// import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { DateWiseFabricPurchaseReceiveRegisterReportType } from "../date-wise-fabric-purchase-receive-register-report-type";
import CurrencyWiseSummary from "../currency-wise-summary/currency-wise-summary-index";
import UomWiseSummary from "../uom-wise-summary/uom-wise-summary-index";

function Report({
  data,
}: {
  data: DateWiseFabricPurchaseReceiveRegisterReportType[];
}) {



  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: DateWiseFabricPurchaseReceiveRegisterReportType[],
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
      items: DateWiseFabricPurchaseReceiveRegisterReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  // set table header
  const firstHeader = [
    "RECEIVE DATE",
    "BUYER",
    "WO NO.",
    "SUPPLIER",
    "FABRIC",
    "LC NO.",
    "CHALLAN NO.",
    "CHALLAN QTY.",
    "MOU",
    "RATE",
    "CURRENCY",
    "VALUE",
    "ROLL QTY.",
  ];


  const challanQty = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY),
    0);


  const rollQty = data?.reduce(
    (acc, item) => acc + Number(item.ROLL_QTY),
    0);


  const value = data?.reduce(
    (acc, item) => acc + (Number(item.QUANTITY) * Number(item.RATE)),
    0);


  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />

        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            ))}

            <tr style={{ fontSize: "12px" }} className="font-bold bg-lime-100">
              <td colSpan={7} className="border border-gray-950 p-0.5">Grand Total</td>
              <td className="border border-gray-950 p-0.5">{challanQty.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{value.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{rollQty.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div>
          {/* <ReportFooter></ReportFooter> */}
        </div>
        <div className="flex justify-between mt-10">
          <div>
            <h4 className="text-center text-sm font-bold">MOU Wise Summary</h4>
            <UomWiseSummary data={data} />
          </div>
          <div>
            <h4 className="text-center text-sm font-bold">Currency Wise Summary</h4>
            <CurrencyWiseSummary data={data} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Report;
