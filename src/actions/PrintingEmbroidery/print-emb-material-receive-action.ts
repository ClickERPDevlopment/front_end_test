import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

//print embroidery
export interface PrintEmbProductionMasterType {
    ID: number;
    PRODUCTION_DATE?: Date;
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
    PrintEmbProductionDetails: PrintEmbProductionDetailsType[];
}

export interface PrintEmbProductionDetailsType {
    ID: number;
    MASTER_ID: number;
    WORK_ORDER_ID: number;
    WORK_ORDER_NO?: string;
    BUYER_ID?: number;
    BUYER?: string;
    STYLE_ID?: number;
    STYLE?: string;
    PO_ID: number;
    PO_NO?: string;
    COLOR_ID?: number;
    COLOR?: string;
    SIZE_ID?: number;
    SIZE?: string;
    QC_PASSED_QTY?: number;
    ReasonDetails: RejectionReasonDetailsType[];
}

export interface RejectionReasonDetailsType {
    ID: number;
    MASTER_ID: number;
    REASON: string;
    QTY: number;
}


export interface PrintEmbProductionSearchType {
    FROM_DATE: Date;
    TO_DATE: Date;
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

//print emb material receive
export type EmbMaterialReceiveMasterType = {
    ID: number;
    RECEIVE_DATE: string
    WORKORDER_TYPE_ID: number;
    WORKORDER_TYPE: string;
    FLOOR_ID: number;
    FLOOR: string;
    WORKORDER_ID: number;
    WORKORDER_NO: string;
    WORKORDER_RECEIVE_ID: number;
    WORKORDER_RECEIVE_NO: string;
    MATERIAL_RECEIVE_NO: string;
    EMB_CATEGORY_ID: number;
    EMB_CATEGORY: string;
    SUPPLIER_ID: number;
    SUPPLIER: string;
    CREATED_BY?: string | null;
    CREATED_DATE?: string | null;
    UPDATED_BY?: string | null;
    UPDATED_DATE?: string | null;
    BUYER: string;
    STYLE: string;
    PO: string;
    OS_BUYER: string;
    OS_STYLE: string;
    OS_PO: string;
    MATERIAL_RECEIVE_SERIAL: number;
    EmbMaterialReceiveDetails: EmbMaterialReceiveDetailsType[];
};
export type EmbMaterialReceiveDetailsType = {
    ID: number;
    MASTER_ID: number;
    BUYER_ID: number;
    BUYER: string;
    OS_BUYER_ID: number;
    OS_BUYER: string;
    STYLE_ID: number;
    STYLE: string;
    OS_STYLE_ID: number;
    OS_STYLE: string;
    PO_ID: number;
    PO: string;
    OS_PO_ID: number;
    OS_PO: string;
    COLOR_ID: number;
    COLOR: string;
    SIZE_ID: number;
    SIZE: string;
    WO_QTY: number;
    RCV_QTY: number;
    PREV_RCV_QTY: number;
    PARTS: string;
    EmbMaterialReceiveParts: EmbMaterialReceiveDetailsPartsType[];
};

export type EmbMaterialReceiveDetailsPartsType = {
    ID: number;
    MASTER_ID: number;
    PARTS_ID: number;
    PARTS: string;
};

export type NextReceiveNumberType = {
    serialNo: number;
    receiveNo: string;
}

export function GetPrintEmbMaterialReceive<T>() {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T[]> =>
        (await axios.get("/production/EmbMaterialReceive")).data;

    const query = useQuery({
        queryKey: ["EmbMaterialReceive"],
        queryFn: getData,
        staleTime: 0,
    });
    return query;
}


export function GetPrintEmbMaterialReceiveById<T>(id: number) {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get("/production/EmbMaterialReceive/" + id)).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.EmbMaterialReceive, id],
        queryFn: getData,
    });

    return query;
}

export function NextReceiveNumber<T>() {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get("/production/EmbMaterialReceive/NextReceiveNumber")).data;

    const query = useQuery({
        queryKey: ["ReceiveNo"],
        queryFn: getData,
        staleTime: 0,
    });

    return query;
}

export async function Save(data: any, axios: AxiosInstance) {

    const response = await axios.post("/production/EmbMaterialReceive", data);

    if (!response) {
        throw new Error("Action Failed");
    }

    return response.data;
}

export async function Update(data: any, axios: AxiosInstance) {
    const response = await axios.put(
        "/production/EmbMaterialReceive/" + data.ID,
        data
    );

    if (!response) {
        throw new Error("Action Failed");
    }

    return response.data;
}

export async function Delete(id: number, axios: AxiosInstance) {
    if (Number(id) <= 0) {
        throw new Error("Action Failed");
    }

    await axios.delete("production/EmbMaterialReceive/" + id);
}
