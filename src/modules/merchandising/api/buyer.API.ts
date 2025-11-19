import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import axiosInstance from "@/api/axiosInstance";
import { CreateBuyerPayload, IBuyer, UpdateBuyerPayload } from "../pages/buyerSetup/buyerSetup.interface";

// Fetch paginated buyer
export const fetchPagedBuyers = async (
    params: FetchParams = {}
): Promise<PaginationObject<IBuyer>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/buyer?${queryString}`);
    return res.data;
};

// Fetch all buyer (non-paginated)
export const fetchAllBuyers = async (): Promise<IBuyer[]> => {
    const res = await axiosInstance.get('buyer/GetAllBuyer');
    return res.data;
};

// Get a single buyer by ID
export const showBuyer = async (id: number): Promise<IBuyer> => {
    const res = await axiosInstance.get(`/buyer/${id}`);
    return res.data;
};

// Create a new buyer
export const createBuyer = async (
    payload: CreateBuyerPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/buyers', payload);
    return res.data;
};

// Update an existing buyer
export const updateBuyer = async (
    id: number,
    payload: UpdateBuyerPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/buyers/${id}`, payload);
    return res.data;
};

// Soft-delete a buyer
export const deleteBuyer = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/buyers/${id}`);
    return res.data;
};


export const FetchAllConfigBuyer = async (): Promise<IBuyer[]> => {
    const res = await axiosInstance.get('buyer/GetAllBuyer');
    return res.data;
};
