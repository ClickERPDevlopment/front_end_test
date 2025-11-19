import { IBudgetWiseCostBreakdown } from "./IBudgetWiseCostBreakdown"

export type IUniquePoStyleCommissions =
    { PO_ID: number, STYLE_ID: number, TOTAL_FOB: number, BALANCE_VALUE: number, COMMISSION: number }

export const UniquePoStyleCommissions = (data: IBudgetWiseCostBreakdown): IUniquePoStyleCommissions[] => {
    const res = new Map(
        data?.BudgetWiseCostBreakdownDto_MainFabric
            ?.filter(item => item.PO_ID && item.STYLE_ID && item.TOTAL_FOB && item.BALANCE_VALUE)
            .map(item => [
                `${item.PO_ID}__${item.STYLE_ID}__${item.TOTAL_FOB}__${item.BALANCE_VALUE}`, // composite key
                { PO_ID: item.PO_ID, STYLE_ID: item.STYLE_ID, TOTAL_FOB: item.TOTAL_FOB, BALANCE_VALUE: item.BALANCE_VALUE, COMMISSION: item.TOTAL_FOB - item.BALANCE_VALUE }
            ])
    ).values()
    return Array.from(res)
}