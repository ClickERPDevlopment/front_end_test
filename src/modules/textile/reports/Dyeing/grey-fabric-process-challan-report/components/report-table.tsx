/* eslint-disable @typescript-eslint/no-explicit-any */
import { GreyFabricProcessChallanReportType } from "../grey-fabric-process-challan-report-type";
import ReportGroup from "./report-group";

function ReportTable({
  data,
  challanType
}: {
  data: GreyFabricProcessChallanReportType[];
  firstHeader: string[] | null;
  challanType: string;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: GreyFabricProcessChallanReportType[],
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
      items: GreyFabricProcessChallanReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["FABRIC"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalQuantiy = data.reduce((sum, item) => sum + (item.ISSUE_QTY_KG || 0), 0);
  const totalRollQty = data.reduce((sum, item) => sum + (item.ISSUE_QTY_ROLL || 0), 0);

  return (
    <>
      <tr style={{ fontSize: "12px" }}>
        {
          challanType === "Outside" ? <td colSpan={12} className="border border-gray-950 font-bold p-0.5"><span>Buyer: {data[0]?.SYMBOLIC_NAME}, <span className="px-2"></span>Job: {data[0]?.JOB_NUMBER}</span></td> : <td colSpan={12} className="border border-gray-950 font-bold p-0.5">Buyer: {data[0]?.BUYER_NAME}, <span className="px-2"></span> Style: {data[0]?.STYLENO}, <span className="px-2"></span> Job: {data[0]?.JOB_NUMBER},<span className="px-2"></span>  PO: {data[0]?.PONO}</td>
        }
      </tr>
      {uniqueKeysArray?.map((key) => (
        <ReportGroup
          key={key}
          data={groupedByDate[key].items}
        ></ReportGroup>
      ))}
      <tr style={{ fontSize: "13px" }}>
        <td colSpan={9} className="border border-gray-950 font-bold p-0.5 text-right">Sub Total</td>
        <td className="border border-gray-950 p-0.5 font-bold">{totalRollQty}</td>
        <td className="border border-gray-950 p-0.5 font-bold">{totalQuantiy}</td>
        <td className="border border-gray-950 p-0.5 font-bold">{ }</td>
      </tr>
    </>
  );
}

export default ReportTable;
