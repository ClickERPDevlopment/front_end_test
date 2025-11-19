import { PaginationObject } from "../../../../types/global";
import z from "zod";

export interface ICostCenter {
    costNo: number;
    costName: string;
    id: number;
    actions?: boolean;
}


export const costCenterSchema = z.object({
    id: z.number().min(0, "Cost Center Id must be 0 or positive"),
    costNo: z.string().min(1, "Cost Center No is required").max(10, "Cost Center No too long"),
    costName: z.string().min(1, "Cost Center Name is required").max(100, "Cost Center Name too long"),
});

// Validation error type
export type CostCenterValidationErrors = Partial<Record<keyof ICostCenter, string>>;
export type CreateCostCenterPayload = Omit<ICostCenter, 'id'>;
export type UpdateCostCenterPayload = Partial<CreateCostCenterPayload>;

export interface ICostCenterState {
    costCenter: ICostCenter;
    costCenters: ICostCenter[];
    filteredCostCenter: ICostCenter[];
    paginationObject: PaginationObject<ICostCenter>;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string;
}