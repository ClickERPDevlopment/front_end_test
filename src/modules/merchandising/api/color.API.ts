import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import axiosInstance from "@/api/axiosInstance";
import { CreateColorPayload, IColor, UpdateColorPayload } from "../pages/colorSetup/colorSetup.interface";

// Fetch paginated color
export const fetchPagedColors = async (
    params: FetchParams = {}
): Promise<PaginationObject<IColor>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/color?${queryString}`);
    return res.data;
};

// Fetch all color (non-paginated)
export const fetchAllColors = async (): Promise<IColor[]> => {
    const res = await axiosInstance.get('/color/all');
    return res.data;
};

// Get a single color by ID
export const showColor = async (id: number): Promise<IColor> => {
    const res = await axiosInstance.get(`/color/${id}`);
    return res.data;
};

// Create a new color
export const createColor = async (
    payload: CreateColorPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/colors', payload);
    return res.data;
};

// Update an existing color
export const updateColor = async (
    id: number,
    payload: UpdateColorPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/colors/${id}`, payload);
    return res.data;
};

// Soft-delete a color
export const deleteColor = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/colors/${id}`);
    return res.data;
};