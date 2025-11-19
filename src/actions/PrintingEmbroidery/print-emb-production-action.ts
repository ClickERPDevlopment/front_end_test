import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

//print embroidery
export interface PrintEmbProductionMasterType {
    ID: number;
    PRODUCTION_DATE?: string;
    TYPE_ID: number;
    TYPE: string;
    SHIFT_ID: number;
    SHIFT: string;
    OPERATION_ID: number;
    OPERATION: string;
    FLOOR_ID: number;
    FLOOR: string;
    WORKSTATION_ID: number;
    WORKSTATION: string;
    MP: number;
    PRODUCTION_HOUR_ID: number;
    PRODUCTION_HOUR: string;
    REMARKS: string;
    PrintEmbProductionDetails: PrintEmbProductionDetailsType[];
}

export interface PrintEmbProductionDetailsType {
    ID: number;
    MASTER_ID: number;
    WORK_ORDER_ID: number;
    WORK_ORDER_NO?: string;
    BUYER_ID?: number;
    BUYER?: string;
    OS_BUYER_ID?: number;
    OS_BUYER?: string;
    STYLE_ID?: number;
    STYLE?: string;
    OS_STYLE_ID?: number;
    OS_STYLE?: string;
    PO_ID: number;
    PO_NO?: string;
    OS_PO_ID: number;
    OS_PO_NO?: string;
    COLOR_ID?: number;
    COLOR?: string;
    SIZE_ID?: number;
    SIZE?: string;
    QC_PASSED_QTY?: number;
    WIP?: number;
    PARTS?: string;
    ReasonDetails: RejectionReasonDetailsType[];
    PartsDetails: PartsDetailsType[];
}

export interface RejectionReasonDetailsType {
    ID: number;
    MASTER_ID: number;
    REASON: string;
    QTY: number;
}

export interface PartsDetailsType {
    ID: number;
    MASTER_ID: number;
    PARTS_ID: number;
    PARTS_NAME: string;
    QTY: number;
}



export interface PrintEmbProductionSearchType {
    FROM_DATE: string;
    TO_DATE: string;
    BUYER_ID: number;
    BUYER: string;
    STYLE_ID: number;
    STYLE: string;
    PO_ID: number;
    PO_NO: string;
    TYPE_ID: number;
    TYPE: string;
    WORK_ORDER_ID: number,
    WORK_ORDER_NO: string,
}


export function GetPrintEmbProduction<T>() {
    const axios = useAxiosInstance();

    const toDate = new Date();
    const fromDate = new Date();

    fromDate.setDate(toDate.getDate() - 7);

    const getData = async (): Promise<T[]> =>
        (await axios.get("/production/PrintEmbProduction?fromDate=" + fromDate.toLocaleDateString("en-CA") + "&toDate=" + toDate.toLocaleDateString("en-CA"))).data;

    const query = useQuery({
        queryKey: ["PrintEmbProductionData"],
        queryFn: getData,
        staleTime: 0,
    });
    return query;
}


export function GetPrintEmbProductionById<T>(id: number) {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get("/production/PrintEmbProduction/" + id)).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.PrintEmbProduction, id],
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

    const response = await axios.post("/production/PrintEmbProduction", data);

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Update(data: any, axios: AxiosInstance) {
    const response = await axios.put(
        "/production/PrintEmbProduction/" + data.ID,
        data
    );

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Delete(id: number, axios: AxiosInstance) {
    if (Number(id) <= 0) {
        throw new Error("Print Embroidery Production ID is not valid.");
    }

    await axios.delete("production/PrintEmbProduction/" + id);
}
