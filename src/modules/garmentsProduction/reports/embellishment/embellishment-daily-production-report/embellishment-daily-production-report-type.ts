export type EmbellishmentDailyProductionReportType = {
  ID: number;
  SUPPLIER_ID: number;
  DETAILS_ID: number;
  EMBELLISHMENT_TYPE_ID: number;
  BUYER_ID: number;
  STYLE_ID: number;
  PO_ID: number;
  COLOR_ID: number;
  OS_BUYER_ID: number;
  OS_STYLE_ID: number;
  OS_PO_ID: number;

  EMBELLISHMENT_TYPE?: string;
  WORK_ORDER_NO?: string;
  BUYER?: string;
  STYLE?: string;
  PO_NO?: string;
  COLOR?: string;
  PO_QTY: number;

  OS_BUYER?: string;
  OS_STYLE?: string;
  OS_PO_NO?: string;

  DAY_PRODUCTION_QTY: number;
  PREVIOUS_PRODUCTION_QTY: number;

  PARTS?: string;
  PREPARED_BY?: string;

  SUPPLIER_CODE?: string;
};
