import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

export type PrintEmbPIMasterType = {
    ID: number;
    PI_DATE?: string;
    PARTY_ID: number;
    PARTY?: string;
    ADDRESS?: string;
    PI_NO?: string;
    TERM_CONDITIONS?: string;
    DISCOUNT_PERCENT?: number;
    PrintEmbPIDetails: PrintEmbPIDetailsType[];
};

export type PrintEmbPIDetailsType = {
    COLOR_ID: any;
    STYLE_ID: number;
    BUYER_ID: number;
    ID: number;
    MASTER_ID: number;
    BUYER?: string;
    OS_BUYER?: string;
    STYLE?: string;
    OS_STYLE?: string;
    PO_NO?: string;
    OS_PO_NO?: string;
    WORK_ORDER_ID?: number;
    WORK_ORDER_NO?: string;
    EMB_WORK_ORDER_NO?: string;
    PART?: string;
    PRINT_TYPE?: string;
    QTY?: number;
    DZN_PRICE?: number;
    PRICE?: number;
    AMOUNT?: number;
};

export interface PrintEmbPISearchType {
    FROM_DATE: string;
    TO_DATE: string;
}

export function GetPrintEmbPI<T>() {
    const axios = useAxiosInstance();

    const toDate = new Date();
    const fromDate = new Date();

    fromDate.setDate(toDate.getDate() - 7);

    const getData = async (): Promise<T[]> =>
        (await axios.get("/production/PrintEmbPI?fromDate=" + fromDate.toLocaleDateString("en-CA") + "&toDate=" + toDate.toLocaleDateString("en-CA"))).data;

    const query = useQuery({
        queryKey: ["GetPrintEmbPI"],
        queryFn: getData,
        staleTime: 0,
    });
    return query;
}


export function GetPrintEmbPIById<T>(id: number) {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get("/production/PrintEmbPI/" + id)).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.PrintEmbPI, id],
        queryFn: getData,
    });

    return query;
}

export async function Save(data: any, axios: AxiosInstance) {

    const response = await axios.post("/production/PrintEmbPI", data);

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Update(data: any, axios: AxiosInstance) {
    const response = await axios.put(
        "/production/PrintEmbPI/" + data.ID,
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

    await axios.delete("production/PrintEmbPI/" + id);
}
