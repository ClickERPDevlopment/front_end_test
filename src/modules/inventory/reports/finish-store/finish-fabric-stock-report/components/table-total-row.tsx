import { IFinishFabricStockReport } from "../IFinishFabricStockReport";

export default function TableTotalRow({ data, title, isSizeWiseCheck }: { data?: IFinishFabricStockReport[], title?: string, isSizeWiseCheck?: boolean }) {
    return (
        <tr className="bg-emerald-200 font-bold">
            <td className="text-xs border border-black p-2 min-w-24 text-center" colSpan={isSizeWiseCheck ? 8 : 7}>{title ?? 'Total'}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.BOOKING_QTY, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.GREY_DEL_TO_DYEING, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.FIN_FAB_RCV_GW, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.BL_ON_GREY_ISSUE, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.FIN_FAB_RCV_FW, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24"></td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.FABRIC_PURCHASE, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.RCV_FROM_OTHER_PO, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.TOTAL_RCV, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.CUTTING_ISSUE_RETURN_RCV, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.ISSUE_FOR_RE_DYEING, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.RE_DYEING_RECEIVE, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.RE_DYEING_RCV_BL, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.CUTTING_ISSUE_QTY, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.ISSUE_TO_OTHER_PO, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.LO_ISSUE, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.TOTAL_ISSUE, 0).toFixed(2)}</td>
            <td className="text-xs border border-black p-2 min-w-24">{data?.reduce((p, c) => p + c.STOCK_QTY, 0).toFixed(2)}</td>
        </tr>
    )
}
