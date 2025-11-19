/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { DateColorWiseShiplentSummaryReportType } from "../date-color-wise-shiplent-summary-report-type";

function ReportBuyerGroup({
  data,
}: {
  data: DateColorWiseShiplentSummaryReportType[];
}) {

  const totalOrderQty = data.reduce((sum, item) => sum + item.ORDER_QTY, 0);
  const totalShipmentQty = data.reduce((sum, item) => sum + item.SHIPMENTQTY, 0);
  const totalValue = data.reduce((sum, item) => sum + (item.SHIPMENTQTY * item.FOB), 0);

  return (
    <>
      {data.map((item) => (
        <tr className="text-center">
          <td className="border border-gray-300 p-1">
            {moment(item.CHALLANDATE).format("DD-MMM-YY")}
          </td>
          <td className="border border-gray-300 p-1 text-start">
            {item.BUYER}
          </td>
          <td className="border border-gray-300 p-1 text-start">{item.STYLENO}</td>
          <td className="border border-gray-300 p-1 text-start">{item.STYLENAME}</td>
          <td className="border border-gray-300 p-1 text-start">{item.PONO}</td>
          <td className="border border-gray-300 p-1 text-start">{item.COLORNAME}</td>
          <td className="border border-gray-300 p-1 text-right">{item.ORDER_QTY}</td>
          <td className="border border-gray-300 p-1 text-right">{item.PREV_SHIPMENTQTY}</td>
          <td className="border border-gray-300 p-1 text-right">{(item.ORDER_QTY - item.PREV_SHIPMENTQTY - item.SHIPMENTQTY)}</td>
          <td className="border border-gray-300 p-1 text-right">{item.SHIPMENTQTY}</td>
          <td className="border border-gray-300 p-1 text-center">{item.ITEMUOM}</td>
          <td className="border border-gray-300 p-1 text-right">{(item.SHIPMENTQTY * item.FOB).toFixed(2)}</td>
        </tr>
      ))}

      <tr className="text-center font-bold bg-emerald-100">
        <td colSpan={6} className="border border-gray-300 p-1 text-right">Buyer Wise Total</td>
        <td className="border border-gray-300 p-1 text-right">{totalOrderQty}</td>
        <td className="border border-gray-300 p-1">{ }</td>
        <td className="border border-gray-300 p-1">{ }</td>
        <td className="border border-gray-300 p-1 text-right">{totalShipmentQty}</td>
        <td className="border border-gray-300 p-1">{ }</td>
        <td className="border border-gray-300 p-1 text-right">{totalValue.toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportBuyerGroup;
