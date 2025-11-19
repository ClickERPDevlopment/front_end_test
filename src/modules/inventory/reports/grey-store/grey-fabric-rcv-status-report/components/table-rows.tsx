import { cn } from '@/lib/utils'
import { IGreyReceiveStatusReportDto } from './IGreyFabricStock'
import moment from 'moment'

type props = {
    data: IGreyReceiveStatusReportDto
    buyerIndex?: number
    poStyleIndex?: number
    rowIndex: number
}
export default function TableRow({ data, poStyleIndex, rowIndex }: props) {
    const key = poStyleIndex ?? 0 + rowIndex + 1;
    return (
        <>
            <tr className={cn("border-t border-gray-500", ((key % 2) == 0 ? 'bg-emerald-100' : ''))}>
                <th className="border border-gray-500 text-nowrap text-center p-1">{moment(data?.RCV_CHALLAN_DATE).format("DD-MMM-YYYY")}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.RCV_CHALLAN}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.PARTY}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.YARN_CHALLAN_NO}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.PROGRAM_NO}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.FABRIC}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.GSM}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.STITCH_LENGTH}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.GREY_SHAPE}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.COLORNAME}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.ROLL_QTY}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.GREY_WEIGHT}</th>
                <th className="border border-gray-500 text-nowrap text-center p-1">{data?.UOM}</th>

            </tr>
        </>
    );

}
