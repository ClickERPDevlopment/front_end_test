import { GreyFabricIssueToDyeingChallanType_Comments } from '../grey-fabric-issue-to-dyeing-challan-type'

export default function ReportComments({ data }: { data: GreyFabricIssueToDyeingChallanType_Comments[] | null | undefined }) {

    return (
        <div className='min-w-full mt-5 font-bold'>
            <table className='w-6/12'>
                <thead>
                    <tr>
                        <th className='p-1 text-center border border-gray-600' colSpan={4}>Comments (Job : {data?.[0]?.PONO ?? ''})</th>
                    </tr>
                    <tr>
                        <th className='p-1 text-center border border-gray-600'>Req. Qty</th>
                        <th className='p-1 text-center border border-gray-600'>Issue Qty</th>
                        <th className='p-1 text-center border border-gray-600'>Balance Qty</th>
                        <th className='p-1 text-center border border-gray-600'>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((ele, i) =>
                        <tr key={i}>
                            <td className='p-1 text-center border border-gray-600'>{ele.BOOKING_QTY}</td>
                            <td className='p-1 text-center border border-gray-600'>{ele.ISSUED_QTY}</td>
                            <td className='p-1 text-center border border-gray-600'>{ele.BALANCE_QTY}</td>
                            <td className='p-1 text-center border border-gray-600'>
                                {
                                    ele.ISSUED_QTY > ele.BOOKING_QTY ? 'Hi' : ele.ISSUED_QTY < ele.BOOKING_QTY ? 'Less' : ''
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}
