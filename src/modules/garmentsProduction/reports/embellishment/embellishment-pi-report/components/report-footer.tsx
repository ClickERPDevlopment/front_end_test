import { EmbellishmentPIReportType } from "../embellishment-pi-report-type";

export default function ReportFooter({ }: { data: EmbellishmentPIReportType[] }) {
  return (
    <div className="w-full mt-8" style={{ fontSize: "14px" }}>
      <table className="w-full text-center border-collapse">
        <tfoot>
          <tr>
            <td className="pt-6 text-start">
              <span className="border-t border-gray-500 px-4 font-medium">
                Authorized Signature
              </span>
            </td>
            <td className="pt-6">

            </td>
            <td className="pt-6">

            </td>
            <td className="pt-6">

            </td>
            <td className="pt-6">

            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
