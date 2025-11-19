export type PrintEmbellishmentQualityReportMasterType = {
  Id: number;
  EntryDate?: string;
  PartyId: number;
  Party: string;
  EmbTypeId: number;
  EmbType: string;
  FloorId: number;
  Floor: string;
  WorkStationId: number;
  WorkStation: string;
  WorkOrderId: number;
  WorkOrder: string;
  Remarks?: string;
  Details: PrintEmbellishmentQualityReportDetailsType[];
};

export type PrintEmbellishmentQualityReportDetailsType = {
  Id: number;
  MasterId: number;
  BuyerId?: number;
  Buyer?: string;
  OsBuyerId?: number;
  OsBuyer?: string;
  StyleId?: number;
  Style?: string;
  OsStyleId?: number;
  OsStyle?: string;
  PoId: number;
  Po: string;
  OsPoId: number;
  OsPo: string;
  ColorId?: number;
  Color?: string;
  Parts?: string;
  OrderQty?: number;
  CheckQty?: number;
  QcPassedQty?: number;
  RectifyQty?: number;
  RejectQty?: number;
  DefectQty?: number;
  Defects: PrintEmbellishmentQualityReportDefectType[];
};

export type PrintEmbellishmentQualityReportDefectType = {
  Id: number;
  DetailId: number;
  DefectId: number;
  DefectName: string;
  Qty: number;
};