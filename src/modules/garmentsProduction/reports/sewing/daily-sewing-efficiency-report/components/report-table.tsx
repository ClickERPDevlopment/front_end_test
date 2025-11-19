/* eslint-disable @typescript-eslint/no-explicit-any */
// import moment from "moment";
import useAppClient from "@/hooks/use-AppClient";
import { DailySewingEfficiencyReportType } from "../daily-sewing-efficiency-report-type";
import ReportGroup from "./report-group";

function ReportTable({
  data
}: {
  data: DailySewingEfficiencyReportType[];
  firstHeader: string[] | null;
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

  if (data) {
    groupedData = groupBy(data, ["LINENAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  let totalOperator = 0;
  let totalHelper = 0;
  let totalTarget = 0;
  //let totalWorkHour = 0;
  let totalAvailableMin = 0;
  let totaltargetEarnMin = 0;
  let avgWorkHour = 0;
  let uniqueLine = 0;

  const totalHourlyTarget = data.reduce((acc, item) => acc + (item.TOTALTARGET / item.ACTUALHOURS), 0)
  const totalQcPass = data.reduce((acc, item) => acc + item.SEWINGOUTPUT, 0)
  const totalEarneMin = data.reduce((acc, item) => acc + item.EARNINGMIN, 0)
  // const totalTargetEarnMin = data.reduce((acc, item) => acc + Number(item.SMVSEWING * item.SEWINGOUTPUT), 0)
  const totalSmv = data.reduce((acc, item) => acc + item.SMVSEWING, 0)
  const totalFob = data.reduce((acc, item) => acc + item.TOTALFOB, 0)
  const totalCM = data.reduce((acc, item) => acc + item.TOTALCM, 0)
  // const totalWorkHour = data.reduce((acc, item) => acc + item.RUNNING_HOUR, 0)

  //

  const client = useAppClient();

  let avgPerformance = 0;
  let cost = 0;
  return (
    <>
      <tr>
        <td colSpan={21} className="border border-gray-950 p-0.5 text-nowrap font-bold">Floor: {data[0]?.FLOORNAME}</td>
      </tr>
      {uniqueKeysArray?.map((key, index) => {
        totalOperator += groupedData[key].items[0]?.OPERATOR;
        totalHelper += groupedData[key].items[0]?.HELPER;
        totalTarget += groupedData[key].items[0]?.TOTALTARGET;
        //totalWorkHour += groupedData[key].items[0]?.ACTUALHOURS;
        totaltargetEarnMin += groupedData[key].items[0]?.TARGET_EARN_MIN;
        totalAvailableMin += groupedData[key].items[0]?.AVAILABLEMIN;
        avgWorkHour += ((groupedData[key].items[0]?.OPERATOR ?? 0) + (groupedData[key].items[0]?.HELPER ?? 0)) * groupedData[key].items[0]?.RUNNING_HOUR * 60;
        const sewingOutput = data.reduce((acc, item) => acc + (item.LINENAME == groupedData[key].items[0]?.LINENAME ? item.SEWINGOUTPUT : 0), 0);
        avgPerformance += (sewingOutput * 100) / (groupedData[key].items[0]?.TOTALTARGET * groupedData[key].items[0]?.RUNNING_HOUR / groupedData[key].items[0]?.ACTUALHOURS);
        cost += groupedData[key].items[0]?.ACTUALHOURS * groupedData[key].items[0]?.OPERATOR * groupedData[key].items[0]?.PER_MACHINE_COST;
        uniqueLine++;
        return <>
          <ReportGroup
            key={key}
            data={groupedData[key].items}
            index={index}
          ></ReportGroup>
        </>
      })}


      <tr style={{ fontSize: "13px", backgroundColor: "#c4f2dc" }} className="font-bold">
        <td colSpan={4} className="border border-gray-950 p-0.5 text-nowrap text-center">Floor Wise Total</td>
        <td className="border border-gray-950 p-0.5 text-center">{(totalSmv / data.length).toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalOperator}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalHelper}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalOperator + totalHelper}</td>
        <td className="border border-gray-950 p-0.5 text-center">{Math.round(totalHourlyTarget)}</td>
        <td className="border border-gray-950 p-0.5 text-center">{Math.round(totalTarget)}</td>
        <td className="border border-gray-950 p-0.5 text-end">{totalQcPass}</td>
        <td className="border border-gray-950 p-0.5 text-center text-nowrap">{(avgPerformance / uniqueLine).toFixed(2)} %</td>
        <td className="border border-gray-950 p-0.5 text-center text-nowrap">{((avgWorkHour / 60) / (totalOperator + totalHelper))?.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-center text-nowrap">{(totalEarneMin * 100 / totalAvailableMin)?.toFixed(2)} %</td>
        <td className="border border-gray-950 p-0.5 text-end text-nowrap">{(totalFob / totalQcPass)?.toFixed(2)}{client.currentClient == client.FAME && "$"}</td>
        <td className="border border-gray-950 p-0.5 text-end text-nowrap">{(totalCM * 12 / totalQcPass)?.toFixed(2)}{client.currentClient == client.FAME && "$"}</td>
        <td className="border border-gray-950 p-0.5 text-end text-nowrap">{(totalFob)?.toFixed(2)}{client.currentClient == client.FAME && "$"}</td>
        <td className="border border-gray-950 p-0.5 text-end text-nowrap">{(totalCM)?.toFixed(2)}{client.currentClient == client.FAME && "$"}</td>
        <td className="border border-gray-950 p-0.5 text-end">{(cost).toFixed(2)}{client.currentClient == client.FAME && "$"}</td>
        <td className="border border-gray-950 p-0.5 text-center text-nowrap">{(totaltargetEarnMin * 100 / totalAvailableMin).toFixed(2)} %</td>
        <td className="border border-gray-950 p-0.5 text-end">{ }</td>
      </tr>
    </>
  );
}

export default ReportTable;
