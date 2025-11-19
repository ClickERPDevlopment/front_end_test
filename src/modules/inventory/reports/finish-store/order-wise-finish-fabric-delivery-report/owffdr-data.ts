/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";

import useApiUrl from "@/hooks/use-ApiUrl";

export interface params {
  buyerId: string | null;
  styleId: string | null;
  poId: string | null;
  colorId: string | null;
  seasonId: string | null;
}

export async function GetOrderWiseFFAllocationData(params: params) {
  const api = useApiUrl();

  const data = await axios
    .get(
      `${api.ProductionUrl}/production/FinishFabricStore/OrderWiseFinishFabricDeliveryReport?` +
      `buyerId=${params.buyerId}&` +
      `styleId=${params.styleId}&` +
      `poId=${params.poId}&` +
      `colorId=${params.colorId}&` +
      `seasonId=${params.seasonId}&`
    )
    .then((res) => {
      if (res.data) {
        const result = res.data;
        if (result.IsError) {
          console.log("Error found: ", result.ErrorMessage);
        } else {
          console.log("data:", result.Data);
          return result;
        }
      } else {
        console.log(res);
      }
    })
    .catch((m) => console.log(m));
  return data;
}
