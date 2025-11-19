import moment from "moment";
import { EmbellishmentOrderSummaryReportType } from "../embellishment-order-summary-report-type";

function ReportSubgroup({
  data
}: {
  data: EmbellishmentOrderSummaryReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalQtyPcs = data.reduce(
    (acc, item) => acc + (item.WO_QTY || 0),
    0
  );

  const totalValue = data.reduce(
    (acc, item) => acc + ((item.RATE || 0) * (item.WO_QTY || 0)),
    0
  );


  const totalRcvQty = data.reduce(
    (acc, item) => acc + (item.RCV_QTY || 0),
    0
  );

  const totalProdQty = data.reduce(
    (acc, item) => acc + (item.PRO_QTY || 0),
    0
  );

  const totalDelQty = data.reduce(
    (acc, item) => acc + (item.DELIVERY_QTY || 0),
    0
  );

  const totalRejectQty = data.reduce(
    (acc, item) => acc + (item.REJECT_QTY || 0),
    0
  );

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border border-gray-950 p-0.5">{data[0]?.SUPPLIER}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{data[0]?.WORK_ORDER_NO}</td>
        <td className="border border-gray-950 p-0.5">{!data[0]?.BUYER ? data[0]?.OS_BUYER : data[0]?.BUYER}</td>
        <td className="border border-gray-950 p-0.5">{!data[0]?.STYLE ? data[0]?.OS_STYLE : data[0]?.STYLE}</td>
        <td className="border border-gray-950 p-0.5">{!data[0]?.PO_NO ? data[0]?.OS_PO_NO : data[0]?.PO_NO}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{moment(data[0]?.WORK_ORDER_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{moment(data[0]?.ASKING_DELIVERY_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.RECEIVE_TYPE}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.COLOR}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.EMBELLISHMENT_CATEGORY}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.PARTS}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalQtyPcs}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.RATE}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalValue.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalRcvQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalProdQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalDelQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalProdQty - totalDelQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalRejectQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">{data[0]?.BUDGET_STATUS}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
