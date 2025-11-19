import moment from "moment";
import { EmbellishmentDailySummaryProductionReportType } from "../embellishment-daily-summary-production-report-type";

function ReportSubgroup({
  data,
  searchParamsObj,
}: {
  data: EmbellishmentDailySummaryProductionReportType[];
  firstHeader: string[] | null;
  index: number;
  searchParamsObj: { fromDate: string; toDate: string; buyerId: string; isMonthlySummary: boolean; };
}) {

  const totalPrintingQty = data?.reduce(
    (acc, item) => acc + Number(item.PRINTING_PRODUCTION_QTY),
    0);

  const totalEmbroideryQty = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.EMBROIDERY_PRODUCTION_QTY)),
    0);

  const totalQty = data?.reduce(
    (acc, item) => acc + Math.floor(Number(item.PRINTING_PRODUCTION_QTY)) + Number(item.EMBROIDERY_PRODUCTION_QTY),
    0);

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border border-gray-950 p-0.5 text-center">{
          searchParamsObj?.isMonthlySummary
            ? moment(data[0]?.PRODUCTION_DATE).format("MMM-YY")
            : moment(data[0]?.PRODUCTION_DATE).format("DD-MMM-YY")
        }</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalPrintingQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalEmbroideryQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalQty}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
