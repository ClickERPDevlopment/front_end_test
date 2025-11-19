import { FabricQualityProblemReportType } from "../fabric-quality-problem-report-type";

function ReportSubgroup({
  data
}: {
  data: FabricQualityProblemReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalProblemQty = data?.reduce(
    (acc, item) => acc + Number(item.PROBLEM_KG),
    0);

  const totalProblemQtPcsy = data?.reduce(
    (acc, item) => acc + Number(item.PROBLEM_PCS),
    0);

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border border-gray-950 p-0.5">{data[0]?.COLORNAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BATCH_NO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.FABRIC_NAME}</td>
        <td className="border border-gray-950 p-0.5 text-center">{data[0]?.STITCH_LENGTH}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_COUNT}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BRAND_NAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_LOT_NUMBER}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BATCH_QTY}</td>
        <td className="border border-gray-950 p-0.5">{totalProblemQty.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5">{totalProblemQtPcsy.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5">{(totalProblemQty * 100 / (data[0].BATCH_QTY || 1)).toFixed(3)}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
