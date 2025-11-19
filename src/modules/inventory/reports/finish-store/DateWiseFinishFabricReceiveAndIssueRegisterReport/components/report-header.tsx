/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { DateWiseFinishFabricReceiveAndIssueRegisterReportType } from "../DateWiseFinishFabricReceiveAndIssueRegisterReport-type";

function ReportHeader({
  data,
}: {
  data: DateWiseFinishFabricReceiveAndIssueRegisterReportType[];
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-xs">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-xl text-center">
        {
          data[0]?.COMPANY_NAME
        }
      </h1>
      <h1 className="font-bold text-sm text-center">
        {
          data[0]?.COMPANY_ADDRESS
        }
      </h1>
      <h3 className="font-bold text-lg text-center">
        DATWISE FINISH FABRIC RECEIVED AND ISSUE REGISTER
      </h3>
    </div>
  );
}

export default ReportHeader;
