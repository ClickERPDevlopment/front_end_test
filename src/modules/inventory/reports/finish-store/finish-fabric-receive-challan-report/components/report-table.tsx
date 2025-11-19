/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportSubgroup from "./report-subgroup";
import { FinishFabricReceiveChallanReportType } from "../finish-fabric-receive-challan-report-type";

function ReportTable({
  data,
  firstHeader,
}: {
  data: FinishFabricReceiveChallanReportType[];
  firstHeader: string[] | null;
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
    groupedByDate = groupBy(data, ["WORK_ORDER_NUMBER", "PINO", "STYLENO", "PO_NO", "FABRIC", "GMT_COLOR", "UOM"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY),
    0);

  const totalRollQty = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.ROLL_QTY)),
    0);

  const totalQtyPcs = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.PICES)),
    0);

  return (
    <>
      {uniqueKeysArray?.map((key, index) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          index={index}
          firstHeader={firstHeader}
        ></ReportSubgroup>
      ))}
      <tr style={{ fontSize: "14px" }} className="font-bold">
        <td colSpan={8} className="border border-gray-950 font-bold p-0.5 text-right">Total</td>
        <td className="border border-gray-950 p-0.5 font-bold">{totalQuantiy}</td>
        <td className="border border-gray-950 p-0.5 font-bold">{totalRollQty}</td>
        <td className="border border-gray-950 p-0.5 font-bold">{totalQtyPcs}</td>
      </tr>
    </>
  );
}

export default ReportTable;
