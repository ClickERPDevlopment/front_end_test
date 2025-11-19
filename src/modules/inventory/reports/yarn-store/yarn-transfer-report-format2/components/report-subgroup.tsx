import { YarnTransferReportType } from "../yarn-transfer-report-type";

function ReportSubgroup({
  data, index
}: {
  data: YarnTransferReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY),
    0);


  const totalBagQty = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.CARTON_QTY)),
    0);

  const totalConeQty = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.CONE_QTY)),
    0);

  return (
    <>
      <tr style={{ fontSize: "11px" }} className="font-bold">
        <td className="border border-gray-950 p-0.5">{index + 1}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BBLC_NO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_LOT_NUMBER}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_BRAND}</td>
        <td className="border border-gray-950 p-0.5">{totalQuantiy.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5">B: {Math.floor(totalBagQty)} | C: {Math.floor(totalConeQty)}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
