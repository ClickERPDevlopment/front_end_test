import React from 'react'
import { DateWiseFinishFabricReceiveAndIssueRegisterReportType } from '../DateWiseFinishFabricReceiveAndIssueRegisterReport-type';

export default function TotalRow({
    data,
    title
}: {
    data: DateWiseFinishFabricReceiveAndIssueRegisterReportType[],
    title?: string
}) {
    return (
        <tr style={{ fontSize: "12px" }} className="font-bold bg-indigo-100">
            <td colSpan={11} className="border border-gray-950 p-1 text-center">{title ?? 'Total'}</td>
            <td className="border border-gray-950 p-1 text-center">{data.reduce((acc, item) => acc + Number(item.RCV_QUANTITY), 0).toFixed(2)}</td>
            <td className="border border-gray-950 p-1 text-center">{data.reduce((acc, item) => acc + Number(item.RCV_ROLL_QTY), 0).toFixed(2)}</td>
            <td className="border border-gray-950 p-1 text-center">{data.reduce((acc, item) => acc + Number(item.RCV_PICES), 0).toFixed(2)}</td>
            <td className="border border-gray-950 p-1 text-center">{data.reduce((acc, item) => acc + Number(item.ISSUED_QUANTITY), 0).toFixed(2)}</td>
            <td className="border border-gray-950 p-1 text-center">{data.reduce((acc, item) => acc + Number(item.ISSUED_ROLL_QTY), 0).toFixed(2)}</td>
            <td className="border border-gray-950 p-1 text-center">{data.reduce((acc, item) => acc + Number(item.ISSUED_PICES), 0).toFixed(2)}</td>
        </tr>
    )
}
