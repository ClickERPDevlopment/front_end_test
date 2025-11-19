import useAppClient from '@/hooks/use-AppClient'
import { YarnIssueStatusReportType } from '../yarn-issue-for-dyeing-report-type'

export default function ReportBody({ data }: { data: YarnIssueStatusReportType[] | null }) {
    const client = useAppClient();
    return (
        <div className='min-w-full mt-5 font-bold'>
            <table className='min-w-full'>
                <thead style={{ fontSize: "15px" }}>
                    <tr>
                        <th className='p-0.5text-center border border-gray-600'>SL</th>
                        <th className='p-0.5text-center border border-gray-600'>PO/JOB</th>
                        <th className='p-0.5text-center border border-gray-600'>Style</th>
                        <th className='p-0.5text-center border border-gray-600'>BB LC NO/WO NO</th>
                        <th className='p-0.5text-center border border-gray-600'>Yarn</th>
                        <th className='p-0.5text-center border border-gray-600'>{client.currentClient === client.FAME ? 'Location' : 'Brand'}</th>
                        {
                            client.currentClient == client.FAME && <th className='p-0.5text-center border border-gray-600'>Supplier</th>
                        }
                        <th className='p-0.5text-center border border-gray-600'>Lot</th>
                        <th className='p-0.5text-center border border-gray-600'>Yarn Color</th>
                        <th className='p-0.5text-center border border-gray-600'>Issue Qty (KG)</th>
                        <th className='p-0.5text-center border border-gray-600'>Bag & Cone</th>
                        <th className='p-0.5text-center border border-gray-600'>Remarks</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: "14px" }}>
                    {data?.map((ele, i) =>
                        <tr key={i}>
                            <td className='p-0.5text-center border border-gray-600'>{i + 1}</td>
                            <td className='p-0.5text-center border border-gray-600'>{ele.PONO}</td>
                            <td className='p-0.5text-center border border-gray-600'>{ele.STYLE_NO}</td>
                            <td className='p-0.5text-center border border-gray-600'>{ele.BBLC_NO}</td>
                            <td className='p-0.5text-center border border-gray-600'>{ele.YARN}</td>
                            <td className='p-0.5text-center border border-gray-600'>{ele.YARN_BRAND}</td>
                            {
                                client.currentClient == client.FAME && <td className='p-0.5text-center border border-gray-600'>{ele.SUPPLIER_CODE}</td>
                            }
                            <td className='p-0.5text-center border border-gray-600'>{ele.YARN_LOT_NUMBER}</td>
                            <td className='p-0.5text-center border border-gray-600'>{ele.YARN_DYEING_COLOR}</td>
                            <td className='p-0.5text-center border border-gray-600'>{ele.QUANTITY}</td>
                            <td className='p-0.5text-center border border-gray-600'>B:{ele.CARTON_QTY} & C:{ele.CONE_QTY}</td>
                            <td className='p-0.5text-center border border-gray-600'>{ele.REMARKS}</td>
                        </tr>
                    )}

                </tbody>
                <tfoot style={{ fontSize: "14px" }}>
                    <tr>
                        <th className='p-0.5text-center border border-gray-600' colSpan={8 + (client.currentClient === client.FAME ? 1 : 0)}>Total</th>
                        <th className='p-0.5text-center border border-gray-600'>
                            {
                                data?.reduce((p, c) => p + Number(c.QUANTITY), 0)
                            }
                        </th>
                        <th className='p-0.5text-center border border-gray-600'>
                            B:{
                                data?.reduce((p, c) => p + Number(c.CARTON_QTY), 0)
                            }
                            {" & C:"}
                            {
                                data?.reduce((p, c) => p + Number(c.CONE_QTY), 0) ?? 0
                            }
                        </th>
                        <th className='p-0.5text-center border border-gray-600'></th>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}
