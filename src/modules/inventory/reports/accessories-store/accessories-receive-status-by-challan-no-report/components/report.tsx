import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import ReportGroup from "./report-group";
import { IAccessoriesReceiveStatusByChallanNoReport } from "../accessories-receive-status-by-challan-no-report-type";

export interface ReportHeaderProps {
  companyName?: string;
  companyAddress?: string;
  reportTitle?: string;
  fromDate?: string;
  toDate?: string;
}

function Report({
  data,
  dtFrom,
  dtTo,
}: {
  data: IAccessoriesReceiveStatusByChallanNoReport[];
  dtFrom: string;
  dtTo: string;
}) {
  //set table header
  const firstHeader = [
    "BUYER",
    "PO",
    "SUB PO",
    "STYLE",
    "CHALLAN NO",
    "MRR/ALLO./RET. NO.",
    "CHALLAN DATE",
    "RCV DATE",
    "ITEM",
    "COLOR",
    "SIZE",
    "RCV",
    "UOM",
    "DESCRIPTION 1",
    "DESCRIPTION 2",
  ];

  return (
    <div className="custom-scroll text-sm relative overflow-auto h-[100vh] bg-white print:h-[100%]">
      <div className="p-2">
        <ReportHeader
          dtFrom={dtFrom}
          dtTo={dtTo}
          companyName={data[0]?.COMPANY_NAME}
          companyAddress={data[0]?.COMPANY_ADDRESS}
        />
        <ReportGroup data={data} firstHeader={firstHeader}></ReportGroup>
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
