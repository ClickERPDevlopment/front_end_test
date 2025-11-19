import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreatePurchaseRequisitionHistoryPayload, IPurchaseRequisitionHistory, UpdatePurchaseRequisitionHistoryPayload } from "../pages/purchaseRequisitionHistory/purchaseRequisitionHistory.interface";

// Fetch paginated
export const fetchPagedPurchaseRequisitionHistory = async (
    params: FetchParams = {}
): Promise<PaginationObject<IPurchaseRequisitionHistory>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/purchase-requisition-history?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllPurchaseRequisitionHistory = async (): Promise<IPurchaseRequisitionHistory[]> => {
    const res = await axiosInstance.get('/purchase-requisition-history/all');
    return res.data;
};

// Get a single by ID
export const showPurchaseRequisitionHistory = async (id: number): Promise<IPurchaseRequisitionHistory> => {
    const res = await axiosInstance.get(`/purchase-requisition-history/${id}`);
    return res.data;
};

// Create a new
export const createPurchaseRequisitionHistory = async (
    payload: CreatePurchaseRequisitionHistoryPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/purchase-requisition-histories', payload);
    return res.data;
};

// Update an existing
export const updatePurchaseRequisitionHistory = async (
    id: number,
    payload: UpdatePurchaseRequisitionHistoryPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/purchase-requisition-histories/${id}`, payload);
    return res.data;
};

// Soft-delete a
export const deletePurchaseRequisitionHistory = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/purchase-requisition-histories/${id}`);
    return res.data;
};