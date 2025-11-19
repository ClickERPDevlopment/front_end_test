import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utils/react-query-key";
import useApiUrl from "@/hooks/use-ApiUrl";
import useAxiosInstance from "@/hooks/axios-instance";

export type CountryType = {
  CountryId: number;
  Name: string;
  Phonecode: string | undefined;
  IsoCode2: string | undefined;
  IsoCode3: string | undefined;
  Region: string | undefined;
  Status: boolean;
  Createby: string | undefined;
  Createdate: Date | string;
};

export function GetCountry() {
  const api = useApiUrl();
  const Axios = useAxiosInstance();

  const getData = async (): Promise<CountryType[]> =>
    (await Axios.get(api.ProductionUrl + "/production/country")).data;

  // const getData = async (): Promise<CountryType[]> =>
  //   (
  //     await axios.get(api.ProductionUrl + "/production/country", {
  //       headers: { Authorization: `Bearer ${auth?.token}` },
  //     })
  //   ).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.country],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetCountryById(id: number) {
  const api = useApiUrl();
  const Axios = useAxiosInstance();

  const getData = async (): Promise<CountryType> =>
    (await Axios.get(api.ProductionUrl + "/production/country/" + id)).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.country, id],
    queryFn: getData,
  });

  return query;
}

export async function Save(countrytype: CountryType) {
  const api = useApiUrl();
  const { Name: NAME } = countrytype;

  if (!NAME) {
    throw new Error("Name is required");
  }
  if (NAME.length < 2) {
    throw new Error("Country name must be at least 2 character.");
  }

  const response = await axios.post(
    api.ProductionUrl + "/production/country",
    countrytype
  );

  if (!response) {
    throw new Error("This countrytype already exist.");
  }

  return response.data;
}

export async function Update(countrytype: CountryType) {
  const api = useApiUrl();
  const { Name: NAME } = countrytype;

  if (!NAME) {
    throw new Error("Name is required");
  }
  if (NAME.length < 2) {
    throw new Error("Country name must be at least 2 character.");
  }

  const response = await axios.put(
    api.ProductionUrl + "/production/country/" + countrytype.CountryId,
    countrytype
  );

  if (!response) {
    throw new Error("This countrytype already exist.");
  }

  return response.data;
}

export async function Delete(id: number) {
  const api = useApiUrl();

  if (Number(id) <= 0) {
    throw new Error("Country not selected.");
  }

  await axios.delete(api.ProductionUrl + "/production/country/" + id);
}
