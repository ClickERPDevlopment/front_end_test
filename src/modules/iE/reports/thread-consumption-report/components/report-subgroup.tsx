import { ThreadConsumptionReportType } from "../thread-consumption-report-type";

function ReportSubgroup({
  data,
  index
}: {
  data: ThreadConsumptionReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  // const totalCons = data.reduce((acc, item) => acc + item.TOTALDETAILSOPERAITONLENGTH + item.WASTAGEVALUE, 0);

  const totalNeedleThreadLength = data.reduce((acc, item) => acc + item.NEEDLETHREADLENGTH, 0);
  const totalBobbinLopperThreadLength = data.reduce((acc, item) => acc + item.BOBBINTHREADLENGTH + item.LOOPERTHREADLENGTH, 0);

  const totalWastageValue = data.reduce((acc, item) => acc + (((item.NEEDLETHREADLENGTH) * item.WASTAGE / 100)) + (((item.BOBBINTHREADLENGTH) * item.WASTAGE / 100)) + (((item.LOOPERTHREADLENGTH) * item.WASTAGE / 100)), 0);


  return (
    <>
      <tr style={{ fontSize: "12px" }} className="font-light">
        <td className="border border-gray-950 p-0.5 text-center">{index + 1}</td>
        <td className="border border-gray-950 p-0.5 font-bold text-nowrap">{data[0]?.OPERATIONNAME}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{data[0]?.MACHINECODE}</td>
        <td className="border border-gray-950 p-0.5 text-center">{data[0]?.SPINO}</td>
        <td className="border border-gray-950 p-0.5 text-center">{data[0]?.SEAMLENGTH}</td>
        <td className="border border-gray-950 p-0.5 text-center font-bold">{totalNeedleThreadLength.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-center font-bold">{totalBobbinLopperThreadLength.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-center font-bold">{totalWastageValue.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-center font-bold">{(totalNeedleThreadLength + totalBobbinLopperThreadLength + totalWastageValue).toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
