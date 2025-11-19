import { AxiosInstance } from "axios";
import { ICompanyType } from "../Configurations/company-action";
import { companyId } from "@/utils/local-storage-utils";

export type SwtMachineBrandGroupType = {
  ID: number;
  COMPANY_ID: number;
  Company?: ICompanyType;
  GROUP_NAME: string;
  IS_ACTIVE: boolean;
  CREATED_BY?: string;
  CREATED_DATE?: Date;
  UPDATED_BY?: string;
  UPDATED_DATE?: Date;
  lstBrands: SwtMachineBrandGroupDetailsType[] | undefined;
};

export type SwtMachineBrandGroupDetailsType = {
  ID?: number;
  MASTER_ID?: number;
  MC_BRAND_ID: number;
  MC_BRAND: string;
};

export const GetSwtBrandGroup = async (
  axios: AxiosInstance
): Promise<SwtMachineBrandGroupType[]> =>
  (await axios.get(`/production/SwtBrandGroup?companyId=${companyId}`)).data;

export const GetSwtBrandGroupById = async (
  axios: AxiosInstance,
  id: number
): Promise<SwtMachineBrandGroupType> =>
  (await axios.get("/production/SwtBrandGroup/" + id)).data;

export async function Save(
  data: SwtMachineBrandGroupType,
  axios: AxiosInstance
) {
  const { GROUP_NAME: NAME } = data;
  // console.log(data);

  if (!NAME) {
    throw new Error("Name is required");
  }
  if (NAME.length < 2) {
    throw new Error("Mc Brand Group name must be at least 2 character.");
  }
  if (data.lstBrands == null || data.lstBrands?.length <= 0) {
    throw new Error("Please add machine brands.");
  }

  const response = await axios.post("/production/SwtBrandGroup", data);

  if (!response) {
    throw new Error("This is group already exist.");
  }

  return response.data;
}

export async function Update(
  data: SwtMachineBrandGroupType,
  axios: AxiosInstance
) {
  const { GROUP_NAME: NAME } = data;

  if (!NAME) {
    throw new Error("Name is required");
  }
  if (NAME.length < 2) {
    throw new Error("Mc Brand Group name must be at least 2 character.");
  }
  if (data.lstBrands == null || data.lstBrands?.length <= 0) {
    throw new Error("Please add machine brands.");
  }

  const response = await axios.put(
    "/production/SwtBrandGroup/" + data.ID,
    data
  );

  if (!response) {
    throw new Error("This SwtMachineBrandGroupType already exist.");
  }

  return response.data;
}

export async function Delete(id: number, axios: AxiosInstance) {
  if (Number(id) <= 0) {
    throw new Error("Brand Group not selected.");
  }

  await axios.delete("/production/SwtBrandGroup/" + id);
}
