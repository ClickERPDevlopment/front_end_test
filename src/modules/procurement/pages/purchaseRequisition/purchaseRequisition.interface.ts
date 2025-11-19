import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IPurchaseRequisition {
    id: number;
    prNo: string;
    factory: string;
    proposedBy: string;
    requisitionType: string;
    actions?: string;
}

// Zod schema for gatePass
export const purchaseRequisitonSchema = z.object({
    // purchase requisition
    id: z.number().min(0, "ID must be 0 or positive"),
    prNo: z.number().min(0, "ID must be 0 or positive"),
    factory: z.string().min(1, "Name is required").max(100, "Name too long"),
    proposedBy: z.string().min(1, "Name is required").max(100, "Name too long"),
    requisitionType: z.string().min(1, "Name is required").max(100, "Name too long"),
});

// Validation error type
export type PurchaseRequisitionValidationErrors = Partial<Record<keyof IPurchaseRequisition, string>>;
// Payload when creating (id is omitted)
export type CreatePurchaseRequisitionPayload = Omit<IPurchaseRequisition, 'id'>;
// Payload when updating (usually partial)
export type UpdatePurchaseRequisitionPayload = Partial<CreatePurchaseRequisitionPayload>;

export interface IPurchaseRequisitionState {
    purchaseRequisition: IPurchaseRequisition;
    purchaseRequisitons: IPurchaseRequisition[];
    filteredPurchaseRequisition: IPurchaseRequisition[];
    paginationObject: PaginationObject<IPurchaseRequisition>;
    loading: boolean;
    validationErrors: PurchaseRequisitionValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}

