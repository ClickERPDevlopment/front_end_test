// import moment from "moment";
import useAppClient from "@/hooks/use-AppClient";
import { DailySewingEfficiencyReportType } from "../daily-sewing-efficiency-report-type";

function ReportSubgroup({
  data,
  index,
  groupLength,
  totalEarnMinLineWise,
  totalQcPassLineWise,
}: {
  data: DailySewingEfficiencyReportType[];
  index: number;
  groupLength: number;
  totalOperator: number;
  totalHelper: number;
  totalQcPassLineWise: number;
  totalAvailableMin: number;
  totalTargetEarnMinLineWise: number;
  totalEarnMinLineWise: number;
  totalWorkHour: number;
  totalSmvLineWise: number;
}) {

  const totalFob = data.reduce((acc, item) => acc + item.TOTALFOB, 0)
  const totalCM = data.reduce((acc, item) => acc + item.TOTALCM, 0)

  const totalQcPass = data.reduce((acc, item) => acc + item.SEWINGOUTPUT, 0)

  // const totalSmv = data.reduce((acc, item) => acc + item.SMVSEWING, 0)

  const client = useAppClient();

  return (
    <>
      <tr style={{ fontSize: "13px" }}>
        {
          index == 0 && <td rowSpan={groupLength} className="border border-gray-950 p-0.5">{data[0]?.LINENAME}</td>
        }
        <td className="border border-gray-950 p-0.5">{data[0]?.BUYERNAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.STYLENO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.ITEMTYPE}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.SMVSEWING}</td>
        {
          index == 0 && <td rowSpan={groupLength} className="border border-gray-950 p-0.5 text-center">{data[0]?.OPERATOR}</td>
        }

        {
          index == 0 && <td rowSpan={groupLength} className="border border-gray-950 p-0.5">{data[0]?.HELPER}</td>
        }

        {
          index == 0 && <td rowSpan={groupLength} className="border border-gray-950 p-0.5 text-center">{data[0]?.HELPER + data[0]?.OPERATOR}</td>
        }

        {
          index == 0 && <td rowSpan={groupLength} className="border border-gray-950 p-0.5 text-center">{Math.round(data[0]?.TOTALTARGET / data[0]?.ACTUALHOURS)}</td>
        }
        {
          index == 0 && <td rowSpan={groupLength} className="border border-gray-950 p-0.5 text-center">{Math.round(data[0]?.TOTALTARGET)}</td>
        }

        <td className="border border-gray-950 p-0.5 text-end">{totalQcPass}</td>

        {
          index == 0 && <td rowSpan={groupLength} className="border border-gray-950 p-0.5 text-center text-nowrap">{(totalQcPassLineWise * 100 / (data[0]?.TOTALTARGET * data[0]?.RUNNING_HOUR / data[0]?.ACTUALHOURS)).toFixed(2)} %</td>
        }

        {
          index == 0 && <td rowSpan={groupLength} className="border border-gray-950 p-0.5 text-center">{(data[0]?.RUNNING_HOUR).toFixed(2)}</td>
        }

        {
          index == 0 && <td rowSpan={groupLength} className="border border-gray-950 p-0.5 text-center text-nowrap">{(totalEarnMinLineWise * 100 / data[0]?.AVAILABLEMIN).toFixed(2)} %</td>
        }

        <td className="border border-gray-950 p-0.5 text-end text-nowrap">
          {(totalFob && totalQcPass ? totalFob / totalQcPass : 0).toFixed(2)}{client.currentClient == client.FAME && "$"}
        </td>
        <td className="border border-gray-950 p-0.5 text-end text-nowrap">
          {(totalCM && totalQcPass ? (totalCM * 12) / totalQcPass : 0).toFixed(2)}{client.currentClient == client.FAME && "$"}
        </td>
        <td className="border border-gray-950 p-0.5 text-end text-nowrap">{(totalFob).toFixed(2)}{client.currentClient == client.FAME && "$"}</td>
        <td className="border border-gray-950 p-0.5 text-end text-nowrap">{(totalCM).toFixed(2)}{client.currentClient == client.FAME && "$"}</td>
        {
          index == 0 && <td rowSpan={groupLength} className="border border-gray-950 p-0.5 text-center text-nowrap">
            {
              (data[0]?.ACTUALHOURS * data[0]?.OPERATOR * data[0]?.PER_MACHINE_COST).toFixed(2)
            }{client.currentClient == client.FAME && "$"}
          </td>
        }
        {
          index == 0 && <td rowSpan={groupLength} className="border border-gray-950 p-0.5 text-center text-nowrap">{(data[0]?.TARGET_EARN_MIN * 100 / (data[0].AVAILABLEMIN)).toFixed(2)} %</td>
        }
        <td className="border border-gray-950 p-0.5 text-end">{ }</td>
      </tr >
    </>
  );
}

export default ReportSubgroup;
