/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmbellishmentDailyProductionReportType } from "../embellishment-daily-production-report-type";
import ReportGroup from "./report-group";

function ReportTable({
  data,
  firstHeader,
}: {
  data: EmbellishmentDailyProductionReportType[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: EmbellishmentDailyProductionReportType[],
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
      items: EmbellishmentDailyProductionReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["BUYER"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  const totalOrderQty = data?.reduce(
    (acc, item) => acc + Number(item.PO_QTY),
    0);

  const totalPrevProduction = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.PREVIOUS_PRODUCTION_QTY)),
    0);

  const totalDayProduction = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.DAY_PRODUCTION_QTY)),
    0);


  return (
    <>
      {uniqueKeysArray?.map((key) => (
        <ReportGroup
          key={key}
          data={groupedByDate[key].items}
          firstHeader={firstHeader}
        ></ReportGroup>
      ))}

      <tr style={{ fontSize: "14px" }} className="font-bold">
        <td colSpan={7} className="border border-gray-950 p-0.5 text-center">Customer Wise Total</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalOrderQty}</td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5 text-center">{totalPrevProduction}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalDayProduction}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalPrevProduction + totalDayProduction}</td>
      </tr>
    </>
  );
}

export default ReportTable;
