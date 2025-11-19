import moment from "moment";
import { LotWiseYarnStockReportType } from "../yarn-stock-after-allocation-report-type";

function ReportSubgroup({
  data, index
}: {
  data: LotWiseYarnStockReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalYarnRcvQty = data.reduce((acc, item) => acc + item.YARN_RECEIVED_QNT, 0)
  const totalYarnAllocationQty = data.reduce((acc, item) => acc + item.YARN_ALLOCATION_QNT, 0)
  const totalYarnIssueQty = data.reduce((acc, item) => acc + item.YARN_ISSUE_QNT, 0)
  const totalStock = data.reduce((acc, item) => acc + item.BALANCE_QUANTITY, 0)
  const totalYarnAdj = data.reduce((acc, item) => acc + item.YARN_ADJUSTMENT_QTY, 0)
  const totalAllocationStock = data.reduce((acc, item) => acc + item.AFTER_ALLO_STOCK, 0)

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border border-gray-950 p-0.5">{index + 1}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.LC_NUMBER || data[0]?.WORK_ORDER_NUMBER}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{moment(data[0]?.BBLC_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{moment(data[0]?.FIRST_RCV_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{moment(data[0]?.LAST_RCV_DATE).format("DD-MMM-YY")}</td>

        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_TYPE}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BRAND_NAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_LOT_NUMBER}</td>
        <td className="border border-gray-950 p-0.5">{totalYarnRcvQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalYarnAllocationQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalAllocationStock.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalYarnIssueQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalStock.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalYarnAdj.toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
