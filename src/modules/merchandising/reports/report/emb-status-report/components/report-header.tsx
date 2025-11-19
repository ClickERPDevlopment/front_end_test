/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { EmbStatusReportStyleDataType } from "../emb-status-report-style-data-type";

function ReportHeader({
  data,
}: {
  data: EmbStatusReportStyleDataType[];
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
        Embellishment Workorder Status
      </h3>
    </div>
  );
}

export default ReportHeader;
