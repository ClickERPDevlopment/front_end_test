import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IMaterialSubGroupLedger {
    id: number;
    isFixedAsset?: boolean;
    isCurrentAsset?: boolean;
    companyId: number;
    companyName: string;
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
    deprefield_1: string;           // ID
    deprefield_1_display: string;   // Name
    deprefield_2: number;
    depreciationRows: { ledgerId: string; ledger: string; percentage: number }[];
}

export interface IMaterialSubGroup {
    id: number;
    materialGroupId: number;
    type: string;
    code: string;
    companyId: number;
    name: string;
    remarks: string;
    category: string;
    uom: string;
    sectionId: number;
    materialSubGroupLedgers?: IMaterialSubGroupLedger[];
    actions?: string;
    isServiceType?: boolean;
    isActive?: boolean;
    suppressHitOnStock?: boolean
}

export const materialsubGroupSchema = z.object({
    // Basic related fields
    materialSubGroupId: z.number().min(0, "ID must be 0 or positive"),
    type: z.string().min(1, "Type is required").max(10, "Type too long"),
    code: z.string().min(1, "Type is required").max(10, "Code too long"),
    name: z.string().min(1, "Name is required").max(100, "Name too long"),
    remnarks: z.string().min(2, "Remarks too short"),
    category: z.string().min(1, "Category is required").max(100, "Category too long"),
    remarks: z.string().min(2, "Remarks too short"),
    uom: z.string().min(1, "UOM is required").max(20, "UOM too long"),
    isServiceType: z.boolean().optional(),
    isActive: z.boolean().optional(),
    suppressHitOnStock: z.boolean().optional(),

    //G/L related fields
    materialSubGroupLedgerId: z.number().min(0, "Material Group ID must be 0 or positive"),
    isFixedAsset: z.boolean().optional(),
    isCurrentAsset: z.boolean().optional(),
    company: z.string().min(1, "Company is required").max(100, "Company name too long"),
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
export type MaterialSubGroupValidationErrors = Partial<Record<keyof IMaterialSubGroup | keyof IMaterialSubGroupLedger, string>>;
export type CreateMaterialSubGroupPayload = Omit<IMaterialSubGroup, 'id'>;
export type UpdateMaterialSubGroupPayload = Partial<CreateMaterialSubGroupPayload>;

export interface IMaterialSubGroupState {
    materialSubGroup: IMaterialSubGroup;
    materialSubGroupLedger: IMaterialSubGroupLedger;
    materialSubGroups: IMaterialSubGroup[];
    filteredMaterialSubGroups: IMaterialSubGroup[];
    paginationObject: PaginationObject<IMaterialSubGroup>;
    loading: boolean;
    validationErrors: MaterialSubGroupValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}