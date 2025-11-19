export interface ILineTarget {
 LINE_ID: number;
  LINE_NAME: string;
  TARGET_DATE: string;   // ISO date string (e.g., "2025-10-15T00:00:00")
  TARGET_QTY: number;
  MP: number;
  PRODUCE_MIN: number;
  AVAIL_MIN: number;
  DATE_STR: string; 
}

export interface LineHourlyActualTargetHour {
   DATE_STR: string;
  LINE_ID: number;
  FLOOR_ID: number;
  FLOOR_NAME: string | null;
  MP: number;
  ACTUAL_HOUR: number;
}


export interface IGmtProductionRecord {
  DATE_STR: string;
  PRODUCE_MIN: number;
  QTY: number;
  LINE_ID: number;
  BUYER_ID: number;
  BUYER_NAME: string;
  PO_NO: string;
  STYLE_ID: number;
  COLOR_ID: number;
  STYLE_NO: string;
  COLOR_NAME: string;
  SMV: number;
}

export interface IGmtEfficiencySummary {
  DATE_STR: string;
  PRODUCE_MIN: number;
  AVAIL_MIN: number;
  PRODUCE_QTY: number;
  TARGET_QTY: number;
  TARGET_MIN: number;
  MP: number;
  ACTUAL_HOUR: number;
  AVG_SMV: number;
}


// Optional: For the full report
export interface IGmtCuttingEfficiencyReport {
  company: string; // e.g., "Fame Apparels Ltd."
  reportFrom: string; // e.g., "15/10/2025"
  reportTo: string;   // e.g., "16/10/2025"
  rows: IGmtProductionRecord[];
  lineTarget: Record<number, ILineTarget>;
  lineTargetActualData: Record<number, LineHourlyActualTargetHour>;
  factoryTargetData: LineHourlyActualTargetHour;
  mainData: IGmtEfficiencySummary[];
  cuttingSupervisorsData: Record<number, string>;
}


