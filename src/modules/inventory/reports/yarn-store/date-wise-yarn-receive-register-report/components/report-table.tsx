/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportSubgroup from "./report-subgroup";
import { DateWiseYarnReceiveRegisterReportType } from "../date-wise-yarn-receive-register-report-type";

function ReportTable({
  data,
  firstHeader,
}: {
  data: DateWiseYarnReceiveRegisterReportType[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: DateWiseYarnReceiveRegisterReportType[],
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
      items: DateWiseYarnReceiveRegisterReportType[];
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

export default ReportTable;
