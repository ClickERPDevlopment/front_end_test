import { IGmtEfficiencySummary, ILineTarget, LineHourlyActualTargetHour } from "../cutting-efficiency-report/ISewingTargetReport";

export interface ILineTargetRecord {
  LINE_ID: number;
  SUPERVISORS: string | null;
  LINE_NAME: string | null;
  TARGET_DATE: string; // ISO date string
  TARGET_QTY: number;
  MP: number;
  PRODUCE_MIN: number;
  AVAIL_MIN: number;
  TGT_HOUR: number;
  DATE_STR: string;
  STYLE_ID: number;
  PO_ID: number;
  PO_NO: string;
  COLOR_ID: number;
  MARKER_PCS: number;
  LAY_QTY: number;
  TARGET_HOUR: number;
  TABLE_ID: number;
  BUYER_ID: number;
  ORDER_QTY: number;
  PLAN_QTY: number;
  STYLE_NO: string;
  COLOR_NAME: string;
  TABLE_NAME: string;
  BUYER_NAME: string;
  SMV: number;
  REMARKS: string;
}


// Optional: For the full report
export interface IGmtCuttingTargetReport {
  company: string; // e.g., "Fame Apparels Ltd."
  reportFrom: string; // e.g., "15/10/2025"
  reportTo: string;   // e.g., "16/10/2025"
  rows: ILineTargetRecord[];
  cuttingProductionQty: Record<string, number>;
  linewiseTargetData: Record<number, ILineTarget>;
  linewiseTargetActualData: Record<number, LineHourlyActualTargetHour>;
  yesterdayData: IGmtEfficiencySummary;
  todayData: IGmtEfficiencySummary;
  cuttingSupervisorsData: Record<number, string>;
}


