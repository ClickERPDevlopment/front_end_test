import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IDefectRejectType {
    isDefect?: boolean;
    isReject?: boolean;
    id: number;
    code: string;
    name: string;
    type: string;
    sortBy: string;
    penaltyPoints: number;
    remarks: string;
    actions?: string;
}

// Zod schema
export const defectRejectTypeSchema = z.object({
    isDefect: z.boolean(),
    isReject: z.boolean(),
    id: z.number().min(0, "ID must be 0 or positive"),
    code: z.string().min(1, "Code is required").max(10, "Code too long"),
    name: z.string().min(1, "Name is required").max(100, "Name too long"),
    type: z.string().min(1, "Type is required").max(10, "Type too long"),
    sortBy: z.string().min(1, "Sort by is required").max(100, "Sort by too long"),
    penaltyPoints: z.number(),
    remarks: z.string().min(2, "Remarks too short"),
});


export type DefectRejectTypeValidationErrors = Partial<Record<keyof IDefectRejectType, string>>;
export type CreateDefectRejectTypePayload = Omit<IDefectRejectType, 'id'>;
export type UpdateDefectRejectTypePayload = Partial<CreateDefectRejectTypePayload>;


export interface IDefectRejectTypeState {
    defectReject: IDefectRejectType;
    defectRejects: IDefectRejectType[];
    paginationObject: PaginationObject<IDefectRejectType>;
    loading: boolean;
    validationErrors: DefectRejectTypeValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}