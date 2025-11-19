import z from "zod";

export interface IBudget {
    id?: number;
    buyer: string;
    buyerId: number;
    style: string;
    styleId: number;
    po: string;
    poId: number;
    budgetDate: string;
    budgetId: number;
    costingNo: string;
    totalFob: string;
    buyingCommission: string;
    balanceValue: string;
    approvedBy: string | null;
    actions?: boolean;
    status: string;
}

// --- Validation Error Type ---
export type BudgetValidationErrors = Partial<Record<keyof IBudget, string>>;
// --- Payload Types ---
export type CreateBudgetPayload = Omit<IBudget, "id">;
export type UpdateBudgetPayload = Partial<CreateBudgetPayload>;


export interface IBudgetState {
    budget: IBudget | null;
    budgetList: IBudget[];
    filteredBudgetApproval: IBudget[];
    paginationObject?: any;
    loading: boolean;
    validationErrors: BudgetValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}