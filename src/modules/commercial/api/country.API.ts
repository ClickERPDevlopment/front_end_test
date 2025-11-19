import { FetchParams, PaginationObject } from "@/types/global";
import { CreateCountryPayload, ICountry, UpdateCountryPayload } from "../pages/country/country.interface";
import { buildQueryParams } from "@/utils/url";
import axiosInstance from "@/api/axiosInstance";

// Fetch paginated
export const fetchPagedCountries = async (
    params: FetchParams = {}
): Promise<PaginationObject<ICountry>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/country?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllCountries = async (): Promise<ICountry[]> => {
    const res = await axiosInstance.get('/country/all');
    return res.data;
};

// Get a single by ID
export const showCountry = async (id: number): Promise<ICountry> => {
    const res = await axiosInstance.get(`/country/${id}`);
    return res.data;
};

// Create a new
export const createCountry = async (
    payload: CreateCountryPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/countries', payload);
    return res.data;
};

// Update an existing
export const updateCountry = async (
    id: number,
    payload: UpdateCountryPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/countries/${id}`, payload);
    return res.data;
};

// Soft-delete
export const deleteCountry = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/countries/${id}`);
    return res.data;
};