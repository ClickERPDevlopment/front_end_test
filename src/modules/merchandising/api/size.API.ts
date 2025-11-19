import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import axiosInstance from "@/api/axiosInstance";
import { CreateSizePayload, ISize, UpdateSizePayload } from "../pages/sizeSetup/sizeSetup.interface";

// Fetch paginated size
export const fetchPagedSizes = async (
    params: FetchParams = {}
): Promise<PaginationObject<ISize>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/size?${queryString}`);
    return res.data;
};

// Fetch all size (non-paginated)
export const fetchAllSizes = async (): Promise<ISize[]> => {
    const res = await axiosInstance.get('/size/all');
    return res.data;
};

// Get a single size by ID
export const showSize = async (id: number): Promise<ISize> => {
    const res = await axiosInstance.get(`/size/${id}`);
    return res.data;
};

// Create a new size
export const createSize = async (
    payload: CreateSizePayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/sizes', payload);
    return res.data;
};

// Update an existing size
export const updateSize = async (
    id: number,
    payload: UpdateSizePayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/sizes/${id}`, payload);
    return res.data;
};

// Soft-delete a size
export const deleteSize = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/sizes/${id}`);
    return res.data;
};