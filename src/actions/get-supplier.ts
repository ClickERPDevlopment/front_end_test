import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utils/react-query-key";
import useApiUrl from "@/hooks/use-ApiUrl";

export function GetSupplier() {
  const api = useApiUrl();

  const getData = async (): Promise<Supplier[]> =>
    (await axios.get(api.ProductionUrl + "/production/Supplier/GetAllSupplier"))
      .data;

  const query = useQuery({
    queryKey: [ReactQueryKey.supplier],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetSupplierById(id: number) {
  const api = useApiUrl();

  const getData = async (): Promise<Supplier> =>
    (await axios.get(api.ProductionUrl + "/production/Supplier/" + id)).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.supplier],
    queryFn: getData,
  });

  return query;
}

type Supplier = {
  Id: string;
  Name: string;
};
