import {
  OrderWiseFFDeliveryAllocationDto,
  OrderWiseFFDeliveryBookingDto,
} from "../order-wise-ff-delivery-type";
export interface props {
  lstAllocation: OrderWiseFFDeliveryAllocationDto[];
  lstBooking: OrderWiseFFDeliveryBookingDto[];
}

export default function ColorWiseTotalRow({
  lstAllocation,
  lstBooking,
}: props) {
  function getAllocationToal(): number {
    let qty = 0;
    lstAllocation.forEach((x) => (qty += x.ALLOCATED_QTY_KG));
    return qty;
  }
  function getBoolingToal(): number {
    let qty = 0;
    lstBooking.forEach((x) => (qty += x.REQUIRED_QTY));
    return qty;
  }
  return (
    <>
      <tr className="bg-slate-200">
        <td
          colSpan={9}
          className="border border-black text-xs p-1 font-bold text-left"
        >
          Sub-total: {lstAllocation[0]?.COLORNAME}
        </td>

        <td className="border border-black text-xs text-center p-1">
          {getAllocationToal().toFixed(2)}
        </td>
        <td className="border border-black text-xs text-center p-1"></td>
        <td className="border border-black text-xs text-center p-1">
          {getBoolingToal().toFixed(2)}
        </td>
      </tr>
    </>
  );
}
