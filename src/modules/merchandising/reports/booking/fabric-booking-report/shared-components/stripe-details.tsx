import { FabricBookingReportDto_StripeDetails } from '../fabric-booking-type'

export default function StripeDetails({ lstStripeDetails }: { lstStripeDetails?: FabricBookingReportDto_StripeDetails[] }) {
    if (!lstStripeDetails) return null;
    if (lstStripeDetails.length === 0) return null;
    return (
        <div className='mt-5'>
            <table>
                <thead>
                    <tr>
                        <th className='border border-gray-600 text-center text-xs p-1'>SL</th>
                        <th className='border border-gray-600 text-center text-xs p-1'>Body Part </th>
                        <th className='border border-gray-600 text-center text-xs p-1'>GMT Color</th>
                        <th className='border border-gray-600 text-center text-xs p-1'>Fabric Color</th>
                        <th className='border border-gray-600 text-center text-xs p-1'>Fabric Qty(KG)</th>
                        <th className='border border-gray-600 text-center text-xs p-1'>Stripe Color</th>
                        <th className='border border-gray-600 text-center text-xs p-1'>Stripe Measurement</th>
                        <th className='border border-gray-600 text-center text-xs p-1'>Grey Qty.(KG)</th>
                        <th className='border border-gray-600 text-center text-xs p-1'>Finish Qty.(KG)</th>
                        <th className='border border-gray-600 text-center text-xs p-1'>Y/D Req</th>
                    </tr>
                </thead>
                <tbody>
                    {lstStripeDetails?.map((ele, ele_i) =>
                        ele.lstDtls?.map((dtls, dtls_i) =>
                            dtls_i == 0 ?
                                <tr key={ele_i + dtls_i}>
                                    <td className='border border-gray-600 text-center text-xs' rowSpan={ele.lstDtls?.length}>{ele_i + 1}</td>
                                    <td className='border border-gray-600 text-center text-xs' rowSpan={ele.lstDtls?.length}>{ele.FABRIC_PART} </td>
                                    <td className='border border-gray-600 text-center text-xs whitespace-normal' rowSpan={ele.lstDtls?.length}>{ele.GMT_COLOR} </td>
                                    <td className='border border-gray-600 text-center text-xs' rowSpan={ele.lstDtls?.length}>{ele.FABRIC_COLOR} </td>
                                    <td className='border border-gray-600 text-center text-xs' rowSpan={ele.lstDtls?.length}>{ele.FABRIC_QTY} </td>

                                    <td className='border border-gray-600 text-center text-xs'>{dtls?.YARN_DYEING_COLOR} </td>
                                    <td className='border border-gray-600 text-center text-xs'>{dtls?.STRIPE_MEASUREMENT} </td>
                                    <td className='border border-gray-600 text-center text-xs'>{dtls?.GREY_YARN_BOOKING_QUANTITY} </td>
                                    <td className='border border-gray-600 text-center text-xs'>{dtls?.YARN_DYEING_REQUIRED} </td>
                                    <td className='border border-gray-600 text-center text-xs'>yes </td>
                                </tr>
                                :
                                <tr key={ele_i + dtls_i}>
                                    <td className='border border-gray-600 text-center text-xs'>{dtls?.YARN_DYEING_COLOR} </td>
                                    <td className='border border-gray-600 text-center text-xs'>{dtls?.STRIPE_MEASUREMENT} </td>
                                    <td className='border border-gray-600 text-center text-xs'>{dtls?.GREY_YARN_BOOKING_QUANTITY} </td>
                                    <td className='border border-gray-600 text-center text-xs'>{dtls?.YARN_DYEING_REQUIRED} </td>
                                    <td className='border border-gray-600 text-center text-xs'>yes </td>
                                </tr>
                        )
                    )}
                    <tr>
                        <th className='border border-gray-600 text-center text-xs p-1' colSpan={4}>Total</th>
                        <th className='border border-gray-600 text-center text-xs p-1' >
                            {lstStripeDetails?.reduce((p, c) => p + c.FABRIC_QTY, 0).toFixed(0)}
                        </th>
                        <th className='border border-gray-600 text-center text-xs p-1' colSpan={2}></th>
                        <th className='border border-gray-600 text-center text-xs p-1'>
                            {lstStripeDetails?.reduce((p, c) => p + c.lstDtls?.reduce((pp, cc) => pp + cc.GREY_YARN_BOOKING_QUANTITY, 0), 0).toFixed(0)}
                        </th>
                        <th className='border border-gray-600 text-center text-xs p-1'>
                            {lstStripeDetails?.reduce((p, c) => p + c.lstDtls?.reduce((pp, cc) => pp + cc.YARN_DYEING_REQUIRED, 0), 0).toFixed(0)}
                        </th>
                        <th className='border border-gray-600 text-center text-xs p-1'></th>
                    </tr>
                </tbody>
                {/* <tfoot>
                    <tr>
                        <th className='border border-gray-600 text-center text-xs p-1' colSpan={4}>Total</th>
                        <th className='border border-gray-600 text-center text-xs p-1' >
                            {lstStripeDetails?.reduce((p, c) => p + c.FABRIC_QTY, 0).toFixed(0)}
                        </th>
                        <th className='border border-gray-600 text-center text-xs p-1' colSpan={2}></th>
                        <th className='border border-gray-600 text-center text-xs p-1'>
                            {lstStripeDetails?.reduce((p, c) => p + c.lstDtls?.reduce((pp, cc) => pp + cc.GREY_YARN_BOOKING_QUANTITY, 0), 0).toFixed(0)}
                        </th>
                        <th className='border border-gray-600 text-center text-xs p-1'>
                            {lstStripeDetails?.reduce((p, c) => p + c.lstDtls?.reduce((pp, cc) => pp + cc.YARN_DYEING_REQUIRED, 0), 0).toFixed(0)}
                        </th>
                        <th className='border border-gray-600 text-center text-xs p-1'></th>
                    </tr>
                </tfoot> */}
            </table>
        </div>
    )
}
