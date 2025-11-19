import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

export type ColorType = {
  ID: number;
  BUYERID: number;
  COLOR_TYPE?: string;
  COLORNAME?: string;
  COLOR_DISPLAY_NAME?: string;
  COLOR_DESCRIPTION?: string | null;
  DYEING_PROCESS_GROUP?: string | null;
  YARN_FLAG?: string | null;
  CREATEBY?: string;
  CREATEDATE?: string;
  UPDATEBY?: string;
  UPDATEDATE?: string;
  COLOR_COMMERCIAL_NAME?: string | null;
};

export function GetColor() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<ColorType[]> =>
    (await axios.get("/production/Color")).data.Data;

  const query = useQuery({
    queryKey: [ReactQueryKey.Color],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetColorByBuyer(buyerId: string) {
  const axios = useAxiosInstance();

  const getData = async (): Promise<ColorType[]> =>
    (await axios.get("/production/Color/buyerId=" + buyerId)).data.Data;

  const query = useQuery({
    queryKey: [ReactQueryKey.Color],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetColorById(id: number) {
  const axios = useAxiosInstance();

  const getData = async (): Promise<ColorType> =>
    (await axios.get("/production/Color/" + id)).data.Data;

  const query = useQuery({
    queryKey: [ReactQueryKey.buyer, id],
    queryFn: getData,
  });

  return query;
}

export async function Save(ColorType: ColorType, axios: AxiosInstance) {
  const { COLORNAME, COLOR_DISPLAY_NAME, BUYERID } = ColorType;

  if (!COLORNAME) {
    throw new Error("Name is required");
  }
  if (COLOR_DISPLAY_NAME && COLOR_DISPLAY_NAME.length < 2) {
    throw new Error("Display name must be at least 2 character.");
  }

  if (!BUYERID) {
    throw new Error("Buyer is required");
  }

  const response = await axios.post("/production/Color", ColorType);

  if (!response) {
    throw new Error("This color already exist.");
  }

  return response.data;
}

export async function Update(ColorType: ColorType, axios: AxiosInstance) {
  const { COLORNAME, COLOR_DISPLAY_NAME, BUYERID } = ColorType;

  if (!COLORNAME) {
    throw new Error("Name is required");
  }
  if (COLOR_DISPLAY_NAME && COLOR_DISPLAY_NAME.length < 2) {
    throw new Error("Display name must be at least 2 character.");
  }

  if (!BUYERID) {
    throw new Error("Buyer is required");
  }

  const response = await axios.put(
    "/production/Color/" + ColorType.ID,
    ColorType
  );

  if (!response) {
    throw new Error("This color already exist.");
  }

  return response.data;
}

export async function Delete(id: number, axios: AxiosInstance) {
  if (Number(id) <= 0) {
    throw new Error("Color not selected.");
  }
  await axios.delete("/production/Color/" + id);
}
