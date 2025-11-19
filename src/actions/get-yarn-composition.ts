import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utils/react-query-key";
import useApiUrl from "@/hooks/use-ApiUrl";

export function GetAllYarnComposition() {
  const api = useApiUrl();

  const getData = async (): Promise<YarnComposition[]> =>
    (await axios.get(api.ProductionUrl + "/store/YarnComposition")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.yarnComposition],
    queryFn: getData,
  });

  return query;
}

type YarnComposition = {
  ID: number;
  YARN_COMPO: string;
  DESCRIPTION: string;
  IS_ACTIVE: string;
  CREATED_BY: string;
  CREATED_DATE: Date;
  UPDATED_BY: string;
  UPDATED_DATE: Date;
};
