import axiosInstance from "@/api/axiosInstance";
import { EmbMaterialReceiveMasterType } from "@/modules/printingEmbroidery/pages/PrintEmbMaterialReceive/printEmbMaterialReceive.interface";
import { IPoRelease, IPoReleaseDetails } from "@/modules/procurement/pages/poRelease/poRelease.interface";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { IInventorySale } from "../pages/inventorySale/inventorySale.interface";
import { CreateStorePayload, IStore, UpdateStorePayload } from "../pages/store/store.interface";

// Fetch paginated
export const fetchPagedStore = async (
    params: FetchParams = {}
): Promise<PaginationObject<IStore>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/store?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllStore = async (factoryId: number): Promise<IStore[]> => {
    const res = await axiosInstance.get(`/store/all?companyId=${factoryId}`);
    return res.data;
};

// Get a single by ID
export const showStore = async (id: number): Promise<IStore> => {
    const res = await axiosInstance.get(`/store/${id}`);
    return res.data;
};

// Create a new
export const createStore = async (
    payload: CreateStorePayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/stores', payload);
    return res.data;
};

// Update an existing
export const updateStore = async (
    id: number,
    payload: UpdateStorePayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/stores/${id}`, payload);
    return res.data;
};

// Soft-delete a store
export const deleteStore = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/stores/${id}`);
    return res.data;
};

// Fetch paginated
export const fetchPagedInventorySales = async (
    params: FetchParams = {}
): Promise<PaginationObject<IInventorySale>> => {
    debugger
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        ...params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/inventory-sale/paged?${queryString}`);
    return res.data;
};

export const createInventorySale = async (
    payload: IInventorySale
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/inventory-sale/save', payload);
    return res.data;
};

export const updateInventorySale = async (
    payload: IInventorySale
): Promise<{ message: string }> => {
    const res = await axiosInstance.put('/inventory-sale/update', payload);
    return res.data;
};

// Get a single by ID
export const showInventorySale = async (id: number): Promise<IInventorySale> => {
    const res = await axiosInstance.get(`/inventory-sale/show/${id}`);
    return res.data;
};

export const approveInventorySale = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/inventory-sale/approve/${id}`);
    return res.data;
};

export const unApproveInventorySale = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/inventory-sale/unapprove/${id}`);
    return res.data;
};

// purchase api

// Fetch paginated
export const fetchPagedUnreleasedPO = async (
    params: FetchParams = {}
): Promise<PaginationObject<IPoRelease>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        ...params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/po-unreleased/paged?${queryString}`);
    return res.data;
};

export async function fetchUnreleasedPO(): Promise<IPoRelease[]> {
  const res = await axiosInstance.get("/po-unreleased/list");
  return res.data;
}

// Get a single by ID
export async function showPoRelease(id: number): Promise<IPoReleaseDetails[]> {
  const res = await axiosInstance.get(`/po-unreleased/show/${id}`);
  return res.data;
}

export const approvePORelease = async (data: IPoReleaseDetails[]): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/po-unreleased/approve/`, data);
    return res.data;
};



//Print Emp API 

export const fetchPagedPrintEmbMaterialReceive = async (
    params: FetchParams = {}
): Promise<EmbMaterialReceiveMasterType[]> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        ...params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/EmbMaterialReceive?${queryString}`);
    return res.data;
};


export const updatePrintEmbMaterialReceive = async (
    payload: EmbMaterialReceiveMasterType
): Promise<{ message: string }> => {
    const res = await axiosInstance.put('/inventory-sale/update', payload);
    return res.data;
};

export const createPrintEmbMaterialReceive = async (
    payload: EmbMaterialReceiveMasterType
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/inventory-sale/save', payload);
    return res.data;
};

export const showPrintEmbMaterialReceive = async (id: number): Promise<EmbMaterialReceiveMasterType> => {
    const res = await axiosInstance.get(`/EmbMaterialReceive/${id}`);
    return res.data;
};