import { IReconsiliationPendingDoneReport } from "../reconciliation-pending-done-report";

function ReportRow({ data }: { data: IReconsiliationPendingDoneReport[] }) {
  const totalOrderQty = data.reduce((acc, item) => acc + item.ORDER_QTY, 0);
  const totalShipmentQty = data.reduce(
    (acc, item) => acc + item.SHIPMENT_QTY,
    0
  );
  const totalReconQty = data.reduce((acc, item) => acc + item.RECON_QTY, 0);
  const totalCuttingQty = data.reduce((acc, item) => acc + item.CUTTING_QTY, 0);

  return (
    <>
      <tr className="font-bold">
        <td className="border border-gray-300 p-1 text-sm" colSpan={8}>
          Buyer: {data[0]?.BUYER_NAME}
        </td>
      </tr>
      {data.map((item, index) => (
        <tr key={index}>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.STYLE_NO}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.PO_NO}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.SHIP_DATE}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.ORDER_QTY}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.CUTTING_QTY}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.SHIPMENT_QTY}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.CUTTING_QTY - item.SHIPMENT_QTY}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.RECON_QTY}
          </td>
        </tr>
      ))}
      <tr className="font-bold">
        <td className="border border-gray-300 p-1 text-sm text-center">
          Total
        </td>
        <td className="border border-gray-300 p-1 text-sm text-center"></td>
        <td className="border border-gray-300 p-1 text-sm text-center"></td>
        <td className="border border-gray-300 p-1 text-sm text-center">
          {totalOrderQty}
        </td>
        <td className="border border-gray-300 p-1 text-sm text-center">
          {totalCuttingQty}
        </td>
        <td className="border border-gray-300 p-1 text-sm text-center">
          {totalShipmentQty}
        </td>
        <td className="border border-gray-300 p-1 text-sm text-center">
          {totalCuttingQty - totalShipmentQty}
        </td>
        <td className="border border-gray-300 p-1 text-sm text-center">
          {totalReconQty}
        </td>
      </tr>
    </>
  );
}

export default ReportRow;
