import { IAccessoriesReceiveStatusByChallanNoReport } from "../accessories-receive-status-by-challan-no-report-type";
import ReportTable from "./report-table";
function ReportGroup({
  data,
  firstHeader,
}: {
  data: IAccessoriesReceiveStatusByChallanNoReport[];
  firstHeader: string[] | null;
}) {
  const totalRcvQty = data.reduce((prev, curr) => prev + curr.RECEIVE_QTY, 0);

  return (
    <div className="mb-2 mt-2">
      <table className="border-collapse border text-sm border-gray-300  w-[100%]">
        <thead className="bg-lime-200 sticky top-0 z-50 print:static">
          <tr className="bg-lime-200 text-center">
            {firstHeader?.map((item) => (
              <th className="border border-gray-300">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <ReportTable data={data} />
          <tr className="text-center font-bold">
            <td className="border border-gray-300" colSpan={11}>
              Total
            </td>
            <td className="border border-gray-300">{totalRcvQty}</td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportGroup;
