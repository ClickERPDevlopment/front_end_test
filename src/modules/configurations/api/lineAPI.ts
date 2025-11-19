import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreateLinePayload, ILine, UpdateLinePayload } from "../pages/lineSetup/line.interface";

// Fetch paginated Lines
export const fetchPagedLines = async (
    params: FetchParams = {}
): Promise<PaginationObject<ILine>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/lines?${queryString}`);
    return res.data;
};

// Fetch all Lines (non-paginated)
export const fetchAllLines = async (): Promise<ILine[]> => {
    const res = await axiosInstance.get('/lines/all');
    return res.data;
};

// Get a single Line by ID
export const showLine = async (id: number): Promise<ILine> => {
    const res = await axiosInstance.get(`/lines/${id}`);
    return res.data;
};

// Create a new Line
export const createLine = async (
    payload: CreateLinePayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/lines', payload);
    return res.data;
};

// Update an existing Line
export const updateLine = async (
    id: number,
    payload: UpdateLinePayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/lines/${id}`, payload);
    return res.data;
};

// Soft-delete a Line
export const deleteLine = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/lines/${id}`);
    return res.data;
};