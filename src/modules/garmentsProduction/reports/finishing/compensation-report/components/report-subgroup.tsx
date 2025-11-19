import moment from "moment";
import { CompensationReportType } from "../compensation-report-type";

function ReportSubgroup({
  data
}: {
  data: CompensationReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalQty = data.reduce((acc, item) => acc + item.QTY, 0)

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border border-gray-950 p-0.5 text-nowrap">{moment(data[0]?.EFFECTIVE_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.COMPENSATION_NO}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{moment(data[0]?.ORDERPLACEMENTMONTH).format("MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BUYER}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.PONO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.ITEMTYPE}</td>
        <td className="border border-gray-950 p-0.5 text-end">{totalQty}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.UOM}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.RATE}</td>
        <td className="border border-gray-950 p-0.5 text-end">{(totalQty * data[0]?.RATE).toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-end">{data[0]?.LOCAL_EARNING_AMT}</td>
        <td className="border border-gray-950 p-0.5 text-end">{((totalQty * data[0]?.RATE) - data[0]?.LOCAL_EARNING_AMT).toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5 text-center">{data[0]?.SUPPLIER}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
