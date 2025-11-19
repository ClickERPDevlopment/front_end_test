import moment from 'moment'
import { GreyFabricIssueToDyeingChallanType_Master } from '../grey-fabric-issue-to-dyeing-challan-type'

export default function ReportHeader({ data, reportFormat }: { data: GreyFabricIssueToDyeingChallanType_Master | null | undefined, reportFormat: number }) {
    if (data)
        return (
            <div className='min-w-full text-center font-bold'>
                {
                    <div className='flex justify-between'>
                        <p className='text-left font-bold text-sm'>"CLICK ERP"</p>
                        <p className='text-right font-bold text-sm'>{moment().format("DD-MMM-YY hh:mm A")}</p>
                    </div>
                }
                <h1 className='text-2xl font-bold'>{data?.GROUP_COMPANY_NAME}</h1>
                <h1 className='text-base'>Address: {data?.GROUP_COMPANY_ADDRESS}</h1>

                <h1 className='text-lg font-bold mt-5'>({data?.COMPANY_NAME})</h1>
                <h1 className='text-base font-bold'>Grey Fabric Delivery Challan</h1>
                <div className='flex justify-between mt-5'>
                    <ul>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Challan No</span>
                                <span>: {data?.CHALLAN_NO}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Date</span>
                                <span>: {moment(data?.CHALLAN_DATE).format('DD-MMM-YY')}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Buyer</span>
                                <span>: {reportFormat == 2 ? data?.BUYER_CODE : data.BUYER}</span>
                            </div>
                        </li>
                        {
                            reportFormat == 1 && <li>
                                <div className='flex'>
                                    <span className='text-left w-28'>Order No</span>
                                    <span>: {data?.ORDER_NO}</span>
                                </div>
                            </li>
                        }

                        {
                            reportFormat == 1 && <li>
                                <div className='flex'>
                                    <span className='text-left w-28'>Style</span>
                                    <span>: {data?.STYLE}</span>
                                </div>
                            </li>
                        }

                        {
                            reportFormat == 1 && <li>
                                <div className='flex'>
                                    <span className='text-left w-28'>Season</span>
                                    <span>: {data?.SEASON}</span>
                                </div>
                            </li>
                        }

                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Job No</span>
                                <span>: {data?.JOB_NO}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Issue Purpose</span>
                                <span>: {data?.ISSUE_PURPOSE}</span>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>To</span>
                                <span>: {data?.PARTY}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Address</span>
                                <span>: {data?.PARTY_ADDRESS}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Issue Type</span>
                                <span>: {data?.ISSUE_TYPE}</span>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <span className='text-left w-28'>Treatment</span>
                                <span>: {data?.TREATMENT}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
}
