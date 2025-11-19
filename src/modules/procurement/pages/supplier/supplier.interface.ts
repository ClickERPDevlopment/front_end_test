import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface ISupplier {
    id: number;
    Name: string,
}

// Zod schema
 export const supplierSchema = z.object({
//     storeId: z.number().min(0, "Material Store Id must be 0 or positive"),
//     code: z.string().min(0, "Material Store Code is short").max(100, "Material Store Code is Large"),
//     name: z.string().min(1, "Material Store Name is required").max(100, "Material Store Name too long"),
});

// Validation error type
export type SupplierValidationErrors = Partial<Record<keyof ISupplier, string>>;
export type CreateSupplierPayload = Omit<ISupplier, 'id'>;
export type UpdateInventorySalePayload = Partial<CreateSupplierPayload>;

export interface ISupplierState {
    suppliers: ISupplier[];
    paginationObject?: PaginationObject<ISupplier>;
    loading: boolean;
    validationErrors: SupplierValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}