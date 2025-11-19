/* eslint-disable @typescript-eslint/no-explicit-any */
import { OperationBulletinReportType } from "../operation-bulletin-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
  uniqueItemNumber,
  dataLength
}: {
  data: OperationBulletinReportType[];
  firstHeader: string[] | null;
  uniqueItemNumber?: number;
  dataLength?: number;
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
    groupedByDate = groupBy(data, ["OPERATIONNAME", "MACHINENAME", "CAPACITYHR", "REMARKS", "GUIDEFOLDER", "ATTACHMENT"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalSMV = data.reduce((acc, item) => acc + Number(item.SMV), 0);
  const totalRequiredMP = data.reduce((acc, item) => acc + item.REQMP, 0);
  const totalAllottedMP = data.reduce((acc, item) => acc + item.ALLOTTEDMP, 0);


  return (
    <>
      {uniqueItemNumber && uniqueItemNumber > 1 && (
        <tr className="font-bold">
          <td colSpan={10} className="border border-gray-950 p-0.5 text-center">{data[0]?.SECTIONNAME}</td>
        </tr>
      )}

      {uniqueKeysArray?.map((key, index) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          index={index + (dataLength || 0)}
          firstHeader={firstHeader}
        ></ReportSubgroup>
      ))}
      <tr className="font-bold" style={{ fontSize: "12px", backgroundColor: "#A7F3D0" }}>
        <td colSpan={3} className="border border-gray-950 p-0.5 text-center">Total</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalSMV.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-center">{Math.round(Number(totalSMV * 60))}</td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5 text-center">{totalRequiredMP.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalAllottedMP.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-center">{ }</td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5"></td>
      </tr>
    </>
  );
}

export default ReportTable;
