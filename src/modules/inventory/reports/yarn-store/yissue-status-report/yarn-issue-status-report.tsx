import { ICompany } from '@/modules/garmentsProduction/reports/finishing/finish-fabric-return-cutting-floor-to-store-report/company-info-type';
import ReportSubGroup from './components/report-sub-group';
import { YarnIssueStatusReportType } from './yarn-issue-status-report-type'
import moment from "moment";

export default function YarnIssueStatusReport({ company, data, fromDate, toDate }:
    { company?: ICompany, data: YarnIssueStatusReportType[], fromDate?: string, toDate?: string }) {

    const unique = [...new Set(data?.map(item => item.DATA_SOURCE))]; // [ 'A', 'B']

    return (
        <div className="p-5">
            <div className='static'>
                <h1 className='text-center font-bold text-2xl'>{company?.NAME}</h1>
                <h1 className='text-center font-bold text-sm'>{company?.ADDRESS}</h1>
                <h1 className='text-center font-bold text-xl mt-5'>Yarn Issue Status</h1>
                <h1 className='text-center font-bold text-base'>{moment(fromDate).format("DD-MMM-YY")} to {moment(toDate).format("DD-MMM-YY")}</h1>
            </div>
            <table className='border border-gray-600 rounded-md'>
                <thead className='sticky top-0 print:static'>
                    <tr>
                        <th className='border border-gray-600 min-w-5 py-1'>SL</th>
                        <th className='border border-gray-600 min-w-36 py-1'>Job No</th>
                        <th className='border border-gray-600 min-w-36 py-1'>Buyer Name</th>
                        <th className='border border-gray-600 min-w-36 py-1'>Style No</th>
                        <th className='border border-gray-600 min-w-36 py-1'>Order No</th>
                        <th className='border border-gray-600 min-w-28 py-1'>Date</th>
                        <th className='border border-gray-600 min-w-24 py-1'>Challan</th>
                        <th className='border border-gray-600 min-w-24 py-1'>Prog No</th>
                        <th className='border border-gray-600 min-w-56 py-1'>Yarn</th>
                        <th className='border border-gray-600 min-w-28 py-1'>Yarn Brand</th>
                        <th className='border border-gray-600 min-w-24 py-1'>Lot No</th>
                        <th className='border border-gray-600 min-w-24 py-1'>Issue Qty </th>
                        <th className='border border-gray-600 min-w-24 py-1'>Issue Purpose</th>
                        <th className='border border-gray-600 min-w-56 py-1'>Party</th>
                        <th className='border border-gray-600 min-w-28 py-1'>Store</th>
                        {/* <th className='border border-gray-600 p-0.5'>Remarks</th> */}
                    </tr>
                </thead>
                <tbody>

                    {
                        unique.map(item => {

                            const filteredData = data?.filter(f => f.DATA_SOURCE === item)
                            return (
                                <>
                                    <tr>
                                        <td className='border border-gray-600 p-0.5 text-center font-bold text-base bg-gray-300' colSpan={15}>{item}</td>
                                    </tr>
                                    <ReportSubGroup data={filteredData}></ReportSubGroup>
                                    <tr>
                                        <td className='border border-gray-600 p-0.5 text-center font-bold' colSpan={11}>Total {item}</td>
                                        <td className='border border-gray-600 p-0.5 text-center font-bold'>
                                            {
                                                data?.filter(f => f.DATA_SOURCE === item)?.reduce((p, c) => p + Number(c.ISSUE_QTY), 0).toFixed(2)
                                            }
                                        </td>
                                        <td className='border border-gray-600 p-0.5 text-center' colSpan={3}></td>
                                    </tr>

                                </>)
                        })
                    }

                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={11}>Grand Total</th>
                        <th className='border border-gray-600 min-w-24 p-0.5'>
                            {
                                data?.reduce((p, c) => Number(p) + Number(c.ISSUE_QTY!), 0).toFixed(2)
                            }
                        </th>
                        <th colSpan={4}></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
