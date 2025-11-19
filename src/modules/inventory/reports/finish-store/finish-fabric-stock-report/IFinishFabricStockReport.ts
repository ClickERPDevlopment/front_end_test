
export type IFinishFabricStockResponse = {
  CompanyName: string;
  CompanyAddress: string;
  Data: IFinishFabricStockReport[];
}

export type IFinishFabricStockReport = {
  ORDERPLACEMENTMONTH: string;
  BUYER: string;
  PO_NO: string;
  STYLENO: string;
  STYLENAME: string;
  COLOR: string;
  SIZENAME: string;
  FABRIC_PART: string;
  UOM: string;
  BOOKING_QTY: number;
  GREY_DEL_TO_DYEING: number;
  FIN_FAB_RCV_GW: number;
  BL_ON_GREY_ISSUE: number;
  FIN_FAB_RCV_FW: number;
  DYE_PROCESS_LOSS: number;
  FABRIC_PURCHASE: number;
  RCV_FROM_OTHER_PO: number;
  TOTAL_RCV: number;
  CUTTING_ISSUE_RETURN_RCV: number;
  ISSUE_FOR_RE_DYEING: number;
  RE_DYEING_RECEIVE: number;
  RE_DYEING_RCV_BL: number;
  CUTTING_ISSUE_QTY: number;
  ISSUE_TO_OTHER_PO: number;
  LO_ISSUE: number;
  TOTAL_ISSUE: number;
  STOCK_QTY: number;
};