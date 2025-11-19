/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { ICommission } from "../budget-wise-cost-breakdown-index";
import { IBudgetWiseCostBreakdown } from "./IBudgetWiseCostBreakdown";
import { cn } from "@/lib/utils";
import { UniquePoStyleCommissions } from "./action";

type Props = {
  data: IBudgetWiseCostBreakdown;
  title: string;
  gmtProcessType?: string[];
  commissionType?: string[];
  children?: React.ReactNode;
  fabricProcessType?: string[];
  comission?: ICommission[];
};

export default function Summary({
  data,
  gmtProcessType,
  fabricProcessType,
  commissionType,
  comission,
}: Props) {
  // --- total master LC ---
  const total = useMemo(() => {
    return (
      data?.BudgetWiseCostBreakdownDto_PO?.reduce(
        (p, c) => p + Number(c.MASTER_LC_VALUE),
        0
      ) ?? 0
    );
  }, [data?.BudgetWiseCostBreakdownDto_PO]);

  // --- build rows ---
  const showData = useMemo(() => {
    const rows: {
      particular: string;
      amount: number;
      isBBLCash: boolean;
      percentage?: number;
    }[] = [
        {
          particular: "Main FABRICS",
          amount:
            data?.BudgetWiseCostBreakdownDto_MainFabric?.reduce(
              (p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE),
              0
            ) ?? 0,
          isBBLCash: true,
        },
        {
          particular: "Other FABRICS",
          amount:
            data?.BudgetWiseCostBreakdownDto_OtherFabric?.reduce(
              (p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE),
              0
            ) ?? 0,
          isBBLCash: true,
        },
        {
          particular: "Accessories",
          amount:
            data?.BudgetWiseCostBreakdownDto_Accessories?.reduce(
              (p, c) => p + Number(c.TOTAL_COST),
              0
            ) ?? 0,
          isBBLCash: true,
        },
      ];

    fabricProcessType?.forEach((element) => {
      rows.push({
        particular: element,
        amount:
          data?.BudgetWiseCostBreakdownDto_FabricProcessCost?.filter(
            (f) => f.PROCESS_NAME === element
          ).reduce((p, c) => p + Number(c.TOTAL_PRICE), 0) ?? 0,
        isBBLCash: true,
      });
    });

    gmtProcessType?.forEach((element) => {
      if (element.toUpperCase().includes('WASHING') ||
        element.toUpperCase().includes('PRINT') ||
        element.toUpperCase().includes('EMBROIDERY') ||
        element.toUpperCase().includes('OTHER COST')) {
        rows.push({
          particular: element,
          amount:
            data?.BudgetWiseCostBreakdownDto_GmtOtherCost?.filter(
              (f) => f.PROCESS_NAME === element
            ).reduce((p, c) => p + Number(c.TOTAL_PRICE), 0) ?? 0,
          isBBLCash: true,
        });
      } else {
        rows.push({
          particular: element,
          amount:
            data?.BudgetWiseCostBreakdownDto_GmtOtherCost?.filter(
              (f) => f.PROCESS_NAME === element
            ).reduce((p, c) => p + Number(c.TOTAL_PRICE), 0) ?? 0,
          isBBLCash: false,
        });
      }
    });

    //comission data
    rows.push({
      particular: 'Buying Commission',
      amount: UniquePoStyleCommissions(data)?.reduce((p, c) => p + Number(c.COMMISSION), 0) ?? 0,
      isBBLCash: false,
    });

    commissionType?.forEach((element) => {
      rows.push({
        particular: element,
        amount:
          comission
            ?.filter((f) => f.commissinType === element)
            .reduce((p, c) => p + Number(c.amount), 0) ?? 0,
        isBBLCash: false,
      });
    });
    //end-comission data


    // add percentage once
    return rows.map((r) => ({
      ...r,
      percentage: total > 0 ? (r.amount / total) * 100 : 0,
    }));
  }, [
    total,
    data?.BudgetWiseCostBreakdownDto_MainFabric,
    data?.BudgetWiseCostBreakdownDto_OtherFabric,
    data?.BudgetWiseCostBreakdownDto_Accessories,
    data?.BudgetWiseCostBreakdownDto_FabricProcessCost,
    data?.BudgetWiseCostBreakdownDto_GmtOtherCost,
    commissionType,
    comission,
    fabricProcessType,
    gmtProcessType,
  ]);

  const rowspan =
    3 + 1 +
    (fabricProcessType?.length ?? 0) +
    (gmtProcessType?.length ?? 0) +
    (commissionType?.length ?? 0);

  return (
    <div>
      <table className="border border-gray-500 m-5">
        <thead>
          <tr>
            <th colSpan={6} className="text-center p-1 border">
              SUM UP
            </th>
          </tr>
          <tr>
            <th colSpan={3} className="text-center p-1 border">
              SUM UP
            </th>
            <th colSpan={3} className="text-center p-1 border">
              CR
            </th>
          </tr>
        </thead>
        <tbody>
          {showData.map((item, i) =>
            i === 0 ? (
              <tr key={i}>
                <td rowSpan={rowspan} className={cn("text-center p-1 border")}>
                  MASTER L/C
                </td>
                <td rowSpan={rowspan} className="text-center p-1 border">
                  SALES CONTRACT NO : {data?.SalesContractNo}
                </td>
                <td rowSpan={rowspan} className="text-center p-1 border">
                  {total}
                </td>
                <td className={cn("text-center p-1 border", item.isBBLCash ? 'bg-emerald-200' : 'bg-sky-200')}>{item.particular}</td>
                <td className={cn("text-center p-1 border", item.isBBLCash ? 'bg-emerald-200' : 'bg-sky-200')}>
                  {item.amount.toFixed(2)}
                </td>
                <td className={cn("text-center p-1 border", item.isBBLCash ? 'bg-emerald-200' : 'bg-sky-200')}>
                  {item.percentage?.toFixed(3)}%
                </td>
              </tr>
            ) : (
              <tr key={i} className={cn(item.isBBLCash ? 'bg-emerald-200' : 'bg-sky-100')}>
                <td className="text-center p-1 border">{item.particular}</td>
                <td className="text-center p-1 border">
                  {item.amount.toFixed(2)}
                </td>
                <td className="text-center p-1 border">
                  {item.percentage?.toFixed(3)}%
                </td>
              </tr>
            )
          )}

          <tr>
            <td className="font-bold text-center p-1 border">Total</td>
            <td className="text-center p-1 border"></td>
            <td className="font-bold text-center p-1 border">{total}</td>
            <td className="text-center p-1 border"></td>
            <td className="font-bold text-center p-1 border">
              {showData.reduce((p, c) => p + c.amount, 0).toFixed(2)}
            </td>
            <td className="text-center p-1 border"></td>
          </tr>

          <tr>
            <td className="font-bold text-center p-1 border">Balance</td>
            <td colSpan={5} className="font-bold text-center p-1 border">
              {(
                total - showData.reduce((p, c) => p + c.amount, 0)
              ).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="m-5 w-4/12">
        <table className="w-full">
          <thead>
            <tr className={cn('bg-emerald-200')}>
              <th className="border p-1">BTB & Cash</th>
              <th className="border p-1">
                {showData
                  .filter((f) => f.isBBLCash)
                  .reduce((p, c) => p + c.amount, 0)
                  .toFixed(2)}
              </th>
              <th className="border p-1">
                {showData
                  .filter((f) => f.isBBLCash)
                  .reduce((p, c) => p + (c.percentage ?? 0), 0)
                  .toFixed(2)}
                %
              </th>
            </tr>
            <tr className={cn('bg-sky-100')}>
              <th className="border p-1">CM/Comercial/HO Cost/Commission</th>
              <th className="border p-1">
                {showData
                  .filter((f) => !f.isBBLCash)
                  .reduce((p, c) => p + c.amount, 0)
                  .toFixed(2)}
              </th>
              <th className="border p-1">
                {showData
                  .filter((f) => !f.isBBLCash)
                  .reduce((p, c) => p + (c.percentage ?? 0), 0)
                  .toFixed(2)}
                %
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
