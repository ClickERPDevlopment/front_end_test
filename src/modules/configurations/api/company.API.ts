import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { CreateCompanyPayload, ICompany, UpdateCompanyPayload } from "../pages/companySetup/company.interface";
import { buildQueryParams } from "@/utils/url";

// Fetch paginated currencies
export const fetchPagedCompanies = async (
    params: FetchParams = {}
): Promise<PaginationObject<ICompany>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/companies?${queryString}`);
    return res.data;
};

// Fetch all currencies (non-paginated)
export const fetchAllCompanies = async (): Promise<ICompany[]> => {
    const res = await axiosInstance.get('/companies/all');
    return res.data;
};

// Get a single company by ID
export const showCompany = async (id: number): Promise<ICompany> => {
    const res = await axiosInstance.get(`/companies/${id}`);
    return res.data;
};

// Create a new company
export const createCompany = async (
    payload: CreateCompanyPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/companies', payload);
    return res.data;
};

// Update an existing company
export const updateCompany = async (
    id: number,
    payload: UpdateCompanyPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/company/${id}`, payload);
    return res.data;
};

// Soft-delete a company
export const deleteCompany = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/companies/${id}`);
    return res.data;
};