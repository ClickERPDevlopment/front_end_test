import { FetchParams, PaginationObject } from "@/types/global";
import { CreateMaterialGroupPayload, IMaterialGroup, UpdateMaterialGroupPayload } from "../pages/materialGroupSetup/materialgroup.interface";
import { buildQueryParams } from "@/utils/url";
import axiosInstance from "@/api/axiosInstance";

// Fetch paginated
export const fetchPagedMaterialGroups = async (
    params: FetchParams = {}
): Promise<PaginationObject<IMaterialGroup>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/material-group?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllMaterialGroups = async (): Promise<IMaterialGroup[]> => {
    const res = await axiosInstance.get('/material-group/all');
    return res.data;
};

// Get a single by ID
export const showMaterialGroup = async (id: number): Promise<IMaterialGroup> => {
    const res = await axiosInstance.get(`/material-group/${id}`);
    return res.data;
};

// Create a new
export const createMaterialGroup = async (
    payload: CreateMaterialGroupPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/material-groups', payload);
    return res.data;
};

// Update an existing
export const updateMaterialGroup = async (
    id: number,
    payload: UpdateMaterialGroupPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/material-groups/${id}`, payload);
    return res.data;
};

// Soft-delete a
export const deleteMaterialGroup = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/material-groups/${id}`);
    return res.data;
};