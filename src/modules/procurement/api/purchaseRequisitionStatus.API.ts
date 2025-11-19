import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreatePurchaseRequisitionStatusPayload, IPurchaseRequisitionStatus, UpdatePurchaseRequisitionStatusPayload } from "../pages/purchaseRequisitionStatus/purchaseRequisitionStatus.interface";

// Fetch paginated
export const fetchPagedPurchaseRequisitionStatus = async (
    params: FetchParams = {}
): Promise<PaginationObject<IPurchaseRequisitionStatus>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/purchase-requisition-status?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllPurchaseRequisitionStatus = async (): Promise<IPurchaseRequisitionStatus[]> => {
    const res = await axiosInstance.get('/purchase-requisition-status/all');
    return res.data;
};

// Get a single by ID
export const showPurchaseRequisitionStatus = async (id: number): Promise<IPurchaseRequisitionStatus> => {
    const res = await axiosInstance.get(`/purchase-requisition-status/${id}`);
    return res.data;
};

// Create a new 
export const createPurchaseRequisitionStatus = async (
    payload: CreatePurchaseRequisitionStatusPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/purchase-requisition-statuses', payload);
    return res.data;
};

// Update an existing 
export const updatePurchaseRequisitionStatus = async (
    id: number,
    payload: UpdatePurchaseRequisitionStatusPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/purchase-requisition-statuses/${id}`, payload);
    return res.data;
};

// Soft-delete a 
export const deletePurchaseRequisitionStatus = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/purchase-requisition-statuses/${id}`);
    return res.data;
};