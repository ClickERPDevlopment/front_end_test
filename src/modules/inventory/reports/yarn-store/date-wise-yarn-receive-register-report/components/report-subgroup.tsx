import moment from "moment";
import { DateWiseYarnReceiveRegisterReportType } from "../date-wise-yarn-receive-register-report-type";

function ReportSubgroup({
  data
}: {
  data: DateWiseYarnReceiveRegisterReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalDelQty = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY),
    0);

  const totalValue = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY * item.LC_UNIT_PRICE),
    0);


  return (
    <>
      <tr style={{ fontSize: "12px" }} className="font-light">
        <td className="border border-gray-950 p-0.5 text-nowrap">{moment(data[0]?.YARN_RECEIVED_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.SUPPLIER}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.RCVD_CHALLAN_NO}</td>
        <td className="border border-gray-950 p-0.5 text-wrap max-w-[250px]">{data[0]?.YARN_NAME}</td>
        <td className="border border-gray-950 p-0.5">{totalDelQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.LC_UNIT_PRICE}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.CURRENCYCODE}</td>
        <td className="border border-gray-950 p-0.5">{totalValue.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BBLC_NO || data[0]?.WO_NO}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">
          {data[0]?.BBLC_DATE
            ? moment(data[0].BBLC_DATE).format("DD-MMM-YY")
            : data[0]?.WO_DATE
              ? moment(data[0].WO_DATE).format("DD-MMM-YY")
              : ""}
        </td>

      </tr>
    </>
  );
}

export default ReportSubgroup;
