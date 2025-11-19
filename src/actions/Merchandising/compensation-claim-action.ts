import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

export type SwtGaugeType = {
    ID: number;
    GAUGE: string;
    IsActive: boolean;
};

export type MCGroupType = {
    ID: number;
    GROUP_NAME: string;
    CODE: string;
    FLOOR_ID: number;
    FLOOR: string;
    SUPERVISOR_ID: number;
    SUPERVISOR: string;
    BEST_FOR_ITEM_ID: number;
    BEST_FOR_ITEM: string;
    MC_BRAND_ID: number;
    MC_BRAND: string | null;
    MC_GAUGE_ID: number;
    MC_GAUGE: string;
    NUMBER_OF_MACHINE: number;
    IS_ACTIVE: boolean;
};

export type masterDataType = {
    ID: number;
    PLANNING_BOARD_NAME: string;
    COMPANY: string;
    COMPANY_ID: number;
    SECTION: string;
    SECTION_ID: number;
    DEFAULT_WORKING_HOUR: number;
    TOTAL_MC: number;
    WEEKEND: string;
    WEEK_START_FROM: string;
    CREATED_BY: string;
    CREATED_BY_NAME: string;
    CREATED_DATE: Date;
    UPDATED_BY: string;
    UPDATED_BY_NAME: string;
    UPDATED_DATE: Date;
};

export type planningBoardConfigureType = {
    ID: number;
    PLANNING_BOARD_NAME: string;
    COMPANY: string;
    COMPANY_ID: number;
    SECTION: string;
    SECTION_ID: number;
    DEFAULT_WORKING_HOUR: number;
    TOTAL_MC: number;
    WEEKEND: string;
    WEEK_START_FROM: string;
    CREATED_BY: string;
    CREATED_BY_NAME: string;
    CREATED_DATE: Date;
    UPDATED_BY: string;
    UPDATED_BY_NAME: string;
    UPDATED_DATE: Date;
};

//compenstation claim
export interface CompensationClaimMasterType {
    ID: number;
    CLAIM_ID?: string;
    CLAIM_DATE?: Date;
    COMPENSATION_TYPE?: string;
    RELATED_SUPPLIER_ID: number;
    RELATED_SUPPLIER_NAME: string;
    SUPPLIER_NAME?: string;
    REPORTED_BY?: string;
    ADDITIONAL_NOTES?: string;
    CREATED_BY?: string;
    CREATED_DATE: Date;
    UPDATED_BY?: string;
    UPDATED_DATE: Date;
    ClaimDetails: CompensationClaimDetailsType[];
    RelatedOrders: CompensationClaimOrderInfoType[];
}

export interface CompensationClaimDetailsType {
    ID: number;
    MASTER_ID: number;
    MATERIAL_ID: number;
    MATERIAL_NAME?: string;
    MATERIAL_GROUP_ID?: number;
    MATERIAL_GROUP_NAME?: string;
    MATERIAL_SUB_GROUP_ID?: number;
    MATERIAL_SUB_GROUP_NAME?: string;
    TYPE_ID: number;
    TYPE_NAME?: string;
    QUANTITY_DAMAGED: number;
    UOM?: string;
    DAMAGE_DETAILS?: string;
    CLAIM_AMOUNT: number;
    ACTION_TAKEN?: string;
}

export interface CompensationClaimOrderInfoType {
    ID: number;
    MASTER_ID: number;
    BUYER_ID: number;
    BUYER_NAME?: string;
    STYLE_ID: number;
    STYLE_NAME?: string;
    PO_ID: number;
    PO_NO?: string;
}

export function GetCompensationClaim<T>() {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T[]> =>
        (await axios.get("/production/CompensationClaim")).data;

    const query = useQuery({
        queryKey: ["CompensationClaimData"],
        queryFn: getData,
        staleTime: 0,
    });
    return query;
}


export function GetCompensationClaimById<T>(id: number) {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get("/production/CompensationClaim/" + id)).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.CompensationClaim, id],
        queryFn: getData,
    });

    return query;
}

export function getClaimId<T>() {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get("/production/CompensationClaim/GenerateClaimId")).data;

    const query = useQuery({
        queryKey: ["ClaimId"],
        queryFn: getData,
        staleTime: 0,
    });

    return query;
}

export async function Save(data: any, axios: AxiosInstance) {

    const response = await axios.post("/production/CompensationClaim", data);

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Update(data: any, axios: AxiosInstance) {
    const response = await axios.put(
        "/production/CompensationClaim/" + data.ID,
        data
    );

    if (!response) {
        throw new Error("This planning board already exist.");
    }

    return response.data;
}

export async function Delete(id: number, axios: AxiosInstance) {
    if (Number(id) <= 0) {
        throw new Error("Planning board not selected.");
    }

    await axios.delete("production/CompensationClaim/" + id);
}
