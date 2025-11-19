/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportSubgroup from "./report-subgroup";
import { CompensationReportType } from "../compensation-report-type";

function ReportGroup({
  data,
  firstHeader,
}: {
  data: CompensationReportType[];
  firstHeader: string[] | null;
  mergeLength?: number;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: CompensationReportType[],
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
      items: CompensationReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


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
    </>
  );
}

export default ReportGroup;
