import moment from "moment";
import { IShortShipmentReasonStatus } from "../short-shipment-reason-status-type";
export interface IReportTableProps {
  data: IShortShipmentReasonStatus[];
  firstHeader: string[] | null;
}

export interface ITotals {
  orderQty: number;
  cuttingQty: number;
  sewingQty: number;
  shipmentQty: number;
  shortExcessQty: number;
  affectedQty: number;
}

const ReportTable: React.FC<IReportTableProps> = ({ data }) => {
  // Calculate totals
  const calculateTotals = (): ITotals => {
    return data.reduce(
      (acc, item) => ({
        orderQty: acc.orderQty + item.ORDER_QTY,
        cuttingQty: acc.cuttingQty + item.CUTTING_QTY,
        sewingQty: acc.sewingQty + item.SEWING_QTY,
        shipmentQty: acc.shipmentQty + item.SHIPMENT_QTY,
        shortExcessQty:
          acc.shortExcessQty + (item.ORDER_QTY - item.SHIPMENT_QTY),
        affectedQty: acc.affectedQty + item.AFFECTED_QTY,
      }),
      {
        orderQty: 0,
        cuttingQty: 0,
        sewingQty: 0,
        shipmentQty: 0,
        shortExcessQty: 0,
        affectedQty: 0,
      }
    );
  };

  const renderTableRow = (item: IShortShipmentReasonStatus, index: number) => (
    <tr key={index} className="text-center">
      <td className="border border-gray-300 p-1">{item.STYLE_NO}</td>
      <td className="border border-gray-300 p-1">{item.PO_NO}</td>
      <td className="border border-gray-300 p-1">{item.ORDER_QTY}</td>
      <td className="border border-gray-300 p-1">{item.CUTTING_QTY}</td>
      <td className="border border-gray-300 p-1">{item.SEWING_QTY}</td>
      <td className="border border-gray-300 p-1">{item.SHIPMENT_QTY}</td>
      <td className="border border-gray-300 p-1">
        {item.ORDER_QTY - item.SHIPMENT_QTY}
      </td>
      <td className="border border-gray-300 p-1 text-center">
        {moment(item.SHIP_DATE).format("DD-MMM-YY")}
      </td>
      <td className="border border-gray-300 p-1 text-center">{item.REASON}</td>
      <td className="border border-gray-300 p-1 text-center">
        {item.AFFECTED_QTY}
      </td>
      <td className="border border-gray-300 p-1 text-center">{item.DETAILS}</td>
    </tr>
  );

  const renderTotalRow = (totals: ITotals) => (
    <tr className="text-center bg-indigo-200">
      <td className="border border-gray-300 p-1 font-bold" colSpan={2}>
        Total
      </td>
      <td className="border border-gray-300 p-1">{totals.orderQty}</td>
      <td className="border border-gray-300 p-1">{totals.cuttingQty}</td>
      <td className="border border-gray-300 p-1">{totals.sewingQty}</td>
      <td className="border border-gray-300 p-1">{totals.shipmentQty}</td>
      <td className="border border-gray-300 p-1">{totals.shortExcessQty}</td>
      <td className="border border-gray-300 p-1"></td>
      <td className="border border-gray-300 p-1"></td>
      <td className="border border-gray-300 p-1">{totals.affectedQty}</td>
      <td className="border border-gray-300 p-1"></td>
    </tr>
  );

  const totals = calculateTotals();

  return (
    <>
      {data.map(renderTableRow)}
      {data.length > 1 && renderTotalRow(totals)}
    </>
  );
};

export default ReportTable;
