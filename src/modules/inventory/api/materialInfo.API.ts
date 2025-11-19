import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreateMaterialInfoPayload, IMaterial, UpdateMaterialInfoPayload } from "../pages/materialInfo/materialinfo.interface";

// Fetch stock
export const fetchStockByStoreAndMaterial = async (storeId:number, itemId:number, companyID:number,): Promise<IMaterial> => {
    const res = await axiosInstance.get(`/inventory-sale/item-stock?storeId=${storeId}&itemId=${itemId}&companyID=${companyID}`);
    return res.data;
};

// Fetch paginated
export const fetchPagedMaterialInfo = async (
    params: FetchParams = {}
): Promise<PaginationObject<IMaterial>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        ...params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/material-info/paged?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllMaterialInfo = async (): Promise<IMaterial[]> => {
    const res = await axiosInstance.get('/material-info/all');
    return res.data;
};

// Get a single by ID
export const showMaterialInfo = async (id: number): Promise<IMaterial> => {
    const res = await axiosInstance.get(`/material-info/${id}`);
    return res.data;
};

// Create a new
export const createMaterialInfo = async (
    payload: CreateMaterialInfoPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/marterial-infos', payload);
    return res.data;
};

// Update an existing
export const updateMaterialInfo = async (
    id: number,
    payload: UpdateMaterialInfoPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/marterial-infos/${id}`, payload);
    return res.data;
};

// Soft-delete a 
export const deleteMaterialInfo = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/marterial-infos/${id}`);
    return res.data;
};