/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { SupplierWiseEmbStockReportType } from "../embellishment-send-receive-report-type";

function ReportHeader({
  data,
  searchParamsObj
}: {
  data: SupplierWiseEmbStockReportType[];
  searchParamsObj: {
    fromOpmDate: string,
    toOpmDate: string,
    fromSendRcvDate: string,
    toSendRcvDate: string,
    isOpmDate: boolean,
    isSendRcvDate: boolean,
  }
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-xs">
        {moment().format("DD-MMM-YYYY")}
      </p>

      {
        data[0]?.COMPANY_NAME && <>
          <h1 className="font-bold text-2xl text-center">
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

      {/* <h1 className="font-bold text-sm text-center">
        ({
          data[0]?.COMPANY_NAME
        })
      </h1> */}
      <h3 className="font-bold text-lg text-center">
        Embellishment Send Receive Report
      </h3>

      {
        searchParamsObj.isOpmDate && <>
          <h4 className="font-bold text-sm text-center">
            OPM From: {moment(searchParamsObj.fromOpmDate).format("MMM-YY")} To: {moment(searchParamsObj.toOpmDate).format("MMM-YY")}
          </h4>
        </>
      }

      {
        searchParamsObj.isSendRcvDate && <>
          <h4 className="font-bold text-sm text-center">
            Send/Rcv From: {moment(searchParamsObj.fromSendRcvDate).format("DD-MMM-YY")} To: {moment(searchParamsObj.toSendRcvDate).format("DD-MMM-YY")}
          </h4>
        </>
      }

    </div>
  );
}

export default ReportHeader;
