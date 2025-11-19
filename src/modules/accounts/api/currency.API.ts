import axiosInstance from "@/api/axiosInstance";
import { CreateCurrencyPayload, ICurrency, UpdateCurrencyPayload } from '@/modules/accounts/pages/currencySetup/currency.interface';
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";

// Fetch paginated currencies
export const fetchPagedCurrencies = async (
    params: FetchParams = {}
): Promise<PaginationObject<ICurrency>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`accounts/getCurrencies?${queryString}`);
    return res.data;
};

// Fetch all currencies (non-paginated)
// export const fetchAllCurrencies = async (): Promise<ICurrency[]> => {
//     const res = await axiosInstance.get('Currency');
//     return res.data;
// };

// Get a single currency by ID
export const showCurrency = async (id: number): Promise<ICurrency> => {
    const res = await axiosInstance.get(`accounts/showCurrency/${id}`);
    return res.data;
};

// Create a new currency
export const createCurrency = async (
    payload: CreateCurrencyPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('accounts/createCurrency', payload);
    return res.data;
};

// Update an existing currency
export const updateCurrency = async (
    id: number,
    payload: UpdateCurrencyPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`accounts/updateCurrency/${id}`, payload);
    return res.data;
};

// Soft-delete a currency
export const deleteCurrency = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`accounts/deleteCurrency/${id}`);
    return res.data;
};