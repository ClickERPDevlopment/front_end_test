/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateWiseYarnAllocationReportType } from "../date-wise-yarn-allocation-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
  groupLength,
}: {
  data: DateWiseYarnAllocationReportType[];
  firstHeader: string[] | null;
  groupLength: number;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: DateWiseYarnAllocationReportType[],
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
      items: DateWiseYarnAllocationReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["CREATED_DATE", "BBLC_NO", "YARN", "BUYER_NAME", "STYLENO", "WORK_ORDER_NUMBER"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalAllocatedQty = data.reduce((acc, item) => acc + item.ALLOCATED_QTY, 0)
  const totalIssueQty = data.reduce((acc, item) => acc + item.ISSUE_QTY, 0)

  return (
    <>
      {/* <tr style={{ fontSize: "14px" }} className="font-bold">
        <td colSpan={12} className="border border-gray-950 font-bold p-0.5">Yarn Description: {data[0]?.YARN}</td>
      </tr> */}
      {uniqueKeysArray?.map((key, index) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          index={index + groupLength}
          firstHeader={firstHeader}
        ></ReportSubgroup>
      ))}
      <tr style={{ fontSize: "14px", backgroundColor: "#b5fcdb" }} className="font-bold">
        <td colSpan={5} className="border border-gray-950 p-0.5">Total</td>
        <td className="border border-gray-950 p-0.5">{totalAllocatedQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalIssueQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{ }</td>
        <td className="border border-gray-950 p-0.5">{ }</td>
        <td className="border border-gray-950 p-0.5">{ }</td>
      </tr>
    </>
  );
}

export default ReportTable;
