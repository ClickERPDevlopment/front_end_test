export interface outsideYIssueGRcvStatus_YarnIssue {
  COMPANY_ID: number;
  COMPANY_NAME: string;
  COMPANY_ADDRESS: string;
  YARN_CHALLAN_ID: number;
  CHALLAN_DATE: Date;
  CHALLAN_NO: string;
  BUYER_ID: number;
  BUYER: string;
  PO_ID: number;
  PO: string;
  KNITTING_HOUSE_ID: number;
  KNITTING_HOUSE: string;
  KNITTING_HOUSE_ADDRESS: string;
  YARN_ID: number;
  YARN: string;
  YARN_BRAND_ID: number;
  YARN_BRAND: string;
  YARN_LOT_NO_ID: number;
  YARN_LOT_NO: string;
  QUANTITY: number;
  RETURN_QUANTITY: number;
  YARN_RETURN_CHALLAN_NO: string;
}

export interface outsideYIssueGRcvStatus_GreyRcv {
  YARN_CHALLAN_ID: number;
  RCV_CHALLAN: string;
  RCV_CHALLAN_DATE: Date;
  GREY_WEIGHT: number;

  RCV_CHALLAN_DATE_date: string;
  RCV_CHALLAN_DATE_month: string;
  RCV_CHALLAN_DATE_year: string;
}

export interface outsideYIssueGRcvStatus_LoseyarnRcv {
  YARN_CHALLAN_ID: number;
  QUANTITY: number;
}
