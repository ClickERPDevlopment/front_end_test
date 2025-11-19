import { IYarnDeliveryChallanGatePassReport } from "../yarn-delivery-challan-gate-pass-report-type";

function ReportSubgroup({
  data, index
}: {
  data: IYarnDeliveryChallanGatePassReport[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalBagQty = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.CARTON_QTY)),
    0);

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY),
    0);

  const totalConeQty = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.CONE)),
    0);

  return (
    <>
      <tr style={{ fontSize: "11px" }} className="font-bold">
        <td className="border border-gray-950 p-0.5">{index + 1}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.KNITTING_PROGRAM_NO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_BRAND}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_LOT_NUMBER}</td>
        <td className="border border-gray-950 p-0.5">{totalQuantiy.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5">B: {Math.floor(totalBagQty)} | C: {Math.floor(totalConeQty)}</td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5"></td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
