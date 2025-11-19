import moment from "moment";
import {
  LineLoadingPlanAvlMinutesType,
  LineLoadingPlanDetailsType,
  LineLoadingPlanOrderStatusType,
  LineLoadingPlanUsedMinutesType,
} from "@/actions/Sweater/swt-planning-action";

export function GetAllUniqueDates(
  data: LineLoadingPlanDetailsType[]
): string[] {
  const tempData = Array.from(new Set(data.map((x) => x.PLAN_DATE)));

  tempData.sort(function (a, b) {
    return new Date(a!).getTime() - new Date(b!).getTime();
  });

  return tempData.filter((date): date is string => date !== undefined);
}

export function GetAllUniqueFloor(
  data: LineLoadingPlanDetailsType[]
): string[] {
  const tempData = Array.from(new Set(data.map((x) => x.FLOOR_NO)));
  return tempData.filter(
    (FLOOR_NO): FLOOR_NO is string => FLOOR_NO !== undefined
  );
}

export function GetAllUniqueRows(data: LineLoadingPlanDetailsType[]) {
  const lstDetails: LineLoadingPlanDetailsType[] = [];
  const tempKey: string[] = [];

  data?.forEach((element) => {
    const key = generateUniqueKey(element);
    if (!tempKey.includes(key)) {
      tempKey.push(key);
      lstDetails.push(element);
    }
  });

  return lstDetails;
}

function generateUniqueKey(data: LineLoadingPlanDetailsType) {
  return (
    data.MC_GROUP_ID +
    "_" +
    data.LINE_NO! +
    "_" +
    data.BUYER_ID +
    "_" +
    data.STYLE_ID +
    "_" +
    data.PO_ID +
    "_" +
    data.SHIP_DATE
  );
}

export function GetOrderQtyByRow(
  row: LineLoadingPlanDetailsType,
  data: LineLoadingPlanOrderStatusType[]
): number | undefined {
  const orderQty = data.find(
    (x) =>
      x.BUYER_ID === row.BUYER_ID &&
      x.STYLE_ID === row.STYLE_ID &&
      x.PO_ID === row.PO_ID &&
      moment(x.SHIP_DATE, "DD-MMM-YY") === moment(row.SHIP_DATE, "DD-MMM-YY")
  )?.ORDER_QTY;

  return orderQty;
}

export function GetProductionQtyByRow(
  row: LineLoadingPlanDetailsType,
  data: LineLoadingPlanOrderStatusType[]
): number | undefined {
  const SEW_QTY = data.find(
    (x) =>
      x.BUYER_ID === row.BUYER_ID &&
      x.STYLE_ID === row.STYLE_ID &&
      x.PO_ID === row.PO_ID &&
      moment(x.SHIP_DATE, "DD-MMM-YY") === moment(row.SHIP_DATE, "DD-MMM-YY")
  )?.SEW_QTY;

  return SEW_QTY;
}

export function GetProductionBalanceQtyByRow(
  row: LineLoadingPlanDetailsType,
  data: LineLoadingPlanOrderStatusType[]
): number | undefined {
  const orderQty = GetOrderQtyByRow(row, data);
  const SEW_QTY = GetProductionQtyByRow(row, data);

  return (orderQty ? orderQty : 0) - (SEW_QTY ? SEW_QTY : 0);
}

export function GetPlanQtyByRow(
  row: LineLoadingPlanDetailsType,
  data: LineLoadingPlanDetailsType[]
): number | undefined {
  const targetRowKey = generateUniqueKey(row);
  const tempData = data.filter((x) => generateUniqueKey(x) === targetRowKey);
  const planQty = tempData.reduce((p, c) => p + (c.PLAN_QTY || 0), 0);
  return planQty;
}

export function GetRowPlanQtyByDateByRow(
  date: string,
  row: LineLoadingPlanDetailsType,
  data: LineLoadingPlanDetailsType[]
) {
  const targetRowKey = generateUniqueKey(row);
  const tempData = data.filter(
    (x) => generateUniqueKey(x) === targetRowKey && x.PLAN_DATE === date
  );
  const planQty = tempData.reduce((p, c) => p + (c.PLAN_QTY || 0), 0);
  return planQty;
}

export function GetRowPlanQtyByDate(
  date: string,
  data: LineLoadingPlanDetailsType[]
) {
  const tempData = data.filter((x) => x.PLAN_DATE === date);
  const planQty = tempData.reduce((p, c) => p + (c.PLAN_QTY || 0), 0);
  return planQty;
}

export function GetTotalMcQtyByDate(
  date: string,
  data: LineLoadingPlanDetailsType[]
) {
  const tempData = data.filter((x) => x.PLAN_DATE === date);
  const mcQty = tempData.reduce((p, c) => p + (c.NUMBER_OF_MC || 0), 0);
  return mcQty;
}

export function GetTotalQtyByDate(
  date: string,
  data: LineLoadingPlanDetailsType[]
) {
  const tempData = data.filter((x) => x.PLAN_DATE === date);
  const planQty = tempData.reduce((p, c) => p + (c.PLAN_QTY || 0), 0);
  return planQty;
}

export function GetTotalAvlMinByDate(
  date: string,
  data: LineLoadingPlanAvlMinutesType[]
) {
  const tempData = data.filter((x) => x.CALENDERDATE === date);
  const mcQty = tempData.reduce((p, c) => p + (c.AVL_MINUTE || 0), 0);
  return mcQty;
}

export function GetTotalUsedMinByDate(
  date: string,
  data: LineLoadingPlanUsedMinutesType[]
) {
  const tempData = data.filter((x) => x.PLAN_DATE === date);
  const mcQty = tempData.reduce((p, c) => p + (c.USE_MIN || 0), 0);
  return mcQty;
}

export function GetBalanceMcByDate(
  date: string,
  avlMc: LineLoadingPlanAvlMinutesType[],
  userMc: LineLoadingPlanUsedMinutesType[]
) {
  const userMcQty = GetTotalUsedMinByDate(date, userMc);
  const avlMcQty = GetTotalAvlMinByDate(date, avlMc);
  return avlMcQty - userMcQty;
}
