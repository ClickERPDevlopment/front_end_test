import { GreyFabricProcessChallanReportType } from "@/modules/textile/reports/Dyeing/grey-fabric-process-challan-report/grey-fabric-process-challan-report-type";

function ReportSubgroup({
  data,
}: {
  data: GreyFabricProcessChallanReportType[];
}) {
  const totalQuantity = data.reduce(
    (sum, item) => sum + (item.ISSUE_QTY_KG || 0),
    0
  );
  const totalRollQty = data.reduce(
    (sum, item) => sum + (item.ISSUE_QTY_ROLL || 0),
    0
  );

  return (
    <tr className="text-[12px] font-medium hover:bg-gray-50">
      <td className="border border-gray-400 px-2 py-1">{data[0]?.YARN_LOT}</td>
      <td className="border border-gray-400 px-2 py-1 w-[120px]">
        {data[0]?.YARN_BRAND}
      </td>
      <td className="border border-gray-400 px-2 py-1 w-[280px]">
        {data[0]?.YARN_NAME}
      </td>
      <td className="border border-gray-400 px-2 py-1">{data[0]?.COLORNAME}</td>
      <td className="border border-gray-400 px-2 py-1">{data[0]?.TREATMENT}</td>
      <td className="border border-gray-400 px-2 py-1 text-center">
        {data[0]?.FIN_DIA}
      </td>
      <td className="border border-gray-400 px-2 py-1 text-center">
        {data[0]?.GREY_SHAPE}
      </td>
      <td className="border border-gray-400 px-2 py-1 text-center">
        {data[0]?.GSM}
      </td>
      <td className="border border-gray-400 px-2 py-1 text-center">
        {data[0]?.STITCH_LENGTH}
      </td>

      {/* Totals - aligned right */}
      <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
        {totalRollQty}
      </td>
      <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
        {totalQuantity.toFixed(2)}
      </td>

      <td className="border border-gray-400 px-2 py-1 italic text-gray-600">
        {data[0]?.DTL_REMARKS || "-"}
      </td>
    </tr>
  );
}

export default ReportSubgroup;
