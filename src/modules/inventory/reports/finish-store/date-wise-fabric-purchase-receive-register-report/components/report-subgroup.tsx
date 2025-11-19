import moment from "moment";
import { DateWiseFabricPurchaseReceiveRegisterReportType } from "../date-wise-fabric-purchase-receive-register-report-type";

function ReportSubgroup({
  data
}: {
  data: DateWiseFabricPurchaseReceiveRegisterReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const challanQty = data?.reduce(
    (acc, item) => acc + Number(item.QUANTITY),
    0);


  const rollQty = data?.reduce(
    (acc, item) => acc + Number(item.ROLL_QTY),
    0);


  const value = data?.reduce(
    (acc, item) => acc + (Number(item.QUANTITY) * Number(item.RATE)),
    0);

  return (
    <>
      <tr style={{ fontSize: "12px" }} className="">
        <td className="border border-gray-950 p-0.5">{moment(data[0]?.RCV_CHALLAN_DATE).format("DD-MMM-YY")}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BUYER}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.WORK_ORDER_NO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.SUPPLIER}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.FABRIC}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.LC_NO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.RCV_CHALLAN}</td>
        <td className="border border-gray-950 p-0.5">{challanQty.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.UOM}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.RATE}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.CURRENCYCODE}</td>
        <td className="border border-gray-950 p-0.5">{value.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{rollQty.toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
