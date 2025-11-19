export interface IFabricReceiveReturnChallanGatePassReport {
  SUPPLIER_ID: number;
  SUPPLIER: string;
  RCV_TYPE: string;
  DTLS_ID: number;
  WORK_ORDER_NO: string;
  CHALLAN_NO: string;
  RCV_QTY: number;
  RCV_ROLL: number;
  RCV_PCS: number;
  BUYER_NAME: string;
  STYLENO: string;
  PONO: string;
  FABRIC: string;
  COLORNAME: string;
  DIA: string;
  GSM: string;
  UOM: string;
  RET_QTY: number;
  RET_ROLL: number;
  RET_PCS: number;
  RET_DATE: Date;
  RET_CHALLAN: string;
  REMARKS: string;
  PREPARED_BY: string;
  COMPANY_NAME: string;
  COMPANY_ADDRESS: string;
}
