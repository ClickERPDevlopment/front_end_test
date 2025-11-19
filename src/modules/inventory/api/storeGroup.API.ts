import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import axiosInstance from "@/api/axiosInstance";
import { CreateStoreGroupPayload, IStoreGroup, UpdateStoreGroupPayload } from "../pages/storeGroup/storeGroup.interface";

// Fetch paginated 
export const fetchPagedStoreGroup = async (
    params: FetchParams = {}
): Promise<PaginationObject<IStoreGroup>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/store-group?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllStoreGroup = async (): Promise<IStoreGroup[]> => {
    const res = await axiosInstance.get('/store-group/all');
    return res.data;
};

// Get a single by ID
export const showStoreGroup = async (id: number): Promise<IStoreGroup> => {
    const res = await axiosInstance.get(`/store-group/${id}`);
    return res.data;
};

// Create a new
export const createStoreGroup = async (
    payload: CreateStoreGroupPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/store-groups', payload);
    return res.data;
};

// Update an existing
export const updateStoreGroup = async (
    id: number,
    payload: UpdateStoreGroupPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/store-groups/${id}`, payload);
    return res.data;
};

// Soft-delete a
export const deleteStoreGroup = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/store-groups/${id}`);
    return res.data;
};