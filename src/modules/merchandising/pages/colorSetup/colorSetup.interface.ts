import z from "zod";
import { PaginationObject } from "../../../../types/global";


export interface IColor {
    id: number;
    buyerId: number;
    buyerName: string;
    colorType: string;
    colorName: string;
    colorDisplayName: string;
    colorDescription: string;
    actions?: boolean;
}



export const colorSchema = z.object({
    buyerId: z.number(),
    buyerName: z.string(),
    colorType: z.string(),
    colorName: z.string(),
    colorDisplayName: z.string(),
    colorDescription: z.string(),
});



// Validation error type
export type ColorValidationErrors = Partial<Record<keyof IColor, string>>;
export type CreateColorPayload = Omit<IColor, 'id'>;
export type UpdateColorPayload = Partial<CreateColorPayload>;




export interface IColorState {
    color: IColor;
    colors: IColor[];
    filteredColors: IColor[];
    paginationObject: PaginationObject<IColor>;
    loading: boolean;
    validationErrors: ColorValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}