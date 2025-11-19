import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

export type PrintEmbBillMasterType = {
    Id: number;
    BillDate?: string;
    BillSerial?: number;
    BillNo?: string;

    PartyId: number;
    Party?: string;

    CompanyId: number;
    Company?: string;

    Remarks?: string;
    CreatedBy?: string;
    CreatedDate?: string;
    UpdatedBy?: string;
    UpdatedDate?: string;

    Details: PrintEmbBillDetaiiType[];
};

export type PrintEmbBillDetaiiType = {
    Id: number;
    MasterId: number;

    WorkOrderId: number;
    WorkOrder?: string;

    BuyerId?: number;
    Buyer?: string;

    OsBuyerId?: number;
    OsBuyer?: string;

    StyleId?: number;
    Style?: string;

    OsStyleId?: number;
    OsStyle?: string;

    PoId: number;
    Po?: string;

    OsPoId: number;
    OsPo?: string;

    ColorId?: number;
    Color?: string;

    WoQty?: number;
    DeliveryQty?: number;
    BillQty?: number;

    EmbTypeId: number;
    EmbType?: string;

    Rate?: number;
    Amount?: number;

    CurrencyId: number;
    Currency?: string;
};


export function GetPrintEmbBill<T>(companyId: number) {
    const axios = useAxiosInstance();

    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 7);

    const getData = async (): Promise<T[]> =>
        (
            await axios.get(
                `/production/${companyId}/PrintEmbBill?fromDate=${fromDate.toLocaleDateString(
                    "en-CA"
                )}&toDate=${toDate.toLocaleDateString("en-CA")}`
            )
        ).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.PrintEmbBill, companyId],
        queryFn: getData,
        staleTime: 0,
    });

    return query;
}

export function GetPrintEmbBillById<T>(id: number, companyId: number) {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get(`/production/${companyId}/PrintEmbBill/${id}`)).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.PrintEmbBill, companyId, id],
        queryFn: getData,
    });

    return query;
}

export async function SavePrintEmbBill(data: any, axios: AxiosInstance, companyId: number) {
    const response = await axios.post(`/production/${companyId}/PrintEmbBill`, data);

    if (!response) {
        throw new Error("This bill already exists.");
    }

    return response.data;
}

export async function UpdatePrintEmbBill(data: any, axios: AxiosInstance, companyId: number) {
    const response = await axios.put(`/production/${companyId}/PrintEmbBill/${data.Id}`, data);

    if (!response) {
        throw new Error("This bill already exists.");
    }

    return response.data;
}

export async function DeletePrintEmbBill(id: number, axios: AxiosInstance, companyId: number) {
    if (Number(id) <= 0) {
        throw new Error("Print Embroidery Bill ID is not valid.");
    }

    await axios.delete(`/production/${companyId}/PrintEmbBill/${id}`);
}
