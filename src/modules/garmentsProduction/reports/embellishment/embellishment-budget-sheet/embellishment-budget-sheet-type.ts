export interface EmbMaterialRequirementProductivityType {
  COST_PER_MEN_HOUR: number;
  OVER_HEAD_COST: number;
  TARGET_PER_HOUR: number;
  REQUIRED_MAN_POWER: number;
  MANPOWER_TYPE: string;
}

export interface EmbMaterialRequirementReportType {
  REQUIREMENT_DATE: Date;
  REQUIREMENT_NO_SERIAL: number;
  REQUIREMENT_NO: string;
  WORK_ORDER_QTY: number;
  TOTAL_WORK_ORDER_AMOUNT: number;
  CONVERSION_RATE: number;
  TOTAL_WORK_ORDER_AMOUNT_BDT: number;
  PRE_COSTING_AMOUNT: number;
  PROFIT_LOSS: number;
  CONSUPMTION_PER_DZN: number;
  REQ_QUANTITY: number;
  RATE: number;
  AMOUNT_BDT: number;
  EMB_TYPE: string;
  EMB_CATEGORY: string;
  SUPPLIER_NAME: string;
  CURRENCY: string;
  MATERIAL_NAME: string;
  MATERIAL_GROUP: string;
  COLOR_NAME: string;
  BRAND_NAME: string;
  CREATED_BY: string;
  UOM: string;
  BUYER: string;
  STYLE: string;
  PO: string;
}


