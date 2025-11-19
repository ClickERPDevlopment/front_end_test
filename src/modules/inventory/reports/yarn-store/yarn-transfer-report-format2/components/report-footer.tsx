import { YarnTransferReportType } from "../yarn-transfer-report-type";

function ReportFooter({ data }: { data: YarnTransferReportType[] }) {
  return (
    <div style={{ fontSize: "11px" }} className="flex font-bold justify-between">
      <table className="w-full text-center">
        <thead></thead>
        <tbody>
          <tr>
            <td>{data[0]?.PREPARED_BY}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><span className='pb-1 border-t border-gray-900 px-2'>Prepared By</span></td>
            <td><span className='pb-1 border-t border-gray-900 px-2'>Received By</span></td>
            <td><span className='pb-1 border-t border-gray-900 px-2'>Store In-Charge</span></td>
            <td><span className='pb-1 border-t border-gray-900 px-2'>Manager (Yarn)</span></td>
            <td><span className='pb-1 border-t border-gray-900 px-2'>DGM (Knitting)</span></td>
            <td><span className='pb-1 border-t border-gray-900 px-2'>Authorized Sign</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportFooter;
