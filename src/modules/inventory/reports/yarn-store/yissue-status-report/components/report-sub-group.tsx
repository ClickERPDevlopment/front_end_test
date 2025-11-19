import moment from "moment";
import { YarnIssueStatusReportType } from "../yarn-issue-status-report-type";

export default function ReportSubGroup({ data }: { data: YarnIssueStatusReportType[] }) {

  const unique = [...new Set(data?.map(item => item.PARTY_TYPE))]; // [ 'A', 'B']

  return (
    <>
      {
        unique.map((s) => {
          return (
            <>
              <tr>
                <td className='border border-gray-600 p-0.5 text-center font-bold text-base bg-gray-300' colSpan={15}>{s}</td>
              </tr>

              {data?.filter(f => f.PARTY_TYPE === s)?.map((_, i) =>
                <tr>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{i + 1}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.JOB_NO}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.BUYER}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.STYLENO}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.ORDER_NO}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{moment(_?.YARN_CHALLAN_DATE).format('D-MMM-yy')}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.CHALLAN_NO}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.KNITTING_PROGRAM_NO}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.YARN}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.YARN_BRAND}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.YARN_LOT_NUMBER}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.ISSUE_QTY}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.ISSUE_TYPE}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.PARTY}</td>
                  <td className='border border-gray-600 p-0.5 text-center text-xs'>Yarn Store</td>
                  {/* <td className='border border-gray-600 p-0.5 text-center text-xs'>{_?.REMARKS}</td> */}
                </tr>
              )}

              <tr>
                <td className='border border-gray-600 p-0.5 text-center font-bold' colSpan={11}>Total {s}</td>
                <td className='border border-gray-600 p-0.5 text-center font-bold'>
                  {
                    data?.filter(f => f.PARTY_TYPE === s)?.reduce((p, c) => p + Number(c.ISSUE_QTY), 0).toFixed(2)
                  }
                </td>
                <td className='border border-gray-600 p-0.5 text-center' colSpan={3}></td>
              </tr>
            </>
          );
        })
      }
    </>
  )
}
