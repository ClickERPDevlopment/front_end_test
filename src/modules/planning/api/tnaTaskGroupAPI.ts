import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreateTnaTaskGroupPayload, ITnaTaskGroup, UpdateTnaTaskGroupPayload } from "../pages/tnaTaskGroup/tnaTaskGroup.interface";

// Fetch paginated TnaTaskGroups
export const fetchPagedTnaTaskGroups = async (
    params: FetchParams = {}
): Promise<PaginationObject<ITnaTaskGroup>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/tna-task-group?${queryString}`);
    return res.data;
};

// Fetch all TnaTaskGroups (non-paginated)
export const fetchAllTnaTaskGroups = async (): Promise<ITnaTaskGroup[]> => {
    const res = await axiosInstance.get('/tna-task-group/all');
    return res.data;
};

// Get a single TnaTaskGroup by ID
export const showTnaTaskGroup = async (id: number): Promise<ITnaTaskGroup> => {
    const res = await axiosInstance.get(`/tna-task-group/${id}`);
    return res.data;
};

// Create a new TnaTaskGroup
export const createTnaTaskGroup = async (
    payload: CreateTnaTaskGroupPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/tna-task-group', payload);
    return res.data;
};

// Update an existing TnaTaskGroup
export const updateTnaTaskGroup = async (
    id: number,
    payload: UpdateTnaTaskGroupPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/tna-task-group/${id}`, payload);
    return res.data;
};

// Soft-delete a TnaTaskGroup
export const deleteTnaTaskGroup = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/tna-task-group/${id}`);
    return res.data;
};