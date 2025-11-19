import moment from 'moment'
import { SampleProgramReportDto_MasterType } from '../sample-program-report.-type'

export default function MasterIfo({ masterInfo }: { masterInfo?: SampleProgramReportDto_MasterType }) {
    return (
        <div className='w-full'>
            <h1 className='text-center text-2xl font-bold'>{masterInfo?.COMPANY_NAME}</h1>
            <h1 className=' text-center text-lg font-bold'>SAMPLE BOOKING</h1>
            <div className='flex justify-between gap-2 mt-5'>
                <ul className='basis-4/12 print:basis-6/12'>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Date</label>
                            <span>: {moment(masterInfo?.SP_DATE).format('D-MMM-yy')}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Job Number</label>
                            <span>:{masterInfo?.PROGRAM_NO}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Buyer</label>
                            <span className='whitespace-nowrap'>: {masterInfo?.BUYER}</span>
                        </div></li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Sample Order No</label>
                            <span>: {masterInfo?.SAMPLE_ORDER_NO}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Ship TNA date</label>
                            <span>: {moment(masterInfo?.SHIP_TNA_DATE).format('D-MMM-yy')}</span>
                        </div></li>
                </ul>
                <ul className='basis-4/12 print:basis-6/12'>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Sample Type</label>
                            <span>: {masterInfo?.SAMPLE_TYPE}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Dealing Merchant</label>
                            <span>: {masterInfo?.DEALING_MERCHANT}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Attention</label>
                            <span className='whitespace-nowrap'>: {masterInfo?.ATTENTION}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label htmlFor="" className='font-bold min-w-28'>Release Date</label>
                            <span>: {moment(masterInfo?.RELEASE_DATE).format('D-MMM-yy')}</span>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    )
}
