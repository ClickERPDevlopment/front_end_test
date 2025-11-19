import { FinishFabricReceiveChallanReportType } from "../finish-fabric-receive-challan-report-type";

function ReportSubgroup({
  data, index
}: {
  data: FinishFabricReceiveChallanReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY),
    0);

  const totalRollQty = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.ROLL_QTY)),
    0);

  const totalQtyPcs = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.PICES)),
    0);

  return (
    <>
      <tr style={{ fontSize: "14px" }} >
        <td className="border border-gray-950 p-0.5">{index + 1}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.WORK_ORDER_NUMBER}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.PINO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.STYLENO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.PO_NO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.FABRIC}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.GMT_COLOR}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.UOM}</td>
        <td className="border border-gray-950 p-0.5">{totalQuantiy}</td>
        <td className="border border-gray-950 p-0.5">{totalRollQty}</td>
        <td className="border border-gray-950 p-0.5">{totalQtyPcs}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
