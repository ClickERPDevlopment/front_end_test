import FabricPartWiseGroup from "./fabric-part-wise-group";
import {
  OrderWiseFFDeliveryAllocationDto,
  OrderWiseFFDeliveryBookingDto,
} from "../order-wise-ff-delivery-type";

export interface props {
  lstAllocation: OrderWiseFFDeliveryAllocationDto[];
  lstBooking: OrderWiseFFDeliveryBookingDto[];
}

export default function StyleWiseGroup({ lstAllocation, lstBooking }: props) {
  const colorIds: number[] = [];

  lstAllocation?.forEach((e) => {
    if (!colorIds.includes(e.COLOR_ID)) {
      colorIds.push(e.COLOR_ID);
    }
  });

  return (
    <>
      <FabricPartWiseGroup
        lstAllocation={lstAllocation}
        lstBooking={lstBooking}
      />
    </>
  );
}
