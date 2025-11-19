/* eslint-disable prefer-const */
import { GreyBatchStatusReportGreyRcvSummaryDto } from "./Interfaces";
import PoColorWiseGroupSummaryRow from "./po-color-wise-group-summary-row";
type props = {
  lstBookingSummary: GreyBatchStatusReportGreyRcvSummaryDto[];
  lstGreyRcvSummary: GreyBatchStatusReportGreyRcvSummaryDto[];
};

export default function PoColorWiseGroupSummaryTable({
  lstGreyRcvSummary,
  lstBookingSummary,
}: props) {
  function getFabrics(): string[] {
    let fabrics: string[] = [];
    lstBookingSummary.forEach((element) => {
      if (!fabrics.includes(element.FABRIC)) {
        fabrics.push(element.FABRIC);
      }
    });
    // alert(JSON.stringify(fabrics));
    return fabrics;
  }
  // console.log("ddds", getFabrics());

  return (
    <>
      <table className="w-full">
        <thead className="bg-green-300">
          <tr>
            <th colSpan={14} className="text-sm border border-black min-w-28">
              Summary
            </th>
          </tr>
          <tr>
            <th
              rowSpan={2}
              className="text-xs border border-black p-2 min-w-28"
            >
              FABRIC
            </th>
            <th colSpan={5} className="text-sm border border-black min-w-28">
              BOOKING QTY
            </th>
            <th colSpan={5} className="text-sm border border-black min-w-28">
              RECEIVE QTY
            </th>
            <th
              rowSpan={2}
              className="text-xs border border-black p-2 min-w-28"
            >
              BALANCE QTY KG
            </th>
            <th
              rowSpan={2}
              className="text-xs border border-black p-2 min-w-28"
            >
              BALANCE QTY PCS
            </th>
          </tr>
          <tr>
            <th className="text-xs border border-black p-2 min-w-28">DIA</th>
            <th className="text-xs border border-black p-2 min-w-32">
              REQ QTY
            </th>
            <th className="text-xs border border-black p-2 min-w-32">
              REQ PCS
            </th>
            <th className="text-[10px] border border-black p-2 min-w-32">
              TOTAL BOOKING QTY KG
            </th>
            <th className="text-[10px] border border-black p-2 max-w-44">
              TOTAL BOOKING QTY PCS
            </th>
            {/* ------------------------ */}

            <th className="text-xs border border-black p-2 min-w-28">DIA</th>

            <th className="text-xs border border-black p-2 min-w-32">
              RCV QTY
            </th>
            <th className="text-xs border border-black p-2 min-w-32">
              RCV PCS
            </th>
            <th className="text-xs border border-black p-2 min-w-32">
              TOTAL RCV QTY KG
            </th>
            <th className="text-xs border border-black p-2 min-w-32">
              TOTAL RCV QTY PCS
            </th>
            {/* ------------------------ */}
          </tr>
        </thead>
        <tbody>
          {getFabrics().map((x) => (
            <PoColorWiseGroupSummaryRow
              lstBookingSummary={lstBookingSummary.filter(
                (b) => b.FABRIC === x
              )}
              lstGreyRcvSummary={lstGreyRcvSummary.filter(
                (b) => b.FABRIC === x
              )}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
