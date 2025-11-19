import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreateUomPayload, IUom, UpdateUomPayload } from "../pages/uomSetup/uom.interface";

// Fetch paginated uoms
export const fetchPagedUoms = async (
    params: FetchParams = {}
): Promise<PaginationObject<IUom>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/uoms?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllUoms = async (): Promise<IUom[]> => {
    const res = await axiosInstance.get('/uom');
    return res.data;
};

// Get a single by ID
export const showUom = async (id: number): Promise<IUom> => {
    const res = await axiosInstance.get(`/uoms/${id}`);
    return res.data;
};

// Create a new 
export const createUom = async (
    payload: CreateUomPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/uoms', payload);
    return res.data;
};

// Update an existing 
export const updateUom = async (
    id: number,
    payload: UpdateUomPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/uoms/${id}`, payload);
    return res.data;
};

// Soft-delete a
export const deleteUom = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/uoms/${id}`);
    return res.data;
};