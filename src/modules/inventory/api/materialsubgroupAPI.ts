import { FetchParams, PaginationObject } from "@/types/global";

import { buildQueryParams } from "@/utils/url";
import axiosInstance from "@/api/axiosInstance";
import { CreateMaterialSubGroupPayload, IMaterialSubGroup, UpdateMaterialSubGroupPayload } from '../pages/materialSubGroupSetup/materialsubgroup.interface';

// Fetch paginated
export const fetchPagedMaterialSubGroups = async (
    params: FetchParams = {}
): Promise<PaginationObject<IMaterialSubGroup>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/material-subgroup?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllMaterialSubGroups = async (): Promise<IMaterialSubGroup[]> => {
    const res = await axiosInstance.get('/material-subgroup/all');
    return res.data;
};

// Get a single by ID
export const showMaterialSubGroup = async (id: number): Promise<IMaterialSubGroup> => {
    const res = await axiosInstance.get(`/material-subgroup/${id}`);
    return res.data;
};

// Create a new
export const createMaterialSubGroup = async (
    payload: CreateMaterialSubGroupPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/material-subgroups', payload);
    return res.data;
};

// Update an existing
export const updateMaterialSubGroup = async (
    id: number,
    payload: UpdateMaterialSubGroupPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/material-subgroups/${id}`, payload);
    return res.data;
};

// Soft-delete a
export const deleteMaterialSubGroup = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/material-subgroups/${id}`);
    return res.data;
};