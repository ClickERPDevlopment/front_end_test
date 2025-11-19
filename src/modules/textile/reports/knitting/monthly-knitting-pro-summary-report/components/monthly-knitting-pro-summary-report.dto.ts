export interface IMonthlyKnittingProdSummaryReportDto {
  INTER_COMPANY_ID: number;
  COMPANY_NAME: string;
  COMPANY_ADDRESS: string;
  ACTION_DATE: string;
  KNIT_PRO_QTY: number;
  KNIT_PRO_PCS: number;
  KNIT_SALES_AMOUNT: number;
  OUTSIDE_PRODUCTION_KG: number;
  OUTSIDE_PRODUCTION_PCS: number;
  KNITTING_BILL_VALUE: number;
  ACTUAL_BILL_VALUE: number;
  PROFIT_LOSS: number;
}
