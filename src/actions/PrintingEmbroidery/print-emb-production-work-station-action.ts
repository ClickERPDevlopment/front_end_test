import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

//print embroidery
export interface PrintEmbProductionWorkStationType {
    ID: number;
    NAME: string;
    TYPE_ID: number;
    TYPE: string;
}

export function GetPrintEmbProductionWorkStation<T>() {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T[]> =>
        (await axios.get("/production/PrintEmbProductionWorkStation")).data;

    const query = useQuery({
        queryKey: ["PrintEmbProductionHour"],
        queryFn: getData,
        staleTime: 0,
    });
    return query;
}


export function GetPrintEmbProductionWorkStationById<T>(id: number) {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get("/production/PrintEmbProductionWorkStation/" + id)).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.PrintEmbProductionHour, id],
        queryFn: getData,
    });

    return query;
}

export async function Save(data: any, axios: AxiosInstance) {

    const response = await axios.post("/production/PrintEmbProductionWorkStation", data);

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Update(data: any, axios: AxiosInstance) {
    const response = await axios.put(
        "/production/PrintEmbProductionWorkStation/" + data.ID,
        data
    );

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Delete(id: number, axios: AxiosInstance) {
    if (Number(id) <= 0) {
        throw new Error("Print Embroidery Production work station ID is not valid.");
    }

    await axios.delete("production/PrintEmbProductionWorkStation/" + id);
}
