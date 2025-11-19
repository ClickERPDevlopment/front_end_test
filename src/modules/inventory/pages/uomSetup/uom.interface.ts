import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IUom {
    id: number;
    uomType: string;
    uomName: string;
    uomShortname: string;
    uomConvertRate: number;
    actions?: string;
    Id?: number;
    Name?: string;
    Shortname?: string;
}

// Zod schema
export const uomSchema = z.object({
    id: z.number().min(0, "Id must be 0 or positive"),
    uomType: z.string().min(1, "Uom Code is required").max(10, "Uom Code too long"),
    uomName: z.string().min(1, "Uom Name is required").max(100, "Uom Name too long"),
    uomShortname: z.string().min(1, "Shortname is required").max(100, "Shortname too long"),
    uomConvertRate: z.number().min(1, "Convert Rate is required").max(100, "Convert Rate too long"),
    remarks: z.string().min(2, "Remarks too short"),
});

// Validation error type
export type UomValidationErrors = Partial<Record<keyof IUom, string>>;
export type CreateUomPayload = Omit<IUom, 'id'>;
export type UpdateUomPayload = Partial<CreateUomPayload>;

export interface IUomState {
    uom: IUom;
    uoms: IUom[];
    filteredUom: IUom[];
    paginationObject: PaginationObject<IUom>;
    loading: boolean;
    validationErrors: UomValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}