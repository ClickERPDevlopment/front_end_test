import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreatePurchaseRequisitionDetailsPayload, IPurchaseRequisitionDetails, UpdatePurchaseRequisitionDetailsPayload } from "../pages/purchaseRequisitionDetails/purchaseRequisitionDetails.interface";


// Fetch paginated
export const fetchPagedPurchaseRequisitionDetails = async (
    params: FetchParams = {}
): Promise<PaginationObject<IPurchaseRequisitionDetails>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/purchase-requisition-details?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllPurchaseRequisitionDetails = async (): Promise<IPurchaseRequisitionDetails[]> => {
    const res = await axiosInstance.get('/purchase-requisition-details/all');
    return res.data;
};

// Get a single by ID
export const showPurchaseRequisitionDetails = async (id: number): Promise<IPurchaseRequisitionDetails> => {
    const res = await axiosInstance.get(`/purchase-requisition-details/${id}`);
    return res.data;
};

// Create a new
export const createPurchaseRequisitionDetails = async (
    payload: CreatePurchaseRequisitionDetailsPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/purchase-requisition-detailses', payload);
    return res.data;
};

// Update an existing
export const updatePurchaseRequisitionDetails = async (
    id: number,
    payload: UpdatePurchaseRequisitionDetailsPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/purchase-requisition-detailses/${id}`, payload);
    return res.data;
};

// Soft-delete a
export const deletePurchaseRequisitionDetails = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/purchase-requisition-detailses/${id}`);
    return res.data;
};