import axiosInstance from "@/api/axiosInstance";
import { IPurchaseOrder } from "../pages/purchaseOrderEntry/purchaseOrderEntry.interface";

export const FetchAllPurchaseOrder = async (): Promise<IPurchaseOrder[]> => {
    const res = await axiosInstance.get('PurchaseOrder/GetAllPO');
    return res.data;
};
