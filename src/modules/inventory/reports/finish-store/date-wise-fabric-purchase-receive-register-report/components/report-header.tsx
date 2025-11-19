/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { DateWiseFabricPurchaseReceiveRegisterReportType } from "../date-wise-fabric-purchase-receive-register-report-type";

function ReportHeader({
  data,
}: {
  data: DateWiseFabricPurchaseReceiveRegisterReportType[];
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
        Date Wise Fabric Purchase Receive Register Report
      </h3>
    </div>
  );
}

export default ReportHeader;
