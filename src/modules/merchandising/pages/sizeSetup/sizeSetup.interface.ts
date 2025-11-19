import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface ISize {
    id: number;

    buyerId: number;
    buyerName: string;
    displayName: string;
    sizeName: string;
    sortingBy: string;
    isInSeam: boolean;
    sortingNo: number;

    actions?: boolean;
}

export const sizeSchema = z.object({
    buyerId: z.number(),
    buyerName: z.string(),
    displayName: z.string(),
    sortingBy: z.string(),
    isInSeam: z.boolean(),
});

// Validation error type
export type SizeValidationErrors = Partial<Record<keyof ISize, string>>;
export type CreateSizePayload = Omit<ISize, 'id'>;
export type UpdateSizePayload = Partial<CreateSizePayload>;

export interface ISizeState {
    size: ISize;
    sizes: ISize[];
    filteredSizes: ISize[];
    paginationObject: PaginationObject<ISize>;
    loading: boolean;
    validationErrors: SizeValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}