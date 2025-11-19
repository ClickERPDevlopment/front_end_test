/* eslint-disable react-hooks/rules-of-hooks */
import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";

// import useApiUrl from "../../../../../hooks/use-ApiUrl";

export interface params {
  fromDate: string | null;
  toDate: string | null;
  isDateWise: string | null;
  buyerId: string | null;
  styleId: string | null;
  poId: string | null;
  partyId: string | null;
  isBalanceZeroNotShow: string | null;
  seasonId: string | null;
  colorId: string | null;
  isGreyStock: string | null;
  isReprocessStock: string | null;
}

export async function GreyBatchStatus_GreyRcvDetails(params: params) {
  const api = useApiUrl();

  const data = await axios
    .get(
      `${api.ProductionUrl}/production/dyeingreport/GreyBatchStatus_GreyRcvDetails?` +
      `fromDate=${params.fromDate}&` +
      `toDate=${params.toDate}&` +
      `isDateWise=${params.isDateWise}&` +
      `buyerId=${params.buyerId}&` +
      `styleId=${params.styleId}&` +
      `poId=${params.poId}&` +
      `partyId=${params.partyId}&` +
      `isBalanceZeroNotShow=${params.isBalanceZeroNotShow}&` +
      `seasonId=${params.seasonId}&` +
      `colorId=${params.colorId}&` +
      `isGreyStock=${params.isGreyStock}&` +
      `isReprocessStock=${params.isReprocessStock}&`
    )
    .then((res) => {
      if (res.data) {
        const result = res.data;
        if (result.IsError) {
          console.log("Error found: ", result.ErrorMessage);
          throw new Error(result.ErrorMessage);
        } else {
          console.log("GreyRcvDetails:", result.Data);
          return result.Data;
        }
      } else {
        console.log(res);
      }
    })
    .catch((m) => console.log(m));
  return data;
}

export async function GreyBatchStatus_BatchDetails(params: params) {
  const api = useApiUrl();

  const data = await axios
    .get(
      `${api.ProductionUrl}/production/dyeingreport/GreyBatchStatus_BatchDetails?` +
      `fromDate=${params.fromDate}&` +
      `toDate=${params.toDate}&` +
      `isDateWise=${params.isDateWise}&` +
      `buyerId=${params.buyerId}&` +
      `styleId=${params.styleId}&` +
      `poId=${params.poId}&` +
      `partyId=${params.partyId}&` +
      `isBalanceZeroNotShow=${params.isBalanceZeroNotShow}&` +
      `seasonId=${params.seasonId}&` +
      `colorId=${params.colorId}&` +
      `isGreyStock=${params.isGreyStock}&` +
      `isReprocessStock=${params.isReprocessStock}&`
    )
    .then((res) => {
      if (res.data) {
        const result = res.data;
        if (result.IsError) {
          console.log("Error found: ", result.ErrorMessage);
          throw new Error(result.ErrorMessage);
        } else {
          console.log("BatchDetails:", result.Data);
          return result.Data;
        }
      } else {
        console.log(res);
      }
    })
    .catch((m) => console.log(m));
  return data;
}
