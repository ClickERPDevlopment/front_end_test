import { EmbellishmentWIPReportType } from "../embellishment-order-summary-report-type";

function ReportSubgroup({
  data
}: {
  data: EmbellishmentWIPReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const printRcvQty = data.reduce((acc, item) => acc + item.PRINTING_RCV_QTY, 0);
  const embRcvQty = data.reduce((acc, item) => acc + item.EMBROIDERY_RCV_QTY, 0);

  const printProQty = data.reduce((acc, item) => acc + item.PRINTING_PRO_QTY, 0);
  const embProQty = data.reduce((acc, item) => acc + item.EMBROIDERY_PRO_QTY, 0);

  const printDelQty = data.reduce((acc, item) => acc + item.PRINTING_PRO_QTY, 0);
  const embDelQty = data.reduce((acc, item) => acc + item.EMBROIDERY_DEL_QTY, 0);

  const poQty = data.reduce((acc, item) => acc + item.PO_QTY, 0);

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border border-gray-950 p-0.5">{!data[0]?.BUYER ? data[0]?.OS_BUYER : data[0]?.BUYER}</td>
        <td className="border border-gray-950 p-0.5">{!data[0]?.STYLE ? data[0]?.OS_STYLE : data[0]?.STYLE}</td>
        <td className="border border-gray-950 p-0.5">{!data[0]?.PO_NO ? data[0]?.OS_PO_NO : data[0]?.PO_NO}</td>
        <td className="border border-gray-950 p-0.5">{poQty}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{data[0]?.WORK_ORDER_NO}</td>
        <td className="border border-gray-950 p-0.5">{printRcvQty}</td>
        <td className="border border-gray-950 p-0.5">{embRcvQty}</td>
        <td className="border border-gray-950 p-0.5">{printProQty}</td>
        <td className="border border-gray-950 p-0.5">{embProQty}</td>
        <td className="border border-gray-950 p-0.5">{printDelQty}</td>
        <td className="border border-gray-950 p-0.5">{embDelQty}</td>
        <td className="border border-gray-950 p-0.5">{(printRcvQty + embRcvQty) - (printProQty + embProQty)}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
