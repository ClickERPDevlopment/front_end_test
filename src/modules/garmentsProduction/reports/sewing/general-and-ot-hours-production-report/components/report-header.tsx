/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { GeneralAndOTHoursProductionReportType } from "../general-and-ot-hours-production-report-type";
function ReportHeader({
  searchParams,
  data,
}: {
  searchParams: { toDate: any; fromDate: any };
  data: GeneralAndOTHoursProductionReportType;
}) {
  return (
    <div className="w-[100%]">
      <p className="font-bold text-lg text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>

      <h1 className="font-bold text-2xl text-center">{data?.COMPANY_NAME}</h1>
      <h4 className="font-bold text-base text-center">{`${data?.COMPANY_ADDRESS
        } ${data?.COMPANY_REMARKS ? data.COMPANY_REMARKS : ""}`}</h4>
      <h3 className="font-bold text-xl text-center mt-2">
        Date and Floor Wise General and OT Hours Production Report
      </h3>
      <h3 className="font-bold text-xl text-center mt-2">
        {moment(searchParams?.fromDate).format("DD-MMM-YY")} to{" "}
        {moment(searchParams?.toDate).format("DD-MMM-YY")}
      </h3>
    </div>
  );
}

export default ReportHeader;
