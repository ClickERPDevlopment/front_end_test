import moment from "moment";
import {
  OrderWiseFFDeliveryAllocationDto,
  OrderWiseFFDeliveryBookingDto,
} from "../order-wise-ff-delivery-type";

export interface props {
  lstAllocation: OrderWiseFFDeliveryAllocationDto[];
  lstBooking: OrderWiseFFDeliveryBookingDto[];
}

function getRowSpan(
  allocation: OrderWiseFFDeliveryAllocationDto[],
  booking: OrderWiseFFDeliveryBookingDto[]
) {
  return allocation.length > booking.length
    ? allocation.length
    : booking.length;
}

export default function ColorPoStyleWiseRow({
  lstAllocation,
  lstBooking,
}: props) {
  // function getTotalBookingQty(): number {
  //   let qty: number = 0;
  //   lstBooking.forEach((element) => {
  //     qty += element.REQUIRED_QTY;
  //   });
  //   return Number(qty.toFixed(2));
  // }

  // function getTotalBookingQtyPcs(): number {
  //   let qty: number = 0;
  //   lstBooking.forEach((element) => {
  //     qty += element.REQUIRED_QTY_PCS;
  //   });
  //   return Number(qty.toFixed(2));
  // }

  // function getTotalReceiveQty(): number {
  //   let qty: number = 0;
  //   lstAllocation.forEach((element) => {
  //     qty += element.RCV_QTY;
  //   });
  //   return Number(qty.toFixed(2));
  // }

  // function getTotalReceiveQtyPcs(): number {
  //   let qty: number = 0;
  //   lstAllocation.forEach((element) => {
  //     qty += element.RCV_QTY_PCS;
  //   });
  //   return Number(qty.toFixed(2));
  // }
  // alert(JSON.stringify(lstAllocation));
  return (
    <>
      {/*  first row */}
      <tr>
        <td
          rowSpan={getRowSpan(lstAllocation, lstBooking)}
          className="border border-black text-xs text-center p-1"
        >
          {lstAllocation[0]?.BUYER}
        </td>
        <td
          rowSpan={getRowSpan(lstAllocation, lstBooking)}
          className="border border-black text-xs text-center p-1"
        >
          {lstAllocation[0]?.STYLENO}
        </td>
        <td
          rowSpan={getRowSpan(lstAllocation, lstBooking)}
          className="border border-black text-xs text-center p-1"
        >
          {lstAllocation[0]?.PONO}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {moment(lstAllocation[0]?.CHALLAN_DATE).format("DD-MMM-YYYY")}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstAllocation[0]?.CHALLAN_NO}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstAllocation[0]?.DYEING_BATCH_NO}
        </td>

        <td className="border border-black text-xs text-center p-1">
          {lstAllocation[0]?.COLORNAME}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstAllocation[0]?.FABRIC_PART}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstBooking[0]?.FINISH_DIA}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstBooking[0]?.REQUIRED_QTY}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstAllocation[0]?.FIN_REQ_SHAPE}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstAllocation[0]?.ALLOCATED_QTY_KG}
        </td>
      </tr>
      {/* end first row */}

      {/* other rows with in lstGreyRcvSummary total rows */}
      {lstAllocation
        ?.filter((_d, i) => i !== 0)
        .map((booking, index) => (
          <tr>
            <td className="border border-black text-xs text-center p-1">
              {moment(booking?.CHALLAN_DATE).format("DD-MMM-YYYY")}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {booking?.CHALLAN_NO}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {booking?.DYEING_BATCH_NO}
            </td>

            <td className="border border-black text-xs text-center p-1">
              {booking?.COLORNAME}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {booking?.FABRIC_PART}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {lstBooking[index + 1]?.FINISH_DIA}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {lstBooking[index + 1]?.REQUIRED_QTY}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {booking?.FIN_REQ_SHAPE}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {booking?.ALLOCATED_QTY_KG}
            </td>
          </tr>
        ))}
      {/* endother rows with in lstGreyRcvSummary total rows */}

      {lstBooking
        ?.filter((_d, i) => i >= lstAllocation.length)
        .map((booking) => (
          <tr>
            <td className="border border-black text-xs text-center p-1"></td>
            <td className="border border-black text-xs text-center p-1"></td>
            <td className="border border-black text-xs text-center p-1"></td>

            <td className="border border-black text-xs text-center p-1">
              {lstAllocation[0]?.COLORNAME}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {lstAllocation[0]?.FABRIC_PART}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {booking?.FINISH_DIA}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {booking?.REQUIRED_QTY}
            </td>
            <td className="border border-black text-xs text-center p-1"></td>
            <td className="border border-black text-xs text-center p-1"></td>
          </tr>
        ))}
    </>
  );
}
