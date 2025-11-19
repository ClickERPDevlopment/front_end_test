import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

export type SwtGaugeType = {
  ID: number;
  GAUGE: string;
  IsActive: boolean;
};

export function GetAllSwtGauge() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<SwtGaugeType[]> =>
    (await axios.get("/production/SwtGauge")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.SwtGauge],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetSwtGaugeById(id: number) {
  const axios = useAxiosInstance();

  const getData = async (): Promise<SwtGaugeType> =>
    (await axios.get("/production/SwtGauge/" + id)).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.SwtGauge, id],
    queryFn: getData,
  });

  return query;
}

export async function Save(SwtGaugetype: SwtGaugeType, axios: AxiosInstance) {
  const { GAUGE: NAME } = SwtGaugetype;

  if (!NAME) {
    throw new Error("Name is required");
  }
  if (NAME.length < 2) {
    throw new Error("SwtGauge name must be at least 2 character.");
  }

  const response = await axios.post("/production/SwtGauge", SwtGaugetype);

  if (!response) {
    throw new Error("This SwtGaugetype already exist.");
  }

  return response.data;
}

export async function Update(SwtGaugetype: SwtGaugeType, axios: AxiosInstance) {
  const { GAUGE: NAME } = SwtGaugetype;

  if (!NAME) {
    throw new Error("Name is required");
  }
  if (NAME.length < 2) {
    throw new Error("SwtGauge name must be at least 2 character.");
  }

  const response = await axios.put(
    "/production/SwtGauge/" + SwtGaugetype.ID,
    SwtGaugetype
  );

  if (!response) {
    throw new Error("This SwtGaugetype already exist.");
  }

  return response.data;
}

export async function Delete(id: number, axios: AxiosInstance) {
  if (Number(id) <= 0) {
    throw new Error("SwtGauge not selected.");
  }

  await axios.delete("/production/SwtGauge/" + id);
}
