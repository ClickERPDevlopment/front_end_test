import axiosInstance from "@/api/axiosInstance";
import { ISupplier } from "../pages/supplier/supplier.interface";

// Fetch ALL Supplier
export const fetchAllSupplier = async (): Promise<ISupplier[]> => {
    const res = await axiosInstance.get('/Supplier/GetAllSupplier');
    return res.data;
};
