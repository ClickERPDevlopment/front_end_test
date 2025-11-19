import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utils/react-query-key";
import useApiUrl from "@/hooks/use-ApiUrl";

export function GetAllStyle() {
  const api = useApiUrl();

  const getData = async (): Promise<Style[]> =>
    (await axios.get(api.ProductionUrl + "/production/style/GetAllStyle")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.style],
    queryFn: getData,
  });

  return query;
}

export function GetAllStyleById(id: number) {
  const api = useApiUrl();

  const getData = async (id: number) =>
    (
      await axios.get(
        api.ProductionUrl + `/production/style/GetStyleByIdid=${id}`
      )
    ).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.style, id],
    queryFn: () => getData(id),
  });

  return query;
}

export function GetAllStyleByBuyer(buyerId: number) {
  const api = useApiUrl();

  const getData = async (buyerId: number): Promise<Style[]> =>
    (
      await axios.get(
        `${api.ProductionUrl}/production/style/GetAllStyleByBuyer?buyerId=${buyerId}`
      )
    ).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.styleByBuyer, buyerId],
    queryFn: () => getData(buyerId),
    staleTime: 1000 * 10,
  });

  return query;
}

type Style = {
  Id: string;
  Producttypeid: string;
  Buyerid: string;
  Styleno: string;
  Prestyleno: string;
  Stylename: string;
  Itemtype: string;
  Productdepartmentid: string;
  Smvsewing: string;
  Smvsewingsideseam: string;
  Cmsewing: string;
  Currencyid: string;
  Smvcutting: string;
  Smvcuttingsideseam: string;
  Smvfinishing: string;
  // Image : ArrayBuffer;
  Remarks: string;
  Isactive: string;
  Isprint: string;
  Isembroidery: string;
  Issmoke: string;
  Isdying: string;
  Iswashing: string;
  Isknitting: string;
  Createby: string;
  Createdate: string;
  Updateby: string;
  Updatedate: string;
  Fabricsname: string;
  Itemuom: string;
  Productfamily: string;
  IsPrintEmb: string;
  ShortName: string;
  FabricGsm: string;
  FabricDia: string;
  PrintEmbAfterSew: string;
};
