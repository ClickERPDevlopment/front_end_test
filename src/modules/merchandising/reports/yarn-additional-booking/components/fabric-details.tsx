import { YarnAdditionalBookingReportDtoType } from '../yarn-additional-booking-report.-type'

export default function Details({ data }: { data?: YarnAdditionalBookingReportDtoType }) {

    const getYarn = (addId: string) => {
        const yarns = data?.oYBookingDetailsYarnList?.filter(f => f.FABRIC_ADD_GUID_ID == addId);
        return [...new Set(yarns?.map(item => item.YARN))].join(', ');
    }
    const getTotalYarn = (addId: string) =>
        data?.
            oYBookingDetailsYarnList?.
            filter(f => f.FABRIC_ADD_GUID_ID == addId)?.
            reduce((p, c) => p + Number(c.YARN_REQUIRED_QTY), 0).
            toFixed(2);

    return (
        <div className='mt-5 flex'>
            <table>
                <thead>
                    <tr>
                        <th className='p-1 min-w-24 border border-gray-600 text-center'>Style</th>
                        <th className='p-1 min-w-24 border border-gray-600 text-center'>PO</th>
                        <th className='p-1 min-w-24 border border-gray-600 text-center'>GMT Parts</th>
                        <th className='p-1 min-w-36 border border-gray-600 text-center'>Fabrication</th>
                        <th className='p-1 min-w-36 border border-gray-600 text-center'>Yarn</th>
                        <th className='p-1 min-w-24 border border-gray-600 text-center'>Fabric Color</th>
                        <th className='p-1 min-w-24 border border-gray-600 text-center'>Size</th>
                        <th className='p-1 border border-gray-600 text-center'>Finish Dia</th>
                        <th className='p-1 border border-gray-600 text-center'>Gsm</th>
                        <th className='p-1 border border-gray-600 text-center'>Req. Finish Qty</th>
                        <th className='p-1 border border-gray-600 text-center'>UOM</th>
                        <th className='p-1 border border-gray-600 text-center'>Total Yarn</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.oYBookingDetailsFabricList.map((ele, index) =>
                        <tr key={index}>
                            <td className='p-1 border border-gray-600 text-center'>{data?.STYLE}</td>
                            <td className='p-1 border border-gray-600 text-center'>{data?.JOB_POS}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele?.GMT_PARTS}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele?.FABRIC}</td>
                            <td className='p-1 border border-gray-600 text-center'>{getYarn(ele?.FABRIC_ADD_GUID_ID)}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele?.FABRIC_COLOR}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele?.GMT_SIZE}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele?.FINISH_DIA}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele?.FINISH_GSM}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele?.FABRIC_REQUIRED_QTY}</td>
                            <td className='p-1 border border-gray-600 text-center'>KG</td>
                            <td className='p-1 border border-gray-600 text-center'>{getTotalYarn(ele?.FABRIC_ADD_GUID_ID)}</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>

                        <th className='p-1 border border-gray-600 text-center' colSpan={9}>Total</th>
                        <th className='p-1 border border-gray-600 text-center'>
                            {
                                data?.oYBookingDetailsFabricList?.reduce((p, c) => p + Number(c.FABRIC_REQUIRED_QTY), 0).toFixed(2)
                            }
                        </th>
                        <th className='p-1 border border-gray-600 text-center'></th>
                        <th className='p-1 border border-gray-600 text-center'>
                            {
                                data?.oYBookingDetailsYarnList?.reduce((p, c) => p + Number(c.YARN_REQUIRED_QTY), 0).toFixed(2)
                            }
                        </th>
                    </tr>
                </tfoot>
            </table>



        </div>
    )
}
