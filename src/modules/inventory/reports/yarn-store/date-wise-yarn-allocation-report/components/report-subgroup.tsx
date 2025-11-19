import moment from "moment";
import { DateWiseYarnAllocationReportType } from "../date-wise-yarn-allocation-report-type";

function ReportSubgroup({
  data, index
}: {
  data: DateWiseYarnAllocationReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalAllocatedQty = data.reduce((acc, item) => acc + item.ALLOCATED_QTY, 0)
  const totalIssueQty = data.reduce((acc, item) => acc + item.ISSUE_QTY, 0)

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border border-gray-950 p-0.5">{index + 1}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{moment(data[0]?.CREATED_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.REF_NO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_LOT_NUMBER}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN}</td>
        <td className="border border-gray-950 p-0.5">{totalAllocatedQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalIssueQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BUYER_NAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.PONO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.STYLENO}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
