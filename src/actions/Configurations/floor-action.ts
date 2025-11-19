import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";

export type FloorType = {
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

export function GetAllFloor() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<FloorType[]> =>
    (await axios.get("/production/Unit")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.floor],
    queryFn: getData,
  });

  return query;
}
