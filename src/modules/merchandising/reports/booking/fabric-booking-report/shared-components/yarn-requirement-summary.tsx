import { FabricBookingReportDto_YarnDetails } from '../fabric-booking-type'

export default function YarnRequirementSummary({ lstYarnSummary }: { lstYarnSummary?: FabricBookingReportDto_YarnDetails[] }) {
    return (
        <div className='mt-5'>
            <table>
                <thead>
                    <tr >
                        <th colSpan={3} className='border border-gray-600 text-center'>Yarn Required Summary</th>
                    </tr>
                    <tr>
                        <th className='border border-gray-600 text-center text-xs'>SL#</th>
                        <th className='border border-gray-600 text-center text-xs'>Yarn Description</th>
                        <th className='border border-gray-600 text-center text-xs'>Total(KG)</th>
                    </tr>
                </thead>
                <tbody>
                    {lstYarnSummary?.map((ele, i) =>
                        <tr key={i}>
                            <td className='border border-gray-600 text-center text-xs'>{i + 1}</td>
                            <td className='border border-gray-600 text-center text-xs'>{ele.YARN}</td>
                            <td className='border border-gray-600 text-center text-xs'>{ele.BOOKING_QTY}</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={2} className='border border-gray-600 text-center text-xs'>Total</th>
                        <th className='border border-gray-600 text-center text-xs'>
                            {lstYarnSummary?.reduce((p, c) => p + c.BOOKING_QTY, 0).toFixed(2)}
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
