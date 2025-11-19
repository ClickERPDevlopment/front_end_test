export type FabricBookingReportDto = {
  MaterData: FabricBookingReportDto_MasterData;
  lstSize: FabricBookingReportDto_Size[];
  lstColor: FabricBookingReportDto_Color[];
  lstParts: FabricBookingReportDto_Parts[];
  lstTechnicalSheet: FabricBookingReportDto_TechnicalSheet[];
  lstCuttingAdviceQuantity: FabricBookingReportDto_CuttingAdvice[];
  lstConsumptionPerPcs: FabricBookingReportDto_ConsumptionPerPcs[];
  lstKnittingDyeingAdvice: FabricBookingReportDto_KnittingDyeingAdvice[];
  lstLycraBooking: FabricBookingReportDto_LycraBooking[];
  lstComments: FabricBookingReportDto_Comments[];
  lstSpecialTreatment: FabricBookingReportDto_SpecialTreatment[];
  lstFabric: FabricBookingReportDto_FabricList[];
  lstRevice: FabricBookingReportDto_Revice[];
  lstVerificationStatus: FabricBookingReportDto_VerficationStatus[];
  lstFabricQtyDetails: FabricBookingReportDto_FabricQtyDetails[];
  lstOrderAllComments: FabricBookingReportDto_OrderAllComments[];
  lstInCm: FabricBookingReportDto_InCm[];
  lstColorSizeWiseOrderQty: FabricBookingReportDto_ColorSizeWiseOrderQty[];
  lstYarnSummary: FabricBookingReportDto_YarnDetails[];
  lstStripeDetails: FabricBookingReportDto_StripeDetails[];
  lstWastagePercentage: FabricBookingReportDto_WastagePercentage[];
};


export type FabricBookingReportDto_MasterData = {
  IS_PO_WISE?: boolean;
  PO_ID?: string;
  COMPANY_NAME?: string;
  PONO?: string;
  STYLENAME?: string;
  EMBELLISHMENT?: string;
  BUYER_NAME?: string;
  ORDER_QTY?: number;
  BUYERID?: string;
  STYLEID?: string;
  SHIPMENT_DATE?: string;
  RECEIVE_DATE?: string;
  SUB_PONO?: string;
  SESSIONNO?: string;
  ITEMTYPE?: string;
  MASTER_ID?: string;
  CONS_DATE?: string;
  TECHNICAL_SHEET_DATE?: string;
  TECHNICALSHEETNO?: string;
  ASPERLATEST?: string;
  BODY_GSM?: string;
  NECK_RIB_GSM?: string;
  COUNTS?: string;
  FABRIC_TYPE?: string;
  IS_OPEN_DIA?: string;
  REVISED_NO?: string;
  SUB_PONO1?: string;
  CREATED_DATE?: string;
  UPDATED_DATE?: string;
  CREATED_BY?: string;
  APPROVED_BY?: string;
  FABRIC_SOURCE?: string;
  POID?: string;
  DEALMERCHANDISERNAME: string;
};
export type FabricBookingReportDto_WastagePercentage = {
  FABRIC?: string;
  GMT_PART?: string;
  GMT_COLOR?: string;
  FABRIC_COLOR?: string;
  FABRIC_GSM?: string;
  FINISH_DIA?: string;
  FABRIC_WASTAGE_PERCENTAGE_BUGET?: string;
  GMT_WASTAGE_PERCENTAGE_BUDGET?: string;
};


export type FabricBookingReportDto_StripeMeasurement = {
  YARN_DYEING_COLOR?: string;
  STRIPE_MEASUREMENT?: string;
  YARN_DYEING_REQUIRED: number;
  GREY_YARN_BOOKING_QUANTITY: number;
};

export type FabricBookingReportDto_StripeDetails = FabricBookingReportDto_StripeMeasurement & {
  FABRIC_PART?: string;
  GMT_COLOR?: string;
  FABRIC_COLOR?: string;
  FABRIC_QTY: number;
  lstDtls: FabricBookingReportDto_StripeMeasurement[];
};

export type FabricBookingReportDto_YarnDetails = {
  YARN?: string;
  BOOKING_QTY: number;
};


export type FabricBookingReportDto_ColorSizeWiseOrderQty = {
  sortingNo: number;
  style?: string;
  color?: string;
  size?: string;
  qty: number;
};


export type FabricBookingReportDto_StyleList = {
  STYLEID: number;
  STYLENO?: string;
  STYLENAME?: string;
};


export type FabricBookingReportDto_Size = {
  SIZEID: number;
  SIZENAME?: string;
  SORTINGNO: number;
};

export type FabricBookingReportDto_Color = {
  COLORID: number;
  COLORNAME?: string;
};

export type FabricBookingReportDto_Parts = {
  ID: number;
  NAME?: string;
};

export type FabricBookingReportDto_TechnicalSheet = {
  TECHNICALSHEETNO?: string;
  SPECID?: number;
  SPE_NAME?: string;
  SIZEID?: number;
  SIZENAME?: string;
  SORTINGNO?: number;
  MEASUREMENT?: string;
  SERIAL_?: string;
};

export type FabricBookingReportDto_CuttingAdvice = {
  BUYERID: number;
  BUYER?: string;
  STYLEID: number;
  STYLENAME?: string;
  COLORID: number;
  COLORNAME?: string;
  SIZEID: number;
  SIZENAME?: string;
  SORTINGNO: number;
  QTY: number;
};

export type FabricBookingReportDto_ConsumptionPerPcs = {
  COLOR_GROUP_ID: number;
  GROUP_NAME?: string;
  GMT_SIZE_ID: number;
  SIZENAME?: string;
  SORTINGNO: number;
  BOOKING_CON_PER_PCS: number;
  CG_SORTING_NO: number;
};

export type FabricBookingReportDto_KnittingDyeingAdvice = {
  MATERIAL_ID: number;
  MTL_NAME?: string;
  COLORNAME?: string;
  SIZENAME?: string;
  QTY: number;
  SORTINGNO: number;
  SORTING: number;
  FABRIC_PART_ID: number;
  FABRIC_PART?: string;
};

export type FabricBookingReportDto_LycraBooking = {
  MATERIAL_ID: number;
  MTL_NAME?: string;
  GMT_COLOR_ID: number;
  COLORNAME?: string;
  GMT_SIZE_ID: number;
  SIZENAME?: string;
  SORTINGNO: number;
  QTY: number;
};

export type FabricBookingReportDto_Comments = {
  ID: number;
  MASTER_ID: number;
  BOMNO?: string;
  BUYER_ID: number;
  PO_ID: number;
  PO_NO?: string;
  STYLE_ID: number;
  COMMENTS?: string;
};

export type FabricBookingReportDto_OrderAllComments = {
  ID?: string;
  MASTER_ID?: string;
  BOMNO?: string;
  BUYER_ID?: string;
  PO_ID?: string;
  PO_NO?: string;
  STYLE_ID?: string;
  COMMENTS?: string;
};

export type FabricBookingReportDto_SpecialTreatment = {
  ID: number;
  MASTER_ID: number;
  SPECIAL_TREATM_ID: number;
  TREATMENT?: string;
};

export type FabricBookingReportDto_FabricList = {
  COM_BOM_PARENTS_MTL_ID: number;
  FABRIC?: string;
};

export type FabricBookingReportDto_Revice = {
  REVICE_NO?: string;
  REVICE_REASON?: string;
  REVICE_DATE?: string;
};

export type FabricBookingReportDto_VerficationStatus = {
  VER_ID?: number;
  DEPARTMENT_NAME?: string;
  USER_FULL_NAME?: string;
  DESIGNATION?: string;
  STATUS?: string;
  COMMENTS?: string;
};

export type FabricBookingReportDto_FabricQtyDetails = {
  PO?: string;
  ARTSTYLE?: string;
  PARTS?: string;
  IS_CONSIDER_AS_RIB_FOR_REPORT?: string;
  FABRICATION?: string;
  YARNCOUNT?: string;
  GMTCOLOR?: string;
  FABRICCOLOR?: string;
  COLORCODE?: string;
  LABREFLD?: string;
  GMT_SIZE?: string;
  QTYPCS?: string;
  FINISHDIA?: string;
  GSM?: string;
  FABRICFORM?: string;
  FABRICW?: string;
  GMTW?: string;
  TOTALFINISHCONJDZN?: number;
  TOTALFINISHFABRICS: number;
  UOM?: string;
  PCSQTY?: number;
  TOTALYARN: number;
  SAMPLEFABRICQTY?: string;
  REMARKS?: string;
  FACTORY_TOTAL_GREY_BOOKING_CON_PERPCS_GMT: number;
};

export type FabricBookingReportDto_InCm = {
  ID?: string;
  CONSUMPTION_NUMBER?: string;
  IN_CM?: string;
  JOB_QTY?: string;
  CONSUMPTION_QTY?: string;
  JOB_NUMBER?: string;
};
