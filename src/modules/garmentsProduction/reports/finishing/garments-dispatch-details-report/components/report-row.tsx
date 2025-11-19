import moment from "moment";
import { IGarmentsDispatchDetailsReportDto } from "../garments-dispatch-details-report-type";
function ReportRow({ data }: { data: IGarmentsDispatchDetailsReportDto[] }) {
  const totalRejectQty = data.reduce((acc, item) => acc + item.REJECTQTY, 0);

  return (
    <>
      {data.map((item, index) => (
        <tr key={index}>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {moment(item.REJECTDATE).format("DD-MMM-YY")}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.REPORT_NO}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.BUYERNAME}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.STYLENO}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.ITEMTYPE}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.PONO}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.COLORNAME}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.SIZENAME}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.REJECTQTY}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.REJECTNAME}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.SEND_TO}
          </td>
          <td className="border border-gray-300 p-1 text-sm text-center">
            {item.REMARKS}
          </td>
        </tr>
      ))}
      <tr className="font-bold">
        <td className="border border-gray-300 p-1 text-sm text-center">
          Total
        </td>
        <td className="border border-gray-300 p-1 text-sm text-center"></td>
        <td className="border border-gray-300 p-1 text-sm text-center"></td>
        <td className="border border-gray-300 p-1 text-sm text-center"></td>
        <td className="border border-gray-300 p-1 text-sm text-center"></td>
        <td className="border border-gray-300 p-1 text-sm text-center"></td>
        <td className="border border-gray-300 p-1 text-sm text-center"></td>
        <td className="border border-gray-300 p-1 text-sm text-center"></td>
        <td className="border border-gray-300 p-1 text-sm text-center">
          {totalRejectQty}
        </td>
        <td className="border border-gray-300 p-1 text-sm text-center"></td>
        <td className="border border-gray-300 p-1 text-sm text-center"></td>
        <td className="border border-gray-300 p-1 text-sm text-center"></td>
      </tr>
    </>
  );
}

export default ReportRow;
