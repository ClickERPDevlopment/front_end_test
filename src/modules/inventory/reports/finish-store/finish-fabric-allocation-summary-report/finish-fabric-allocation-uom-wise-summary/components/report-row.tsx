// import { FinishFabricAllocatinReportDetailsType } from "@/reports/finish-fabric-allocation-report/finish-fabric-allocation-report-type";
import { FinishFabricAllocatinReportDetailsType } from "../../../finish-fabric-allocation-report/finish-fabric-allocation-report-type";
import { FinishFabricAllocationSummaryReportMasterType } from "../../finish-fabric-allocation-summary-report-type";

function ReportRow({
  data,
}: {
  data: FinishFabricAllocationSummaryReportMasterType[];
  detailsData: FinishFabricAllocatinReportDetailsType[];
}) {


  const totalRcvQty = data.reduce((acc, item) => acc + item.RECEIVE_QTY, 0)
  const TotalAllocatedQty = data.reduce((acc, item) => acc + item.ALLOCATED_QTY, 0)

  const totalValue = data.reduce((acc, item) => acc + ((item.RECEIVE_QTY - item.ALLOCATED_QTY) * item.SUPPLIER_RATE_PER_PCS), 0)



  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border text-center text-xs">{data[0]?.UOM}</td>
        <td className="border text-center text-xs">{data[0]?.SUPPLIER_RATE_PER_PCS}</td>
        <td className="border text-center text-xs">{(totalRcvQty - TotalAllocatedQty).toFixed(2)}</td>
        <td className="border text-center text-xs">{(totalValue).toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportRow;
