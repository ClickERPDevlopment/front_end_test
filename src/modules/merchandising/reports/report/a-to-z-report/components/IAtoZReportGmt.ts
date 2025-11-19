export type IAtoZReportGmt = {
  JOB_PO_ID: number;
  PO_ID: number;
  PONO: string;
  MAIN_STYLE_ID: number;
  STYLE_ID: number;
  STYLENO: string;
  COLOR_NAME: string;
  LINENAME: string;
  PO_QTY: number;
  //CUTTING===============
  CUTTING_QTY: number;
  CUTTING_BALANCE: number;
  // CUTTING_PES: number;
  //INPUT===============
  SEWING_INPUT_QTY: number;
  SEWING_INPUT_READY_QTY: number;
  //SEWING===============
  SEWING_OUTPUT_QTY: number;
  SEWING_WIP: number;
  //FINISHING===============
  FINISHING_INPUT: number;
  FINISHING_OUTPUT: number;
  FINISHING_WIP: number;
  //PACKING===============
  PACKED_INPUT: number;
  PACKED_OUTPUT: number;
  PACKING_WIP: number;
  //SHIPPING===============
  SHIPPING_QTY: number;
  SHIPPING_BALANCE: number;
  //===============

  CUT_TO_SHIP_PERCENTAGE: number;
  IS_EMB: string;
  SHIP_DATE: Date;
};
