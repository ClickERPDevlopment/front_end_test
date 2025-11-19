import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

export type PrintEmbQualityMaster = {
    Id: number;
    EntryDate?: string;
    PartyId: number;
    Party: string;
    EmbTypeId: number;
    EmbType: string;
    FloorId: number;
    Floor: string;
    WorkStationId: number;
    WorkStation: string;
    WorkOrderId: number;
    WorkOrder: string;
    Remarks?: string;
    Details: PrintEmbQualityDetail[];
};

export type PrintEmbQualityDetail = {
    Id: number;
    MasterId: number;
    BuyerId?: number;
    Buyer?: string;
    OsBuyerId?: number;
    OsBuyer?: string;
    StyleId?: number;
    Style?: string;
    OsStyleId?: number;
    OsStyle?: string;
    PoId: number;
    Po: string;
    OsPoId: number;
    OsPo: string;
    ColorId?: number;
    Color?: string;
    Parts?: string;
    OrderQty?: number;
    CheckQty?: number;
    QcPassedQty?: number;
    RectifyQty?: number;
    RejectQty?: number;
    DefectQty?: number;
    Defects: PrintEmbQualityDefectDetail[];
};

export type PrintEmbQualityDefectDetail = {
    Id: number;
    DetailId: number;
    DefectId: number;
    DefectName: string;
    Qty: number;
};


export function GetPrintEmbQuality<T>() {
    const axios = useAxiosInstance();

    const toDate = new Date();
    const fromDate = new Date();

    fromDate.setDate(toDate.getDate() - 7);

    const getData = async (): Promise<T[]> =>
        (await axios.get("/production/PrintEmbQuality?fromDate=" + fromDate.toLocaleDateString("en-CA") + "&toDate=" + toDate.toLocaleDateString("en-CA"))).data;

    const query = useQuery({
        queryKey: ["PrintEmbQuality"],
        queryFn: getData,
        staleTime: 0,
    });
    return query;
}


export function GetPrintEmbQualityById<T>(id: number) {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get("/production/PrintEmbQuality/" + id)).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.PrintEmbQuality, id],
        queryFn: getData,
    });

    return query;
}


export async function Save(data: any, axios: AxiosInstance) {

    const response = await axios.post("/production/PrintEmbQuality", data);

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Update(data: any, axios: AxiosInstance) {
    const response = await axios.put(
        "/production/PrintEmbQuality/" + data.Id,
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

    await axios.delete("production/PrintEmbQuality/" + id);
}
