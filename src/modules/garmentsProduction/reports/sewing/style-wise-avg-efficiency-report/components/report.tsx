/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStyleWiseAvgEfficiencyReport } from "../style-wise-avg-efficiency-report-type";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import ReportSubgroup from "./report-sub-group";

function Report({
  data,
  searchParams,
}: {
  data: IStyleWiseAvgEfficiencyReport[];
  searchParams: { toDate: any; fromDate: any };
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IStyleWiseAvgEfficiencyReport[], keys: string[]) {
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

  interface GroupedByBuyer {
    [key: string]: {
      items: IStyleWiseAvgEfficiencyReport[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, ["BUYERNAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "BUYER",
    "PO",
    "STYLE NO",
    "RUN DAYS",
    "SMV",
    "PROD",
    "RUN MC",
    "USED M/O",
    "ACTU W/HR",
    "QTY PER HOUR",
    "OVERALL AVG EFF%",
  ];

  const totalRunDays = data.reduce((acc, item) => {
    return acc + item.RUNNIN_DAYS;
  }, 0);

  const totalProd = data.reduce((acc, item) => {
    return acc + item.SEWINGOUTPUT;
  }, 0);

  const totalRunMC = data.reduce((acc, item) => {
    return acc + item.LAYOUTMC;
  }, 0);

  const totalActualHour = data.reduce((acc, item) => {
    return acc + item.ACTUALHOURS;
  }, 0);

  const totalQtyPerHour = totalProd / totalActualHour;

  const totalEarningMin = data.reduce((acc, item) => {
    return acc + item.EARNINGMIN;
  }, 0);

  const totalAvailableMin = data.reduce((acc, item) => {
    return acc + item.AVAILABLEMIN;
  }, 0);

  const totalOpeartor = data.reduce((acc, item) => {
    return acc + item.OPERATOR;
  }, 0);

  return (
    <div className="px-10">
      <div className="p-2">
        <ReportHeader
          data={data[0]}
          searchParams={{
            toDate: searchParams?.toDate,
            fromDate: searchParams?.fromDate,
          }}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead>
            <tr className="bg-lime-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportSubgroup
                key={key}
                data={groupedByBuyer[key].items}
                searchParams={searchParams}
              ></ReportSubgroup>
            ))}
            <tr className="text-center  bg-yellow-200">
              <td className="border border-gray-300 p-1 font-bold" colSpan={3}>
                Grand Total
              </td>
              <td className="border border-gray-300 p-1">{totalRunDays}</td>
              <td className="border border-gray-300 p-1">
                {data[0]?.SMVSEWING}
              </td>
              <td className="border border-gray-300 p-1">{totalProd}</td>
              <td className="border border-gray-300 p-1">
                {(totalRunMC / data.length).toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1">
                {(totalOpeartor / data.length).toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1">
                {totalActualHour.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1">
                {totalQtyPerHour.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-1">
                {((totalEarningMin * 100) / totalAvailableMin).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
