import { YarnAdditionalBookingReport_YarnDyeingDetails } from '../yarn-additional-booking-report.-type'

export default function YarnSummary({ lstDetails }: { lstDetails?: YarnAdditionalBookingReport_YarnDyeingDetails[] }) {
    const unique = [...new Set(lstDetails?.map(item => item.YARN))];

    const getYarnQty = (yarn: string) =>
        lstDetails?.filter(_ => _.YARN === yarn)?.reduce((p, c) => p + Number(c.YARN_REQUIRED_QTY), 0);

    const getTotalQty = () =>
        lstDetails?.reduce((p, c) => p + Number(c.YARN_REQUIRED_QTY), 0);

    return (
        <div className='mt-5 flex'>
            <table className='w-6/12'>
                <thead>
                    <tr>
                        <th className='p-1 min-w-24 border border-gray-600 text-center' colSpan={2}>Yarn Summary</th>
                    </tr>
                    <tr>
                        <th className='p-1 min-w-24 border border-gray-600 text-center'>Yarn</th>
                        <th className='p-1 whitespace-nowrap border border-gray-600 text-center'>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {unique?.map((ele, index) =>
                        <tr key={index}>
                            <td className='p-1 border border-gray-600 text-center'>{ele}</td>
                            <td className='p-1 border border-gray-600 text-center'>{getYarnQty(ele)?.toFixed(2)}</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <th className='p-1 min-w-24 border border-gray-600 text-center'>Total</th>
                        <th className='p-1 whitespace-nowrap border border-gray-600 text-center'>{getTotalQty()?.toFixed(2)}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
