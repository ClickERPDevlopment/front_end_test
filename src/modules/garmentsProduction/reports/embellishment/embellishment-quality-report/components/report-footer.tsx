import { GreyFabricProcessChallanReportType } from "@/modules/textile/reports/Dyeing/grey-fabric-process-challan-report/grey-fabric-process-challan-report-type";

function ReportFooter({ data }: { data: GreyFabricProcessChallanReportType[] }) {
  return (

    <table className="w-[100%] font-bold text-center">
      <thead></thead>
      <tbody>
        <tr>
          <td><span className='pb-1 '></span></td>
          <td><span className='pb-1 '>{data[0]?.PREPARED_BY}</span></td>
          <td><span className='pb-1 '></span></td>
          <td><span className='pb-1 '></span></td>
        </tr>
        <tr>
          <td><span className='pb-1 border-t border-gray-950'>Received By</span></td>
          <td><span className='pb-1 border-t  border-gray-950'>Prepared By</span></td>
          <td><span className='pb-1 border-t border-gray-950'>Check By</span></td>
          <td><span className='pb-1 border-t border-gray-950'>Authorize By</span></td>
        </tr>
      </tbody>
    </table>
  );
}

export default ReportFooter;
