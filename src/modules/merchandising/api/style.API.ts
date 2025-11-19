import axiosInstance from "@/api/axiosInstance";
import { IStyle } from "@/modules/garmentsProduction/types/style.interface";

export const FetchAllConfigStyle = async (): Promise<IStyle[]> => {
    const res = await axiosInstance.get('Style/GetAllStyle');
    return res.data;
};


export const FetchStylesByBuyer = async (buyerId: number): Promise<IStyle[]> => {
    const res = await axiosInstance.get(`/style/GetAllStyleByBuyer?Buyerid=${buyerId}`);
    return res.data;
};