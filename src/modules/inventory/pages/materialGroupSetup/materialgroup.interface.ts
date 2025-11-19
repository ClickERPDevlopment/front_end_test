import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IMaterialGroupLedger {
    id: number;
    isFixedAsset?: boolean;
    isCurrentAsset?: boolean;
    company: string;
    inventoryStockAccount: string;
    inventoryStockAccountId: number;
    itemExpenseAccount: string;
    itemExpenseAccountId: number;
    itemConvertAccount: string;
    itemConvertAccountId: number;
    depreciationAccount: string;
    depreciationAccountId: number;
    isYearlyDepreciation: boolean;
    isMonthlyDepreciation: boolean;
    depreciationPercentage: number;
    deprefield_1: string;
    deprefield_1_display: string;
    deprefield_2: number;
    depreciationRows: { ledgerId: string; ledger: string; percentage: number }[];
}

export interface IMaterialGroup {
    // IDs
    id: number;
    uomId: number;

    type: string;
    code: string;
    name: string;
    remarks: string;
    category: string;
    uom: string;
    materialGroupLedgers?: IMaterialGroupLedger[];
    actions?: string;
    isServiceType?: boolean;
    isActive?: boolean;
    suppressHitOnStock?: boolean
}

export const materialGroupSchema = z.object({

    // Basic related fields
    id: z.number().min(0, "Material Group Id must be 0 or positive"),
    type: z.string().min(1, "Material Group Type is required").max(10, "Material Group Type too long"),
    code: z.string().min(1, "Material Group Code is required").max(10, "Material Group Code too long"),
    name: z.string().min(1, "Material Group Name is required").max(100, "Material Group Name too long"),
    category: z.string().min(1, "Category is required").max(100, "Category too long"),
    remarks: z.string().min(2, "Remarks too short"),
    uom: z.string().min(1, "Uom is required").max(20, "Uom too long"),
    isServiceType: z.boolean().optional(),
    isActive: z.boolean().optional(),
    suppressHitOnStock: z.boolean().optional(),

    //G/L related fields
    materialGroupLedgerId: z.number().min(0, "Material Group ID must be 0 or positive"),
    isFixedAsset: z.boolean().optional(),
    isCurrentAsset: z.boolean().optional(),
    company: z.string().min(1, "Company Name is required").max(100, "Company Name too long"),
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
export type MaterialGroupValidationErrors = Partial<Record<keyof IMaterialGroup | keyof IMaterialGroupLedger, string>>;
export type CreateMaterialGroupPayload = Omit<IMaterialGroup, 'id'>;
export type UpdateMaterialGroupPayload = Partial<CreateMaterialGroupPayload>;

export interface IMaterialGroupState {
    materialGroup: IMaterialGroup;
    materialGroupLedger: IMaterialGroupLedger;
    materialGroups: IMaterialGroup[];
    filteredMaterialGroups: IMaterialGroup[];
    paginationObject: PaginationObject<IMaterialGroup>;
    loading: boolean;
    validationErrors: MaterialGroupValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}