export interface GreyBatchStatusReportGreyRcvDtlsDto {
  INTER_COMPANY_ID: number;
  COMPANY_NAME: string;
  COMPANY_ADDRESS: string;
  RCV_DATE: string;
  RCV_CHALLAN_ID: number;
  RCV_CHALLAN_NO: string;
  BUYER_ID: number;
  BUYER: string;
  PO_ID: number;
  PONO: string;
  FABRIC_ID: number;
  FABRIC: string;
  GSM: string;
  GMT_COLOR_ID: number;
  GMT_COLOR: string;
  FIN_DIA: string;
  FIN_REQ_SHAPE: string;
  QUANTITY: number;
  YARN_COUNT: string;
  YARN_BRAND: string;
  YARN_LOT: string;
  PO_COLOR_REQ_QTY: number;
  PO_COLOR_REQ_QTY_PCS: number;
  SEASON: string;
}

export interface GreyBatchStatusReportBatchDetailsDto {
  BATCH_DATE: string;
  BATCH_NO: string;
  PO_ID: number;
  GMT_COLOR_ID: number;
  GMT_COLOR: string;
  QUANTITY: number;
  FABRIC: string;
  FIN_DIA: string;
  FIN_REQ_SHAPE: string;
}

export type GreyBatchStatusReportGreyRcvSummaryDto = {
  PO_ID: string;
  PONO: string;
  STYLE_ID: string;
  STYLENO: string;
  COLOR_ID: string;
  COLORNAME: string;
  FABRIC_ID: string;
  FABRIC: string;
  FINISH_DIA: string;
  REQUIRED_QTY: number;
  REQUIRED_QTY_PCS: number;
  RCV_QTY: number;
  RCV_QTY_PCS: number;
  BALANCE_QTY: number;
  BALANCE_QTY_PCS: number;
};
