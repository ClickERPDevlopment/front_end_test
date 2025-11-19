/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { EmbellishmentDailyProductionReportType } from "../embellishment-daily-production-report-type";

function Report({
  data,
  searchParamsObj
}: {
  data: EmbellishmentDailyProductionReportType[];
  searchParamsObj: { fromDate: string; toDate: string; buyerId: string; styleId: string; poId: string; typeId: string; };
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

  interface IGroupedData {
    [key: string]: {
      items: EmbellishmentDailyProductionReportType[];
    };
  }

  let groupedData: IGroupedData = {};

  if (data) {
    groupedData = groupBy(data, ["SUPPLIER_CODE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Customer",
    "Emb. Type",
    "WO",
    "Buyer",
    "Style",
    "PO",
    "GMT Color",
    "Order Qty.",
    "Part Name",
    "Previous Production",
    "Day Production",
    "Total Production",
  ];

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
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
          searchParamsObj={searchParamsObj}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr style={{ fontSize: "15px" }} className="bg-lime-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>

          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedData[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            ))}
            <tr style={{ fontSize: "14px" }} className="font-bold">
              <td colSpan={7} className="border border-gray-950 p-0.5 text-center">Grand Total</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalOrderQty}</td>
              <td className="border border-gray-950 p-0.5"></td>
              <td className="border border-gray-950 p-0.5 text-center">{totalPrevProduction}</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalDayProduction}</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalPrevProduction + totalDayProduction}</td>
            </tr>
          </tbody>
        </table>

        <div className="pt-10">
          {/* <ReportFooter></ReportFooter> */}
        </div>

      </div>
    </div>
  );
}

export default Report;
