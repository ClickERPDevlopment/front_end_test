import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IOperationType {
    id: number;
    type: string;
    remarks: string;
    isActive?: boolean;
    actions?: string;
}

// Zod schema for operation type
export const operationTypeSchema = z.object({
    id: z.number().min(0, "Operation Type Id must be 0 or positive"),
    type: z.string().min(1, "Operation Type is required").max(10, "Operation Type too long"),
    remarks: z.string().min(2, "Remarks too short"),
    isActive: z.boolean()
});

// playload for type
export type OperationTypeValidationErrors = Partial<Record<keyof IOperationType, string>>;
export type CreateOperationTypePayload = Omit<IOperationType, 'id'>;
export type UpdateOperationTypePayload = Partial<CreateOperationTypePayload>;

// playload for setup
export interface IOperationTypeState {
    operationType: IOperationType;
    operationTypes: IOperationType[];
    filteredOperationType: IOperationType[];
    paginationObject: PaginationObject<IOperationType>;
    loading: boolean;
    validationErrors: OperationTypeValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}