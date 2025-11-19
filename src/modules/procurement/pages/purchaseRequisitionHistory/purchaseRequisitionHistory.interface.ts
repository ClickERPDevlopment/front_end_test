import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IPurchaseRequisitionHistory {
    id: number;
    brand: string;
    origin: string;
    model: string;
    stock: string;
    fromDate: string;
    toDate: string;
    purchaseDate: string;
    poNo: string;
    purchaseQuantity: string;
    supplier: string;
    unitPrice: string;
}

// Zod schema for gatePass
export const purchaseRequisitionHistorySchema = z.object({
    id: z.number().min(0, "ID must be 0 or positive"),
    brand: z.string().min(1, "Name is required").max(100, "Name too long"),
    origin: z.string().min(1, "Name is required").max(100, "Name too long"),
    model: z.string().min(1, "Name is required").max(100, "Name too long"),
    stock: z.string().min(1, "Name is required").max(100, "Name too long"),
    fromDate: z.string().min(1, "Name is required").max(100, "Name too long"),
    toDate: z.string().min(1, "Name is required").max(100, "Name too long"),
    purchaseDate: z.string().min(1, "Name is required").max(100, "Name too long"),
    poNo: z.string().min(1, "Name is required").max(100, "Name too long"),
    purchaseQuantity: z.string().min(1, "Name is required").max(100, "Name too long"),
    supplier: z.string().min(1, "Name is required").max(100, "Name too long"),
    unitPrice: z.string().min(1, "Name is required").max(100, "Name too long"),
});

export type PurchaseRequisitionHistoryValidationErrors = Partial<Record<keyof IPurchaseRequisitionHistory, string>>;
export type CreatePurchaseRequisitionHistoryPayload = Omit<IPurchaseRequisitionHistory, 'id'>;
export type UpdatePurchaseRequisitionHistoryPayload = Partial<CreatePurchaseRequisitionHistoryPayload>;

export interface IPurchaseRequisitionHistoryState {
    purchaseRequisitionHistory: IPurchaseRequisitionHistory;
    purchaseRequisitonHistoryList: IPurchaseRequisitionHistory[];
    filteredPurchaseRequisitionHistory: IPurchaseRequisitionHistory[];
    paginationObject: PaginationObject<IPurchaseRequisitionHistory>;
    loading: boolean;
    validationErrors: PurchaseRequisitionHistoryValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}

