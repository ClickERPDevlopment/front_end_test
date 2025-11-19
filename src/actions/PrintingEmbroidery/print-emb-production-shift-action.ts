import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

//print embroidery
export interface PrintEmbProductionShiftType {
    ID: number;
    NAME: string;
}



export function GetPrintEmbProductionShift<T>() {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T[]> =>
        (await axios.get("/production/PrintEmbProductionShift")).data;

    const query = useQuery({
        queryKey: ["PrintEmbProductionShift"],
        queryFn: getData,
        staleTime: 0,
    });
    return query;
}


export function GetPrintEmbProductionShiftById<T>(id: number) {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get("/production/PrintEmbProductionShift/" + id)).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.PrintEmbProductionOperation, id],
        queryFn: getData,
    });

    return query;
}

export async function Save(data: any, axios: AxiosInstance) {

    const response = await axios.post("/production/PrintEmbProductionShift", data);

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Update(data: any, axios: AxiosInstance) {
    const response = await axios.put(
        "/production/PrintEmbProductionShift/" + data.ID,
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

    await axios.delete("production/PrintEmbProductionShift/" + id);
}
