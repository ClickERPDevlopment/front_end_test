export interface ITnaCalenderDto {
  index: number;
  taskName: string;
  initialDate: string;
  planDate1: string;
  planLastDate: string;
  curActualDate: string;
  buyerName: string;
  poQty: number;
  poRcvDate: string;
  poShipDate: string;
  leadTime: number;
  pono: string;
  jobNumber: string;
  deviationsDay: number;
  remarks: string;
  isApplicable: number;
  tnaDtlId: number;
  commentCount: number;
}

export interface ITnaNotCompleteTask {
  index: number;
  styleNos: string;
  taskName: string;
  dtlId: number;
  planLastDate?: string;     
  curActualDate?: string;
  deviation?: number;
  initialDateStr: string;
  planLastDateStr: string;
  curActualDateStr: string;
  remarks: string;
  commentCount: number;
  companyName: string;
  pono: string;
  jobNumber: string;
  buyerDisplayName: string;
}


export interface ITnaAchievementReportDto {
  index: number;
  taskName: string;
  companyName: string;
  companyNo: number;
  count: number;
  completeTna: number;
  notCompleteTna: number;
  achievePercent: number;
  taskCode: string;
}


export interface IReportState {
  data: any[];
  tnaNotCompleteTasks: ITnaNotCompleteTask[];
  tnaDetailsReport: ITnaCalenderDto[];
  tnaAchievementReport: ITnaAchievementReportDto[];
  loading: boolean;
  error: string | null;
}