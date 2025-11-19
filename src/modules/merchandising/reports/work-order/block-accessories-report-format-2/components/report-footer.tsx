import { IAccessoriesReportWithPo } from "../../accessories-report-with-po/accessories-with-po-type";

function ReportFooter({ masterData }: { masterData: IAccessoriesReportWithPo | null }) {
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
            <span className="text-sm">{masterData?.PREPARED_BY}</span>
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
            <span className="text-sm">{masterData?.PREPARED_BY_DESG}</span>
          </div>
        </div>
      </div>
      <div className="border flex flex-col my-3 p-2 w-[50%] ml-2">
        <label htmlFor="" className="font-bold text-sm mb-2">
          REMARKS: <span className="font-light">{masterData?.REMARKS}</span>
        </label>
        <label htmlFor="" className="font-bold text-sm mb-2">
          SPECIAL INSTRUCTION:{" "}
          <span className="font-light">{masterData?.SPECIAL_INSTRUCTION}</span>
        </label>
      </div>
    </div>
  );
}

export default ReportFooter;
