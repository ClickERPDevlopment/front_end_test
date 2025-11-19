/* eslint-disable @typescript-eslint/no-explicit-any */
import { YarnReturnChallanReportType } from "../yarn-challan-report-type";
import ReportGroup from "./report-group";

function ReportTable({
  data,
  firstHeader,
}: {
  data: YarnReturnChallanReportType[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: YarnReturnChallanReportType[],
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
      items: YarnReturnChallanReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);



  return (
    <>
      {uniqueKeysArray?.map((key) => (
        <ReportGroup
          key={key}
          data={groupedByDate[key].items}
          firstHeader={firstHeader}
        ></ReportGroup>
      ))}
    </>
  );
}

export default ReportTable;
