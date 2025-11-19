/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { EmbellishmentOrderSummaryReportType } from "../embellishment-order-summary-report-type";

function ReportHeader({
  searchParamsObj,
}: {
  data: EmbellishmentOrderSummaryReportType[];
  searchParamsObj: { fromDate: string; toDate: string; buyerId: string; styleId: string; poId: string; typeId: string; }
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
        EMB Order Summary Report
      </h3>
      <p className="text-center text-lg">
        From {moment(searchParamsObj.fromDate).format("DD-MMM-YYYY")}
        {" "}To {moment(searchParamsObj.toDate).format("DD-MMM-YYYY")}
      </p>
    </div>
  );
}

export default ReportHeader;
