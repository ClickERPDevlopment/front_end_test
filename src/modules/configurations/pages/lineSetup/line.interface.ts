import z from "zod";
import { PaginationObject } from "../../../../types/global";
import { number } from 'zod';

export interface ILine {
    // IDs
    id: number;
    floorId: number;


    lineCode: string;
    lineName: string;
    floorName: string;
    chiefSupervisor: string;
    bestFor: string;
    operatorQTY?: number;
    helperQTY?: number;
    groupName: string;
    remarks: string;
    actions?: string;
    sortingNo: number;
    isActive?: boolean;
}

// Zod schema
export const LineSchema = z.object({
    id: z.number().min(0, "Line Id must be 0 or positive"),
    lineCode: z.string().min(1, "Line Code is required").max(10, "Line Code too long"),
    floorName: z.string().min(1, "Floor Name is required").max(100, "Floor Name too long"),
    lineName: z.string().min(1, "Line Name is required").max(100, "Line Name too long"),
    chiefSupervisor: z.string().min(1, "Cheif Supervisor Name is required").max(100, "Cheif Supervisor Name too long"),
    bestFor: z.string().min(1, "Best For is required").max(100, "Best For too long"),
    operatorQTY: z.number().min(0, "Operator Quantity must be 0 or positive"),
    helperQTY: z.number().min(0, "Helper Quantity must be 0 or positive"),
    groupName: z.string().min(1, "Group Name is required").max(100, "Group Name too long"),
    remarks: z.string().min(2, "Remarks too short"),
});

// Validation error type
export type LineValidationErrors = Partial<Record<keyof ILine, string>>;
export type CreateLinePayload = Omit<ILine, 'id'>;
export type UpdateLinePayload = Partial<CreateLinePayload>;

export interface ILineState {
    line: ILine;
    lines: ILine[];
    filteredLines: ILine[];
    paginationObject: PaginationObject<ILine>;
    loading: boolean;
    validationErrors: LineValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}