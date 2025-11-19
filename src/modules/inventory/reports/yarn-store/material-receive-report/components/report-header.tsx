/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { MaterialReceiveReportType } from "../material-receive-report-type";

function ReportHeader({
  data,
}: {
  data: MaterialReceiveReportType[];
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-xs">
        {moment().format("DD-MMM-YYYY hh:mm A")}
      </p>

      {
        data[0]?.COMPANY_NAME && <>
          <h1 className="font-bold text-3xl text-center">
            {
              data[0]?.COMPANY_NAME
            }
          </h1>
          <h4 className="text-lg text-center mb-3">
            {
              data[0]?.COMPANY_ADDRESS
            }
          </h4>
        </>
      }
      <h3 className="font-bold text-xl text-center">
        Material Receive Report
      </h3>
      <p className="font-bold text-end"><span className="border-b border-dotted border-gray-950">Store Copy</span></p>
    </div>
  );
}

export default ReportHeader;
