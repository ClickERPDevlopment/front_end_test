import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";

export type UnitType = {
  Id: number;
  Subcompanyid: number;
  Unitcode: string;
  Unitname: string;
  Incharge: string;
  Remarks: string;
  Sectionid: number;
  Packedfloorname: string;
  Issubcontact: string;
  Isactive: string;
  Createby: string;
  Createdate: Date;
  Updateby: string;
  Updatedate: Date;
};

export function GetAllUnit() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<UnitType[]> =>
    (await axios.get("/production/Unit")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.unit],
    queryFn: getData,
  });

  return query;
}
