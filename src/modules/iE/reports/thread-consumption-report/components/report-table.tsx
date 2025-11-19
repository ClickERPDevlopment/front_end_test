/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThreadConsumptionReportType } from "../thread-consumption-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
  dataLength
}: {
  data: ThreadConsumptionReportType[];
  firstHeader: string[] | null;
  uniqueItemNumber?: number;
  dataLength?: number;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: ThreadConsumptionReportType[],
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
      items: ThreadConsumptionReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["OPERATIONNAME", "MACHINECODE", "SPINO", "SEAMLENGTH"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  return (
    <>
      {uniqueKeysArray?.map((key, index) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          index={index + (dataLength || 0)}
          firstHeader={firstHeader}
        ></ReportSubgroup>
      ))}
    </>
  );
}

export default ReportTable;
