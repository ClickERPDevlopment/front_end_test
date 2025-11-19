import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useApiUrl from "@/hooks/use-ApiUrl";
import { ReactQueryKey } from "@/utils/react-query-key";

export function GetAllBuyer() {
  const api = useApiUrl();

  const getData = async (): Promise<Buyer[]> =>
    (await axios.get(api.ProductionUrl + "/production/buyer/GetAllBuyer")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.buyer],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetBuyerById(id: number) {
  const api = useApiUrl();

  const getData = async (): Promise<Buyer> =>
    (await axios.get(api.ProductionUrl + "/production/buyer/" + id)).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.buyer],
    queryFn: getData,
  });

  return query;
}

type Buyer = {
  Id: string;
  NAME: string;
  DISPLAY_NAME: string;
  CONTACT: string;
  EMAIL: string;
  COUNTRYID: string;
  ADDRESS: string;
  BUNDLENOSTARTFROMZERO: string;
  ISACTIVE: string;
  CODE: string;
  REMARKS: string;
  CREATEBY: string;
  CREATEDATE: string;
  UPDATEBY: string;
  UPDATEDATE: string;
  IS_LOCAL: string;
  OUTSIDE_CHALLAN_BUYER_NAME: string;
};
