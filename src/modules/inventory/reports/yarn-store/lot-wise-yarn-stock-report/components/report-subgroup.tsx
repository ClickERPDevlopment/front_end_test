import moment from "moment";
import { LotWiseYarnStockReportType } from "../lot-wise-yarn-stock-report-type";

function ReportSubgroup({
  data, index
}: {
  data: LotWiseYarnStockReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalStock = data.reduce((acc, item) => acc + item.BALANCE_QUANTITY, 0)
  const totalAmount = data.reduce((acc, item) => acc + item.WO_UNIT_PRICE * item.BALANCE_QUANTITY, 0)

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border border-gray-950 p-0.5">{index + 1}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.LC_NUMBER || data[0]?.WORK_ORDER_NUMBER}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{moment(data[0]?.BBLC_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{moment(data[0]?.FIRST_RCV_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{moment(data[0]?.LAST_RCV_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5">
          {moment().diff(moment(data[0]?.LAST_RCV_DATE), "days")}
        </td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_TYPE}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BRAND_NAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_LOT_NUMBER}</td>
        <td className="border border-gray-950 p-0.5">{totalStock.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.WO_UNIT_PRICE}</td>
        <td className="border border-gray-950 p-0.5">{totalAmount.toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
