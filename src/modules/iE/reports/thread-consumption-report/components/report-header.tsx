/* eslint-disable @typescript-eslint/no-explicit-any */
// import moment from "moment";
import { ThreadConsumptionReportType } from "../thread-consumption-report-type";


function ReportHeader({
  data,
}: {
  data: ThreadConsumptionReportType[];
}) {



  return (
    <div className="w-[100%] ">
      {/* <p className="font-bold text-left w-[100%] text-xs">
        {moment().format("DD-MMM-YYYY")}
      </p> */}
      <div className="flex justify-between">
        <div className="w-[100%]">

          <h1 className="font-bold text-xl text-center">
            {
              data[0]?.COMPANYNAME
            }
          </h1>
          {/* <h1 className="font-bold text-md text-start">
            {
              data[0]?.FACCOMPANYADDRESS + " " + data[0]?.COMPANYUTILITY
            }
          </h1> */}

          <h3 className="font-bold text-sm text-center">
            Thread Consumption Sheet
          </h3>
        </div>

      </div>

    </div>
  );
}

export default ReportHeader;
