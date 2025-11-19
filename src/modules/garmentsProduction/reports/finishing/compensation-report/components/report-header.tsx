/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { CompensationReportType } from "../compensation-report-type";

function ReportHeader({
  data,
  searchParamsObj,
}: {
  data: CompensationReportType[];
  searchParamsObj: { fromDate: string; toDate: string; companyId: number }
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-3xl text-center">
        {
          searchParamsObj?.companyId != 0 ? data[0]?.COMPANY_NAME : "Anowara Group"
        }
      </h1>
      <h3 className="font-bold text-xl text-center">
        Compensation Report
      </h3>
      <p className="text-center text-lg">
        From {moment(searchParamsObj.fromDate).format("DD-MMM-YYYY")}
        {" "}To {moment(searchParamsObj.toDate).format("DD-MMM-YYYY")}
      </p>
    </div>
  );
}

export default ReportHeader;
