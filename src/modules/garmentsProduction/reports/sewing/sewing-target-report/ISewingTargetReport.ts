export interface IGmtDailyTargetDto {
  ROW_NUM: number;
  ID: number;
  SECTIONID: number;
  FLOORID: number;
  FLOOR_NAME: string;
  FLOOR_CODE: string;
  LINE_CODE: string;
  LINEID: number;
  LINENAME: string;
  TARGETDATE: string; // e.g. "2025-10-21"
  DT: string;
  BUYER_NAME: string;
  BUYERID: number;
  STYLENO: string;
  STYLEID: number;
  PONO: string;
  STYLECOLORID: number;
  SIZEID: number;
  WIP: number;
  CUTTINGTABLEID: number;
  RUNNINGDAY: number;
  TARGETEFFICIENCY: number;
  HOURLYTARGET: number;
  TARGETHOUR: number;
  TARGETHOURINPUT: number;
  SEWING_SMV: number;
  OPERATOR: number;
  HELPER: number;
  IRONER: number;
  RUNNING_DAY: number;
  ORDER_QTY: number;
  SEWINGWIP: number;
  LINE_COUNT: number;
  LINE_ROW_NUM: number;
  FLOOR_COUNT: number;
  FLOOR_ROW_NUM: number;
  ITEMTYPE: string;
  FIRST_INPUT: string | null;        // date string or null
  FIRST_OUTPUT_DATE: string | null;  // date string or null
  TODAY_OUTPUT: number;
  REQ_OPERATOR: number;
  REQ_HELPER: number;
  REQ_INPUTMAN: number;
  TOTAL_INPUT: number;
  C: number; // not clear what this column represents — adjust type if needed
  IS_HAVE_CURRENT_DATA: boolean;
  HAVE_TOMORROW: boolean;
  TOMORROW_STYLENO: string;
  TOMORROW_HOURLYTARGET: number;
  TOMORROW_TARGETEFFICIENCY: number;
  TOMORROW_TARGETHOUR: number;
  TOMORROW_SEWING_SMV: number;
}

export interface ITargetLineRemarks
{
  LINE_ID: number;
  LINE_NAME: string;
  REMARKS: string;
}

// Optional: For the full report
export interface IGmtDailyTargetReport {
  company: string; // e.g., "Fame Apparels Ltd."
  reportFrom: string; // e.g., "15/10/2025"
  reportTo: string;   // e.g., "16/10/2025"
  rows: IGmtDailyTargetDto[];
  total?: IGmtDailyTargetDto; // optional summary row
  avgActualHour: number;
  swFloorWiseActualHourMap: Record<string, number>;
  sewingTargetRemarks: ITargetLineRemarks[];
}


