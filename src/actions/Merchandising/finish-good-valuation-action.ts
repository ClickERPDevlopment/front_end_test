import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

export type FinishGoodValuationMasterType = {
    ID: number;
    FROM_DATE: string; // ISO format date string
    TO_DATE: string;
    CREATED_BY?: string;
    CREATED_DATE?: string;
    UPDATED_BY?: string;
    UPDATED_DATE?: string;
    lstDetails: FinishGoodValuationDetailsType[];
}

export type FinishGoodValuationDetailsType = {
    ID: number;
    MASTER_ID: number;
    PO_ID: number;
    PO_NO: string;
    BUYER_ID: number;
    BUYER: string;
    STYLE_ID: number;
    STYLE: string;
    ORDER_QTY: number;
    PACK_QTY: number;
    PRE_COST_PER_PCS: number;
    FG_VALUE: number;
}


export function GetFinishGoodValuation<T>() {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T[]> =>
        (await axios.get("/production/FinishGoodValuation")).data;

    const query = useQuery({
        queryKey: ["FinishGoodValuation"],
        queryFn: getData,
        staleTime: 0,
    });
    return query;
}


export function GetFinishGoodValuationById<T>(id: number) {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get("/production/FinishGoodValuation/" + id)).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.FinishGoodValuation, id],
        queryFn: getData,
    });

    return query;
}

export async function Save(data: any, axios: AxiosInstance) {

    const response = await axios.post("/production/FinishGoodValuation", data);

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Update(data: any, axios: AxiosInstance) {
    const response = await axios.put(
        "/production/FinishGoodValuation/" + data.ID,
        data
    );

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Delete(id: number, axios: AxiosInstance) {
    if (Number(id) <= 0) {
        throw new Error("This data not selected.");
    }

    await axios.delete("production/FinishGoodValuation/" + id);
}

export function GetLastFinishGoodValuationDate<T>() {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get("/production/FinishGoodValuation/GetLastFinishGoodValuationDate")).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.FinishGoodValuation],
        queryFn: getData,
    });

    return query;
}