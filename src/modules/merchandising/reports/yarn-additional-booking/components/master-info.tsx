import moment from 'moment'
import { YarnAdditionalBookingReportDtoType } from '../yarn-additional-booking-report.-type'

export default function MasterIfo({ masterInfo }: { masterInfo?: YarnAdditionalBookingReportDtoType }) {
    return (
        <div className='w-full'>
            <h1 className='text-center text-2xl font-bold'>{masterInfo?.COMPANY_NAME}</h1>
            <h1 className=' text-center text-lg font-bold'>{masterInfo?.ISSUE_TYPE}</h1>
            <div className='flex justify-between gap-2 mt-5'>
                <ul className='basis-4/12 print:basis-6/12'>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Booking Date</label>
                            <span>: {moment(masterInfo?.BOOKING_DATE).format('D-MMM-yy')}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Job Number</label>
                            <span>: {masterInfo?.PO}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Buyer</label>
                            <span className='whitespace-nowrap'>: {masterInfo?.BUYER}</span>
                        </div></li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Shipment Date</label>
                            <span>: {moment(masterInfo?.oYBookingDetailsFabricList[0]?.DELIVERY_DATE).format('D-MMM-yy')}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Remarks</label>
                            <span>: {masterInfo?.REMARKS}</span>
                        </div>
                    </li>
                </ul>
                <ul className='basis-4/12 print:basis-6/12'>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-36'>Booking Type</label>
                            <span>: {masterInfo?.ISSUE_TYPE}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-36'>Additional Booking No</label>
                            <span>: {masterInfo?.BOOKING_NO}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-36'>Dealing Merchant</label>
                            <span>: {masterInfo?.DEALING_MERCHANT}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-36'>Resp. Department</label>
                            <span className='whitespace-nowrap'>: {masterInfo?.RESPONSIBLE_DEPT}</span>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    )
}
