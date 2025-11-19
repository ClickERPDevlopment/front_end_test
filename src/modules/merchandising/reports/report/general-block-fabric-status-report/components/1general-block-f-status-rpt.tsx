import { GeneralBlockFabricStatusReportType } from "../general-block-f-status-rpt-type";
import ReportRow from "./2report-row";
import ReportTotal from "./3report-total";

function GeneralBlockFabricStatusReport({
  data,
}: {
  data: GeneralBlockFabricStatusReportType[];
}) {
  return (
    <div className="p-4 px-10">
      <div className="">
        <h1 className="font-bold text-2xl text-center">
          {data[0]?.COMPANY_NAME}
        </h1>
        <h4 className="font-bold text-sm text-center">
          {data[0]?.COMPANY_ADDRESS}
        </h4>
        <div className="flex justify-center">
          <h3 className="font-bold text-lg text-center px-2 mt-2 bg-gray-200">
            GENERAL(BLOCK) FABRIC STATUS REPORT
          </h3>
        </div>
      </div>
      <div className="mt-5">
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr className="text-center font-semibold">
              <th className="border border-gray-300 p-1 text-sm">
                {" "}
                Block WO NO
              </th>
              <th className="border border-gray-300 p-1 text-sm min-w-28">
                {" "}
                PI NO
              </th>
              <th className="border border-gray-300 p-1 text-sm min-w-28">
                {" "}
                Buyer
              </th>
              <th className="border border-gray-300 p-1 text-sm min-w-28">
                {" "}
                Style
              </th>
              <th className="border border-gray-300 p-1 text-sm min-w-[300px]">
                Item Name
              </th>
              <th className="border border-gray-300 p-1 text-sm min-w-28 ">
                Material Color
              </th>
              <th className="border border-gray-300 p-1 text-sm min-w-28">
                GMT Color
              </th>
              <th className="border border-gray-300 p-1 text-sm min-w-28">
                {" "}
                WO Qty
              </th>
              <th className="border border-gray-300 p-1 text-sm min-w-28">
                Rcv Qty (A)
              </th>
              <th className="border border-gray-300 p-1 text-sm min-w-28">
                Allocated Qty (B)
              </th>
              <th className="border border-gray-300 p-1 text-sm min-w-28">
                Bal Qty (A-B)
              </th>
              <th className="border border-gray-300 p-1 text-sm"> UOM</th>
              <th className="border border-gray-300 p-1 text-sm">Fabric Dia</th>
              <th className="border border-gray-300 p-1 text-sm"> GSM</th>
              <th className="border border-gray-300 p-1 text-sm">
                Mtl Description
              </th>
              <th className="border border-gray-300 p-1 text-sm">
                {" "}
                Order ref.
              </th>
              <th className="border border-gray-300 p-1 text-sm"> Season</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <ReportRow data={d} key={index} />
            ))}
            <ReportTotal data={data} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GeneralBlockFabricStatusReport;
