import ColorWiseGroup from "./components/color-wise-group";
import POColorSummary from "./components/po-color-summary";
import {
  OrderWiseFFDeliveryAllocationDto,
  OrderWiseFFDeliveryBookingDto,
} from "./order-wise-ff-delivery-type";

export interface props {
  lstAllocation: OrderWiseFFDeliveryAllocationDto[];
  lstAllocationSummary: OrderWiseFFDeliveryAllocationDto[];
  lstBooking: OrderWiseFFDeliveryBookingDto[];
  lstBookingSummary: OrderWiseFFDeliveryBookingDto[];
}

export default function Report({
  lstAllocation,
  lstAllocationSummary,
  lstBooking,
  lstBookingSummary,
}: props) {
  const colorIds: number[] = [];

  lstAllocation?.forEach((element) => {
    if (!colorIds.includes(element.COLOR_ID)) {
      colorIds.push(element.COLOR_ID);
    }
  });

  return (
    <>
      <div className="m-3 inline-block print:overflow-visible">
        {/* heading */}
        <div className="">
          <div className="text-center text-slate-700 my-1 font-bold">
            <span className="bg-slate-200 px-10 py-1 text-lg">
              Order Wise Finish Fabric Delivery Report
            </span>
          </div>
        </div>
        {/* end heading */}

        {/* summary */}
        <POColorSummary
          lstAllocation={lstAllocationSummary}
          lstBooking={lstBookingSummary}
        />
        {/* end summary */}

        {/* table */}
        <div className="min-w-[100%] mt-8">
          <div className="flex flex-col justify-center">
            <table className="w-full">
              <thead className="bg-blue-300">
                <tr>
                  <th className="text-xs border border-black p-2 min-w-28">
                    Buyer
                  </th>
                  <th className="text-xs border border-black p-2 min-w-28">
                    Style
                  </th>
                  <th className="text-xs border border-black p-2 min-w-28">
                    PO
                  </th>
                  <th className="text-xs border border-black p-2 min-w-28">
                    Delivery Date
                  </th>
                  <th className="text-xs border border-black p-2 min-w-28">
                    Challan No{" "}
                  </th>
                  <th className="text-xs border border-black p-2 min-w-32">
                    Batch No
                  </th>
                  <th className="text-xs border border-black p-2 min-w-48">
                    GMT Color
                  </th>
                  <th className="text-xs border border-black p-2 w-48">
                    Fabric Part
                  </th>
                  <th className="text-xs border border-black p-2 w-24">
                    Booking Finish Dia
                  </th>
                  <th className="text-xs border border-black p-2 w-24">
                    Booking Fabric Qty
                  </th>
                  <th className="text-xs border border-black p-2 min-w-24">
                    Finish Dia
                  </th>
                  <th className="text-xs border border-black p-2 min-w-24">
                    Delivery Qty
                  </th>
                </tr>
              </thead>
              <tbody>
                {colorIds.map((id) => (
                  <ColorWiseGroup
                    lstAllocation={lstAllocation.filter(
                      (d) => d.COLOR_ID === id
                    )}
                    lstBooking={lstBooking.filter((d) => d.COLOR_ID === id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* end table */}
      </div>
    </>
  );
}
