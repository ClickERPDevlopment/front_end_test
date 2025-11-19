/* eslint-disable @typescript-eslint/no-explicit-any */
import StyleImage from "@/components/style-image";
import { ICommission, IGrossCostLocalStorage, IProfitLossLocalStorage } from "../budget-wise-cost-breakdown-index";
import { IBudgetWiseCostBreakdown, IBudgetWiseCostBreakdownDto_Booking } from "./IBudgetWiseCostBreakdown";
import React, { useMemo, useCallback } from "react";

type props = {
  data: IBudgetWiseCostBreakdown,
  bookingData: IBudgetWiseCostBreakdownDto_Booking[];
  children?: React.ReactNode,
  fabricProcessType?: string[],
  gmtProcessType?: string[],
  commissionType?: string[],
  updateCommission: (com: ICommission) => void,
  index: number,
}


// Helper to safely sum arrays
const sum = (arr?: any[], key?: string) =>
  arr?.reduce((p, c) => p + Number(key ? c[key] : c), 0) ?? 0;

function PoStyleGroupSection({
  data,
  bookingData,
  fabricProcessType,
  gmtProcessType,
  commissionType,
  updateCommission,
  index,
}: props) {

  // React.useEffect(() => {
  //   localStorage.removeItem('grossCost');

  // }, [])

  // Memoize all data selectors to avoid recalculation on every render
  const poData = useMemo(() =>
    data?.BudgetWiseCostBreakdownDto_PO?.filter(
      item => item.PO_ID === bookingData[0].PO_ID && item.STYLE_ID === bookingData[0].STYLE_ID
    ) ?? [],
    [data?.BudgetWiseCostBreakdownDto_PO, bookingData]
  );

  const mainFabricData = useCallback(
    (fabricId: number) =>
      data?.BudgetWiseCostBreakdownDto_MainFabric?.filter(
        item =>
          item.PO_ID === bookingData[0]?.PO_ID &&
          item.STYLE_ID === bookingData[0]?.STYLE_ID &&
          (fabricId === 0 || item.FABRIC_ITEM_ID === fabricId)
      ) ?? [],
    [data?.BudgetWiseCostBreakdownDto_MainFabric, bookingData]
  );

  const otherFabricData = useMemo(
    () =>
      data?.BudgetWiseCostBreakdownDto_OtherFabric?.filter(
        item => item.PO_ID === bookingData[0]?.PO_ID && item.STYLE_ID === bookingData[0]?.STYLE_ID
      ) ?? [],
    [data?.BudgetWiseCostBreakdownDto_OtherFabric, bookingData]
  );

  const accessoriesData = useMemo(
    () =>
      data?.BudgetWiseCostBreakdownDto_Accessories?.filter(
        item => item.PO_ID === bookingData[0]?.PO_ID && item.STYLE_ID === bookingData[0]?.STYLE_ID
      ) ?? [],
    [data?.BudgetWiseCostBreakdownDto_Accessories, bookingData]
  );

  const fabricProcessData = useCallback(
    (fabricId: number, process: string) =>
      data?.BudgetWiseCostBreakdownDto_FabricProcessCost?.filter(
        item =>
          item.PO_ID === bookingData[0]?.PO_ID &&
          item.STYLE_ID === bookingData[0]?.STYLE_ID &&
          (fabricId === 0 || item.FABRIC_ID === fabricId) &&
          (process === "" || item.PROCESS_NAME === process)
      ) ?? [],
    [data?.BudgetWiseCostBreakdownDto_FabricProcessCost, bookingData]
  );

  const gmtProcessData = useCallback(
    (process: string) =>
      data?.BudgetWiseCostBreakdownDto_GmtOtherCost?.filter(
        item =>
          item.PO_ID === bookingData[0]?.PO_ID &&
          item.STYLE_ID === bookingData[0]?.STYLE_ID &&
          (process === "" || item.PROCESS_NAME === process)
      ) ?? [],
    [data?.BudgetWiseCostBreakdownDto_GmtOtherCost, bookingData]
  );

  const commissionData = useCallback(
    (costName: string) =>
      data?.BudgetWiseCostBreakdownDto_Commission?.filter(
        item =>
          item.PO_ID === bookingData[0]?.PO_ID &&
          item.STYLE_ID === bookingData[0]?.STYLE_ID &&
          (costName === "" || item.COST_NAME === costName)
      ) ?? [],
    [data?.BudgetWiseCostBreakdownDto_Commission, bookingData]
  );

  // Memoize netCost calculation
  const netCost = useMemo(() =>
    sum(mainFabricData(0), "TOTAL_MAIN_FABRIC_VALUE") +
    sum(otherFabricData, "TOTAL_MAIN_FABRIC_VALUE") +
    sum(accessoriesData, "TOTAL_COST") +
    sum(fabricProcessData(0, ""), "TOTAL_PRICE") +
    sum(gmtProcessData(""), "TOTAL_PRICE"),
    [mainFabricData, otherFabricData, accessoriesData, fabricProcessData, gmtProcessData]
  );

  // Memoized commission cost calculation
  const getCommissionCost = useCallback(
    ({
      comPercentage,
      commissinType,
      comValueCost,
    }: { comPercentage: number; commissinType?: string; comValueCost?: number }) => {
      const n = ((netCost ?? 0) * (comPercentage ?? 0)) / 100;
      if (commissinType) {
        updateCommission({
          commissinType: commissinType ?? "",
          poid: bookingData[0].PO_ID,
          styelid: bookingData[0].STYLE_ID,
          amount: (n ?? 0) + (comValueCost ?? 0),
        });
      }
      return (n ?? 0) + (comValueCost ?? 0);
    },
    [netCost, updateCommission, bookingData]
  );

  // Memoized grossCost calculation
  const grossCost = useMemo(() => {
    let totalCost = netCost;
    if (commissionType) {
      for (let i = 0; i < commissionType.length; i++) {
        const element = commissionType[i];
        const comValueCost = sum(commissionData(element), "COMMISSION_VALUE_BUDGET");
        const comCost = getCommissionCost({
          comPercentage: sum(commissionData(element), "COMMISSION_PERCENTAGE_BUDGET"),
          comValueCost,
        });
        totalCost += comCost;
      }
    }

    //set local storage data for grosscost
    const grossString = localStorage.getItem('grossCost');
    const gross: IGrossCostLocalStorage[] = grossString ? JSON.parse(grossString) : [];
    const targetGrossItem = gross?.find(item => item.index === index);
    if (targetGrossItem) {
      targetGrossItem.grossCost = totalCost;
    } else
      gross?.push({ index: index, grossCost: totalCost });

    localStorage.setItem('grossCost', JSON.stringify(gross))
    //end -set local storage data for grosscost

    return totalCost;
  }, [netCost, commissionType, index, commissionData, getCommissionCost]);

  // Memoize poQty for profit/loss calculation
  const poQty = useMemo(
    () => sum(poData, "QTY"),
    [poData]
  );

  // Memoize CM per dzn Achieve
  const cmPerDzn = useMemo(
    () =>
      data?.BudgetWiseCostBreakdownDto_GmtOtherCost?.find(
        f =>
          f.PO_ID === bookingData[0]?.PO_ID &&
          f.STYLE_ID === bookingData[0]?.STYLE_ID &&
          f.PROCESS_NAME === "CM"
      )?.DZN_PRICE,
    [data?.BudgetWiseCostBreakdownDto_GmtOtherCost, bookingData]
  );

  // Memoize profit/loss calculation
  const profitLoss = useMemo(() => {
    const cmPrice = cmPerDzn ?? 0;
    const smv = bookingData[0]?.SMVSEWING ?? 0;
    const targetCm = smv * 0.06 * 12;
    const totalAmount = (((cmPrice - targetCm) * poQty) / 12);

    //set local storage data for profitloss
    const lsString = localStorage.getItem('budget-profitloss');
    const gross: IProfitLossLocalStorage[] = lsString ? JSON.parse(lsString) : [];
    const targetItem = gross?.find(item => item.index === index);
    if (targetItem) {
      targetItem.amount = totalAmount;
    } else
      gross?.push({ index: index, amount: totalAmount });

    localStorage.setItem('budget-profitloss', JSON.stringify(gross))
    //end -set local storage data for profitloss

    return totalAmount.toFixed(2);
  }, [cmPerDzn, bookingData, poQty, index]);

  // Memoize master LC value
  const masterLCValue = useMemo(
    () =>
      data?.BudgetWiseCostBreakdownDto_PO?.find(
        f => f.PO_ID === bookingData[0]?.PO_ID && f.STYLE_ID === bookingData[0]?.STYLE_ID
      )?.MASTER_LC_VALUE ?? 0,
    [data?.BudgetWiseCostBreakdownDto_PO, bookingData]
  );

  // Memoize short+extra
  const shortExtra = useMemo(
    () => (masterLCValue - grossCost).toFixed(2),
    [masterLCValue, grossCost]
  );

  // Memoize target CM per dzn
  const targetCmPerDzn = useMemo(
    () => ((bookingData[0]?.SMVSEWING ?? 0) * 0.06 * 12).toFixed(2),
    [bookingData]
  );

  // Memoize SMV
  const smvSewing = useMemo(
    () => bookingData[0]?.SMVSEWING,
    [bookingData]
  );

  // Render
  return bookingData?.map((item, i) =>
    i === 0 ? (
      <tr key={i}>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500">{index + i + 1}</th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>{item.BUYER}</th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>{item.STYLENO} </th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>{item.PONO}</th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>{item.JOB_POS}</th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
          <div className="w-full">
            <StyleImage styleId={item.STYLE_ID} />
          </div>
        </th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>{poQty}</th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>{item.ITEMTYPE}</th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500">{bookingData[i]?.FABRIC}</th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500">{sum(mainFabricData(item.FABRIC_OR_MTL_ID), "FABRIC_ITEM_PRICE_PER_UNIT_KG_BUDGET")}</th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500">{mainFabricData(item.FABRIC_OR_MTL_ID)[0]?.UOM}</th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
          {data?.BudgetWiseCostBreakdownDto_PO?.find(f => f.PO_ID === item.PO_ID && f.STYLE_ID === item.STYLE_ID)?.FOB}
        </th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
          {masterLCValue}
        </th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500">
          {sum(mainFabricData(item.FABRIC_OR_MTL_ID), "TOTAL_MAIN_FABRIC_VALUE").toFixed(2)}
        </th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
          {sum(otherFabricData, "TOTAL_MAIN_FABRIC_VALUE").toFixed(2)}
        </th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
          {sum(accessoriesData, "TOTAL_COST").toFixed(2)}
        </th>
        {gmtProcessType?.map((fp_item, i) =>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length} key={i}>
            {sum(gmtProcessData(fp_item), "TOTAL_PRICE").toFixed(2)}
          </th>
        )}
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
          <div className="flex flex-col">
            <span className="hidden">TOTAL_FOB: {data?.BudgetWiseCostBreakdownDto_MainFabric?.filter(f => f.PO_ID === item.PO_ID && f.STYLE_ID === item.STYLE_ID)[0]?.TOTAL_FOB}</span>
            <span className="hidden">BALANCE_VALUE: {data?.BudgetWiseCostBreakdownDto_MainFabric?.filter(f => f.PO_ID === item.PO_ID && f.STYLE_ID === item.STYLE_ID)[0]?.BALANCE_VALUE}</span>
            <span>
              {(data?.BudgetWiseCostBreakdownDto_MainFabric?.filter(f => f.PO_ID === item.PO_ID && f.STYLE_ID === item.STYLE_ID)[0]?.TOTAL_FOB -
                data?.BudgetWiseCostBreakdownDto_MainFabric?.filter(f => f.PO_ID === item.PO_ID && f.STYLE_ID === item.STYLE_ID)[0]?.BALANCE_VALUE)?.toFixed(2)}
            </span>
          </div>
        </th>
        {commissionType?.map((fp_item, i) =>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length} key={i}>
            {getCommissionCost({
              comPercentage: sum(commissionData(fp_item), "COMMISSION_PERCENTAGE_BUDGET"),
              commissinType: fp_item,
              comValueCost: sum(commissionData(fp_item), "COMMISSION_VALUE_BUDGET")
            }).toFixed(2)}
          </th>
        )}
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
          {grossCost.toFixed(2)}
        </th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
          {shortExtra}
        </th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
          {cmPerDzn}
        </th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
          {smvSewing}
        </th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
          {targetCmPerDzn}
        </th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" rowSpan={bookingData?.length}>
          {profitLoss}
        </th>
      </tr>
    ) : (
      <tr key={i}>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500">{i + 1}</th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500">{bookingData[i]?.FABRIC}</th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500">{sum(mainFabricData(item.FABRIC_OR_MTL_ID), "FABRIC_ITEM_PRICE_PER_UNIT_KG_BUDGET")}</th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500">{mainFabricData(item.FABRIC_OR_MTL_ID)[0]?.UOM} </th>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500">
          {sum(mainFabricData(item.FABRIC_OR_MTL_ID), "TOTAL_MAIN_FABRIC_VALUE").toFixed(2)}
        </th>
        {fabricProcessType?.map((fp_item, i) =>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" key={i}>
            {sum(fabricProcessData(item.FABRIC_OR_MTL_ID, fp_item), "TOTAL_PRICE").toFixed(2)}
          </th>
        )}
      </tr>
    )
  );
}

export default React.memo(PoStyleGroupSection);
