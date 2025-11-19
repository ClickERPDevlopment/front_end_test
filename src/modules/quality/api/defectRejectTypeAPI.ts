import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import axiosInstance from "@/api/axiosInstance";
import { CreateDefectRejectTypePayload, IDefectRejectType, UpdateDefectRejectTypePayload } from "../pages/defectRejectType/defectRejectType.interface";

// Fetch paginated
export const fetchPagedDefectRejectTypes = async (
    params: FetchParams = {}
): Promise<PaginationObject<IDefectRejectType>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/defect-reject?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllDefectRejectTypes = async (): Promise<IDefectRejectType[]> => {
    const res = await axiosInstance.get('/defect-rejects/all');
    return res.data;
};

// Get a single by ID
export const showDefectRejectType = async (id: number): Promise<IDefectRejectType> => {
    const res = await axiosInstance.get(`/defect-rejects/${id}`);
    return res.data;
};

// Create a new
export const createDefectRejectType = async (
    payload: CreateDefectRejectTypePayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/defect-rejects', payload);
    return res.data;
};

// Update an existing
export const updateDefectRejectType = async (
    id: number,
    payload: UpdateDefectRejectTypePayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/defect-rejects/${id}`, payload);
    return res.data;
};

// Soft-delete a
export const deleteDefectRejectType = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/defect-rejects/${id}`);
    return res.data;
};