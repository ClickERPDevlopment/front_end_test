import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface ITnaTaskGroup {
    id: number;
    name: string;
    colorCode: string | null;
}

// Zod schema for Line
export const LineSchema = z.object({
    id: z.number().min(0, "ID must be 0 or positive"),
    name: z.string().min(1, "Name is required").max(50, "Name too long"),
});

// Validation error type
export type TnaTaskGroupValidationErrors = Partial<Record<keyof ITnaTaskGroup, string>>;
// Payload when creating(id is omitted)
export type CreateTnaTaskGroupPayload = Omit<ITnaTaskGroup, 'id'>;
// Payload when updating (usually partial)
export type UpdateTnaTaskGroupPayload = Partial<CreateTnaTaskGroupPayload>;

export interface ITnaTaskGroupState {
    tnaTaskGroup: ITnaTaskGroup;
    tnaTaskGroups: ITnaTaskGroup[];
    paginationObject: PaginationObject<ITnaTaskGroup>;
    loading: boolean;
    validationErrors: TnaTaskGroupValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}
