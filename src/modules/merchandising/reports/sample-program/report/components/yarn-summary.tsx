import { SampleProgramReportDto_YarnDetails } from '../sample-program-report.-type'

export default function YarnSummary({ lstDetails }: { lstDetails?: SampleProgramReportDto_YarnDetails[] }) {
    const getTotalQty = () =>
        lstDetails?.reduce((p, c) => p + Number(c.REQUIRED_QTY), 0);

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
                    {lstDetails?.map((ele) =>
                        <tr>
                            <td className='p-1 border border-gray-600 text-center'>{ele.YARN}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.REQUIRED_QTY}</td>
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
