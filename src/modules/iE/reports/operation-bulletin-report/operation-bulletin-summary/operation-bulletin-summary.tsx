/* eslint-disable @typescript-eslint/no-explicit-any */
import { OperationBulletinSummaryReportType } from "../operation-bulletin-summary-report-type";

function OperationBulletinSummary({
  data,
}: {
  data: OperationBulletinSummaryReportType[];
}) {

  //set table header
  const firstHeader = [
    "Section",
    "SMV(M)",
    "SMV(H)",
    "SMV(I)",
    "Total SMV",
    "Op",
    "Helper",
    "Ironer",
    "Allt MP",
    "WS/STN",
  ];

  const totalSMVM = data.reduce((acc, item) => acc + item.SMVM, 0);
  const totalSMVH = data.reduce((acc, item) => acc + item.SMVH, 0);
  const totalSMVI = data.reduce((acc, item) => acc + item.SMVI, 0);
  const totalSMV = totalSMVM + totalSMVH + totalSMVI;
  const totalOP = data.reduce((acc, item) => acc + item.OP, 0);
  const totalHLP = data.reduce((acc, item) => acc + item.HLP, 0);
  const totalIR = data.reduce((acc, item) => acc + item.IR, 0);
  const totalAlltMP = totalOP + totalHLP + totalIR;
  const totalPLANWS = data.reduce((acc, item) => acc + Number(item.PLANWS), 0);

  return (
    <div className="flex justify-between gap-2 w-100%">
      <div className="w-[80%]">
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-950 p-0.5">{ }</td>
                  <td className="border border-gray-950 p-0.5">{item.SMVM}</td>
                  <td className="border border-gray-950 p-0.5">{item.SMVH}</td>
                  <td className="border border-gray-950 p-0.5">{item.SMVI}</td>
                  <td className="border border-gray-950 p-0.5">{item.SMVM + item.SMVH + item.SMVI}</td>
                  <td className="border border-gray-950 p-0.5">{item.OP}</td>
                  <td className="border border-gray-950 p-0.5">{item.HLP}</td>
                  <td className="border border-gray-950 p-0.5">{item.IR}</td>
                  <td className="border border-gray-950 p-0.5">{item.OP + item.HLP + item.IR}</td>
                  <td className="border border-gray-950 p-0.5">{item.PLANWS}</td>
                </tr>
              ))
            }
            <tr className="text-center font-bold">
              <td className="border border-gray-950 p-0.5">Total</td>
              <td className="border border-gray-950 p-0.5">{totalSMVM}</td>
              <td className="border border-gray-950 p-0.5">{totalSMVH}</td>
              <td className="border border-gray-950 p-0.5">{totalSMVI}</td>
              <td className="border border-gray-950 p-0.5">{totalSMV}</td>
              <td className="border border-gray-950 p-0.5">{totalOP}</td>
              <td className="border border-gray-950 p-0.5">{totalHLP}</td>
              <td className="border border-gray-950 p-0.5">{totalIR}</td>
              <td className="border border-gray-950 p-0.5">{totalAlltMP}</td>
              <td className="border border-gray-950 p-0.5">{totalPLANWS}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-[20%]">
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              <th className="border border-gray-950 p-0.5">Category</th>
              <th className="border border-gray-950 p-0.5">Required MP</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border border-gray-950 p-0.5">Total Req. MP</td>
              <td className="border border-gray-950 p-0.5">{totalAlltMP}</td>
            </tr>
            <tr className="text-center">
              <td className="border border-gray-950 p-0.5">Total Allo. MP </td>
              <td className="border border-gray-950 p-0.5">{totalHLP}</td>
            </tr>
            <tr className="text-center">
              <td className="border border-gray-950 p-0.5">Ironman</td>
              <td className="border border-gray-950 p-0.5">{totalIR}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OperationBulletinSummary;
