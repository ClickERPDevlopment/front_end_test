import POWiseGroup from "./po-wise-group";
import ColorWiseTotalRow from "./color-wise-total";
import {
  OrderWiseFFDeliveryAllocationDto,
  OrderWiseFFDeliveryBookingDto,
} from "../order-wise-ff-delivery-type";

export interface props {
  lstAllocation: OrderWiseFFDeliveryAllocationDto[];
  lstBooking: OrderWiseFFDeliveryBookingDto[];
}

export default function ColorWiseGroup({ lstAllocation, lstBooking }: props) {
  const poIds: number[] = [];

  lstAllocation?.forEach((e) => {
    if (!poIds.includes(e.PO_ID)) {
      poIds.push(e.PO_ID);
    }
  });

  return (
    <>
      {poIds.map((id) => (
        <POWiseGroup
          lstAllocation={lstAllocation.filter((d) => d.PO_ID === id)}
          lstBooking={lstBooking.filter((d) => d.PO_ID === id)}
        />
      ))}

      <ColorWiseTotalRow
        lstAllocation={lstAllocation}
        lstBooking={lstBooking}
      />
    </>
  );
}
