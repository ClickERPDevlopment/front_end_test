/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { IReconsiliationPendingDoneReport } from "../reconciliation-pending-done-report";

function ReportHeader({
  searchParams,
  data,
}: {
  searchParams: { isDate: boolean | undefined; toDate: any; fromDate: any };
  data: IReconsiliationPendingDoneReport | undefined;
}) {
  return (
    <div className="w-[100%]">
      <p className="font-bold text-lg text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-2xl text-center">{data?.COMPANY_NAME}</h1>
      <h4 className="font-bold text-base text-center">
        {data?.COMPANY_ADDRESS}
        {data?.COMPANY_REMARKS}
      </h4>
      <h3 className="font-bold text-xl text-center mt-2">
        Reconciliation Pending/Done Report
      </h3>
      {searchParams.isDate && (
        <h3 className="font-bold text-xl text-center mt-2">
          {moment(searchParams?.fromDate).format("DD-MMM-YY")} to{" "}
          {moment(searchParams?.toDate).format("DD-MMM-YY")}
        </h3>
      )}
    </div>
  );
}

export default ReportHeader;
