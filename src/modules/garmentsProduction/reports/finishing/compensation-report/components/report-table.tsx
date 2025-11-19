/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { CompensationReportType } from "../compensation-report-type";

function ReportTable({
  data,
}: {
  data: CompensationReportType[];
  firstHeader: string[] | null;
}) {

  const totalAmount = data.reduce((acc, item) => acc + (item.QTY * item.RATE), 0);

  return (
    <>
      {
        data.map((item, index) => {
          return <tr style={{ fontSize: "14px" }}>
            <td className="border border-gray-950 p-0.5 text-nowrap">{moment(item?.EFFECTIVE_DATE).format("DD-MMM-YY")}</td>
            <td className="border border-gray-950 p-0.5 text-center">{data[0]?.SUPPLIER}</td>
            <td className="border border-gray-950 p-0.5">{item?.COMPENSATION_NO}</td>
            <td className="border border-gray-950 p-0.5 text-nowrap">{moment(item?.ORDERPLACEMENTMONTH).format("MMM-YY")}</td>
            <td className="border border-gray-950 p-0.5">{item?.BUYER}</td>
            <td className="border border-gray-950 p-0.5">{item?.PONO}</td>
            <td className="border border-gray-950 p-0.5">{item?.ITEMTYPE}</td>
            <td className="border border-gray-950 p-0.5 text-center">{item.QTY}</td>
            <td className="border border-gray-950 p-0.5 text-center">{item?.UOM}</td>
            <td className="border border-gray-950 p-0.5 text-center">{item?.RATE}</td>
            <td className="border border-gray-950 p-0.5 text-center">{(item.QTY * item?.RATE).toFixed(2)}</td>

            {index == 0 && <td rowSpan={data.length} className="border border-gray-950 p-0.5 text-center">{(totalAmount).toFixed(2)}</td>}
            {index == 0 && <td rowSpan={data.length} className="border border-gray-950 p-0.5 text-center">{item?.LOCAL_EARNING_AMT}</td>}
            {index == 0 && <td rowSpan={data.length} className="border border-gray-950 p-0.5 text-center">{(totalAmount - item.LOCAL_EARNING_AMT).toFixed(2)}</td>}

          </tr>
        })
      }
    </>
  );
}

export default ReportTable;
