import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import { CreatePlanningCalendarPayload, IPlanningCalendar, UpdatePlanningCalendarPayload } from "../pages/planningCalendar/planningCalendar.interface";

// Fetch paginated
export const fetchPagedPlanningCalendar = async (
    params: FetchParams = {}
): Promise<PaginationObject<IPlanningCalendar>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        searchCriteria: params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/planning-calendar?${queryString}`);
    return res.data;
};

// Fetch all (non-paginated)
export const fetchAllPlanningCalendar = async (): Promise<IPlanningCalendar[]> => {
    const res = await axiosInstance.get('/planning-calendar/all');
    return res.data;
};

// Get a single by ID
export const showPlanningCalendar = async (id: number): Promise<IPlanningCalendar> => {
    const res = await axiosInstance.get(`/planning-calendar/${id}`);
    return res.data;
};

// Create a new 
export const createPlanningCalendar = async (
    payload: CreatePlanningCalendarPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post('/planningCalendares', payload);
    return res.data;
};

// Update an existing 
export const updatePlanningCalendar = async (
    id: number,
    payload: UpdatePlanningCalendarPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/planningCalendares/${id}`, payload);
    return res.data;
};

// Soft-delete a planningCalendar
export const deletePlanningCalendar = async (id: number): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/planningCalendares/${id}`);
    return res.data;
};