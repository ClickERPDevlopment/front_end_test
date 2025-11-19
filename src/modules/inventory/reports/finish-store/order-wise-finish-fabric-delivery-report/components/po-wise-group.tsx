import StyleWiseGroup from "./style-wise-group";
import {
  OrderWiseFFDeliveryAllocationDto,
  OrderWiseFFDeliveryBookingDto,
} from "../order-wise-ff-delivery-type";

export interface props {
  lstAllocation: OrderWiseFFDeliveryAllocationDto[];
  lstBooking: OrderWiseFFDeliveryBookingDto[];
}

export default function POWiseGroup({ lstAllocation, lstBooking }: props) {
  const styleIds: number[] = [];

  lstAllocation?.forEach((e) => {
    if (!styleIds.includes(e.STYLE_ID)) {
      styleIds.push(e.STYLE_ID);
    }
  });

  return (
    <>
      {styleIds.map((id) => (
        <StyleWiseGroup
          lstAllocation={lstAllocation.filter((d) => d.STYLE_ID === id)}
          lstBooking={lstBooking.filter((d) => d.STYLE_ID === id)}
        />
      ))}
    </>
  );
}
