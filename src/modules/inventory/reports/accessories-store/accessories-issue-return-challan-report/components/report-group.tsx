import moment from "moment";
import { IAccessoriesIssueReturnChallanReport } from "../accessories-issue-return-challan-report-type";
import ReportTable from "./report-table";
function ReportGroup({
  data,
  firstHeader,
}: {
  data: IAccessoriesIssueReturnChallanReport[];
  firstHeader: string[] | null;
}) {
  const totalRetQty = data.reduce((prev, curr) => prev + curr.RETURN_QTY, 0);

  return (
    <div className="mb-2 mt-2">
      <div className="flex justify-between">
        <div>
          <table>
            <tr>
              <td className="font-bold">Ret Challan No:</td>
              <td>{data[0]?.CHALLAN_NO}</td>
            </tr>
            <tr>
              <td className="font-bold">Buyer:</td>
              <td>{data[0]?.BUYER_NAME}</td>
            </tr>
            <tr>
              <td className="font-bold">Style:</td>
              <td>{data[0]?.STYLENO}</td>
            </tr>
            <tr>
              <td className="font-bold">PO:</td>
              <td>{data[0]?.PONO}</td>
            </tr>
          </table>
        </div>
        <div>
          <table>
            <tr>
              <td className="font-bold">Retrun Date:</td>
              <td>{moment(data[0]?.CHALLAN_DATE).format("DD-MMM-YY")}</td>
            </tr>
            <tr>
              <td className="font-bold">Store:</td>
              <td>{data[0]?.STORE_NAME}</td>
            </tr>
          </table>
        </div>
      </div>

      <table className="border-collapse border text-sm border-gray-300  w-[100%] mt-2">
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
            <td className="border border-gray-300" colSpan={2}>
              Total
            </td>
            <td className="border border-gray-300">{totalRetQty}</td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300"></td>
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
