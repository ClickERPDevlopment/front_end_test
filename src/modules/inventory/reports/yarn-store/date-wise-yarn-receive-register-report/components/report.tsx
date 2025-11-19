/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { DateWiseYarnReceiveRegisterReportType } from "../date-wise-yarn-receive-register-report-type";

function Report({
  data,
}: {
  data: DateWiseYarnReceiveRegisterReportType[];
}) {


  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: DateWiseYarnReceiveRegisterReportType[],
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
      items: DateWiseYarnReceiveRegisterReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["YARN_RECEIVED_DATE", "SUPPLIER", "RCVD_CHALLAN_NO", "YARN_NAME", "LC_UNIT_PRICE", "CURRENCYCODE", "BBLC_NO", "BBLC_DATE", "WO_NO", "WO_DATE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Receive Date",
    "Supplier Name",
    "Challan No",
    "Yarn",
    "Challan  Qty",
    "Price",
    "Currency",
    "Value",
    "LC/WO No",
    "LC/WO Date",
  ];

  const totalDelQty = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY),
    0);

  const totalValue = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY * item.LC_UNIT_PRICE),
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

            <tr style={{ fontSize: "12px" }} className="font-bold">
              <td colSpan={4} className="border border-gray-950 p-0.5">Grand Total</td>
              <td className="border border-gray-950 p-0.5">{totalDelQty.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{totalValue.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
            </tr>

          </tbody>
        </table>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
