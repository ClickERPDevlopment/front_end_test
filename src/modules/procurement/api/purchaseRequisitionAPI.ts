import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreatePurchaseRequisitionPayload, IPurchaseRequisition, UpdatePurchaseRequisitionPayload } from "../pages/purchaseRequisition/purchaseRequisition.interface";

// Fetch paginated 
export const fetchPagedPurchaseRequisition = async (
    params: FetchParams = {}
): Promise<PaginationObject<IPurchaseRequisition>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/purchase-requisition?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllPurchaseRequisition = async (): Promise<IPurchaseRequisition[]> => {
    const res = await axiosInstance.get('/purchase-requisition/all');
    return res.data;
};

// Get a single by ID
export const showPurchaseRequisition = async (id: number): Promise<IPurchaseRequisition> => {
    const res = await axiosInstance.get(`/purchase-requisition/${id}`);
    return res.data;
};

// Create a new
export const createPurchaseRequisition = async (
    payload: CreatePurchaseRequisitionPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/purchase-requisition', payload);
    return res.data;
};

// Update an existing
export const updatePurchaseRequisition = async (
    id: number,
    payload: UpdatePurchaseRequisitionPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/purchase-requisition/${id}`, payload);
    return res.data;
};

// Soft-delete a purchaseRequisition
export const deletePurchaseRequisition = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/purchase-requisition/${id}`);
    return res.data;
};