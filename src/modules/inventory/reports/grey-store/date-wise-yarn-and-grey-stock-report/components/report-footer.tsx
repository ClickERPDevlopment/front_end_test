import { DateWiseYarnAndGreyFabricStockReportType } from "../date-wise-yarn-and-grey-stock-report-type";

function ReportFooter({ }: { masterData: DateWiseYarnAndGreyFabricStockReportType | null }) {
  return (
    <div className="flex">
      <div className="border flex flex-col my-3 p-2 w-[50%]">
        <label htmlFor="" className="font-bold text-sm mb-2">
          PREPARED BY
        </label>
        <div className="flex flex-row mb-2">
          <label
            htmlFor=""
            className="font-bold text-sm w-[150px] text-right pr-2 "
          >
            SIGNATURE:
          </label>
          <div className="border-b flex-1">
            <span>{ }</span>
          </div>
        </div>
        <div className="flex flex-row mb-2 ">
          <label
            htmlFor=""
            className="font-bold text-sm w-[150px] text-right pr-2"
          >
            NAME:
          </label>
          <div className="border-b flex-1">
          </div>
        </div>
        <div className="flex flex-row">
          <label
            htmlFor=""
            className="font-bold text-sm w-[150px] text-right pr-2"
          >
            DESIGNATION:
          </label>
          <div className="border-b flex-1">
          </div>
        </div>
      </div>
      <div className="border flex flex-col my-3 p-2 w-[50%] ml-2">
        <label htmlFor="" className="font-bold text-sm mb-2">
        </label>
        <label htmlFor="" className="font-bold text-sm mb-2">
          SPECIAL INSTRUCTION:{" "}
        </label>
      </div>
    </div>
  );
}

export default ReportFooter;
