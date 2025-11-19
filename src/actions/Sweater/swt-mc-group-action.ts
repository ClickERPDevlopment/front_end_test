import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

export type SwtMachineGroupType = {
  ID: number;
  GROUP_NAME: string;
  CODE: string;

  FLOOR_ID: number;
  FLOOR: string | undefined;

  SUPERVISOR_ID: number;
  SUPERVISOR: string | undefined;

  BEST_FOR_ITEM_ID: number;
  BEST_FOR_ITEM: string | undefined;

  MC_BRAND_ID: number;
  MC_BRAND: string | undefined;

  NUMBER_OF_MACHINE: number;
  IS_ACTIVE: boolean;

  MC_GAUGE: string;
  lstMC_GAUGE: SwrMachineGroupDetailsType[] | undefined;
};

export type SwrMachineGroupDetailsType = {
  ID?: number;
  MASTER_ID?: number;
  MC_GAUGE_ID: number;
  MC_GAUGE: string | undefined;
};

export function GetSwtMachineGroup() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<SwtMachineGroupType[]> =>
    (await axios.get("/production/SwtMachineGroup")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.SwtMachineGroup],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetSwtMachineGroupById(id: number) {
  const axios = useAxiosInstance();

  const getData = async (): Promise<SwtMachineGroupType> =>
    (await axios.get("/production/SwtMachineGroup/" + id)).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.SwtMachineGroup, id],
    queryFn: getData,
  });

  return query;
}

export function GetSimilarMcGroup(mcgId: number) {
  const axios = useAxiosInstance();

  const getData = async (): Promise<SwtMachineGroupType[]> =>
    (
      await axios.get(
        "/production/SwtMachineGroup/SimilarMcGroup?mcGroupId=" + mcgId
      )
    ).data;

  const query = useQuery({
    queryKey: ["GetSimilarMcGroup", mcgId],
    queryFn: getData,
  });

  return query;
}

export async function Save(
  SwtMachineGroupType: SwtMachineGroupType,
  axios: AxiosInstance
) {
  const { GROUP_NAME: NAME } = SwtMachineGroupType;
  console.log(SwtMachineGroupType);

  if (!NAME) {
    throw new Error("Name is required");
  }
  if (NAME.length < 2) {
    throw new Error("Mc-Group name must be at least 2 character.");
  }

  const response = await axios.post(
    "/production/SwtMachineGroup",
    SwtMachineGroupType
  );

  if (!response) {
    throw new Error("This SwtMachineGroupType already exist.");
  }

  return response.data;
}

export async function Update(
  SwtMachineGroupType: SwtMachineGroupType,
  axios: AxiosInstance
) {
  const { GROUP_NAME: NAME } = SwtMachineGroupType;

  if (!NAME) {
    throw new Error("Name is required");
  }
  if (NAME.length < 2) {
    throw new Error("SwtMachineGroup name must be at least 2 character.");
  }

  const response = await axios.put(
    "/production/SwtMachineGroup/" + SwtMachineGroupType.ID,
    SwtMachineGroupType
  );

  if (!response) {
    throw new Error("This SwtMachineGroupType already exist.");
  }

  return response.data;
}

export async function Delete(id: number, axios: AxiosInstance) {
  if (Number(id) <= 0) {
    throw new Error("SwtMachineGroup not selected.");
  }

  await axios.delete("/production/SwtMachineGroup/" + id);
}
