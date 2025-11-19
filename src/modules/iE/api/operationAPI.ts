import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import axiosInstance from "@/api/axiosInstance";
import { CreateOperationPayload, IOperation, UpdateOperationPayload } from "../pages/operationSetup/operation.interface";


// Fetch paginated
export const fetchPagedOperations = async (
    params: FetchParams = {}
): Promise<PaginationObject<IOperation>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/operation-setups?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllOperations = async (): Promise<IOperation[]> => {
    const res = await axiosInstance.get('/operation-setups/all');
    return res.data;
};

// Get a single by ID
export const showOperation = async (id: number): Promise<IOperation> => {
    const res = await axiosInstance.get(`/operation-setups/${id}`);
    return res.data;
};

// Create a new
export const createOperation = async (
    payload: CreateOperationPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/operation-setups', payload);
    return res.data;
};

// Update an existing
export const updateOperation = async (
    id: number,
    payload: UpdateOperationPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/operation-setups/${id}`, payload);
    return res.data;
};

// Soft-delete a
export const deleteOperation = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/operation-setups/${id}`);
    return res.data;
};