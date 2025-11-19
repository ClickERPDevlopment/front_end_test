import axiosInstance from "@/api/axiosInstance";
import { IHistoryLeft, IHistoryRight } from "../pages/poRelease/poRelease.interface";
// Fetch the "Material Info" (left table)
export const fetchMaterialInfo = async (itemId: number): Promise<IHistoryLeft[]> => {
  const res = await axiosInstance.get(`/po-unreleased/poHistory/${itemId}`);
  return res.data;
};

// Fetch the "Purchase History" (right table) with search params
export const fetchPurchaseHistory = async (
  itemId: number,
  fromDate: string,
  toDate: string,
  poNo: string
): Promise<IHistoryRight[]> => {
  const res = await axiosInstance.get(
    `/po-unreleased/poHistorySearch?fromDate=${fromDate}&toDate=${toDate}&itemId=${itemId}&poNo=${poNo}`
  );
  return res.data;
};
