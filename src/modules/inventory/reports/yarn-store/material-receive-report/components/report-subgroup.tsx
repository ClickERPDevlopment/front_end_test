import { MaterialReceiveReportType } from "../material-receive-report-type";

function ReportSubgroup({
  data, index
}: {
  data: MaterialReceiveReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalRcvQty = data.reduce((acc, item) => acc + item.RECEIVE_QTY, 0)
  const totalAdditionalQty = data.reduce((acc, item) => acc + item.ADDITIONAL_QTY, 0)
  const totalAmount = data.reduce((acc, item) => acc + (item.RECEIVE_QTY * item.ACTUAL_PRICE), 0)

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border border-gray-950 p-0.5">{index + 1}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.PURCHASE_ORDER_NO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.ITEM_NAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.MODEL}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BRAND_NAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.ORIGIN_NAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.LOCATION}</td>
        <td className="border border-gray-950 p-0.5">{totalRcvQty}</td>
        <td className="border border-gray-950 p-0.5">{totalAdditionalQty}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.UOM_NAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.ACTUAL_PRICE}</td>
        <td className="border border-gray-950 p-0.5">{totalAmount}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
