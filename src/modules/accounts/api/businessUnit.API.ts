import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreateBusinessUnitPayload, IBusinessUnit, UpdateBusinessUnitPayload } from "../pages/businessUnitSetup/businessUnit.interface";

// Fetch paginated
export const fetchPagedBusinessUnits = async (
    params: FetchParams = {}
): Promise<PaginationObject<IBusinessUnit>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`accounts/getBusinessUnit?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
// export const fetchAllBusinessUnits = async (): Promise<IBusinessUnit[]> => {
//     const res = await axiosInstance.get('accounts/getBusinessUnit/all');
//     return res.data;
// };

// Get a single by ID
export const showBusinessUnit = async (id: number): Promise<IBusinessUnit> => {
    const res = await axiosInstance.get(`accounts/showBusinessUnit/${id}`);
    return res.data;
};

// Create a new

export const createBusinessUnit = async (
    payload: CreateBusinessUnitPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('accounts/createBusinessUnit', payload);
    return res.data;
};

// Update an existing
export const updateBusinessUnit = async (
    id: number,
    payload: UpdateBusinessUnitPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`accounts/updateBusinessUnit/${id}`, payload);
    return res.data;
};

// Soft-delete a
export const deleteBusinessUnit = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`accounts/deleteBusinessUnit/${id}`);
    return res.data;
};