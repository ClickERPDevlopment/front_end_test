import { ICompany } from "@/modules/configurations/pages/companySetup/company.interface";
import z from "zod";
import { PaginationObject } from "../../../../types/global";
import { IMaterialGroupLedger } from "../materialGroupSetup/materialgroup.interface";
import { IStore } from "../store/store.interface";

export interface IdName {
    id: number;
    name: string;
}

export interface IdNameString {
    id: string;
    name: string;
}

export interface MaterialStock {
  storeId: number;
  itemId: number;
  brandId: number;
  brandName: string;
  model: string;
  originId: number;
  originName: string;
  stockQty: number;
}

export interface StockFilters {
  brandId?: number;
  originId?: number;
  model?: string;
  filterBy: string;
}

export interface IMaterial {

    // IDs
    id?: number;
    name?: string;
    companyId: number;
    sectionIds: number[];
    storeIds: number[];
    materialGroupId: number;
    materialSubGroupId: number;
    materialStock: MaterialStock[];
    materialStockCount: number;
    filterMaterialStock: MaterialStock[];

    // backend StockSummary mapping
    brands?: IdName[];
    origins?: IdName[];
    models?: IdNameString[];

    // Basic

    actions?: string;

    // materialInfoType: string;
    materialInfo: string;
    materialSubGroup: string;
    materialCode: string;
    materialDescription: string;
    materialDisplayName: string;
    uom: string;
    yarnType: string;
    yarnCount: string;
    yarnComposition: string;
    yarnQuality: string;
    blendType: string;
    remarks: string;
    category: string;
    isDyedYarn?: boolean;
    dyedColor: string;
    isActive?: boolean;
    suppressHitOnStock?: boolean;
    isRoundCalculation?: boolean;

    // Measurement
    purchaseUom: string;
    useUom: string;
    standardPrice: string;
    inventoryPrice: string;
    hsCode: string;
    serviceLabel: string;
    safetyStock: string;
    grossWeight: string;
    netWeight: string;
    areaOfUses: string;
    productionCategory: string;
    volume: string;
    length: string;
    width: string;
    height: string;
    totalStock: number;
    isExpirable?: boolean;
    isNonSortable?: boolean;
    isCapitalAssets?: boolean;

    // Other
    material: string;
    reorderPoint: string;
    rate: string;
    consumptionQty: number;
    decimalPlace: number;
    leadTime: string;

    // Item to Store
    storeContents?: IStore[];

    // G/L
    materialgroupLedgers?: IMaterialGroupLedger[];

    // Company
    companies: ICompany[];
    // Section

    AOP?: boolean;
    Admin?: boolean;
    Cutting?: boolean;
    dyeing?: boolean;
    dyeingBatch?: boolean;
    embrioidery?: boolean;
    finishing?: boolean;
    gitFinishingPacked?: boolean;
    gitPackedShipped?: boolean;
    gitSewingFinishing?: boolean;
    gmtProcess?: boolean;
    knitting?: boolean;
    leftOverStore?: boolean;
    mis?: boolean;
    packing?: boolean;
    printEmb?: boolean;
    printing?: boolean;
    production?: boolean;
    sample?: boolean;
    sewing?: boolean;
    smock?: boolean;
    washing?: boolean;
    yarnDyed?: boolean;
}



export const materialInfoSchema = z.object({
    // Basic related fields
    id: z.number().min(0, "Id must be 0 or positive"),

    // Material Info related fields
    materialInfo: z.string().min(1, "Material Info is required").max(100, "Material Info too long!"),
    materialSubGroup: z.string().min(1, "Material Sub Group is required").max(100, "Material Sub Group too long!"),
    materialCode: z.string().min(1, "Material Code is required").max(100, "Material Code too long!"),
    materialDescription: z.string().min(1, "Material Description is required").max(100, "Material Description too long!"),
    materialDisplayName: z.string().min(1, "Material Display Name is required").max(100, "Material Display Name too long!"),
    uom: z.string().min(1, "Uom is required").max(100, "Uom too long!"),
    yarnType: z.string().min(1, "Yarn Type is required").max(100, "Yarn Type too long!"),
    yarnCount: z.string().min(1, "Yarn Count is required").max(100, "Yarn Count too long!"),
    yarnComposition: z.string().min(1, "Yarn Composition is required").max(100, "Yarn Composition too long!"),
    yarnQuality: z.string().min(1, "Yarn Quality is required").max(100, "Yarn Quality too long!"),
    blendType: z.string().min(1, "Blend Type is required").max(100, "Blend Type too long!"),
    remarks: z.string().min(1, "Remarks is required").max(100, "Remarks too long!"),
    category: z.string().min(1, "Category is required").max(100, "Category too long!"),
    isDyedYarn: z.boolean(),
    dyedColor: z.string().min(1, "Dyed Color is required").max(100, "Dyed Color too long!"),
    isActive: z.boolean(),
    suppressHitOnStock: z.boolean(),
    isRoundCalculation: z.boolean(),

    // Measurement related Fields
    purchaseUom: z.string().min(1, "Purchase Uom is required").max(100, "Purchase Uom too long!"),
    useUom: z.string().min(1, "Use Uom is required").max(100, "Use Uom too long!"),
    standardPrice: z.string().min(1, "Standard Price is required").max(100, "Standard Price too long!"),
    inventoryPrice: z.string().min(1, "Inventory Price is required").max(100, "Inventory Price too long!"),
    hsCode: z.string().min(1, "HS Code is required").max(100, "HS Code too long!"),
    serviceLabel: z.string().min(1, "Service Label is required").max(100, "Service Label too long!"),
    safetyStock: z.string().min(1, "Safety Stock is required").max(100, "Safety Stock too long!"),
    grossWeight: z.string().min(1, "Gross Weight is required").max(100, "Gross Weight too long!"),
    netWeight: z.string().min(1, "Net Weight is required").max(100, "Net Weight too long!"),
    areaOfUses: z.string().min(1, "Area of Uses is required").max(100, "Area of Uses too long!"),
    productionCategory: z.string().min(1, "Production Category is required").max(100, "Production Category too long!"),
    volume: z.string().min(1, "Volume is required").max(100, "Volume too long!"),
    length: z.string().min(1, "Length is required").max(100, "Length too long!"),
    width: z.string().min(1, "Width is required").max(100, "Width too long!"),
    height: z.string().min(1, "Height is required").max(100, "Height too long!"),
    totalStock: z.string().min(1, "Total Stock is required").max(100, "Total Stock too long!"),
    isExpirable: z.boolean(),
    isNonSortable: z.boolean(),
    isCapitalAssets: z.boolean(),

    // Other related fields
    material: z.string().min(1, "Material is required").max(100, "Material too long!"),
    company: z.string().min(1, "Company is required").max(100, "Company too long!"),
    reorderPoint: z.string().min(1, "Reorder Point is required").max(100, "Reorder Point too long!"),
    rate: z.string().min(1, "Rate is required").max(100, "Rate too long!"),
    consumptionQty: z.number().min(1, "Consumption Quantity is required").max(100, "Consumption Quantity too long!"),
    decimalPlace: z.number().min(1, "Decimal Place is required").max(100, "Decimal Place too long!"),
    leadTime: z.string().min(1, "Lead Time is required").max(100, "Lead Time too long!"),

    // Item to sticth related fields


    // Section related fields
    sectionIds: z.number(),
    storeIds: z.number(),

    //G/L related fields
    mgid: z.number().min(0, "Material Group Id must be 0 or positive"),
    isFixedAsset: z.boolean().optional(),
    isCurrentAsset: z.boolean().optional(),
    inventoryStockAccount: z.string().min(1, "Inventory Stock Account is required").max(100, "Inventory Stock Account too long"),
    inventoryStockAccountId: z.number().min(1, "Inventory Stock Account Id is required"),
    itemExpenseAccount: z.string().min(1, "Item Expense Account is required").max(100, "Item Expense Account too long"),
    itemExpenseAccountId: z.number().min(1, "Item Expense Account Id is required"),
    itemConvertAccount: z.string().min(1, "Item Convert Account is required").max(100, "Item Convert Account too long"),
    itemConvertAccountId: z.number().min(1, "Item Convert Account Id is required"),
    depreciationAccount: z.string().min(1, "Depreciation Account is required").max(100, "Depreciation Account too long"),
    depreciationAccountId: z.number().min(1, "Depreciation Account Id is required"),
    isYearlyDepreciation: z.boolean().optional(),
    isMonthlyDepreciation: z.boolean().optional(),
    depreciationpercentage: z.number().min(0, "Depreciation Percentage must be >= 0").max(100, "Depreciation Percentage cannot exceed 100"),
    deprefield_1: z.string(),
    deprefield_1_display: z.string(),
    deprefield_2: z.string(),
});

// Validation error type
export type MaterialInfoValidationErrors = Partial<Record<keyof IMaterial | keyof IMaterialGroupLedger, string>>;
export type CreateMaterialInfoPayload = Omit<IMaterial, 'id'>;
export type UpdateMaterialInfoPayload = Partial<CreateMaterialInfoPayload>;

export interface IMaterialInfoState {
    material: IMaterial;
    materialgroupLedger: IMaterialGroupLedger;
    storeContents: IStore;
    materials: IMaterial[];
    filteredMaterials: IMaterial[];
    paginationObject: PaginationObject<IMaterial>;
    loading: boolean;
    validationErrors: MaterialInfoValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}