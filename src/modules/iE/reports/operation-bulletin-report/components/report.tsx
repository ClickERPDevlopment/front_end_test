/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import { OperationBulletinReportType } from "../operation-bulletin-report-type";

function Report({
  data,
}: {
  data: OperationBulletinReportType[];
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: OperationBulletinReportType[],
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
      items: OperationBulletinReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["SECTIONNAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "SL",
    "Name of Operation",
    "MC Name",
    "SMV",
    "Second",
    "Target/Hr",
    "Req. MP",
    "All. MP",
    "Target",
    "Remarks",
    "Guide/Folder",
  ];

  const totalSMV = data.reduce((acc, item) => acc + item.SMV, 0);
  const totalRequiredMP = data.reduce((acc, item) => acc + item.REQMP, 0);
  const totalAllottedMP = data.reduce((acc, item) => acc + item.ALLOTTEDMP, 0);

  let dataLength = 0;
  //

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="text-gray-950">
      <div>
        <table className="border-collapse border border-gray-300 mt-3 w-full">
          <thead className="" style={{ backgroundColor: "#A7F3D0" }}>
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => {
              let prevLength = dataLength;
              dataLength += groupedByDate[key].items.length;
              return <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
                uniqueItemNumber={uniqueKeysArray.length}
                dataLength={prevLength}
              ></ReportTable>
            })}

            {
              uniqueKeysArray.length > 1 && <tr className="font-bold" style={{ backgroundColor: "#A7F3D0", fontSize: "12px" }}>
                <td colSpan={3} className="border border-gray-950 p-0.5 text-center">Grand Total</td>
                <td className="border border-gray-950 p-0.5">{Number(totalSMV)?.toFixed(2)}</td>
                <td className="border border-gray-950 p-0.5 text-center">{Math.round(Number(totalSMV * 60))}</td>
                <td className="border border-gray-950 p-0.5"></td>
                <td className="border border-gray-950 p-0.5 text-center">{totalRequiredMP?.toFixed(2)}</td>
                <td className="border border-gray-950 p-0.5 text-center">{totalAllottedMP?.toFixed(2)}</td>
                <td className="border border-gray-950 p-0.5 text-center">{ }</td>
                <td className="border border-gray-950 p-0.5"></td>
                <td className="border border-gray-950 p-0.5"></td>
              </tr>
            }

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
