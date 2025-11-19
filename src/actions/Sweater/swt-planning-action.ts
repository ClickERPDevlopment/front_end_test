import { AxiosInstance } from "axios";
import moment from "moment";
import { ICompanyType } from "../Configurations/company-action";

export type LineLoadingPlanSearchType = {
  companyId: number;
  boardId: number;
  isFromDate: boolean;
  fromDate: string;
  toDate: string;
  buyerId: number;
  styleId: number;
  poId: number;
  floorId: number;
  machineGroupId: number;
};

export type LineLoadingPlanType = {
  Company: ICompanyType | undefined;
  lstLineLoadingPlanDetailsDto: LineLoadingPlanDetailsType[] | undefined;
  lstLineLoadingPlanOrderStatusDto:
  | LineLoadingPlanOrderStatusType[]
  | undefined;
  lstLineLoadingPlanAvlMinutesDto: LineLoadingPlanAvlMinutesType[] | undefined;
  lstLineLoadingPlanUsedMinutesDto:
  | LineLoadingPlanUsedMinutesType[]
  | undefined;
};

export type LineLoadingPlanDetailsType = {
  FLOOR_ID: number;
  FLOOR_NO: string | undefined;
  MC_GROUP_ID: number;
  LINE_NO: string | undefined;
  BUYER_ID: number;
  BUYER: string | undefined;
  STYLE_ID: number;
  STYLE_NO: string | undefined;
  PO_ID: number;
  PO: string | undefined;
  SEASON: string | undefined;
  SMV: number;
  ITEM_TYPE: string | undefined;
  SHIP_DATE: string | undefined;
  PLAN_DATE: string | undefined;
  NUMBER_OF_MC: number;
  PLAN_QTY: number;
};

export type LineLoadingPlanOrderStatusType = {
  BUYER_ID: number;
  STYLE_ID: number;
  PO_ID: number;
  SHIP_DATE: string | undefined;
  TOTAL_PLAN_QTY: number;
  ORDER_QTY: number;
  SEW_QTY: number;
  SEW_BAL_QTY: number;
  TOTAL_STRIP_QTY: number;
};

export type LineLoadingPlanAvlMinutesType = {
  CALENDERDATE: string | undefined;
  AVL_MINUTE: number;
};
export type LineLoadingPlanUsedMinutesType = {
  PLAN_DATE: string | undefined;
  USE_MIN: number;
};

export async function GetLineLoadingPlan(
  formData: LineLoadingPlanSearchType,
  axios: AxiosInstance
) {
  let query = "";
  query += `companyId=${formData.companyId}`;
  query += `&boardId=${formData.boardId}`;
  query += `&isFromDate=${formData.isFromDate}`;
  query += `&fromDate=${moment(formData.fromDate).format("DD-MMM-YY")}`;
  query += `&toDate=${moment(formData.toDate).format("DD-MMM-YY")}`;
  query += `&buyerId=${formData.buyerId}`;
  query += `&styleId=${formData.styleId}`;
  query += `&poId=${formData.poId}`;
  query += `&floorId=${formData.floorId}`;
  query += `&machineGroupId=${formData.machineGroupId}`;

  const data = async () =>
    await axios.get(`/production/SwtPlanning/line-loading-plan?${query}`);

  return data().then((res) => {
    const tempData = res.data as LineLoadingPlanType | undefined;

    if (tempData) {
      tempData.lstLineLoadingPlanDetailsDto?.forEach((d) => {
        d.PLAN_DATE = moment(d.PLAN_DATE).format("DD-MMM-YY");
        d.SHIP_DATE = moment(d.SHIP_DATE).format("DD-MMM-YY");
      });
      tempData.lstLineLoadingPlanAvlMinutesDto?.forEach((d) => {
        d.CALENDERDATE = moment(d.CALENDERDATE).format("DD-MMM-YY");
      });
      tempData.lstLineLoadingPlanUsedMinutesDto?.forEach((d) => {
        d.PLAN_DATE = moment(d.PLAN_DATE).format("DD-MMM-YY");
      });
    }
    return tempData;
  });
}
