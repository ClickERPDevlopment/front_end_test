import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import axiosInstance from "@/api/axiosInstance";
import { CreateOperationTypePayload, IOperationType, UpdateOperationTypePayload } from "../pages/operationTypeSetup/operationTypeSetup.interface";


// Fetch paginated
export const fetchPagedOperationTypes = async (
    params: FetchParams = {}
): Promise<PaginationObject<IOperationType>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/operation-types?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllOperationTypes = async (): Promise<IOperationType[]> => {
    const res = await axiosInstance.get('/operation-types/all');
    return res.data;
};

// Get a single by ID
export const showOperationType = async (id: number): Promise<IOperationType> => {
    const res = await axiosInstance.get(`/operation-types/${id}`);
    return res.data;
};

// Create a new
export const createOperationType = async (
    payload: CreateOperationTypePayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/operation-types', payload);
    return res.data;
};

// Update an existing
export const updateOperationType = async (
    id: number,
    payload: UpdateOperationTypePayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/operation-types/${id}`, payload);
    return res.data;
};

// Soft-delete a
export const deleteOperationType = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/operation-types/${id}`);
    return res.data;
};