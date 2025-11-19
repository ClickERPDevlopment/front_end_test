import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utils/react-query-key";
import useApiUrl from "@/hooks/use-ApiUrl";

export function GetAllYarnType() {
  const api = useApiUrl();

  const getData = async (): Promise<YarnType[]> =>
    (await axios.get(api.ProductionUrl + "/store/YarnType")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.yarnType],
    queryFn: getData,
  });

  return query;
}

type YarnType = {
  ID: number;
  YARN_TYPE: string;
  IS_ACTIVE: string;
  CREATED_BY: string;
  CREATED_DATE: Date;
  UPDATED_BY: string;
  UPDATED_DATE: Date;
};
