import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utils/react-query-key";
import useApiUrl from "@/hooks/use-ApiUrl";

export function GetMaterialGroup() {
  const api = useApiUrl();

  const getData = async (): Promise<MaterialGroup[]> =>
    (await axios.get(api.ProductionUrl + "/store/MaterialGroup")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.material],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}


type MaterialGroup = {
  ID: number;
  CODE: string;
  NAME: string;
};
