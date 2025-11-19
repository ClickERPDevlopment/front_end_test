import moment from "moment";
import { IAccessoriesReportWithPo } from "../accessories-with-po-type";

function ReportGroup({
  data,
  isShipDateShow,
}: {
  data: IAccessoriesReportWithPo[];
  isShipDateShow: boolean;
}) {


  const totalWoQty = data.reduce((acc, item) => {
    return (acc += item.WORK_ORDER_QTY);
  }, 0);

  const totalAmount = data.reduce((acc, item) => {
    return (acc += item.WORK_ORDER_QTY * item.SUPPLIER_RATE_PER_PCS);
  }, 0);

  return (
    <>
      {data.map((item) => (
        <tr className="text-xs">
          <td className="border border-gray-900 p-0.5 text-center ">
            {item.STYLENO}
          </td>
          <td className="border border-gray-900 p-0.5 text-center text-nowrap">
            {item.PO_NO}
          </td>
          <td className="border border-gray-900 p-0.5 text-center text-nowrap">
            {item.SUB_PO}
          </td>
          <td className="border border-gray-900 p-0.5 text-left text-nowrap">
            {item.MTL_NAME}
          </td>
          <td className="border border-gray-900 p-0.5 text-left">
            {item.GMT_COLOR_NAME}
          </td>
          <td className="border border-gray-900 p-.5 text-left">
            {item.MTL_COLOR_NAME}
          </td>
          <td className="border border-gray-900 p-.5 text-center">
            {item.GMT_SIZE_NAME}
          </td>
          <td className="border border-gray-900 p-0.5 text-center">
            {item.MTL_SIZE_NAME}
          </td>
          <td className="border border-gray-900 p-0.5 text-center">
            {item.GMT_QTY}
          </td>
          <td className="border border-gray-900 p-0.5 text-center">
            {item.EXTRA_PERCENT}
          </td>
          <td className="border border-gray-900 p-0.5 text-center">
            {item.CONSUMPTION_PER_UNIT}
          </td>
          <td className="border border-gray-900 p-0.5 text-center">
            {item.WORK_ORDER_QTY}
          </td>
          <td className="border border-gray-900 p-0.5 text-center">
            {item.UOM}
          </td>
          <td className="border border-gray-900 p-0.5 text-center">
            {item.CURRENCY}
          </td>
          <td className="border border-gray-900 p-0.5 text-center">
            {item.SUPPLIER_RATE_PER_PCS}
          </td>
          <td className="border border-gray-900 p-0.5 text-center">
            {(item.SUPPLIER_RATE_PER_PCS * item.WORK_ORDER_QTY).toFixed(2)}
          </td>
          <td className="border border-gray-900 p-0.5 text-center">
            {item.DESCRIPTION}
          </td>
          <td className="border border-gray-900 p-0.5 text-center">
            {item.MTL_DESCRIPTION_2}
          </td>
          {
            isShipDateShow && <td className="border border-gray-900 p-0.5 text-center">{moment(item.SHIP_DATE).format("DD-MMM-YY")}</td>
          }
        </tr>
      ))}
      <tr className="text-xs font-bold">
        <td colSpan={8} className="border border-gray-900 p-1 text-center ">Material Total</td>
        <td className="border border-gray-900 p-1 text-center">

        </td>
        <td className="border border-gray-900 p-1 text-center"></td>
        <td className="border border-gray-900 p-1 text-center"></td>
        <td className="border border-gray-900 p-1 text-center">{totalWoQty}</td>
        <td className="border border-gray-900 p-1 text-center"></td>
        <td className="border border-gray-900 p-1 text-center">

        </td>
        <td className="border border-gray-900 p-1 text-center"></td>
        <td className="border border-gray-900 p-1 text-center">{totalAmount.toFixed(2)}</td>
        <td className="border border-gray-900 p-1 text-center"></td>
        <td className="border border-gray-900 p-1 text-center"></td>
        {
          isShipDateShow && <td className="border border-gray-900 p-1 text-center"></td>
        }
      </tr>
    </>
  );
}

export default ReportGroup;
