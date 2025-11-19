export interface ICompensationClaimMasterType {
  ID: number;
  CLAIM_ID?: string;
  CLAIM_DATE?: Date;
  COMPENSATION_TYPE?: string;
  RELATED_SUPPLIER_ID: number;
  RELATED_SUPPLIER_NAME: string;
  SUPPLIER_NAME?: string;
  REPORTED_BY?: string;
  ADDITIONAL_NOTES?: string;
  REMARKS?: string;
  CREATED_BY?: string;
  CREATED_BY_NAME?: string;
  CREATED_DATE: Date;
  UPDATED_BY?: string;
  UPDATED_DATE: Date;
  SUPPLIER_ADDRESS: string;
  ClaimDetails: ICompensationClaimDetailsType[];
  RelatedOrders: ICompensationClaimOrderInfoType[];
}

export interface ICompensationClaimDetailsType {
  ID: number;
  MASTER_ID: number;
  MATERIAL_ID: number;
  MATERIAL_NAME?: string;
  MATERIAL_GROUP_ID?: number;
  MATERIAL_GROUP_NAME?: string;
  MATERIAL_SUB_GROUP_ID?: number;
  MATERIAL_SUB_GROUP_NAME?: string;
  TYPE_ID: number;
  TYPE_NAME?: string;
  QUANTITY_DAMAGED: number;
  UOM?: string;
  DAMAGE_DETAILS?: string;
  CLAIM_AMOUNT: number;
  CLAIM_AMOUNT_PER_UNIT: number;
  ACTION_TAKEN?: string;
}

export interface ICompensationClaimOrderInfoType {
  ID: number;
  MASTER_ID: number;
  BUYER_ID: number;
  BUYER_NAME?: string;
  STYLE_ID: number;
  STYLE_NAME?: string;
  PO_ID: number;
  PO_NO?: string;
}
