/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { EmbStatusReportStyleDataType } from "../emb-status-report-style-data-type";

function ReportHeader({
  data,
  searchParams
}: {
  data: EmbStatusReportStyleDataType[];
  searchParams: { fromDate: string, toDate: string, isShipDate: boolean }
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-xs">
        {moment().format("DD-MMM-YYYY")}
      </p>

      {
        data[0]?.COMPANY_NAME && <>
          <h1 className="font-bold text-xl text-center">
            {
              data[0]?.COMPANY_NAME
            }
          </h1>
          <h4 className="font-bold text-sm text-center mb-3">
            {
              data[0]?.COMPANY_ADDRESS
            }
          </h4>
        </>
      }

      <h3 className="font-bold text-lg text-center">
        Style Wise Embellishment Status
      </h3>
      {
        searchParams.isShipDate
        &&
        <h3 className="font-bold text-sm text-center">
          From {moment(searchParams.fromDate).format("DD-MMM-YY")} To {moment(searchParams.toDate).format("DD-MMM-YY")}
        </h3>
      }

    </div>
  );
}

export default ReportHeader;
