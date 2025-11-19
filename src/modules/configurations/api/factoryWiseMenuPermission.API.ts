import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreateFactoryWiseMenuPermissionPayload, IFactoryWiseMenuPermission, UpdateFactoryWiseMenuPermissionPayload } from "../pages/factoryWiseMenuPermission/factoryWiseMenuPermission.interface";
import { ICompany } from "../pages/companySetup/company.interface";

// Fetch paginated 
export const fetchPagedFactoryWiseMenuPermissions = async (
    params: FetchParams = {}
): Promise<PaginationObject<IFactoryWiseMenuPermission>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/factory-wise-menu-permission?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllFactoryWiseMenuPermissions = async (): Promise<IFactoryWiseMenuPermission[]> => {
    const res = await axiosInstance.get('/factory-wise-menu-permission/all');
    return res.data;
};

// Get a by ID
export const showFactoryWiseMenuPermission = async (id: number): Promise<IFactoryWiseMenuPermission> => {
    const res = await axiosInstance.get(`/factory-wise-menu-permission/${id}`);
    return res.data;
};

// Create a new floor
export const createFactoryWiseMenuPermission = async (
    payload: CreateFactoryWiseMenuPermissionPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/factory-wise-menu-permission', payload);
    return res.data;
};

// Update an existing floor
export const updateFactoryWiseMenuPermission = async (
    id: number,
    payload: UpdateFactoryWiseMenuPermissionPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/factory-wise-menu-permission/${id}`, payload);
    return res.data;
};

// Soft-delete a floor
export const deleteFactoryWiseMenuPermission = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/factory-wise-menu-permission/${id}`);
    return res.data;
};


// Fetch summary by companyId
export const fetchFactoryWiseMenuPermissionSummary = async (
    companyId: number
): Promise<IFactoryWiseMenuPermission[]> => {
    const res = await axiosInstance.get(`/${companyId}/FactoryWiseMenuPermission/summary`);
    return res.data;
};
