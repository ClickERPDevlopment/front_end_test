export type SupervisorWiseCuttingKPIReportType = {
  TARGETDATE: string;
  FLOORID: number;
  LINEID: number;
  TABLE_CUTTER_MAN: number;
  TABLE_CUTTING_ASSISTANT: number;
  HOURLYTARGET: number;
  TARGETHOUR: number;
  LINENAME?: string;
  TOTAL_CUTTING_QTY: number;
  EMP_NAME?: string;
  EMP_CODE?: string;
  COMPANY_NAME?: string;
  COMPANY_ADDRESS?: string;
  SMVCUTTING: number;
  TARGET_EARMN_MIN: number;
  AVAILABLE_EARMN_MIN: number;
  PRODUCTION_MIN: number;
};
