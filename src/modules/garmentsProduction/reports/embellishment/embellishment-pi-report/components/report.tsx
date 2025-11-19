/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import ReportFooter from "./report-footer";
import moment from "moment";
import { EmbellishmentPIReportType } from "../embellishment-pi-report-type";

function Report({ data }: { data: EmbellishmentPIReportType[] }) {
  const firstHeader = [
    "SL",
    "Description",
    "Style",
    "Order",
    "Print Type",
    "Order Qty (Pcs)",
    "Unit Price/Dzn (USD)",
    "Total Amount (USD)",
  ];

  return (
    <div
      style={{ fontFamily: "Times New Roman, serif" }}
      className="h-screen px-2 py-6 text-gray-900 bg-white flex flex-col"
    >
      <div className="p-4 border border-gray-300 rounded-md bg-white flex-1 flex flex-col">
        <ReportHeader data={data} />

        <div className="flex justify-between mb-6 mt-4 text-sm" style={{ fontSize: "14px" }}>
          <table className="font-semibold border border-gray-300 rounded-md p-2 shadow-sm bg-gray-50">
            <tbody>
              <tr>
                <td className="p-1 pr-4 text-gray-700">Party</td>
                <td className="p-1 text-gray-900">: {data[0]?.PARTY || "N/A"}</td>
              </tr>
              <tr>
                <td className="p-1 pr-4 text-gray-700">Address</td>
                <td className="p-1 text-gray-900">: {data[0]?.ADDRESS || "N/A"}</td>
              </tr>
              <tr>
                <td className="p-1 pr-4 text-gray-700">PI No</td>
                <td className="p-1 text-gray-900">: {data[0]?.PI_NO || "N/A"}</td>
              </tr>
            </tbody>
          </table>

          <table className="font-semibold border border-gray-300 rounded-md p-2 shadow-sm bg-gray-50">
            <tbody>
              <tr>
                <td className="p-1 pr-4 text-gray-700">Buyer</td>
                <td className="p-1 text-gray-900">: {data[0]?.BUYER || data[0]?.OS_BUYER || "N/A"}</td>
              </tr>
              <tr>
                <td className="p-1 pr-4 text-gray-700">Party Order</td>
                <td className="p-1 text-gray-900">
                  :{" "}
                  {Array.from(
                    new Set(data.map((item) => item.EMB_WORK_ORDER_NO))
                  ).join(", ") || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="p-1 pr-4 text-gray-700">PI Date</td>
                <td className="p-1 text-gray-900">
                  :{" "}
                  {data[0]?.PI_DATE
                    ? moment(data[0].PI_DATE).format("DD-MMM-YYYY")
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-2 flex-1">
          <ReportTable data={data} firstHeader={firstHeader} />
        </div>

        {data[0]?.TERM_CONDITIONS && (
          <div className="mt-6 text-xs">
            <h3 className="font-bold underline text-gray-800 mb-2">
              Terms & Conditions:
            </h3>
            <p className="whitespace-pre-line text-gray-700 leading-5 text-sm" style={{ fontSize: "14px" }}>
              {data[0]?.TERM_CONDITIONS}
            </p>
          </div>
        )}

        <div className="mt-10 mb-5">
          <ReportFooter data={data} />
        </div>

        <div className="w-full border-t border-gray-950 p-1 mt-auto" style={{ fontSize: "14px" }}>
          <p className="text-left">
            <span className="font-bold">Head Office:</span> House 73, Road 17/A ,
            Block -E, Banani, Dhaka - 1213, Bangladesh.
            <span className="font-bold"> Tel:</span> ‪+880 2 222280840‬ , ‪+880 2
            222280826‬ , ‪+880 2 222262720‬
          </p>
          <p className="text-left">
            <span className="font-bold">Factory: </span> Vill - Naojur,
            P.O.-Kodda Bazar, P.S.-Joydebpur, Dist-Gazipur.
            <span className="font-bold"> Tel: </span>9262356-7 , 9262368-9, Fax :
            9263692, <span className="font-bold"> Mob: </span>01730084101
          </p>
        </div>
      </div>
    </div>

  );
}

export default Report;
