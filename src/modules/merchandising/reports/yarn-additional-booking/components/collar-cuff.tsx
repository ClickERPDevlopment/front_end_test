import { YarnAdditionalBookingReportDtoType } from '../yarn-additional-booking-report.-type'

export default function CollarCuff({ data }: { data?: YarnAdditionalBookingReportDtoType }) {

    const getFabric = (addId: string) => data?.oYBookingDetailsFabricList?.filter(f => f.FABRIC_ADD_GUID_ID == addId)[0]?.FABRIC;
    const getColor = (addId: string) => data?.oYBookingDetailsFabricList?.filter(f => f.FABRIC_ADD_GUID_ID == addId)[0]?.FABRIC_COLOR;

    if (data?.oYBookingDetailsCollarCuffList) {
        return data?.oYBookingDetailsCollarCuffList?.length <= 0 ? null :
            (
                <div className='mt-5 flex'>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={9} className='p-1 min-w-36 border border-gray-600 text-center'>Collar, Cuff & Placket Details</th>
                            </tr>
                            <tr>
                                <th className='p-1 min-w-36 border border-gray-600 text-center'>Fabric</th>
                                <th className='p-1 min-w-24 border border-gray-600 text-center'>Color</th>
                                <th className='p-1 min-w-20 border border-gray-600 text-center'>Size</th>
                                <th className='p-1  border border-gray-600 text-center whitespace-nowrap'>Collar Pcs</th>
                                <th className='p-1  border border-gray-600 text-center whitespace-nowrap'>Collar Size</th>
                                <th className='p-1  border border-gray-600 text-center whitespace-nowrap'>Cuff Pcs</th>
                                <th className='p-1  border border-gray-600 text-center whitespace-nowrap'>Cuff Size</th>
                                <th className='p-1  border border-gray-600 text-center whitespace-nowrap'>Plkt Pcs</th>
                                <th className='p-1  border border-gray-600 text-center whitespace-nowrap'>Plkt Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.oYBookingDetailsCollarCuffList?.map((ele, index) =>
                                <tr key={index}>
                                    <td className='p-1 border border-gray-600 text-center'>{getFabric(ele.FABRIC_ADD_GUID_ID)}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{getColor(ele.FABRIC_ADD_GUID_ID)}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele?.SIZE_NAME}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele?.COLLAR_PCS}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele?.COLLAR_SIZE}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele?.CUFF_PCS}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele?.CUFF_SIZE}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele?.PLACKET_QTY}</td>
                                    <td className='p-1 border border-gray-600 text-center'>{ele?.PLACKET_SIZE}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )
    }
}
