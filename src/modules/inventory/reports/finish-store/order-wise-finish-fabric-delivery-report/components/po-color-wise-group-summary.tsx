/* eslint-disable prefer-const */
import PoColorWiseGroupSummaryRow from "./po-color-wise-group-summary-row";
import {
  OrderWiseFFDeliveryAllocationDto,
  OrderWiseFFDeliveryBookingDto,
} from "../order-wise-ff-delivery-type";
type props = {
  lstBookingSummary: OrderWiseFFDeliveryBookingDto[];
  lstAllocation: OrderWiseFFDeliveryAllocationDto[];
};

export default function PoColorWiseGroupSummary({
  lstAllocation,
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
      <div className="flex gap-5 my-1">
        <div>
          <span className="text-sm">
            <strong>ORDER NO: </strong>{" "}
          </span>
          <span className="text-sm">{lstAllocation[0]?.PONO}</span>
        </div>

        <div>
          <span className="text-sm">
            <strong>COLOR: </strong>{" "}
          </span>
          <span className="text-sm">{lstAllocation[0]?.COLORNAME}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div>
          <table className="w-full">
            <thead className="bg-green-300">
              <tr>
                <th
                  colSpan={14}
                  className="text-sm border border-black min-w-28"
                >
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
                <th
                  colSpan={5}
                  className="text-sm border border-black min-w-28"
                >
                  BOOKING FIN. QTY
                </th>
                <th
                  colSpan={5}
                  className="text-sm border border-black min-w-28"
                >
                  DELIVERY QTY
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
                <th className="text-xs border border-black p-2 min-w-28">
                  DIA
                </th>
                <th className="text-xs border border-black p-2 min-w-32">
                  BOOKING FIN. QTY
                </th>
                <th className="text-xs border border-black p-2 min-w-32">
                  BOOKING PCS
                </th>
                <th className="text-[10px] border border-black p-2 w-32">
                  TOTAL BOOKING QTY KG
                </th>
                <th className="text-[10px] border border-black p-2 w-32">
                  TOTAL BOOKING QTY PCS
                </th>
                {/* ------------------------ */}

                <th className="text-xs border border-black p-2 min-w-28">
                  DIA
                </th>

                <th className="text-xs border border-black p-2 min-w-32">
                  DELIVERY QTY
                </th>
                <th className="text-xs border border-black p-2 min-w-32">
                  DELIVERY PCS
                </th>
                <th className="text-[10px] border border-black p-2 w-32">
                  TOTAL DELIVERY QTY KG
                </th>
                <th className="text-[10px] border border-black p-2 w-32">
                  TOTAL DELIVERY QTY PCS
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
                  lstGreyRcvSummary={lstAllocation.filter(
                    (b) => b.FABRIC === x
                  )}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
