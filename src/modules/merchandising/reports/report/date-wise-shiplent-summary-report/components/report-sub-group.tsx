/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { DateWiseShiplentSummaryReportType } from "../date-wise-shiplent-summary-report-type";

function ReportSubGroup({
  data,
}: {
  data: DateWiseShiplentSummaryReportType[];
}) {

  const totalOrderQty = data.reduce((sum, item) => sum + item.ORDER_QTY, 0);
  const totalShipmentQty = data.reduce((sum, item) => sum + item.SHIPMENTQTY, 0);
  const totalValue = data.reduce((sum, item) => sum + (item.SHIPMENTQTY * item.FOB), 0);
  const prevShipQty = data.reduce((sum, item) => sum + (item.PREV_SHIPMENTQTY), 0);

  return (
    <>
      <tr className="text-center">
        <td className="border border-gray-300 p-1">
          {moment(data[0].CHALLANDATE).format("DD-MMM-YY")}
        </td>
        <td className="border border-gray-300 p-1 text-start">
          {data[0].BUYER}
        </td>
        <td className="border border-gray-300 p-1 text-start">{data[0].STYLENO}</td>
        <td className="border border-gray-300 p-1 text-start">{data[0].STYLENAME}</td>
        <td className="border border-gray-300 p-1 text-start">{data[0].PONO}</td>
        <td className="border border-gray-300 p-1 text-right">{totalOrderQty}</td>
        <td className="border border-gray-300 p-1 text-right">{prevShipQty}</td>
        <td className="border border-gray-300 p-1 text-right">{(totalOrderQty - totalShipmentQty - prevShipQty)}</td>
        <td className="border border-gray-300 p-1 text-right">{totalShipmentQty}</td>
        <td className="border border-gray-300 p-1 text-center">{data[0].ITEMUOM}</td>
        <td className="border border-gray-300 p-1 text-right">{(totalValue).toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportSubGroup;
