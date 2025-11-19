import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utils/react-query-key";
import useApiUrl from "@/hooks/use-ApiUrl";

export function GetAllYarnLot() {
  const api = useApiUrl();

  const getData = async (): Promise<YarnLot[]> =>
    (await axios.get(api.ProductionUrl + "/production/yarnlot")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.brand],
    queryFn: getData,
  });

  return query;
}

type YarnLot = {
  ID: number;
  YARN_LOT_NUMBER: string;
  IS_ACTIVE: string;
  KNT_PROCESS_LOSS_PER: number;
};
