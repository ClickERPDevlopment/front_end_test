export interface IBatchWiseApprovalStatus {
  BATCH_ID: number;
  BATCH_NO: string;
  BATCH_QTY: number;
  FABRIC_NAME: string;
  FABRIC_ID: number;
  BUYER_NAME: string;
  STYLE_NO: string;
  PO_NO: string;
  COLOR_NAME: string;
  GARMENTS_PARTS: string;
  DIA: string;
  GSM: number;
  DYEING_DATE?: Date;
  SUBMISSION_DATE: string;
  APPROVAL_DATE: string;
  BATCH_FINISH_DATE?: Date;
  QI_DATE?: Date;
  QUALITY_RESULT: string;
  QUALITY_CLEARANCE: string;
  RFD_DATE: string;
  SPECIAL_INFO: string;
  REMARKS: string;
  YARN_DETAILS: string;
}
