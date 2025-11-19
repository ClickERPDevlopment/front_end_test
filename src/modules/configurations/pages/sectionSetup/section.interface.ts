import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IFactoryLedger {
    factoryId: number;
    factoryName: string;
    inventoryStockLedgerId: number;
    inventoryStockLedgerName: string;
    inventoryWIPStockLedgerId: number;
    inventoryWIPStockLedgerName: string;
    expenseLedgerId: number;
    expenseLedgerName: string;
}

export interface ISection {
    id: number;
    code: string;
    name: string;
    inchargeName: string;
    productionManagerName: string;
    remarks: string; // or boolean if you prefer
    factoryLedgers?: IFactoryLedger[]; // Optional, if applicable
    actions?: string;
    isSubContract?: boolean; // Optional, if applicable`
    isActive?: boolean; // Optional, if applicable
}

// Zod schema for section
export const sectionSchema = z.object({
    // section related fields
    id: z.number().min(0, "Section Id must be 0 or positive"),
    code: z.string().min(1, "Section Code is required").max(10, "Section Code too long"),
    name: z.string().min(1, "Section Name is required").max(100, "Section Name too long"),
    remnarks: z.string().min(2, "Remarks too short"),
    inchargeName: z.string().min(1, "Incharge Name is required").max(100, "Incharge Name too long"),
    productionManagerName: z.string().min(1, "Production Manager Name is required").max(100, "Production Manager Name too long"),
    remarks: z.string().min(2, "Remarks too short"),

    // factory related fields
    factoryId: z.number().min(0, "Factory Id must be 0 or positive"),
    factoryName: z.string().min(1, "Factory Name is required").max(100, "Factory Name too long"),
    inventoryStockLedgerId: z.number().min(0, "Inventory Stock Ledger ID must be 0 or positive"),
    inventoryStockLedgerName: z.string().min(1, "Inventory Stock Ledger Name is required").max(100, "Inventory Stock Ledger Name too long"),
    inventoryWIPStockLedgerId: z.number().min(0, "Inventory WIP Stock Ledger ID must be 0 or positive"),
    inventoryWIPStockLedgerName: z.string().min(1, "Inventory WIP Stock Ledger Name is required").max(100, "Inventory WIP Stock Ledger Name too long"),
    expenseLedgerId: z.number().min(0, "Expense Ledger Id must be 0 or positive"),
    expenseLedgerName: z.string().min(1, "Expense Ledger Name is required").max(100, "Expense Ledger Name too long"),
});

// Validation error type
export type SectionValidationErrors = Partial<Record<keyof ISection | keyof IFactoryLedger, string>>;
export type CreateSectionPayload = Omit<ISection, 'id'>;
export type UpdateSectionPayload = Partial<CreateSectionPayload>;

export interface ISectionState {
    section: ISection;
    factoryLedger: IFactoryLedger;
    sections: ISection[];
    filteredSection: ISection[];
    paginationObject: PaginationObject<ISection>;
    loading: boolean;
    validationErrors: SectionValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}