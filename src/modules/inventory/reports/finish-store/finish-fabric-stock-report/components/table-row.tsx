import moment from "moment";
import { IFinishFabricStockReport } from "../IFinishFabricStockReport";
import { cn } from "@/lib/utils";

export default function TableRow({ data, isSizeWiseCheck }: { data?: IFinishFabricStockReport, isSizeWiseCheck?: boolean }) {
    return (
        <tr>
            <td className="text-xs border border-black p-2 min-w-24">{moment(data?.ORDERPLACEMENTMONTH).format('MMM-YY')}</td>
            <td className="text-xs border border-black p-2 min-w-24 text-nowrap">{data?.BUYER}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.PO_NO}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.STYLENO}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.COLOR}</td>
            <td className={cn(`text-xs border border-black p-2 min-w-24`, isSizeWiseCheck ? '' : 'hidden')}>{data?.SIZENAME}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.FABRIC_PART}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.UOM}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.BOOKING_QTY}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.GREY_DEL_TO_DYEING}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.FIN_FAB_RCV_GW}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.BL_ON_GREY_ISSUE}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.FIN_FAB_RCV_FW}</td>
            <td className="text-xs border border-black p-2 min-w-24">
                {(data?.FIN_FAB_RCV_GW ?? 0) > 0 ?
                    (((data?.FIN_FAB_RCV_GW ?? 0) - (data?.FIN_FAB_RCV_FW ?? 0)) / (data?.FIN_FAB_RCV_GW ?? 0)).toFixed(2) : ''}
            </td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.FABRIC_PURCHASE}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.RCV_FROM_OTHER_PO}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.TOTAL_RCV}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.CUTTING_ISSUE_RETURN_RCV}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.ISSUE_FOR_RE_DYEING}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.RE_DYEING_RECEIVE}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.RE_DYEING_RCV_BL}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.CUTTING_ISSUE_QTY}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.ISSUE_TO_OTHER_PO}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.LO_ISSUE}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.TOTAL_ISSUE}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.STOCK_QTY}</td>
        </tr>
    )
}
