import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IPurchaseRequisitionDetails {
    id: number;
    reqNo: string;
    proposedDate: string;
    proposedBy: string;
    requisitionType: string;
    fieldOfUse: string;
    approve: boolean;
    deny: boolean;
    slNo: string;
    assignedPerson: string;
    actions: string;
    subGroup: string;
    itemName: string;
    brandName: string;
    model: string;
    country: string;
    unitPrice: number;
    requiredQuantity: number;
    approveQuantity: number;
    stockQuantity: number;
    remarks: string;
    so: string;
    currency: string;
    approximateRate: string;
    unit: string;
    supplier: string;
    userRemarks: string;
}

// Zod schema for gatePass
export const purchaseRequisitonDetailsSchema = z.object({
    // purchase requisition
    id: z.number().min(0, "ID must be 0 or positive"),
    prNo: z.number().min(0, "ID must be 0 or positive"),
    factory: z.string().min(1, "Name is required").max(100, "Name too long"),
    proposedBy: z.string().min(1, "Name is required").max(100, "Name too long"),
    requisitionType: z.string().min(1, "Name is required").max(100, "Name too long"),

});





// Validation error type
export type PurchaseRequisitionDetailsValidationErrors = Partial<Record<keyof IPurchaseRequisitionDetails, string>>;

// Payload when creating a gatePass (id is omitted)
export type CreatePurchaseRequisitionDetailsPayload = Omit<IPurchaseRequisitionDetails, 'id'>;

// Payload when updating a gatePass (usually partial)
export type UpdatePurchaseRequisitionDetailsPayload = Partial<CreatePurchaseRequisitionDetailsPayload>;

export interface IPurchaseRequisitionDetailsState {
    purchaseRequisitionDetails: IPurchaseRequisitionDetails;
    purchaseRequisitonDetailsList: IPurchaseRequisitionDetails[];
    filteredPurchaseRequisitionDetails: IPurchaseRequisitionDetails[];
    paginationObject: PaginationObject<IPurchaseRequisitionDetails>;
    loading: boolean;
    validationErrors: PurchaseRequisitionDetailsValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}

