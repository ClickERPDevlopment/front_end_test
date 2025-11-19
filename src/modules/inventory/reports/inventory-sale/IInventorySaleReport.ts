import { IInventorySale } from "../../pages/inventorySale/inventorySale.interface";

export interface SalesRowDto {
  saleDate: string;
  customerName: string;
  customerAddress: string;
  approvedBy: number;
  createdBy: number;
  status: string;
  approvedDate: string;
  driverName: string;
  driverPhoneNo: string;
  vehicleNo: string;
  remarks: string;
  totalAmount: number;
  factoryId: number;
  saleNo: string;
  costCenterId: number;
  businessUnitId: number;
  currencyId: number;
  itemName: string;
  uomName: string;
  itemId: number;
  qty: number;
  approvedQty: number;
  brandId: number;
  originId: number;
  model: string;
  unitPrice: number;
  packingNote: string;
  currencyCode: string;
}

// Optional: For the full report
export interface IInventorySaleReport {
  companyName: string; 
  companyAddress: string; 
  rows: SalesRowDto[];
}


