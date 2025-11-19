import { AxiosInstance } from "axios";
import { SwtMachineGroupType } from "./swt-mc-group-action";

export type SwtDateWiseMCDistributionType = {
  ID: number;
  PRODUCTION_DATE: Date;
  MC_GROUP_ID: number;
  MC_GROUP: string;
  MC_QUANTITY: number;
};

export type SwtDateWiseMCDistributionResponseType = {
  lstSwtDateWiseMCDistribution: SwtDateWiseMCDistributionType[];
  lstSwtMachineGroup: SwtMachineGroupType[];
  lstDate: Date[];
};

export async function GetDateWiseMcDistribution(
  fromDate: string,
  toDate: string,
  gaugeId: number,
  brandId: number,
  axios: AxiosInstance
) {
  const data = async () =>
    await axios.get(
      `/production/SwtDateWiseMCDistribution?fromDate=${fromDate}&toDate=${toDate}&gaugeId=${gaugeId}&brandId=${brandId}`
    );
  return data().then(
    (res) => res.data as SwtDateWiseMCDistributionResponseType | undefined
  );
}

export async function Save(
  lstDateWiseMCDistributionType: SwtDateWiseMCDistributionType[],
  axios: AxiosInstance
) {
  try {
    if (lstDateWiseMCDistributionType.length <= 0) {
      throw new Error("Please input date-wise m/c distribution is required");
    }

    const response = await axios.post(
      "/production/SwtDateWiseMCDistribution",
      lstDateWiseMCDistributionType
    );

    if (!response || response.status !== 200) {
      console.log();
      throw new Error("Some error happend. Please try agian.");
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Some error happend. Please try agian.");
  }
}

// export async function Update(SwtGaugetype: SwtGaugeType, axios: AxiosInstance) {
//   const { GAUGE: NAME } = SwtGaugetype;

//   if (!NAME) {
//     throw new Error("Name is required");
//   }
//   if (NAME.length < 2) {
//     throw new Error("SwtGauge name must be at least 2 character.");
//   }

//   const response = await axios.put(
//     "/production/SwtGauge/" + SwtGaugetype.ID,
//     SwtGaugetype
//   );

//   if (!response) {
//     throw new Error("This SwtGaugetype already exist.");
//   }

//   return response.data;
// }

// export async function Delete(id: number, axios: AxiosInstance) {
//   if (Number(id) <= 0) {
//     throw new Error("SwtGauge not selected.");
//   }

//   await axios.delete("/production/SwtGauge/" + id);
// }
