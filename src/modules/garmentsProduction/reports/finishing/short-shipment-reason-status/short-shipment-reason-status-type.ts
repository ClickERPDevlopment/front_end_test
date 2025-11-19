export interface IShortShipmentReasonStatus {
  BUYER_ID: number;
  BUYER_NAME: string;
  STYLE_ID: number;
  STYLE_NO: string;
  PO_ID: number;
  PO_NO: string;
  ORDER_QTY: number;
  CUTTING_QTY: number;
  SEWING_QTY: number;
  SHIPMENT_QTY: number;
  SHIP_DATE: Date;
  REASON: string;
  AFFECTED_QTY: number;
  DETAILS: string;
}
