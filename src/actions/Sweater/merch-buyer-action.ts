import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utils/react-query-key";
import useAxiosInstance from "@/hooks/axios-instance";
import { AxiosInstance } from "axios";

export type BuyerType = {
  Id: number;
  NAME: string;
  DISPLAY_NAME: string;
  CONTACT: string | null;
  EMAIL: string | null;
  COUNTRYID: number;
  Country: {
    CountryId: number;
    Name: string;
    Phonecode: string;
    IsoCode2: string;
    IsoCode3: string;
    Region: string | null;
    Status: number;
    Createby: string;
    Createdate: string;
  } | null;
  ADDRESS: string | null;
  BUNDLENOSTARTFROMZERO: string;
  ISACTIVE: string;
  CODE: string;
  REMARKS: string | null;
  CREATEBY: string;
  CREATEDATE: string;
  UPDATEBY: string | null;
  UPDATEDATE: string | null;
  IS_LOCAL: string;
  OUTSIDE_CHALLAN_BUYER_NAME: string;
  COMMISSION: number;
  MAINBUYERID: number;
};

export function GetBuyer() {
  const axios = useAxiosInstance();

  const getData = async (): Promise<BuyerType[]> =>
    (await axios.get("/production/Buyer/GetAllBuyer")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.Buyer],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetBuyerById(id: number) {
  const axios = useAxiosInstance();

  const getData = async (): Promise<BuyerType> =>
    (await axios.get("/production/Buyer/" + id)).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.buyer, id],
    queryFn: getData,
  });

  return query;
}

export async function Save(BuyerType: BuyerType, axios: AxiosInstance) {
  const { NAME, CODE, DISPLAY_NAME } = BuyerType;

  if (!NAME) {
    throw new Error("Name is required");
  }
  if (NAME.length < 2) {
    throw new Error("Name must be at least 2 character.");
  }

  if (!CODE) {
    throw new Error("Buyer Code is required");
  }
  if (CODE.length < 2) {
    throw new Error("Buyer Code must be at least 2 character.");
  }

  if (!DISPLAY_NAME) {
    throw new Error("Display Name is required");
  }
  if (DISPLAY_NAME.length < 2) {
    throw new Error("Display Name must be at least 2 character.");
  }

  const response = await axios.post("/production/Buyer", BuyerType);

  if (!response) {
    throw new Error("This Buyer already exist.");
  }

  return response.data;
}

export async function Update(BuyerType: BuyerType, axios: AxiosInstance) {
  const { NAME, CODE, DISPLAY_NAME } = BuyerType;

  if (!NAME) {
    throw new Error("Name is required");
  }
  if (NAME.length < 2) {
    throw new Error("Name must be at least 2 character.");
  }

  if (!CODE) {
    throw new Error("Buyer Code is required");
  }
  if (CODE.length < 2) {
    throw new Error("Buyer Code must be at least 2 character.");
  }

  if (!DISPLAY_NAME) {
    throw new Error("Display Name is required");
  }
  if (DISPLAY_NAME.length < 2) {
    throw new Error("Display Name must be at least 2 character.");
  }

  const response = await axios.put(
    "/production/Buyer/" + BuyerType.Id,
    BuyerType
  );

  if (!response) {
    throw new Error("This Buyer already exist.");
  }

  return response.data;
}

export async function Delete(id: number, axios: AxiosInstance) {
  if (Number(id) <= 0) {
    throw new Error("Buyer not selected.");
  }
  await axios.delete("/production/Buyer/" + id);
}
