/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { EmbellishmentDailySummaryProductionReportType } from "../embellishment-daily-summary-production-report-type";

function ReportHeader({
  searchParamsObj,
}: {
  data: EmbellishmentDailySummaryProductionReportType[];
  searchParamsObj: { fromDate: string; toDate: string; buyerId: string; isMonthlySummary: boolean; };
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-3xl text-center">
        Magnum Bd Pvt Ltd
      </h1>
      <h4 className="text-center text-lg">568 & 584, Naojour, Kodda, Jaydebpur, Gazipur.</h4>

      <h3 className="font-bold text-xl text-center">
        {!searchParamsObj?.isMonthlySummary ? "Embellishment Daily Summary Production Report" : "Embellishment Monthly Summary Production Report"}
      </h3>

      <p className="text-center text-lg">
        From {searchParamsObj.isMonthlySummary ? moment(searchParamsObj.fromDate).format("MMM-YYYY") : moment(searchParamsObj.fromDate).format("DD-MMM-YYYY")}{" "}
        {" "}To {searchParamsObj.isMonthlySummary ? moment(searchParamsObj.toDate).format("MMM-YYYY") : moment(searchParamsObj.toDate).format("DD-MMM-YYYY")}
      </p>

    </div>
  );
}

export default ReportHeader;
