export type IBudgetWiseCostBreakdown = {
  PrintDate: Date;
  CompanyName: string;
  CompanyAddress: string;
  SalesContractNo: string;

  BudgetWiseCostBreakdownDto_Booking: IBudgetWiseCostBreakdownDto_Booking[];
  BudgetWiseCostBreakdownDto_PO: IBudgetWiseCostBreakdownDto_PO[];
  BudgetWiseCostBreakdownDto_MainFabric: IBudgetWiseCostBreakdownDto_MainFabric[];
  BudgetWiseCostBreakdownDto_OtherFabric: IBudgetWiseCostBreakdownDto_OtherFabric[];
  BudgetWiseCostBreakdownDto_Accessories: IBudgetWiseCostBreakdownDto_Accessories[];
  BudgetWiseCostBreakdownDto_FabricProcessCost: IBudgetWiseCostBreakdownDto_FabricProcessCost[];
  BudgetWiseCostBreakdownDto_GmtOtherCost: IBudgetWiseCostBreakdownDto_GmtOtherCost[];
  BudgetWiseCostBreakdownDto_Commission: IBudgetWiseCostBreakdownDto_Commission[];
};

export type IBudgetWiseCostBreakdownDto_Booking = {
  BUYER_ID: number;
  BUYER: string;
  PO_ID: number;
  PONO: string;
  JOB_POS: string;
  STYLE_ID: number;
  STYLENO: string;
  ITEMTYPE: string;
  SMVSEWING: number;
  FABRIC_OR_MTL_ID: number;
  FABRIC: string;
  TOTAL_FABRIC_BOOKING_QTY: number;
}


export type IBudgetWiseCostBreakdownDto_PO = {
  FACTORYID: number;
  PO_ID: number;
  STYLE_ID: number;
  QTY: number;
  MASTER_LC_VALUE: number;
  FOB: number;
}


export type IBudgetWiseCostBreakdownDto_MainFabric = {
  PO_ID: number;
  STYLE_ID: number;
  FABRIC_ITEM_ID: number;
  UOM_ID: number;
  UOM: string;
  FABRIC_ITEM_PRICE_PER_UNIT_KG_BUDGET: number;
  TOTAL_MAIN_FABRIC_VALUE: number;
  TOTAL_FOB: number;
  BALANCE_VALUE: number;
}

export type IBudgetWiseCostBreakdownDto_OtherFabric = {
  PO_ID: number;
  STYLE_ID: number;
  FABRIC_ITEM_ID: number;
  UOM_ID: number;
  UOM: string;
  FABRIC_ITEM_PRICE_PER_UNIT_KG_BUDGET: string;
  TOTAL_MAIN_FABRIC_VALUE: number;
}

export type IBudgetWiseCostBreakdownDto_Accessories = {
  PO_ID: number;
  STYLE_ID: number;
  TOTAL_COST: number;
}

export type IBudgetWiseCostBreakdownDto_FabricProcessCost = {
  PO_ID: number;
  STYLE_ID: number;
  FABRIC_ID: number;
  PROCESS_NAME: string;
  TOTAL_PRICE: number;
}


export type IBudgetWiseCostBreakdownDto_GmtOtherCost = {
  PO_ID: number;
  STYLE_ID: number;
  PROCESS_NAME: string;
  PC_PRICE: number;
  DZN_PRICE: number;
  TOTAL_PRICE: number;
}
export type IBudgetWiseCostBreakdownDto_Commission = {
  PO_ID: number;
  STYLE_ID: number;
  MASTER_ID: number;
  COMMISSION_ID: number;
  COST_NAME: string;
  COMMISSION_PERCENTAGE_BUDGET: number;
  COMMISSION_VALUE_BUDGET: number;
}
