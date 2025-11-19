import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { IFloor, CreateFloorPayload, UpdateFloorPayload } from "../pages/floorSetup/floor.interface";
import { buildQueryParams } from "@/utils/url";

// Fetch paginated 
export const fetchPagedFloors = async (
    params: FetchParams = {}
): Promise<PaginationObject<IFloor>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/floors?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllFloors = async (): Promise<IFloor[]> => {
    const res = await axiosInstance.get('/floors/all');
    return res.data;
};

// Get a by ID
export const showFloor = async (id: number): Promise<IFloor> => {
    const res = await axiosInstance.get(`/floors/${id}`);
    return res.data;
};

// Create a new floor
export const createFloor = async (
    payload: CreateFloorPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/floors', payload);
    return res.data;
};

// Update an existing floor
export const updateFloor = async (
    id: number,
    payload: UpdateFloorPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/floors/${id}`, payload);
    return res.data;
};

// Soft-delete a floor
export const deleteFloor = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/floors/${id}`);
    return res.data;
};