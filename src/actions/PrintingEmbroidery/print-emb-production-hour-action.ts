import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

//print embroidery
export interface PrintEmbProductionHourType {
    ID: number;
    NAME: string;
}



export function GetPrintEmbProductionHour<T>() {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T[]> =>
        (await axios.get("/production/PrintEmbProductionHour")).data;

    const query = useQuery({
        queryKey: ["PrintEmbProductionHour"],
        queryFn: getData,
        staleTime: 0,
    });
    return query;
}


export function GetPrintEmbProductionHourById<T>(id: number) {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get("/production/PrintEmbProductionHour/" + id)).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.PrintEmbProductionHour, id],
        queryFn: getData,
    });

    return query;
}

export async function Save(data: any, axios: AxiosInstance) {

    const response = await axios.post("/production/PrintEmbProductionHour", data);

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Update(data: any, axios: AxiosInstance) {
    const response = await axios.put(
        "/production/PrintEmbProductionHour/" + data.ID,
        data
    );

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Delete(id: number, axios: AxiosInstance) {
    if (Number(id) <= 0) {
        throw new Error("Print Embroidery Production hour ID is not valid.");
    }

    await axios.delete("production/PrintEmbProductionHour/" + id);
}
