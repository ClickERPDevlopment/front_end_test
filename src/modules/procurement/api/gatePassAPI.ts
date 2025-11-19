import axiosInstance from "@/api/axiosInstance";
import { FetchParams, PaginationObject } from "@/types/global";
import { buildQueryParams } from "@/utils/url";
import {
    CreateGatePassPayload,
    FactoryGatePassDepartmentDto,
    FactoryGatePassSamplePOStyleListDto,
    IGatePass,
    IGatePassApproval,
    IGatePassMaster,
    IGatePassOut,
    IGatePassReturnReceive,
    SamplePOStyleSearchDto,
    UpdateGatePassPayload
} from "../pages/gatePass/gatePass.interface";



// Fetch paginated
export const fetchPagedGatePassReturnReceive = async (
    params: FetchParams = {}
): Promise<PaginationObject<IGatePassReturnReceive>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        ...params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/gate-pass-return-receive/paged?${queryString}`);
    return res.data;
};



export const fetchPagedGatePass = async (
    params: FetchParams = {}
): Promise<PaginationObject<IGatePassMaster>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        ...params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/gatepass/paged?${queryString}`);
    return res.data;
};

export const fetchPagedGatePassOut = async (
    params: FetchParams = {}
): Promise<PaginationObject<IGatePassOut>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        ...params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/gatepass-out/paged?${queryString}`);
    return res.data;
};



export const fetchPagedGatePassApproval = async (
    params: FetchParams = {}
): Promise<PaginationObject<IGatePassApproval>> => {
    const queryString = buildQueryParams({
        currentPage: params.page,
        perPage: params.perPage,
        ...params.searchCriteria,
        orderBy: params.orderBy,
    });
    const res = await axiosInstance.get(`/gatepass-approvals/paged?${queryString}`);
    return res.data;
};

// Fetch one gatePass by ID
export const showGatePass = async (id: number): Promise<IGatePass> => {
    const res = await axiosInstance.get(`/gatepass/${id}`);
    return res.data;
};

// Fetch one gatePass Approval by ID
export const showGatePassApproval = async (id: number): Promise<IGatePass> => {
    const res = await axiosInstance.get(`/gatepass-approval/${id}`);
    return res.data;
};

export const showGatePassReturnReceive = async (id: number): Promise<IGatePassReturnReceive> => {
    const res = await axiosInstance.get(`/gatepass-return-receive/${id}`);
    return res.data;
};


// get las company id by user
export const fetchLastCompanyIdByUser = async (): Promise<number> => {
    const res = await axiosInstance.get(`/gatepass/get-last-company-id-user`);
    return res.data;
};

// Get last company ID
export const fetchLastFactoryId = async (): Promise<number> => {
    const res = await axiosInstance.get(`/gatepass/get-last-company-id`);
    return res.data;
};

// Get receiver employee names (from gate pass)
export const fetchCarriedEmpNames = async (): Promise<{ name: string }[]> => {
    const res = await axiosInstance.get(`/gatepass/get-emp-name-from-gate-pass`);
    return res.data;
};

//  Get all departments
export const fetchAllDepartments = async (): Promise<FactoryGatePassDepartmentDto[]> => {
    const res = await axiosInstance.get(`/gatepass/get-all-department`);
    return res.data;
};

// Get sender employee names (from gate pass)
export const fetchSenderEmployeeNames = async (): Promise<{ name: string }[]> => {
    const res = await axiosInstance.get(`/gatepass/get-sender-emp-name-from-gate-pass`);
    return res.data;
};

// Get garments types
export const fetchGarmentsTypes = async (): Promise<{ name: string }[]> => {
    const res = await axiosInstance.get(`/gatepass/get-gate-pass-garments-type`);
    return res.data;
};

// Get all sample PO style list (with filters)
export const fetchAllSamplePOStyleList = async (
    searchCriteria: SamplePOStyleSearchDto
): Promise<FactoryGatePassSamplePOStyleListDto> => {
    const queryString = buildQueryParams(searchCriteria);
    const res = await axiosInstance.get(`/gatepass/get-all-sample-po-style-list?${queryString}`);
    return res.data;
};

// Create a new gate pass
export const createGatePass = async (
    payload: CreateGatePassPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.post(`/gatepass/save`, payload);
    return res.data;
};

// Update an existing gate pass
export const updateGatePass = async (
    id: number,
    payload: UpdateGatePassPayload
): Promise<{ message: string }> => {
    const res = await axiosInstance.put(`/gatepass/update/${id}`, payload);
    return res.data;
};

//Delete a gate pass
export const deleteGatePass = async (
    id: number
): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(`/gatepass/${id}`);
    return res.data;
};
