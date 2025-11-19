import React from 'react'
import { DateWiseFinishFabricReceiveAndIssueRegisterReportType } from '../DateWiseFinishFabricReceiveAndIssueRegisterReport-type'
import moment from 'moment'

export default function TableRow({ index, ele }: { index: number, ele: DateWiseFinishFabricReceiveAndIssueRegisterReportType }) {
    return (
        <tr style={{ fontSize: "12px" }} className="" key={index}>
            <td className="border border-gray-950 p-1 text-nowrap text-center">{moment(ele.ACTION_DATE).format("DD-MMM-YY")}</td>
            <td className="border border-gray-950 p-1 text-center">{ele.CHALLAN_NO}</td>
            <td className="border border-gray-950 p-1 text-center">{ele.PINO}</td>
            <td className="border border-gray-950 p-1 text-center">{ele.WORK_ORDER_NO}</td>
            <td className="border border-gray-950 p-1">{ele.BUYER_NAME}</td>
            <td className="border border-gray-950 p-1">{ele.STYLENO}</td>
            <td className="border border-gray-950 p-1">{ele.PONO}</td>
            <td className="border border-gray-950 p-1">{ele.FABRIC}</td>
            <td className="border border-gray-950 p-1 text-center">{ele.UOM}</td>
            <td className="border border-gray-950 p-1 text-center">{ele.GMT_COLOR}</td>
            <td className="border border-gray-950 p-1 text-center">{ele.DATA_SOURCE}</td>
            <td className="border border-gray-950 p-1 text-center">{ele.RCV_QUANTITY}</td>
            <td className="border border-gray-950 p-1 text-center">{ele.RCV_ROLL_QTY}</td>
            <td className="border border-gray-950 p-1 text-center">{ele.RCV_PICES}</td>
            <td className="border border-gray-950 p-1 text-center">{ele.ISSUED_QUANTITY}</td>
            <td className="border border-gray-950 p-1 text-center">{ele.ISSUED_ROLL_QTY}</td>
            <td className="border border-gray-950 p-1 text-center">{ele.ISSUED_PICES}</td>
        </tr>
    )
}
