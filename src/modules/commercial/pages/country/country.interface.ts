import z from "zod";
import { PaginationObject } from "../../../../types/global";

// Group related fields
export interface ICountry {
    id: number;
    countryName: string;
    countryCode: string;
}

// zod schema
export const countrySchema = z.object({
    id: z.number().min(0, "Country Id must be 0 or positive"),
    countryName: z.string().min(1, "Country Name is required").max(100, "Country Name too long"),
    countryCode: z.string().min(1, "Country Code is required").max(10, "Country Code too long"),
});

// Validation error type
export type CountryValidationErrors = Partial<Record<keyof ICountry, string>>;
export type CreateCountryPayload = Omit<ICountry, 'id'>;
export type UpdateCountryPayload = Partial<CreateCountryPayload>;

export interface ICountryState {
    country: ICountry;
    countries: ICountry[];
    filteredcountrys: ICountry[];
    paginationObject: PaginationObject<ICountry>;
    loading: boolean;
    validationErrors: CountryValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}