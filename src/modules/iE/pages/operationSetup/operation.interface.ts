import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IOperation {
    id: number;
    section: string;
    productType: string;
    itemType: string;
    operationName: string;
    operationLocalName: string;
    grade: string;
    smv: string;
    machine: string;
    operationType: string;
    operationSection: string;
    pressureFoot: string;
    guideFolder: string;
    attachment: string;
    remarks: string;
    isCritical?: boolean;
    isActive?: boolean;
    actions?: string;
}

// Zod schema
export const operationSchema = z.object({
    id: z.number().min(0, "Operation Id must be 0 or positive"),
    section: z.string().min(1, "Section is required").max(10, "Section too long"),
    productType: z.string().min(1, "Product Type is required").max(10, "Product Type too long"),
    itemType: z.string().min(1, "Item Type is required").max(10, "Item Type too long"),
    operationName: z.string().min(1, "Operation Name is required").max(10, "Operation Name too long"),
    operationLocalName: z.string().min(1, "Operation Local Name is required").max(10, "Operation Local Name too long"),
    grade: z.string().min(1, "Grade is required").max(10, "Grade too long"),
    smv: z.string().min(1, "SMV is required").max(10, "SMV too long"),
    macine: z.string().min(1, "Machine is required").max(10, "Machine too long"),
    operationType: z.string().min(1, "Operation Type is required").max(10, "Operation Type too long"),
    operationSection: z.string().min(1, "Operation Section is required").max(10, "Operaton Section too long"),
    pressureFoot: z.string().min(1, "Pressure Foot is required").max(10, "Pressure Foot too long"),
    guideFolder: z.string().min(1, "Guide Folder is required").max(10, "Guide Folder too long"),
    attachment: z.string().min(1, "Attachment is required").max(10, "Attachment too long"),
    type: z.string().min(1, "Type is required").max(10, "Type too long"),
    remarks: z.string().min(2, "Remarks too short"),
    isActive: z.boolean(),
    isCritical: z.boolean(),
});

// playload for type
export type OperationValidationErrors = Partial<Record<keyof IOperation, string>>;
export type CreateOperationPayload = Omit<IOperation, 'id'>;
export type UpdateOperationPayload = Partial<CreateOperationPayload>;

// playload for setup
export interface IOperationState {
    operation: IOperation;
    operations: IOperation[];
    filteredOperation: IOperation[];
    paginationObject: PaginationObject<IOperation>;
    loading: boolean;
    validationErrors: OperationValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}