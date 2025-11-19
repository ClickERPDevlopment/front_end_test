/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import ReportGrandTotal from "./report-grand-total";
import { IProcessWiseDyeingFinishProductionReport } from "../process-wise-dyeing-finish-production-report-type";

function Report({
  data,
  searchParams,
}: {
  data: IProcessWiseDyeingFinishProductionReport[];
  searchParams: { toDate: any; fromDate: any };
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: IProcessWiseDyeingFinishProductionReport[],
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
      items: IProcessWiseDyeingFinishProductionReport[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["PRO_DATE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const machineType = [
    "DYEING",
    "SLITTING",
    "STENTER",
    "HEAT SEET",
    "COMPACTING OPEN",
    "SQUEEZER",
    "FLAT DRYER",
    "COMPACTING TUBE",
  ];

  interface GroupedByMCType {
    [key: string]: {
      items: IProcessWiseDyeingFinishProductionReport[];
    };
  }

  let groupedByMCType: GroupedByMCType = {};

  if (data) {
    groupedByMCType = groupBy(data, ["MC_TYPE"]);
  }

  //set table header
  const firstHeader = [
    "DATE",
    "DYEING",
    "TOTAL",
    "SLITTING",
    "TOTAL",
    "STENTER",
    "TOTAL",
    "HEAT SEET",
    "TOTAL",
    "COMPACTING OPEN",
    "TOTAL",
    "DE WATER",
    "TOTAL",
    "DRYER",
    "TOTAL",
    "COMPACTING TUBE",
    "TOTAL",
  ];

  return (
    <div className="px-10">
      <div className="p-2">
        <ReportHeader
          searchParams={{
            toDate: searchParams?.toDate,
            fromDate: searchParams?.fromDate,
          }}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                item === "TOTAL" || item === "DATE" ? (
                  <th className="border border-gray-300 p-1">{item}</th>
                ) : (
                  <th colSpan={3} className="border border-gray-300 p-1">
                    {item}
                  </th>
                )
              )}
            </tr>
            <tr>
              {firstHeader?.map((item) =>
                item === "TOTAL" || item === "DATE" ? (
                  <th className="border border-gray-300 p-1"></th>
                ) : (
                  <>
                    <th className="border border-gray-300 p-1">A Shift</th>{" "}
                    <th className="border border-gray-300 p-1">B Shift</th>{" "}
                    <th className="border border-gray-300 p-1">C Shift</th>
                  </>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            ))}

            <tr className="text-center font-bold bg-lime-200">
              <td className="border border-gray-300 p-1">G/Total</td>
              {machineType?.map((key) => (
                <ReportGrandTotal
                  key={key}
                  data={groupedByMCType[key]?.items}
                  firstHeader={firstHeader}
                ></ReportGrandTotal>
              ))}
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
