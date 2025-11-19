/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { SupervisorWiseCuttingKPIReportType } from "../supervisor-wise-cutting-kpi-report-type";

function ReportHeader({
  searchParams,
  data,
}: {
  searchParams: { toDate: any; fromDate: any };
  data: SupervisorWiseCuttingKPIReportType | undefined;
}) {
  return (
    <div className="w-[100%]">
      <p className="font-boldtext-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-xl text-center">{data?.COMPANY_NAME}</h1>
      <h4 className="font-bold text-sm text-center">
        {data?.COMPANY_ADDRESS}
      </h4>
      <h3 className="font-bold text-lg text-center mt-2">
        Supervisor Wise Cutting KPI Report
      </h3>
      {
        <h3 className="font-bold text-sm text-center mt-2">
          {moment(searchParams?.fromDate).format("DD-MMM-YY")} to{" "}
          {moment(searchParams?.toDate).format("DD-MMM-YY")}
        </h3>
      }
    </div>
  );
}

export default ReportHeader;
