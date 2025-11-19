import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";

export type ItemType = {
  Id: number;
  Name: string;
  Createby: string;
  Createdate: Date;
  Remarks: string;
  Updateby: string;
  Updatedate: Date;
  IsActive: string;
};

export function GetAllItemType() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<ItemType[]> =>
    (await axios.get("/production/MerItemType")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.ItemType],
    queryFn: getData,
  });

  return query;
}
