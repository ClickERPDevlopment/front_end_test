/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import { ThreadConsumptionReportType } from "../thread-consumption-report-type";

function Report({
  data,
}: {
  data: ThreadConsumptionReportType[];
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: ThreadConsumptionReportType[],
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
      items: ThreadConsumptionReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "SL",
    "Name of Operation",
    "MC Code",
    "SPI",
    "SL (CM)",
    "Needle (M)",
    "Bobbin/Looper (M)",
    "Wastage",
    "Total Cons (M)",
  ];

  // const totalCons = data.reduce((acc, item) => acc + item.TOTALDETAILSOPERAITONLENGTH + item.WASTAGEVALUE, 0);
  const totalNeedleThreadLength = data.reduce((acc, item) => acc + item.NEEDLETHREADLENGTH, 0);
  const totalBobbinLopperThreadLength = data.reduce((acc, item) => acc + item.BOBBINTHREADLENGTH + item.LOOPERTHREADLENGTH, 0);

  const totalWastageValue = data.reduce((acc, item) => acc + (((item.NEEDLETHREADLENGTH) * item.WASTAGE / 100)) + (((item.BOBBINTHREADLENGTH) * item.WASTAGE / 100)) + (((item.LOOPERTHREADLENGTH) * item.WASTAGE / 100)), 0);

  let dataLength = 0;

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="text-gray-950">
      <div>
        <table className="border-collapse border border-gray-300 mt-3 ms-auto me-auto w-full">
          <thead className="" style={{ backgroundColor: "#a7f3d0" }}>
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th style={{ backgroundColor: "#a7f3d0" }} className="border border-gray-950 p-0.5">{item}</th>
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
              <tr className="font-bold" style={{ backgroundColor: "#A7F3D0", fontSize: "12px" }}>
                <td colSpan={5} className="border border-gray-950 p-0.5 text-center">Grand Total</td>
                <td className="border border-gray-950 p-0.5 text-center">{Number(totalNeedleThreadLength)?.toFixed(2)}</td>
                <td className="border border-gray-950 p-0.5 text-center">{Number(totalBobbinLopperThreadLength)?.toFixed(2)}</td>
                <td className="border border-gray-950 p-0.5 text-center">{Number(totalWastageValue)?.toFixed(2)}</td>
                <td className="border border-gray-950 p-0.5 text-center">{(totalNeedleThreadLength + totalBobbinLopperThreadLength + totalWastageValue)?.toFixed(2)}</td>
              </tr>
            }

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
