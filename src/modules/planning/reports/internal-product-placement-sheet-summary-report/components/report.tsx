/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { InternalProductPlacementSheetReportType } from "../internal-product-placement-sheet-report-type";
import { InternalProductPlacementSheetSummaryReportType } from "../internal-product-placement-sheet-summary-report-type";
import ReportSummary from "./report-summary";
import ReportFooter from "./report-footer";

function Report({
  searchParamsObj,
  data,
  summaryData,
}: {
  searchParamsObj: { fromDate: string; toDate: string; buyerId: string; companyId: string; fromDateCheck: boolean; toDateCheck: boolean };
  data: InternalProductPlacementSheetReportType[];
  summaryData: InternalProductPlacementSheetSummaryReportType[];
}) {


  const uniqueKeys: Set<string> = new Set();

  function groupBy<T>(
    data: T[],
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

  interface GroupedByItem {
    [key: string]: {
      items: InternalProductPlacementSheetReportType[];
    };
  }

  let groupedByItem: GroupedByItem = {};

  if (data) {
    groupedByItem = groupBy<InternalProductPlacementSheetReportType>(data, ["ITEMTYPE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);
  uniqueKeys.clear();

  interface GroupedSummary {
    [key: string]: {
      items: InternalProductPlacementSheetSummaryReportType[];
    };
  }

  const groupedSummaryData: GroupedSummary = groupBy<InternalProductPlacementSheetSummaryReportType>(
    summaryData,
    ['ITEMTYPE']
  );

  const uniqueSummaryKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "SL NO.",
    "Buyer Name",
    "Order No",
    "Factory",
    "Qty (pcs)",
    "No of Style",
    "No of Color",
    "Proposed Ship Date",
    "Plan Ship Date",
    "Actual Ship Date",
    "Remarks",
  ];

  //summary header

  const summaryHeader = [
    "SL NO.",
    "Product Type",
    "Qty (pcs)",
    "No of Model",
    "No of Color",
  ];

  const totalOrderQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.ORDERQTY),
    0);

  let trackIndex = 0;

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          searchParamsObj={searchParamsObj}
          data={data}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-lime-200 print:bg-transparent">
            <tr style={{ fontSize: "14px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => {
              let prevTrackIndex = trackIndex
              trackIndex += groupedByItem[key].items.length;
              return (
                <ReportTable
                  key={key}
                  data={groupedByItem[key].items}
                  firstHeader={firstHeader}
                  trackIndex={prevTrackIndex}
                ></ReportTable>
              );
            })}

            <tr style={{ fontSize: "14px" }}>
              <td colSpan={4} className="border border-gray-950 font-bold p-0.5">Total</td>
              <td className="border border-gray-950 p-0.5 font-bold">{totalOrderQuantiy}</td>
              <td className="border border-gray-950 p-0.5"></td>
              <td className="border border-gray-950 p-0.5"></td>
              <td className="border border-gray-950 p-0.5"></td>
              <td className="border border-gray-950 p-0.5"></td>
              <td className="border border-gray-950 p-0.5"></td>
              <td className="border border-gray-950 p-0.5"></td>
            </tr>
          </tbody>
        </table>

        <div className="mt-5 w-[60%]">
          <p className="text-center font-bold mb-0" style={{ fontSize: "14px" }}>Summary</p>
          <table className="border-collapse border border-gray-300  w-[100%]">
            <thead className="sticky top-0 print:static bg-lime-200 print:bg-transparent">
              <tr style={{ fontSize: "14px" }} className="bg-indigo-200 text-center">
                {summaryHeader?.map((item) =>
                  <th className="border border-gray-950 p-0.5">{item}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {uniqueSummaryKeysArray?.map((key, index) => (
                <ReportSummary
                  key={key}
                  data={groupedSummaryData[key].items}
                  firstHeader={firstHeader}
                  index={index}
                ></ReportSummary>
              ))}

              <tr style={{ fontSize: "14px" }}>
                <td colSpan={2} className="border border-gray-950 font-bold p-0.5">Total</td>
                <td className="border border-gray-950 p-0.5 font-bold">{totalOrderQuantiy}</td>
                <td className="border border-gray-950 p-0.5 font-bold"></td>
                <td className="border border-gray-950 p-0.5 font-bold"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-10">
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
