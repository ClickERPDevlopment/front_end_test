export type OrderWiseFFDeliveryAllocationDto = {
  BUYER_ID: number;
  BUYER: string;
  PO_ID: number;
  PONO: string;
  STYLE_ID: number;
  STYLENO: string;
  STYLENAME: string;
  CHALLAN_DATE: string;
  CHALLAN_NO: string;
  DYEING_BATCH_NO: string;
  COLOR_ID: number;
  COLORNAME: string;
  FIN_REQ_SHAPE: string;
  ALLOCATED_QTY_KG: number;
  ALLOCATED_QTY_PCS: number;
  FAB_TYPE: string;
  FABRIC_PART_ID: number;
  FABRIC_PART: string;
  FABRIC_ID: number;
  FABRIC: string;
};

export type OrderWiseFFDeliveryBookingDto = {
  PO_ID: number;
  STYLE_ID: number;
  COLOR_ID: number;
  FINISH_DIA: string;
  REQUIRED_QTY: number;
  REQUIRED_QTY_PCS: number;
  FABRIC_PART_ID: number;
  FABRIC_PART: string;
  FABRIC_ID: number;
  FABRIC: string;
};
