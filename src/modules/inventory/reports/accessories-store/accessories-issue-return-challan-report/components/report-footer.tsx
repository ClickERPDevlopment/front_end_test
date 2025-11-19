import { IAccessoriesIssueReturnChallanReport } from "../accessories-issue-return-challan-report-type";

function ReportFooter({ data }: { data: IAccessoriesIssueReturnChallanReport[] }) {
  return (
    <div className="flex mt-10">
      <table className="w-full">
        <tr className="text-center">
          <td className="w-[25%] border-0">
            <span>{data[0]?.PREPARED_BY}</span>
          </td>
          <td className="w-[25%] border-0">
            <span></span>
          </td>
        </tr>
        <tr className="text-center">
          <td className="w-[25%] border-0">
            <span className="border-t px-5 pb-1">Prepared By</span>
          </td>
          <td className="w-[25%] border-0">
            <span className="border-t px-5 pb-1">Received By</span>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ReportFooter;
