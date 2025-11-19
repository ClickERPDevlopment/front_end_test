/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmblishmentStatusReport } from "../emblishment-status-report-type";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";

function Report({
  data,
  searchParams,
}: {
  data: IEmblishmentStatusReport[];
  searchParams: { isDate: boolean | undefined; toDate: any; fromDate: any };
}) {
  //set table header
  const firstHeader = [
    "WO TYPE",
    "BUYER",
    "STYLE",
    "PO",
    "ORDER QTY",
    "WO QTY",
    "SEND QTY",
    "RCV QTY",
    "RCV BAL",
    "WO NO",
    "FACTORY NAME",
  ];

  return (
    <div className="px-10 text-sm">
      <div className="p-2">
        <ReportHeader
          data={data[0]}
          searchParams={{
            isDate: searchParams?.isDate,
            toDate: searchParams?.toDate,
            fromDate: searchParams?.fromDate,
          }}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr className="bg-lime-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className="text-center">
                <td className="border border-gray-300 p-1">
                  {item.SECTION_NAME}
                </td>
                <td className="border border-gray-300 p-1">
                  {item.BUYER_NAME}
                </td>
                <td className="border border-gray-300 p-1">{item.STYLENO}</td>
                <td className="border border-gray-300 p-1">{item.PONO}</td>
                <td className="border border-gray-300 p-1">{item.PO_QTY}</td>
                <td className="border border-gray-300 p-1">
                  {item.WORKORDERQTY}
                </td>
                <td className="border border-gray-300 p-1">{item.SENDQTY}</td>
                <td className="border border-gray-300 p-1">
                  {item.RECEIVEQTY}
                </td>
                <td className="border border-gray-300 p-1">
                  {item.RECEIVEQTY - item.SENDQTY}
                </td>
                <td className="border border-gray-300 p-1">{item.WO_NO}</td>
                <td className="border border-gray-300 p-1">
                  {item.SUPPLIER_NAME}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
