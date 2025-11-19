/* eslint-disable react-hooks/rules-of-hooks */
import useApiUrl from "@/hooks/use-ApiUrl";
import axios, { AxiosError } from "axios";

export async function GetReportData({
  queryKey,
}: {
  queryKey: [
    string | null,
    string | null,
    string | null,
    string | null,
    string | null,
    string | null
  ];
}) {
  const [key, buyerId, styleId, fabricId, woId, onlyBalanceQtyItemwillshow] =
    queryKey;
  const api = useApiUrl();

  console.log(key);

  return await axios
    .get(
      `${api.ProductionUrl}/production/MerchReport/GeneralBlockFabricStatusReport?buyerId=${buyerId}&styleId=${styleId}&fabricId=${fabricId}&woId=${woId}&onlyBalanceQtyItemwillshow=${onlyBalanceQtyItemwillshow}`
    )
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      throw new TypeError("Error: " + error.response?.data);
    });
}
