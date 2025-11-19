export interface ICreateDateWisePoSummaryReport {
  BUYER_NAME: string;
  STYLE_NO: string;
  STYLE_ID: number;
  PO_NO: string;
  ITEM_TYPE: string;
  ORDERPLACEMENTMONTH: Date;
  CM: number;
  FOB: number;
  QTY: number;
  CREATEBY: string;
  CREATEDATE: Date;
  COMPANY_PREFIX: string;
  COMPANY_NAME: string;
  COMPANY_ADDRESS: string;
  SHIP_DATE: Date;
  BOOKING_RELEASE_DATE: Date;
  JOB_NUMBER: string;
  TOTAL_BOOKING_QTY: number;
}
