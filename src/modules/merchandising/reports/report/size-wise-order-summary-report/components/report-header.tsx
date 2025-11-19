import moment from "moment";
import { SizeWiseOrderSummaryReportType } from "../size-wise-order-summary-report-type";

function ReportHeader({
  masterData,
  searchParams,
}: {
  masterData: SizeWiseOrderSummaryReportType | null;
  searchParams: { fromDate: string, toDate: string };
}) {
  return (
    <div>
      <div className="">
        <p className="font-bold text-xm text-left w-[100%]">
          {moment().format("DD-MMM-YYYY")}
        </p>
        <h1 className="font-bold text-xl text-center">
          {masterData?.COMPANY_NAME}
        </h1>
        <h4 className="font-bold text-lg text-center">
          {masterData?.COMPANY_ADDRESS}
        </h4>
        <h4 className="font-bold text-lg text-center mt-2">
          Size Wise Order Summary
        </h4>
        <h4 className="font-bold text-sm text-center">
          {moment(searchParams.fromDate).format("DD-MMM-YY")} to  {moment(searchParams.toDate).format("DD-MMM-YY")}
        </h4>
      </div>
    </div>
  );
}

export default ReportHeader;
