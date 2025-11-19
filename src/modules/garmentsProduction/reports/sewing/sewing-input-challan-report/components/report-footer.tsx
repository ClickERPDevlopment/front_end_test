import { SewingInputChallanReportType } from "../sewing-input-challan-report-type";

function ReportFooter({ data }: { data: SewingInputChallanReportType[] }) {
  return (
    <div style={{ fontSize: "11px" }}>
      <table className="w-full text-center font-bold">
        <thead></thead>
        <tbody>
          <tr>
            <td>
              {data[0]?.PREPARED_BY}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <span className='px-2 border-t border-gray-950'>Prepared By</span>
            </td>
            <td>
              <span className='px-2 border-t border-gray-950'>Cutting Input Man</span>
            </td>
            <td>
              <span className='px-2 border-t border-gray-950'>Sewing Input Man</span>
            </td>
            <td>
              <span className='px-2 border-t border-gray-950'>Cutting In-Charge</span>
            </td>
            <td>
              <span className='px-2 border-t border-gray-950'>Store In-Charge</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportFooter;
