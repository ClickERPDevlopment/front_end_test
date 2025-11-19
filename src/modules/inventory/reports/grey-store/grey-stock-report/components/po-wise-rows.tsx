import { cn } from '@/lib/utils'
import { IGreyFabricStock } from './IGreyFabricStock'

type props = {
    data: IGreyFabricStock
    buyerIndex: number
    poStyleIndex: number
    rowIndex: number
}

const greyRcvUtl = (buyerId: number, poId: number, styleId: number, colorId: number, fabricId: number) =>
    `/report/store/grey-store/grey-fabric-receive-status-report?` +
    `isOPMWise=false&` +
    `fromOpmDate=1-Jan-2025&` +
    `toOpmDate=1-Jan-2026&` +
    `factoryId=0&` +
    `buyerId=${buyerId}&` +
    `poId=${poId}&` +
    `styleId=${styleId}&` +
    `colorId=${colorId}&` +
    `fabricId=${fabricId}`


export default function PoWiseRows({ data, poStyleIndex, rowIndex }: props) {
    const key = poStyleIndex + rowIndex + 1;
    return (
        <>
            <tr className={cn("border-t border-gray-500", ((key % 2) == 0 ? 'bg-emerald-100' : ''))}>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.BUYER}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.JOB_NO}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.STYLENO}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.PO_NO}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.GMT_COLOR}</th>
                <th className="border border-gray-500 text-wrap text-center p-1 min-w-52">{data?.FABRIC}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.FABRIC_GSM}</th>
                <th className="border border-gray-500 text-wrap text-center p-1 w-32">{data?.FINISH_DIA}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.GRAY_REQ_QTY}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">
                    <a className='text-sky-600 underline'
                        href={greyRcvUtl(data?.BUYER_ID, data?.PO_ID, data?.STYLE_ID, data?.GMT_COLOR_ID, data?.FABRIC_ID)}
                        target='_blank'
                        rel='noreferrer'>
                        {data?.RECEIVE_QTY}
                    </a>
                </th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.TRANSFER_IN_QTY}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.TOTAL_RCVD_QTY}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.RECEIVE_BAL_QTY}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.DELIVERY_QTY}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.TRANSFER_OUT_QTY}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.TOTAL_DELIVERY_QTY}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.DELIVERY_BAL_QTY}</th>
                <th className="border border-gray-500 text-wrap text-center p-1">{data?.STOCK_QTY}</th>
            </tr>
        </>
    );

}
