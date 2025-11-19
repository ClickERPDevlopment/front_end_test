import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import axiosInstance from "@/api/axiosInstance";
import { CreateMachinePayload, IMachines, UpdateMachinePayload } from "../pages/machinesSetup/machine.interface";

// Fetch paginated
export const fetchPagedMachines = async (
    params: FetchParams = {}
): Promise<PaginationObject<IMachines>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/machine-setup?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllMachines = async (): Promise<IMachines[]> => {
    const res = await axiosInstance.get('/machine-setups/all');
    return res.data;
};

// Get a single by ID
export const showMachine = async (id: number): Promise<IMachines> => {
    const res = await axiosInstance.get(`/machine-setups/${id}`);
    return res.data;
};

// Create a new
export const createMachine = async (
    payload: CreateMachinePayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/machine-setups', payload);
    return res.data;
};

// Update an existing
export const updateMachine = async (
    id: number,
    payload: UpdateMachinePayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/machine-setups/${id}`, payload);
    return res.data;
};

// Soft-delete a
export const deleteMachine = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/machine-setups/${id}`);
    return res.data;
};