import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utils/react-query-key";
import useApiUrl from "@/hooks/use-ApiUrl";

export function GetAllYarnCount() {
  const api = useApiUrl();

  const getData = async (): Promise<YarnCount[]> =>
    (await axios.get(api.ProductionUrl + "/store/YarnCount")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.yarnCount],
    queryFn: getData,
  });

  return query;
}

type YarnCount = {
  ID: number;
  YARN_COUNT: string;
  IS_ACTIVE: string;
  CREATED_BY: string;
  CREATED_DATE: Date;
  UPDATED_BY: string;
  UPDATED_DATE: Date;
};
