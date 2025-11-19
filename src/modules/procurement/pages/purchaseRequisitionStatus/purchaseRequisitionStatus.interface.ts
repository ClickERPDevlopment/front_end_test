import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IPurchaseRequisitionStatus {
    id: number;
    dateRange1: string;
    dateRange2: string;
    reqNo: string;
    status: string;
    approveDate: string;
    actions?: string;
    materialName: string;
    approveQuantity: string;
    approxRate: string;
    unit: string;
    assignedTo: string;
    approvePrice: string;
    currency: string;
    supplier: string;
    brandName: string;
    country: string;
    model: string;
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
export type PurchaseRequisitionStatusValidationErrors = Partial<Record<keyof IPurchaseRequisitionStatus, string>>;
// Payload when creating a gatePass (id is omitted)
export type CreatePurchaseRequisitionStatusPayload = Omit<IPurchaseRequisitionStatus, 'id'>;
// Payload when updating a gatePass (usually partial)
export type UpdatePurchaseRequisitionStatusPayload = Partial<CreatePurchaseRequisitionStatusPayload>;

export interface IPurchaseRequisitionStatusState {
    purchaseRequisitionStatus: IPurchaseRequisitionStatus;
    purchaseRequisitonStatusList: IPurchaseRequisitionStatus[];
    filteredPurchaseRequisitionStatus: IPurchaseRequisitionStatus[];
    paginationObject: PaginationObject<IPurchaseRequisitionStatus>;
    loading: boolean;
    validationErrors: PurchaseRequisitionStatusValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}

