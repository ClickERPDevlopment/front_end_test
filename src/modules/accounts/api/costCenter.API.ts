import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreateCostCenterPayload, ICostCenter, UpdateCostCenterPayload } from "../pages/costCenter/costCenter.interface";

// Fetch paginated
export const fetchPagedCostCenters = async (
    params: FetchParams = {}
): Promise<PaginationObject<ICostCenter>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`accounts/getCostCenter?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
// export const fetchAllCostCenters = async (): Promise<ICostCenter[]> => {
//     const res = await axiosInstance.get('accounts/getCostCenter/all');
//     return res.data;
// };

// Get a single by ID
export const showCostCenter = async (id: number): Promise<ICostCenter> => {
    const res = await axiosInstance.get(`accounts/showCostCenter/${id}`);
    return res.data;
};



// Create a new
export const createCostCenter = async (
    payload: CreateCostCenterPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('accounts/createCostCenter', payload);
    return res.data;
};

// Update an existing
export const updateCostCenter = async (
    id: number,
    payload: UpdateCostCenterPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`accounts/updateCostCenters/${id}`, payload);
    return res.data;
};

// Soft-delete a
export const deleteCostCenter = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`accounts/deleteCostCenters/${id}`);
    return res.data;
};