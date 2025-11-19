import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IStoreGroup {
    id: number;
    storeGroup: string;
    factoryId: string;
    factoryName: string;
}

// Zod schema
export const storeSchema = z.object({
    id: z.number().min(0, "Material Store Id must be 0 or positive"),
    storeGroup: z.string(),
    factoryId: z.string(),
    factoryName: z.string(),
    storeCode: z.string(),
});

// Validation error type
export type StoreGroupValidationErrors = Partial<Record<keyof IStoreGroup, string>>;
export type CreateStoreGroupPayload = Omit<IStoreGroup, 'id'>;
export type UpdateStoreGroupPayload = Partial<CreateStoreGroupPayload>;

export interface IStoreGroupState {
    storeGroup: IStoreGroup;
    storeGroups: IStoreGroup[];
    filteredStoreGroup: IStoreGroup[];
    paginationObject: PaginationObject<IStoreGroup>;
    loading: boolean;
    validationErrors: StoreGroupValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}