import { IKnittingProgramReport } from "../knitting-program-report-type";

function ReportFooter({
  masterData,
}: {
  masterData: IKnittingProgramReport | null;
}) {
  return (
    <div className="mt-10">
      <table className="w-[100%]">
        <tr className="text-center">
          <td>{masterData?.PREPARED_BY}</td>
          <td></td>
          <td></td>
        </tr>
        <tr className="text-center">
          <td>
            <span className="border-t px-2">Prepared By</span>
          </td>
          <td>
            <span className="border-t px-2">Receiver Signature</span>
          </td>
          <td>
            <span className="border-t px-2">D G M Knitting</span>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ReportFooter;
