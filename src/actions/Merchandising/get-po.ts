import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utils/react-query-key";
import useApiUrl from "@/hooks/use-ApiUrl";

export function GetAllPoByStyled(styleId: number) {
  const api = useApiUrl();

  const getData = async (id: number): Promise<PurchaseOrder[]> =>
    (
      await axios.get(
        api.ProductionUrl +
        `/production/PurchaseOrder/GetAllPOByStyle?styleId=${id}`
      )
    ).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.poByStyle, styleId],
    queryFn: () => getData(styleId),
  });

  return query;
}

export type PurchaseOrder = {
  Id: string;
  Pono: string;
};
