import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

export type SizeType = {
  ID: number;
  BUYERID: number;
  SIZENAME?: string;
  SORTINGNO: number;
  CREATEBY?: string;
  CREATEDATE?: Date;
  UPDATEBY?: string;
  UPDATEDATE?: Date;
  IS_ACTIVE?: string;
  IS_SIZE_GROUP_TYPE?: string;
  CM?: number;
  DISPLAY_NAME?: string;
};

export function GetSize() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<SizeType[]> =>
    (await axios.get("/production/Size")).data.Data;

  const query = useQuery({
    queryKey: [ReactQueryKey.Size],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetSizeByBuyer(buyerId: string) {
  const axios = useAxiosInstance();

  const getData = async (): Promise<SizeType[]> =>
    (await axios.get("/production/Size/buyerId=" + buyerId)).data.Data;

  const query = useQuery({
    queryKey: [ReactQueryKey.Color],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetSizeById(id: number) {
  const axios = useAxiosInstance();

  const getData = async (): Promise<SizeType> =>
    (await axios.get("/production/Size/" + id)).data.Data;

  const query = useQuery({
    queryKey: [ReactQueryKey.buyer, id],
    queryFn: getData,
  });

  return query;
}

export async function Save(SizeType: SizeType, axios: AxiosInstance) {
  const { SIZENAME, BUYERID } = SizeType;

  if (!SIZENAME) {
    throw new Error("Name is required");
  }
  // if (DISPLAY_NAME.length < 2) {
  //   throw new Error("Display name must be at least 2 character.");
  // }

  if (!BUYERID) {
    throw new Error("Buyer is required");
  }

  const response = await axios.post("/production/Size", SizeType);

  if (!response) {
    throw new Error("This size already exist.");
  }

  return response.data;
}

export async function Update(ColorType: SizeType, axios: AxiosInstance) {
  const { SIZENAME, BUYERID } = ColorType;

  if (!SIZENAME) {
    throw new Error("Name is required");
  }
  // if (COLOR_DISPLAY_NAME.length < 2) {
  //   throw new Error("Display name must be at least 2 character.");
  // }

  if (!BUYERID) {
    throw new Error("Buyer is required");
  }

  const response = await axios.put(
    "/production/Size/" + ColorType.ID,
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
  await axios.delete("/production/Size/" + id);
}
