import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IMachines {
    id: number;
    type: string;
    code: string;
    name: string;
    category: string;
    brand: string;
    model: string;
    wastage: number;
    cone: string;
    remarks: string;
    actions?: string;
}

export interface IStitchType {
    id: number;
    name: string;
}

export interface IMachineToStitchMap {
    stitchTypes: IStitchType[];
    machine: IMachines;
}

// Zod schema
export const ieMachinesSchema = z.object({
    id: z.number().min(0, "Machine Id must be 0 or positive"),
    type: z.string().min(1, "Machine Type is required").max(10, "Machine Type too long"),
    code: z.string().min(1, "Machine Code is required").max(10, "Machine Code too long"),
    name: z.string().min(1, "Machine Name is required").max(100, "Machine Name too long"),
    category: z.string().min(1, "Machine Category is required").max(100, "Machine Category too long"),
    brand: z.string().min(1, "Machine Brand is required").max(100, "Machine Brand too long"),
    model: z.string().min(1, "Machine Model is required").max(100, "Machine Model too long"),
    wastage: z.number().min(0, "Machine Wastage must be 0 or positive"),
    cone: z.string().min(1, "Machine Cone is required").max(100, "Machine Cone too long"),
    remarks: z.string().min(2, "Remarks too short"),
});

export type MachineValidationErrors = Partial<Record<keyof IMachines, string>>;
export type CreateMachinePayload = Omit<IMachines, 'id'>;
export type UpdateMachinePayload = Partial<CreateMachinePayload>;

export interface IMachineState {
    machine: IMachines;
    machines: IMachines[];
    stitchTypes: IStitchType[];
    machineStitches?: IMachineToStitchMap;
    filteredMachine: IMachines[];
    paginationObject: PaginationObject<IMachines>;
    loading: boolean;
    validationErrors: MachineValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}