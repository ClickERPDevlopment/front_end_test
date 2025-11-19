import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IBusinessUnit {
    baNo: number;
    baName: string;
    id: number;
}

// Zod schema
export const businessUnitSchema = z.object({
    id: z.number().min(0, "ID must be 0 or positive"),
    baNo: z.number().min(0, "ID must be 0 or positive"),
    baName: z.string().min(1, "Business Name is required").max(10, "Business Name too long"),
});


// Validation error type
export type BusinessUnitValidationErrors = Partial<Record<keyof IBusinessUnit, string>>;
export type CreateBusinessUnitPayload = Omit<IBusinessUnit, 'id'>;
export type UpdateBusinessUnitPayload = Partial<CreateBusinessUnitPayload>;

export interface IBusinessUnitState {
    businessUnit: IBusinessUnit;
    businessUnits: IBusinessUnit[];
    filteredBusinessUnit: IBusinessUnit[];
    paginationObject: PaginationObject<IBusinessUnit>;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string;
}