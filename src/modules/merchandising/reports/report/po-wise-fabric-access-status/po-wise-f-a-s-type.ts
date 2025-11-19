export type PoWiseFabricAccessoriesStautsReportDto = {
  masterData: PoWiseFabricAccessoriesStautsReportDto_MasterData;
  lstFabric: PoWiseFabricAccessoriesStautsReportDto_Fabric[];
  lstAccessories: PoWiseFabricAccessoriesStautsReportDto_Accessories[];
};

export type PoWiseFabricAccessoriesStautsReportDto_MasterData = {
  COMPANY_NAME: string;
  COMPANY_ADDRESS: string;
};

export type PoWiseFabricAccessoriesStautsReportDto_Fabric = {
  BUYER: string;
  PONO: string;
  STYLE: string;
  MATERIAL_DESCRIPTION: string;
  MAT_COLOR: string;
  UOM: string;
  REQ_QTY: string;
  WO_QTY: string;
  RCVD_QTY: string;
  RCVD_BAL: string;
  WO_NO: string;
  SUPPLIER_NAME: string;
};

export type PoWiseFabricAccessoriesStautsReportDto_Accessories = {
  BUYER: string;
  PONO: string;
  STYLE: string;
  MATERIAL_DESCRIPTION: string;
  MAT_COLOR: string;
  UOM: string;
  REQ_QTY: string;
  WO_QTY: string;
  RCVD_QTY: string;
  RCVD_BAL: string;
  WO_NO: string;
  SUPPLIER_NAME: string;
};

export type SearchData = {
  dtPlacementFrom: string | null | "";
  dtPlacementTo: string | null | "";
  buyerId: string | null | "";
  styleId: string | null | "";
  poId: string | null | "";
};
