import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreateSectionPayload, ISection, UpdateSectionPayload } from "../pages/sectionSetup/section.interface";

// Fetch paginated section
export const fetchPagedSections = async (
    params: FetchParams = {}
): Promise<PaginationObject<ISection>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/section?${queryString}`);
    return res.data;
};

// Fetch all section (non-paginated)
export const fetchAllSections = async (): Promise<ISection[]> => {
    const res = await axiosInstance.get('/section/all');
    return res.data;
};

// Get a single section by ID
export const showSection = async (id: number): Promise<ISection> => {
    const res = await axiosInstance.get(`/section/${id}`);
    return res.data;
};

// Create a new section
export const createSection = async (
    payload: CreateSectionPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/sections', payload);
    return res.data;
};

// Update an existing section
export const updateSection = async (
    id: number,
    payload: UpdateSectionPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/sections/${id}`, payload);
    return res.data;
};

// Soft-delete a section
export const deleteSection = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/sections/${id}`);
    return res.data;
};