import moment from "moment";
import { SupervisorWiseCuttingKPIReportType } from "../supervisor-wise-cutting-kpi-report-type";

function ReportTable({
  data,
}: {
  data: SupervisorWiseCuttingKPIReportType[];
}) {



  const totaltargetQty = data.reduce((sum, item) => sum + item.HOURLYTARGET, 0);
  const totalAchiveQty = data.reduce((sum, item) => sum + item.TOTAL_CUTTING_QTY, 0);
  const totalDeviationQty = totalAchiveQty - totaltargetQty;

  // const totalTargetEfficiency = data.reduce((sum, item) => sum + ((item.TARGET_EARMN_MIN * 100) / item.AVAILABLE_EARMN_MIN), 0);
  // const totalAchieveEfficiency = data.reduce((sum, item) => sum + ((item.PRODUCTION_MIN * 100) / (item.AVAILABLE_EARMN_MIN)), 0);
  // const totalDeviationEfficiency = totalAchieveEfficiency - totalTargetEfficiency;

  const totalEarnMin = data.reduce((sum, item) => sum + item.TARGET_EARMN_MIN, 0);
  const totalAvlMin = data.reduce((sum, item) => sum + item.AVAILABLE_EARMN_MIN, 0);
  const totalProMin = data.reduce((sum, item) => sum + item.PRODUCTION_MIN, 0);


  return (
    <>
      {data.map((item) => {

        const targetEfficiency = (item.TARGET_EARMN_MIN * 100 / item.AVAILABLE_EARMN_MIN);

        const achieveEfficiency = (item.PRODUCTION_MIN * 100) / (item.AVAILABLE_EARMN_MIN);

        const deviationEfficiency = achieveEfficiency - targetEfficiency;

        return (
          <tr className="text-center">
            <td className="border border-gray-300 p-1 text-start">
              {moment(item.TARGETDATE).format("dddd, DD-MMMM-YYYY")}
            </td>
            <td className="border border-gray-300 p-1 text-left">
              {item.EMP_NAME}
            </td>
            <td className="border border-gray-300 p-1 text-left">{item.EMP_CODE}</td>
            <td className="border border-gray-300 p-1">{item.LINENAME}</td>
            <td className="border border-gray-300 p-1">{item.HOURLYTARGET}</td>
            <td className="border border-gray-300 p-1">
              {item.TOTAL_CUTTING_QTY}
            </td>
            <td className="border border-gray-300 p-1">
              {item.TOTAL_CUTTING_QTY - item.HOURLYTARGET}
            </td>
            <td className="border border-gray-300 p-1">{targetEfficiency.toFixed(2)}</td>
            <td className="border border-gray-300 p-1">
              {achieveEfficiency.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-1">{deviationEfficiency.toFixed(2)}</td>
          </tr>
        )
      })}

      <tr className="text-center font-bold">
        <td colSpan={4} className="border border-gray-300 p-1 text-right">Table Wise Total</td>
        <td className="border border-gray-300 p-1">
          {totaltargetQty}
        </td>
        <td className="border border-gray-300 p-1">
          {totalAchiveQty}
        </td>
        <td className="border border-gray-300 p-1">
          {totalDeviationQty}
        </td>
        <td className="border border-gray-300 p-1">{(totalEarnMin / totalAvlMin).toFixed(2)}</td>
        <td className="border border-gray-300 p-1">
          {(totalProMin / totalAvlMin).toFixed(2)}
        </td>
        <td className="border border-gray-300 p-1">{((totalEarnMin / totalAvlMin) - (totalProMin / totalAvlMin)).toFixed(2)}</td>
      </tr>

    </>
  );
}

export default ReportTable;
