import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import ReportGroup from "./report-group";
import { IFinishFabricReturnCuttingFloorToStoreReport } from "../finish-fabric-return-cutting-floor-to-store-report-type";
import { ICompany } from "../company-info-type";

export interface ReportHeaderProps {
  companyName?: string;
  companyAddress?: string;
  reportTitle?: string;
  fromDate?: string;
  toDate?: string;
}

function Report({
  data,
  companyInfo,
  searchParams: { fromDate, toDate },
}: {
  data: IFinishFabricReturnCuttingFloorToStoreReport[];
  companyInfo: ICompany | undefined;
  searchParams: ReportHeaderProps;
}) {
  //set table header
  const firstHeader = [
    "BUYER",
    "STYLE",
    "ORDER/JOB NO",
    "FABRIC REQUIRED",
    "FABRIC RECEIVE",
    "RECEIVE BALANCE",
    "FABRIC RETURN",
    "RECEIVE BALANCE AFTER RETURN",
  ];

  return (
    <div className="container text-sm">
      <div className="p-2">
        <ReportHeader
          companyName={companyInfo?.NAME}
          companyAddress={companyInfo?.ADDRESS}
          companyRemarks={companyInfo?.REMARKS}
          fromDate={fromDate}
          toDate={toDate}
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
