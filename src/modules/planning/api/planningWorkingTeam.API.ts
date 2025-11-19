import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreatePlanningWorkingTeamPayload, IPlanningWorkingTeam, UpdatePlanningWorkingTeamPayload } from "../pages/planningWorkingTeam/planningWorkingTeam.interface";

// Fetch paginated 
export const fetchPagedPlanningWorkingTeam = async (
    params: FetchParams = {}
): Promise<PaginationObject<IPlanningWorkingTeam>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/planning-working-team?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllPlanningWorkingTeam = async (): Promise<IPlanningWorkingTeam[]> => {
    const res = await axiosInstance.get('/planning-team/list');
    return res.data;
};

// Get a single by ID
export const showPlanningWorkingTeam = async (id: number): Promise<IPlanningWorkingTeam> => {
    const res = await axiosInstance.get(`/planningWorkingTeam/${id}`);
    return res.data;
};

// Create a new
export const createPlanningWorkingTeam = async (
    payload: CreatePlanningWorkingTeamPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/planning-working-team', payload);
    return res.data;
};

// Update an existing 
export const updatePlanningWorkingTeam = async (
    id: number,
    payload: UpdatePlanningWorkingTeamPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/planning-working-team/${id}`, payload);
    return res.data;
};

// Soft-delete a 
export const deletePlanningWorkingTeam = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/planning-working-team/${id}`);
    return res.data;
};