/* eslint-disable @typescript-eslint/no-explicit-any */
import { LotWiseYarnStockReportType } from "../yarn-stock-after-allocation-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
  groupLength,
}: {
  data: LotWiseYarnStockReportType[];
  firstHeader: string[] | null;
  groupLength: number;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: LotWiseYarnStockReportType[],
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
      items: LotWiseYarnStockReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["LC_NUMBER", "WORK_ORDER_NUMBER", "BBLC_DATE", "FIRST_RCV_DATE", "LAST_RCV_DATE", "YARN_TYPE", "BRAND_NAME", "YARN_LOT_NUMBER"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalYarnRcvQty = data.reduce((acc, item) => acc + item.YARN_RECEIVED_QNT, 0)
  const totalYarnAllocationQty = data.reduce((acc, item) => acc + item.YARN_ALLOCATION_QNT, 0)
  const totalYarnIssueQty = data.reduce((acc, item) => acc + item.YARN_ISSUE_QNT, 0)
  const totalStock = data.reduce((acc, item) => acc + item.BALANCE_QUANTITY, 0)
  const totalYarnAdj = data.reduce((acc, item) => acc + item.YARN_ADJUSTMENT_QTY, 0)
  const totalAllocationStock = data.reduce((acc, item) => acc + item.AFTER_ALLO_STOCK, 0)



  return (
    <>
      <tr style={{ fontSize: "14px" }} className="font-bold">
        <td colSpan={12} className="border border-gray-950 font-bold p-0.5">Yarn Description: {data[0]?.YARN}</td>
      </tr>
      {uniqueKeysArray?.map((key, index) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          index={index + groupLength}
          firstHeader={firstHeader}
        ></ReportSubgroup>
      ))}
      <tr style={{ fontSize: "14px", backgroundColor: "#b5fcdb" }} className="font-bold">
        <td colSpan={8} className="border border-gray-950 p-0.5">Sub Total</td>
        <td className="border border-gray-950 p-0.5">{totalYarnRcvQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalYarnAllocationQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalAllocationStock.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalYarnIssueQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalStock.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalYarnAdj.toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportTable;
