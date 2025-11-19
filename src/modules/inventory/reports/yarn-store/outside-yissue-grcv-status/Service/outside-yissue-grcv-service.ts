/* eslint-disable react-hooks/rules-of-hooks */
import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";


export interface params {
  fromDate: string | null;
  toDate: string | null;
  isDateWise: string | null;
  buyerId: string | null;
  styleId: string | null;
  poId: string | null;
  partyId: string | null;
  yarnChallan: string | null;
  isBalanceZeroNotShow: string | null;
  isCHDateWiseView: string | null;
  styleIds: string | null;
  poIds: string | null;
}

export async function OutSideYIssueGRcv_YarnIssue(params: params) {
  const api = useApiUrl();

  const data = await axios
    .get(
      `${api.ProductionUrl}/production/yarnstorereport/OutsideYarnSendAndFRcvStatus_ysend?` +
      `fromDate=${params.fromDate}&` +
      `toDate=${params.toDate}&` +
      `isDateWise=${params.isDateWise}&` +
      `buyerId=${params.buyerId}&` +
      `poId=${params.poId}&` +
      `partyId=${params.partyId}&` +
      `isBalanceZeroNotShow=${params.isBalanceZeroNotShow}&` +
      `isCHDateWiseView=${params.isCHDateWiseView}&` +
      `styleId=${params.styleId}&` +
      `yarnChallan=${params.yarnChallan}&` +
      `styleIds=${params.styleIds}&` +
      `poIds=${params.poIds}`
    )
    .then((res) => {
      if (res.data) {
        const result = res.data;
        if (result.IsError) {
          console.log("Error found: ", result.ErrorMessage);
        } else {
          // console.log("yarn issue:", result.Data);
          return result.Data;
        }
      } else {
        console.log(res);
      }
    })
    .catch((m) => console.log(m));
  return data;
}

export async function OutSideYIssueGRcv_GreyRcv(params: params) {
  const api = useApiUrl();

  const data = await axios
    .get(
      `${api.ProductionUrl}/production/yarnstorereport/OutsideYarnSendAndFRcvStatus_greyRcv?` +
      `fromDate=${params.fromDate}&` +
      `toDate=${params.toDate}&` +
      `isDateWise=${params.isDateWise}&` +
      `buyerId=${params.buyerId}&` +
      `poId=${params.poId}&` +
      `partyId=${params.partyId}&` +
      `isBalanceZeroNotShow=${params.isBalanceZeroNotShow}&` +
      `isCHDateWiseView=${params.isCHDateWiseView}&` +
      `styleId=${params.styleId}&` +
      `yarnChallan=${params.yarnChallan}&` +
      `styleIds=${params.styleIds}&` +
      `poIds=${params.poIds}`
    )
    .then((res) => {
      if (res.data) {
        const result = res.data;
        if (result.IsError) {
          console.log("Error found: ", result.ErrorMessage);
        } else {
          // console.log("grey rcv:", result.Data);
          return result.Data;
        }
      } else {
        console.log(res);
      }
    })
    .catch((m) => console.log(m));
  return data;
}

export async function OutSideYIssueGRcv_GreyRcv_LoseYarnRcv(params: params) {
  const api = useApiUrl();

  const data = await axios
    .get(
      `${api.ProductionUrl}/production/yarnstorereport/OutsideYarnSendAndFRcvStatus_loseYarnRcv?` +
      `fromDate=${params.fromDate}&` +
      `toDate=${params.toDate}&` +
      `isDateWise=${params.isDateWise}&` +
      `buyerId=${params.buyerId}&` +
      `poId=${params.poId}&` +
      `partyId=${params.partyId}&` +
      `isBalanceZeroNotShow=${params.isBalanceZeroNotShow}&` +
      `isCHDateWiseView=${params.isCHDateWiseView}&` +
      `styleId=${params.styleId}&` +
      `yarnChallan=${params.yarnChallan}&` +
      `styleIds=${params.styleIds}&` +
      `poIds=${params.poIds}`
    )
    .then((res) => {
      if (res.data) {
        const result = res.data;
        if (result.IsError) {
          console.log("Error found: ", result.ErrorMessage);
        } else {
          // console.log("lose yarn:", result.Data);
          return result.Data;
        }
      } else {
        console.log(res);
      }
    })
    .catch((m) => console.log(m));
  return data;
}
