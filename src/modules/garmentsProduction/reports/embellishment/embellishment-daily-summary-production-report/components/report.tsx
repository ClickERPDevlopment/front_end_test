/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { EmbellishmentDailySummaryProductionReportType } from "../embellishment-daily-summary-production-report-type";

function Report({
  data,
  searchParamsObj
}: {
  data: EmbellishmentDailySummaryProductionReportType[];
  searchParamsObj: { fromDate: string; toDate: string; buyerId: string; isMonthlySummary: boolean; };
}) {

  if (searchParamsObj.isMonthlySummary) {
    const processedData = data?.map((item) => ({
      ...item,
      PRODUCTION_DATE: item.PRODUCTION_DATE
        ? new Date(new Date(item.PRODUCTION_DATE).getFullYear(), new Date(item.PRODUCTION_DATE).getMonth(), 1)
        : new Date(),
    }));
    data = processedData;
  }


  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: EmbellishmentDailySummaryProductionReportType[],
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
      items: EmbellishmentDailySummaryProductionReportType[];
    };
  }

  let groupedData: IGroupedData = {};

  if (data) {
    groupedData = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Production Date",
    "Printing Qty",
    "Embroidery Qty",
    "Total Qty",
  ];

  const totalPrintingQty = data?.reduce(
    (acc, item) => acc + Number(item.PRINTING_PRODUCTION_QTY),
    0);

  const totalEmbroideryQty = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.EMBROIDERY_PRODUCTION_QTY)),
    0);

  const totalQty = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.PRINTING_PRODUCTION_QTY)) + Number(item.EMBROIDERY_PRODUCTION_QTY),
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
                searchParamsObj={searchParamsObj}
              ></ReportTable>
            ))}
            <tr style={{ fontSize: "14px" }} className="font-bold">
              <td className="border border-gray-950 p-0.5 text-center">Total</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalPrintingQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalEmbroideryQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalQty}</td>
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
