import { EmbellishmentHourlyProductionReportType } from "../embellishment-hourly-production-report-type";

export default function ReportFooter({ }: { data: EmbellishmentHourlyProductionReportType[] }) {
  return (
    <div className="w-[100%]">
      <table className="w-full text-center">
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td >
            <span className="border-t border-gray-500 px-2">Prepared By</span>
          </td>
          <td >
            <span className="border-t border-gray-500 px-2">Checked By</span>
          </td>
          <td >
            <span className="border-t border-gray-500 px-2">Store</span>
          </td>
          <td >
            <span className="border-t border-gray-500 px-2">Received By</span>
          </td>
          <td >
            <span className="border-t border-gray-500 px-2">Approved By</span>
          </td>
        </tr>
      </table>
    </div>
  )
}
