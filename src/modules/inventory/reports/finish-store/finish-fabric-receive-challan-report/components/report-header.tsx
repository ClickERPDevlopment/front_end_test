/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { FinishFabricReceiveChallanReportType } from "../finish-fabric-receive-challan-report-type";

function ReportHeader({
  data,
}: {
  data: FinishFabricReceiveChallanReportType[];
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
        Finish Fabric Received Challan
      </h3>
    </div>
  );
}

export default ReportHeader;
