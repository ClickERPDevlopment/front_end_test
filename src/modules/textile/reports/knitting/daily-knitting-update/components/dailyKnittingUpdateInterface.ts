export interface DailyKnittingUpdate {
  PROGRAM_DATE: string;
  PROGRAM_NO: string;
  BUYER: string;
  STYLENO: string;
  STYLENAME: string;
  PONO: string;
  YARN_LOT_BRAND: string;
  FABRIC: string;
  MC_DIA: string;
  FINISH_DIA: string;
  GSM: string;
  GMT_COLOR: string;
  STITCH_LENGTH: string;
  LYCRA_CM: string;
  KP_QTY: number;
  YARN_ISSUE_QTY: number;
  YARN_ISSUE_BALANCE_QTY: number;
  KNITTING_HOUSE: string;
  TODAY_PRODUCTION_QTY: number;
  TOTAL_PRODUCTION_QTY: number;
  GREY_DELIVERY_QTY: number;
  LOSE_YARN_QTY: number;
  WASTAGE_QTY: number;
  BALANCE_QTY: number;
  KNITTING_RATE: number;
  KNITTING_START: Date;
  KNITTING_END: Date;

  GREY_RCV_QTY: number;
  GREY_DYEING_ISSUE_QTY: number;
  GREY_DYEING_ISSUE_BALANCE_QTY: number;

  KP_PCS: number;
  GREY_DELIVERY_PCS: number;
  BALANCE_PCS: number;
}
