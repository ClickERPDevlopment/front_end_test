import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IFloor {
    id: number;
    sectionId: number;

    sectionName: string;
    floorCode: string;
    floorName: string;
    floorInchargeName: string;
    productionManagerName: string;
    remarks: string;                        // or boolean if you prefer
    actions?: string;
    isSubContract?: boolean;                // Optional, if applicable
    isActive?: boolean;                     // Optional, if applicable
}

// Zod schema
export const floorSchema = z.object({
    id: z.number().min(0, "Floor id must be 0 or positive"),
    floorCode: z.string().min(1, "Floor Code is required").max(10, "Floor Code too long"),
    floorName: z.string().min(1, "Floor Name is required").max(100, "Floor Name too long"),
    floorInchargeName: z.string().min(1, "Floor Incharge Name is required").max(100, "Floor Incharge Name too long"),
    productionManagerName: z.string().min(1, "Production Manager Name is required").max(100, "Production Manager Name too long"),
    remarks: z.string().min(2, "Remarks too short"),
});

// Validation error type
export type FloorValidationErrors = Partial<Record<keyof IFloor, string>>;
export type CreateFloorPayload = Omit<IFloor, 'id'>;
export type UpdateFloorPayload = Partial<CreateFloorPayload>;

export interface IFloorState {
    floor: IFloor;
    floors: IFloor[];
    filteredFloor: IFloor[];
    paginationObject: PaginationObject<IFloor>;
    loading: boolean;
    validationErrors: FloorValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}