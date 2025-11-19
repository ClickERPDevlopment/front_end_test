import { GreyFabricProcessChallanReportType } from "../grey-fabric-process-challan-report-type";

function ReportSubgroup({
  data
}: {
  data: GreyFabricProcessChallanReportType[];
}) {

  const totalQuantiy = data.reduce((sum, item) => sum + (item.ISSUE_QTY_KG || 0), 0);
  const totalRollQty = data.reduce((sum, item) => sum + (item.ISSUE_QTY_ROLL || 0), 0);

  return (
    <>
      <tr className="text-[12px] font-semibold">
        <td className="border border-gray-950 p-1">{data[0]?.YARN_LOT}</td>
        <td className="border border-gray-950 p-1" style={{ width: "100px" }}>{data[0]?.YARN_BRAND}</td>
        <td className="border border-gray-950 p-1" style={{ width: "300px" }}>
          {data[0]?.YARN_NAME}
        </td>
        <td className="border border-gray-950 p-1">{data[0]?.COLORNAME}</td>
        <td className="border border-gray-950 p-1">{data[0]?.TREATMENT}</td>
        <td className="border border-gray-950 p-1">{data[0]?.FIN_DIA}</td>
        <td className="border border-gray-950 p-1">{data[0]?.GREY_SHAPE}</td>
        <td className="border border-gray-950 p-1">{data[0]?.GSM}</td>
        <td className="border border-gray-950 p-1">{data[0]?.STITCH_LENGTH}</td>
        <td className="border border-gray-950 p-1">{totalRollQty}</td>
        <td className="border border-gray-950 p-1">{totalQuantiy}</td>
        <td className="border border-gray-950 p-1">{data[0]?.DTL_REMARKS}</td>
      </tr>

    </>
  );
}

export default ReportSubgroup;
