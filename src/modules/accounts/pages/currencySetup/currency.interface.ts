import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface ICurrency {
    Id: number;
    Currencyname: string;
    Currencycode: string;
    Symbol: string;
    Isdefault: boolean;
    actions?: boolean;
    Rate?: number;
}

// Zod schema
export const currencySchema = z.object({
    id: z.number().min(0, "ID must be 0 or positive"),
    currencyName: z.string().min(1, "Currency name is required").max(100, "Currency Name too long"),
    currencyCode: z.string().min(1, "Currency code is required").max(10, "Currency Code too long"),
    currencySymbol: z.string().min(1, "Symbol is required").max(4, "Symbol too long"),
    isDefault: z.union([
        z.literal("0"),
        z.literal("1"),
        z.boolean()
    ]).refine(val => val === "0" || val === "1" || typeof val === "boolean", {
        message: "isDefault must be '0', '1', or boolean",
    }),
});

// Validation error type
export type CurrencyValidationErrors = Partial<Record<keyof ICurrency, string>>;
export type CreateCurrencyPayload = Omit<ICurrency, 'id'>;
export type UpdateCurrencyPayload = Partial<CreateCurrencyPayload>;

export interface ICurrencyState {
    currency: ICurrency;
    currencies: ICurrency[];
    filteredCurrencies: ICurrency[];
    paginationObject: PaginationObject<ICurrency>;
    loading: boolean;
    validationErrors: CurrencyValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}