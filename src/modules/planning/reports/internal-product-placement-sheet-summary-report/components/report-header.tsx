/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { InternalProductPlacementSheetReportType } from "../internal-product-placement-sheet-report-type";

function ReportHeader({
  searchParamsObj,
  data,
}: {
  searchParamsObj: {
    fromDate: string;
    toDate: string;
    buyerId: string;
    companyId: string;
    fromDateCheck: boolean;
    toDateCheck: boolean;
  };
  data: InternalProductPlacementSheetReportType[];
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-xs">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-3xl text-center">
        {
          data[0]?.COMPANY_NAME || "Company Name Not Found"
        }
      </h1>
      <h4 className="font-bold text-sm text-center mb-3">
        {
          data[0]?.COMPNAY_ADDRESS || "Company Address Not Found"
        }
      </h4>

      <h3 className="font-bold text-lg text-center">
        Internal Product Placement Sheet Report
      </h3>

      <h4 className="font-bold text-lg text-center mb-3">
        For Month{" "}
        {searchParamsObj.fromDateCheck && (
          <>
            From: {moment(new Date(searchParamsObj.fromDate)).format("MMM-YY")}{" "}
          </>
        )}
        {searchParamsObj.toDateCheck && (
          <>
            To: {moment(new Date(searchParamsObj.toDate)).format("MMM-YY")}
          </>
        )}
      </h4>

    </div>
  );
}

export default ReportHeader;
