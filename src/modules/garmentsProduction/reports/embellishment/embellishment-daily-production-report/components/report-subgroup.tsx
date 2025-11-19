import { EmbellishmentDailyProductionReportType } from "../embellishment-daily-production-report-type";

function ReportSubgroup({
  data
}: {
  data: EmbellishmentDailyProductionReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalOrderQty = data?.reduce(
    (acc, item) => acc + Number(item.PO_QTY),
    0);

  const totalPrevProduction = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.PREVIOUS_PRODUCTION_QTY)),
    0);

  const totalDayProduction = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.DAY_PRODUCTION_QTY)),
    0);

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border border-gray-950 p-0.5">{data[0]?.SUPPLIER_CODE}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.EMBELLISHMENT_TYPE}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{data[0]?.WORK_ORDER_NO}</td>
        <td className="border border-gray-950 p-0.5">{!data[0]?.BUYER ? data[0]?.OS_BUYER : data[0]?.BUYER}</td>
        <td className="border border-gray-950 p-0.5">{!data[0]?.STYLE ? data[0]?.OS_STYLE : data[0]?.STYLE}</td>
        <td className="border border-gray-950 p-0.5">{!data[0]?.PO_NO ? data[0]?.OS_PO_NO : data[0]?.PO_NO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.COLOR}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalOrderQty}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.PARTS}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalPrevProduction}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalDayProduction}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalPrevProduction + totalDayProduction}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
