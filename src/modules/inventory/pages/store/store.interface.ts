import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IStore {
    // IDs
    id: number;
    storeGroupId: number;
    factoryId: number;

    storeCode: string;
    storeName: string;
    storePrefix: string;
    contactPersonName: string;
    contactPersonNumber: string;
    address: string;
    remarks: string;
    isActive?: boolean;
    actions?: string;

    factoryName: string;

    storeGroupName: string;
}

// Zod schema
export const storeSchema = z.object({
    // storeId: z.number().min(0, "Material Store Id must be 0 or positive"),
    // code: z.string().min(0, "Material Store Code is short").max(100, "Material Store Code is Large"),
    // name: z.string().min(1, "Material Store Name is required").max(100, "Material Store Name too long"),
});

// Validation error type
export type StoreValidationErrors = Partial<Record<keyof IStore, string>>;
export type CreateStorePayload = Omit<IStore, 'id'>;
export type UpdateStorePayload = Partial<CreateStorePayload>;

export interface IStoreState {
    store: IStore;
    stores: IStore[];
    filteredStore: IStore[];
    paginationObject: PaginationObject<IStore>;
    loading: boolean;
    validationErrors: StoreValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}