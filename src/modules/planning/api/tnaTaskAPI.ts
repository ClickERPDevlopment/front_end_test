import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreateTnaTaskPayload, ITnaTask, UpdateTnaTaskPayload } from "../pages/tnaTaskSetup/tnaTaskType.interface";

// Fetch paginated task
export const fetchPagedLines = async (
    params: FetchParams = {}
): Promise<PaginationObject<ITnaTask>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/lines?${queryString}`);
    return res.data;
};

// Fetch all task (non-paginated)
export const fetchAllLines = async (): Promise<ITnaTask[]> => {
    const res = await axiosInstance.get('/tna-task/all');
    return res.data;
};

// Get a single task by ID
export const showLine = async (id: number): Promise<ITnaTask> => {
    const res = await axiosInstance.get(`/tna-task/${id}`);
    return res.data;
};

// Create a new task
export const createLine = async (
    payload: CreateTnaTaskPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/tna-task', payload);
    return res.data;
};

// Update an existing task
export const updateLine = async (
    id: number,
    payload: UpdateTnaTaskPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/tna-task/${id}`, payload);
    return res.data;
};

// Soft-delete a task
export const deleteLine = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/tna-task/${id}`);
    return res.data;
};