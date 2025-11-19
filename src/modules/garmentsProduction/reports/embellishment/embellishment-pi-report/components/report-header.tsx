/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { EmbellishmentPIReportType } from "../embellishment-pi-report-type";

function ReportHeader({
  data
}: {
  data: EmbellishmentPIReportType[];
}) {
  return (
    <div className="w-full border-b pb-3 mb-4">
      {/* Top Row: Date on Right */}
      <div className="flex justify-between items-start mb-2">
        <div></div>
        <p className="font-semibold text-sm">{moment().format("DD-MMM-YYYY")}</p>
      </div>

      {/* Company Name & Address */}
      <div className="text-center">
        <h1 className="font-extrabold text-3xl uppercase tracking-wide">
          {
            data[0]?.COMPANY_NAME
          }
        </h1>
        <p className="text-base leading-tight">
          {
            data[0]?.COMPANY_ADDRESS
          }
        </p>
      </div>

      {/* Invoice Title */}
      <div className="mt-3">
        <h2 className="font-bold text-xl text-center border-t border-b py-2">
          Proforma Invoice (PI)
        </h2>
      </div>
    </div>
  );
}

export default ReportHeader;
