import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utils/react-query-key";
import useApiUrl from "@/hooks/use-ApiUrl";

export type BrandType = {
  BRAND_ID: number;
  BRAND_NAME: string;
  IS_YARN_BRAND: string;
  IS_CHEMICAL_BRAND: string;
  IS_MATERIAL_BRAND: string;
  CREATOR: string;
  CREATED_DATE: Date;
  MODIFIRE: string;
  UPDATED_DATE: Date;
};

export function GetAllBrand() {
  const api = useApiUrl();

  const getData = async (): Promise<BrandType[]> =>
    (await axios.get(api.ProductionUrl + "/store/Brand")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.brand],
    queryFn: getData,
  });

  return query;
}
