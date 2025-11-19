import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";

export type LineType = {
  Id: number;
  Unitid: number;
  Linecode: string;
  Linename: string;
  Incharge: string;
  Operator: number;
  Helper: number;
  Itemtype: string;
  Remarks: string;
  Isactive: string;
  Createby: string;
  Createdate: string;
  Updateby: string;
  Updatedate: string;
};

export function GetAllLineByUnit(unitId: number) {
  const axios = useAxiosInstance();

  const getData = async (): Promise<LineType[]> => {
    const response = await axios.get(`/production/GetAllLineByUnit`, {
      params: { unitId },
    });
    return response.data;
  };

  const query = useQuery({
    queryKey: [ReactQueryKey.floor, unitId],
    queryFn: getData,
    enabled: !!unitId,
  });

  return query;
}
