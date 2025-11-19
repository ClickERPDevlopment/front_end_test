/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { IBatchWiseApprovalStatus } from "../batch-wise-approval-status-report-type";

function Report({ data }: { data: IBatchWiseApprovalStatus[] }) {
  //set table header
  const firstHeader = [
    "Batch No.",
    " Batch QTY Fabric wise  (Kg)",
    "Buyer",
    "Style",
    "Order/PO",
    "Color",
    "Garments patr",
    "Fabric",
    "Yarn Details",
    "R/Dia",
    "R/GSM",
    "Dyeing Date",
    " Submit Date",
    " Approval Date",
    "Batc Finish date",
    "Quality Inspection Date",
    "Quality Inspection result",
    "Quality Clearance",
    "RFD Date",
    "Special Info",
    "Remarks",
  ];

  const header = firstHeader;

  return (
    <div className="container">
      <div className="p-2">
        <ReportHeader />

        <ReportTable data={data} header={header}></ReportTable>
        <div>{/* <ReportFooter masterData={data[0]}></ReportFooter> */}</div>
      </div>
    </div>
  );
}

export default Report;
