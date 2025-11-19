import { FabricBookingReportDto_VerficationStatus } from '../fabric-booking-type'

export default function VarificationStatus({ lstVerificationStatus }: { lstVerificationStatus?: FabricBookingReportDto_VerficationStatus[] }) {
    if (!lstVerificationStatus) return null;
    if (lstVerificationStatus.length === 0) return null;
    return (
        <div className='mt-5'>
            <div className="w-full text-center font-bold pb-[3px]">
                <h6>VERIFICATION STATUS</h6>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="w-[2%] text-center border border-gray-600 px-2 py-1">SL</th>
                        <th className="w-[10%] text-center border  border-gray-600 px-2 py-1">Department</th>
                        <th className="w-[20%] text-center border  border-gray-600 px-2 py-1">Name</th>
                        <th className="w-[15%] text-center border border-gray-600 px-2 py-1">Designation</th>
                        <th className="w-[10%] text-center border border-gray-600 px-2 py-1">Status</th>
                        <th className="w-[35%] text-center border border-gray-600 px-2 py-1">Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {lstVerificationStatus?.map((ele, i) =>
                        <tr>
                            <td className='text-center p-1'>{i + 1}</td>
                            <td className='text-center p-1'>{ele.DEPARTMENT_NAME}</td>
                            <td className='text-center p-1'>{ele.USER_FULL_NAME} + @"</td>
                            <td className='text-center p-1'>{ele.DESIGNATION} + @"</td>
                            <td className='text-center p-1'>{ele.STATUS} + @"</td>
                            <td className='text-center p-1'>{ele.COMMENTS} + @"</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
