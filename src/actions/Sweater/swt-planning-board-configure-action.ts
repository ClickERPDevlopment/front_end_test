import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
// import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";
import useAxiosInstance from "@/hooks/axios-instance";

export type SwtGaugeType = {
  ID: number;
  GAUGE: string;
  IsActive: boolean;
};

export type MCGroupType = {
  ID: number;
  GROUP_NAME: string;
  CODE: string;
  FLOOR_ID: number;
  FLOOR: string;
  SUPERVISOR_ID: number;
  SUPERVISOR: string;
  BEST_FOR_ITEM_ID: number;
  BEST_FOR_ITEM: string;
  MC_BRAND_ID: number;
  MC_BRAND: string | null;
  MC_GAUGE_ID: number;
  MC_GAUGE: string;
  NUMBER_OF_MACHINE: number;
  IS_ACTIVE: boolean;
};

export type detailsType = {
  ID: number;
  MASTER_ID: number;
  MACHINE_GROUP_ID: number;
  MACHINE_GROUP: string;
  GROUP_NAME: string;
  CODE: string;
  FLOOR_ID: number;
  FLOOR: string;
  SUPERVISOR_ID: number;
  SUPERVISOR: string;
  BEST_FOR_ITEM_ID: number;
  BEST_FOR_ITEM: string;
  MC_BRAND_ID: number;
  MC_BRAND: string | null;
  MC_GAUGE_ID: number;
  MC_GAUGE: string;
  NUMBER_OF_MACHINE: number;
};

export type masterDataType = {
  ID: number;
  PLANNING_BOARD_NAME: string;
  COMPANY: string;
  COMPANY_ID: number;
  SECTION: string;
  SECTION_ID: number;
  DEFAULT_WORKING_HOUR: number;
  TOTAL_MC: number;
  WEEKEND: string;
  WEEK_START_FROM: string;
  CREATED_BY: string;
  CREATED_BY_NAME: string;
  CREATED_DATE: Date;
  UPDATED_BY: string;
  UPDATED_BY_NAME: string;
  UPDATED_DATE: Date;
};

export type planningBoardConfigureType = {
  ID: number;
  PLANNING_BOARD_NAME: string;
  COMPANY: string;
  COMPANY_ID: number;
  SECTION: string;
  SECTION_ID: number;
  DEFAULT_WORKING_HOUR: number;
  TOTAL_MC: number;
  WEEKEND: string;
  WEEK_START_FROM: string;
  CREATED_BY: string;
  CREATED_BY_NAME: string;
  CREATED_DATE: Date;
  UPDATED_BY: string;
  UPDATED_BY_NAME: string;
  UPDATED_DATE: Date;
  oDetails: detailsType[];
};

export function GetCompany<T>() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<T[]> =>
    (await axios.get("/production/Company")).data;

  const query = useQuery({
    queryKey: ["CompanyData"],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetSection<T>() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<T[]> =>
    (await axios.get("/production/Section")).data;

  const query = useQuery({
    queryKey: ["SectionData"],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetMCGroup<T>() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<T[]> =>
    (await axios.get("/production/SwtMachineGroup")).data;

  const query = useQuery({
    queryKey: ["MCGroupData"],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetSwtPlanningBoardData<T>() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<T[]> =>
    (await axios.get("/production/SwtPlanningBoardConfig")).data;

  const query = useQuery({
    queryKey: ["PlanningBoardData"],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetSwtPlanningBoardDataById<T>(id: number) {
  const axios = useAxiosInstance();

  const getData = async (): Promise<T> =>
    (await axios.get("/production/SwtPlanningBoardConfig/" + id)).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.SwtPlanningBoard, id],
    queryFn: getData,
  });

  return query;
}

export async function Save(data: any, axios: AxiosInstance) {
  const response = await axios.post("/production/SwtPlanningBoardConfig", data);

  if (!response) {
    throw new Error("This planning board already exist.");
  }

  return response.data;
}

export async function Update(data: any, axios: AxiosInstance) {
  const response = await axios.put(
    "/production/SwtPlanningBoardConfig/" + data.ID,
    data
  );

  if (!response) {
    throw new Error("This planning board already exist.");
  }

  return response.data;
}

export async function Delete(id: number, axios: AxiosInstance) {
  if (Number(id) <= 0) {
    throw new Error("Planning board not selected.");
  }

  await axios.delete("/production/SwtPlanningBoardConfig/" + id);
}
