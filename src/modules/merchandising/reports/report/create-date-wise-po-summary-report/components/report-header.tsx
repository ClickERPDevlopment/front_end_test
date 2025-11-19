/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
function ReportHeader({
  searchParams
}: {
  searchParams: { toDate: any; fromDate: any };
}) {
  return (
    <div className="w-[100%]">
      <p className="font-bold text-lg text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h3 className="font-bold text-xl text-center mt-2">
        Create Date Wise PO Summary Report
      </h3>
      {<h3 className="font-bold text-xl text-center mt-2">
        {moment(searchParams?.fromDate).format("DD-MMM-YY")} to{" "}
        {moment(searchParams?.toDate).format("DD-MMM-YY")}
      </h3>}
    </div>
  );
}

export default ReportHeader;
