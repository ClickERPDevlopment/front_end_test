/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportSubgroup from "./report-subgroup";
import { YarnTransferReportType } from "../yarn-transfer-report-type";

function ReportTable({
  data,
  firstHeader,
}: {
  data: YarnTransferReportType[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: YarnTransferReportType[],
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
      items: YarnTransferReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["BBLC_NO", "YARN", "YARN_LOT_NUMBER", "YARN_BRAND"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY),
    0);


  const totalBagQty = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.CARTON_QTY)),
    0);

  const totalConeQty = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.CONE_QTY)),
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
      <tr style={{ fontSize: "12px" }}>
        <td colSpan={5} className="border border-gray-950 font-bold p-0.5">Total</td>
        <td className="border border-gray-950 p-0.5 font-bold">{totalQuantiy.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 font-bold">B: {Math.floor(totalBagQty)} | C: {Math.floor(totalConeQty)}</td>
      </tr>
    </>
  );
}

export default ReportTable;
