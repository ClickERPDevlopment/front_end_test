export interface IYarnTransfer {
  ID: number;
  COMPANY_ID: number;
  CHALLAN_NO: string;
  CHALLAN_SERIAL: number;
  CHALLAN_DATE: Date;
  PARTY_ID: number;
  PARTY_INTERCOMPANY_ID: number;
  CREATED_BY: string;
  CREATED_DATE: Date;
  UPDATED_BY: string;
  UPDATED_DATE: Date;
  IS_APPROVED: string;
  WORK_ORDER_ID: number;
  IS_LEFT_OVER_ISSUE: string;
  ISSUE_TYPE: string;
  REMARKS: string;
  COMPANY_NAME: string;
  COMPANY_ADDRESS: string;
  PARTY: string;
  PARTY_ADDRESS: string;
  WORK_ORDER: string;
  CREATED_BY_USER: string;
  lstDetails: IYarnTransferDetails[];
}

export interface IYarnTransferDetails {
  ID: number;
  MASTER_ID: number;
  YARN_ID: number;
  YARN_LOT_NO_ID: number;
  QUANTITY: number;
  PER_CTN_QTY: number;
  CARTON_QTY: number;
  PRICE: number;
  CURRENCY_ID: number;
  BB_LC_ID: number;
  WORK_ORDER_ID: number;
  BRAND_ID: number;
  CREATED_DATE_DTLS: Date;
  CURRENCY_RATE: number;
  CONE_QTY: number;
  YARN: string;
  YARN_LOT_NO: string;
  CURRENCY: string;
  BB_LC: string;
  WORK_ORDER: string;
  BRAND: string;
}
