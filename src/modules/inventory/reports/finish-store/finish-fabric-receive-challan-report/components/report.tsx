/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { FinishFabricReceiveChallanReportType } from "../finish-fabric-receive-challan-report-type";

function Report({
  data,
}: {
  data: FinishFabricReceiveChallanReportType[];
}) {


  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: FinishFabricReceiveChallanReportType[],
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
      items: FinishFabricReceiveChallanReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "SL NO.",
    "Work Order",
    "PI No",
    "Style No",
    "PO No",
    "Fabric Type",
    "Color",
    "Uom",
    "Receive Qty",
    "Roll Qty",
    "Receive Qty Pcs",
  ];

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            <tr style={{ fontSize: "14px" }} className="bg-indigo-200 text-center">
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
          </tbody>
        </table>
        <div>
          {/* <ReportFooter></ReportFooter> */}
        </div>
      </div>
    </div>
  );
}

export default Report;
