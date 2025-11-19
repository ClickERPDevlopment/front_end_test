import { ThreadConsumptionReportType } from "../thread-consumption-report-type";

function ReportFooter({ data }: { data: ThreadConsumptionReportType[] }) {
  return (
    <div style={{ fontSize: "11px", marginTop: "60px" }} className="flex font-bold justify-between ">
      <table className="w-full text-center">
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <span>
                {
                  data[0]?.CREATEBY
                }
              </span>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            {/* <td><span className='pb-1 border-t border-gray-900 px-2'>Line Chief</span></td> */}
            {/* <td><span className='pb-1 border-t border-gray-900 px-2'>Prepared By</span></td> */}
            <td className=""><span className='pb-1 border-t border-gray-900 px-2'>Sr. Executive (IE)</span></td>
            <td className=""></td>
            <td className=""></td>
            <td className=""><span className='pb-1 border-t border-gray-900 px-2'>Head Of IE</span></td>
            {/* <td><span className='pb-1 border-t border-gray-900 px-2'>AGM/GM</span></td> */}
            {/* <td><span className='pb-1 border-t border-gray-900 px-2'>Planning</span></td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportFooter;
