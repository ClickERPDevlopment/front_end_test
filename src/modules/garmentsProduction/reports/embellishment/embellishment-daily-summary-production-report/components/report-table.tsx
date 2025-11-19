/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmbellishmentDailySummaryProductionReportType } from "../embellishment-daily-summary-production-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
  searchParamsObj,

}: {
  data: EmbellishmentDailySummaryProductionReportType[];
  firstHeader: string[] | null;
  searchParamsObj: { fromDate: string; toDate: string; buyerId: string; isMonthlySummary: boolean; };
}) {

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

  interface GroupedByDate {
    [key: string]: {
      items: EmbellishmentDailySummaryProductionReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["PRODUCTION_DATE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  return (
    <>
      {uniqueKeysArray?.map((key, index) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          index={index}
          searchParamsObj={searchParamsObj}
          firstHeader={firstHeader}
        ></ReportSubgroup>
      ))}
    </>
  );
}

export default ReportTable;
