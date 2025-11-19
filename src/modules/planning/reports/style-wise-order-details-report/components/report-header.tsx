/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { StyleWiseOrderDetailsType } from "../style-wise-order-details-report-type";

function ReportHeader({
  data,
}: {
  data: StyleWiseOrderDetailsType[];
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
      <h4 className="font-bold text-sm text-center mb-3">
        {
          data[0]?.COMPANY_ADDRESS
        }
      </h4>
      <h3 className="font-bold text-lg text-center">
        Style Wise Order Details Report ({data[0]?.STYLENO})
      </h3>
    </div>
  );
}

export default ReportHeader;
