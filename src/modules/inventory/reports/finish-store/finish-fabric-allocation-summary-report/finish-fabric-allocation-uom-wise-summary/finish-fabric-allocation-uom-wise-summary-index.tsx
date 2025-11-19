import { useEffect, useMemo } from "react";
import Report from "./components/report";
import { FinishFabricAllocationSummaryReportMasterType } from "../finish-fabric-allocation-summary-report-type";
import { FinishFabricAllocatinReportDetailsType } from "../../finish-fabric-allocation-report/finish-fabric-allocation-report-type";
// import { FinishFabricAllocatinReportDetailsType } from "@/reports/finish-fabric-allocation-report/finish-fabric-allocation-report-type";

function FinishFabricAllocationUomWiseSummaryReport({ data, detailsData }: { data: FinishFabricAllocationSummaryReportMasterType[], detailsData: FinishFabricAllocatinReportDetailsType[] }) {
  // Effects
  useEffect(() => {
  }, []);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.UOM.localeCompare(b.UOM));
  }, [data]);

  const groupedData = new Map<string, FinishFabricAllocationSummaryReportMasterType>();

  sortedData.forEach((item) => {
    const key = [
      item.SUPPLIER,
      item.WORK_ORDER_NO,
      item.ORDER_REFERENCE,
      item.FABRIC,
      item.MTL_COLOR,
      item.SUPPLIER_RATE_PER_PCS,
      item.UOM,
      item.CONSUMPTION_PER_DZN
    ].join("|");

    if (!groupedData.has(key)) {
      groupedData.set(key, { ...item });
    } else {
      const existing = groupedData.get(key)!;
      existing.WO_QTY += item.WO_QTY;
      existing.RECEIVE_QTY += item.RECEIVE_QTY;
      existing.RET_QTY += item.RET_QTY;
      existing.ALLOCATED_QTY += item.ALLOCATED_QTY;
    }
  });

  const uniqueMasterData = Array.from(groupedData.values());

  return (
    <div>
      <Report
        data={uniqueMasterData}
        detailsData={detailsData}
      />
    </div>
  );
}

export default FinishFabricAllocationUomWiseSummaryReport;
