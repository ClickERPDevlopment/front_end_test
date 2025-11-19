/* eslint-disable @typescript-eslint/no-explicit-any */
// import moment from "moment";
import { DailySewingEfficiencyReportType } from "../daily-sewing-efficiency-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportGroup({
  data,
}: {
  data: DailySewingEfficiencyReportType[];
  index: Number;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: DailySewingEfficiencyReportType[],
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
      items: DailySewingEfficiencyReportType[];
    };
  }

  let groupedData: IGroupedData = {};

  // if (data) {
  //   groupedData = groupBy(data, ["LINENAME", "BUYERNAME", "STYLENO", "ITEMTYPE", "SMVSEWING", "PONO", "STARTDAY", "LINEINCHARGE"]);
  // }

  if (data) {
    groupedData = groupBy(data, ["LINENAME", "BUYERNAME", "STYLENO", "ITEMTYPE", "SMVSEWING"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalOperator = data.reduce((acc, item) => acc + item.OPERATOR, 0)
  const totalHelper = data.reduce((acc, item) => acc + item.HELPER, 0)

  const totalQcPassLineWise = data.reduce((acc, item) => acc + item.SEWINGOUTPUT, 0)
  const totalEarnMinLineWise = data.reduce((acc, item) => acc + item.EARNINGMIN, 0)

  const totalTargetEarnMinLineWise = data.reduce((acc, item) => acc + Number(item.SMVSEWING), 0)
  const totalSmvLineWise = data.reduce((acc, item) => acc + Number(item.SMVSEWING), 0)

  const totalAvailableMin = data.reduce((acc, item) => acc + item.AVAILABLEMIN, 0)
  const totalWorkHour = data.reduce((acc, item) => acc + item.RUNNING_HOUR, 0)



  return (
    <>

      {uniqueKeysArray?.map((key, index) => {
        return <>
          <ReportSubgroup
            key={key}
            data={groupedData[key].items}
            index={index}
            groupLength={uniqueKeysArray?.length}
            totalOperator={totalOperator}
            totalHelper={totalHelper}
            totalQcPassLineWise={totalQcPassLineWise}
            totalAvailableMin={totalAvailableMin}
            totalTargetEarnMinLineWise={totalTargetEarnMinLineWise}
            totalEarnMinLineWise={totalEarnMinLineWise}
            totalWorkHour={totalWorkHour}
            totalSmvLineWise={totalSmvLineWise}
          ></ReportSubgroup>
        </>
      })}
    </>
  );
}

export default ReportGroup;
