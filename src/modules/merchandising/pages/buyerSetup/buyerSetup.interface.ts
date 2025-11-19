import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IBuyer {
    id: number;
    countryId: number;
    countryName: string;
    displayName: string;
    mainBuyerId: number;
    buyerName: string;
    // buyerId: number;
    buyerCode: string;
    contactNo: string;
    email: string;
    buyingCommission: number;
    symbolicName: string;
    address: string;
    isNoStartFromZero?: boolean;
    isActive?: boolean;
    actions?: boolean;
}

export const buyerSchema = z.object({
    countryId: z.number().min(0, "Country Id must be 0 or positive"),
    displayName: z.string().min(1, "Display Name is required").max(10, "Display Name too long"),
    mainBuyerId: z.number().min(0, "Main buyer Id must be 0 or positive"),
    buyerName: z.string().min(1, "Buyer Name is required").max(10, "Buyer Name too long"),
    buyerId: z.number().min(0, "Buyer Id must be 0 or positive"),
    contactNo: z.string().min(1, "Contact No is required").max(10, "Contact No too long"),
    email: z.string().min(1, "Buyer Email is required").max(10, "Buyer Email too long"),
    buyingComission: z.string().min(1, "Buyer Commission is required").max(10, "Buyer Commission too long"),
    symbolicName: z.string().min(1, "Buyer Symbolic Name is required").max(10, "Buyer Symbolic Name too long"),
    address: z.string().min(1, "Buyer Address is required").max(10, "Buyer Address too long"),
    isNoStartFromZero: z.boolean(),
    isActive: z.boolean(),
});

// Validation error type
export type BuyerValidationErrors = Partial<Record<keyof IBuyer, string>>;
export type CreateBuyerPayload = Omit<IBuyer, 'id'>;
export type UpdateBuyerPayload = Partial<CreateBuyerPayload>;

export interface IBuyerState {
    buyer: IBuyer;
    buyers: IBuyer[];
    filteredBuyers: IBuyer[];
    paginationObject: PaginationObject<IBuyer>;
    loading: boolean;
    validationErrors: BuyerValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}