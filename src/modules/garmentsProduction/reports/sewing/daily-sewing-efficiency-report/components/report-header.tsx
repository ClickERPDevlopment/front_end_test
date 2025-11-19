/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { DailySewingEfficiencyReportType } from "../daily-sewing-efficiency-report-type";

function ReportHeader({
  data,
  searchParamsObj,
}: {
  data: DailySewingEfficiencyReportType[];
  searchParamsObj: { fromDate: string; toDate: string; companyId: number }
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-3xl text-center">
        {
          data[0]?.COMPANY_NAME
        }
      </h1>
      <h3 className="font-bold text-lg text-center">
        {
          data[0]?.COMPANY_ADDRESS
        }
      </h3>
      <h3 className="font-bold text-xl text-center">
        Daily Sewing Efficiency Report
      </h3>

      <p className="text-center text-lg">
        Of {moment(searchParamsObj.fromDate).format("DD-MMM-YYYY")}
        {/* {" "}To {moment(searchParamsObj.toDate).format("DD-MMM-YYYY")} */}
      </p>
    </div>
  );
}

export default ReportHeader;
