/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { IMonthlyOrderVsShipmentStatusReport } from "../monthly-order-vs-shipment-status-report-type";

function ReportHeader({
  data,
  searchParams,
}: {
  data: IMonthlyOrderVsShipmentStatusReport[];
  searchParams: { toDate: any; fromDate: any };
}) {
  return (
    <div className="w-[100%]">
      <p className="font-bold text-lg text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-2xl text-center">
        {data[0]?.COMPANY_NAME || "Company Name"}
      </h1>
      <h4 className="font-bold text-base text-center">
        {data[0]?.COMPANY_ADDRESS || "Company Address"} {data[0]?.COMPANY_REMARKS || ""}
      </h4>
      <h3 className="font-bold text-xl text-center mt-2">
        Monthly Order Vs Shipment Status Report
      </h3>
      <h3 className="font-bold text-xl text-center mt-2">
        {moment(searchParams?.fromDate).format("MMM-YY")} to{" "}
        {moment(searchParams?.toDate).format("MMM-YY")}
      </h3>
    </div>
  );
}

export default ReportHeader;
