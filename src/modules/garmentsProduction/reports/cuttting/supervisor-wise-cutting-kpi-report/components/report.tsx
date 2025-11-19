/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupervisorWiseCuttingKPIReportType } from "../supervisor-wise-cutting-kpi-report-type";
import ReportHeader from "./report-header";
import ReportTable from "./report-table";

function Report({
  data,
  searchParams,
}: {
  data: SupervisorWiseCuttingKPIReportType[];
  searchParams: { toDate: any; fromDate: any };
}) {
  //set table header
  const firstHeader = [
    "Date",
    "Supervaisor Name",
    "ID No.",
    "Table No",
    "Target Quantity",
    "Achive Quantity",
    "Deviation",
    "Target Efficiency %",
    "Achive Efficiency %",
    "Deviation Efficiency %",
  ];


  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: SupervisorWiseCuttingKPIReportType[],
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
      items: SupervisorWiseCuttingKPIReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["LINENAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);




  const totaltargetQty = data.reduce((sum, item) => sum + item.HOURLYTARGET, 0);
  const totalAchiveQty = data.reduce((sum, item) => sum + item.TOTAL_CUTTING_QTY, 0);
  const totalDeviationQty = totalAchiveQty - totaltargetQty;

  // const totalTargetEfficiency = data.reduce((sum, item) => sum + ((item.TARGET_EARMN_MIN * 100) / item.AVAILABLE_EARMN_MIN), 0);

  // const totalAchieveEfficiency = data.reduce((sum, item) => sum + ((item.PRODUCTION_MIN * 100) / (item.AVAILABLE_EARMN_MIN)), 0);

  const totalEarnMin = data.reduce((sum, item) => sum + item.TARGET_EARMN_MIN, 0);
  const totalAvlMin = data.reduce((sum, item) => sum + item.AVAILABLE_EARMN_MIN, 0);
  const totalProMin = data.reduce((sum, item) => sum + item.PRODUCTION_MIN, 0);

  // const totalDeviationEfficiency = totalAchieveEfficiency - totalTargetEfficiency;

  return (
    <div className="px-10 text-sm">
      <div className="p-2">
        <ReportHeader
          data={data[0]}
          searchParams={{
            toDate: searchParams?.toDate,
            fromDate: searchParams?.fromDate,
          }}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            <tr className="bg-lime-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
              ></ReportTable>
            ))}

            <tr className="text-center font-bold">
              <td colSpan={4} className="border border-gray-300 p-1 text-right">Grand Total</td>
              <td className="border border-gray-300 p-1">
                {totaltargetQty}
              </td>
              <td className="border border-gray-300 p-1">
                {totalAchiveQty}
              </td>
              <td className="border border-gray-300 p-1">
                {totalDeviationQty}
              </td>
              <td className="border border-gray-300 p-1">{(totalEarnMin / totalAvlMin).toFixed(2)}</td>
              <td className="border border-gray-300 p-1">
                {(totalProMin / totalAvlMin).toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1">{((totalEarnMin / totalAvlMin) - (totalProMin / totalAvlMin)).toFixed(2)}</td>
            </tr>

          </tbody>
        </table>
        <div className="p-5"></div>
        <div>
          {/* <ReportFooter></ReportFooter> */}
        </div>
      </div>
    </div>
  );
}

export default Report;
