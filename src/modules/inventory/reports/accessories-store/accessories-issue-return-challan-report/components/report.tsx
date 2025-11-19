import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import ReportGroup from "./report-group";
import { IAccessoriesIssueReturnChallanReport } from "../accessories-issue-return-challan-report-type";

export interface ReportHeaderProps {
  companyName?: string;
  companyAddress?: string;
  reportTitle?: string;
}

function Report({
  data,
}: {
  data: IAccessoriesIssueReturnChallanReport[];
}) {
  //set table header
  const firstHeader = [
    "SL",
    "METARIAL NAME",
    "RET QTY",
    "UOM",
    "G. SIZE",
    "M. SIZE",
    "G. COLOR",
    "M. COLOR 1",
    "M. COLOR 2",
    "SUB PO",
  ];

  return (
    <div className="custom-scroll text-sm relative overflow-auto h-[100vh] bg-white print:h-[100%]">
      <div className="p-2">
        <ReportHeader companyName={data[0]?.COMPANY_NAME} companyAddress={data[0]?.COMPANY_ADDRESS}
        />
        <ReportGroup data={data} firstHeader={firstHeader}></ReportGroup>
        <div className="mt-2"><p>Remarks: {data[0]?.REMARKS}</p></div>
        <div className="p-5"></div>
        <div>
          <ReportFooter data={data}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;

