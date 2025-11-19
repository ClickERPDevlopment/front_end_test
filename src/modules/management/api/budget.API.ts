import { FetchParams, PaginationObject } from "@/types/global";
import { IBudget } from "../pages/budgetApproval/budget.interface";
import { buildQueryParams } from "@/utils/url";
import axiosInstance from "@/api/axiosInstance";





// export const fetchBudgetApprovalList = async (
//     buyerId: number = 0,
//     styleId: number = 0,
//     poId: number = 0
// ): Promise<IBudgetApproval[]> => {
//     const res = await axiosInstance.get(
//         `/gmt-budget/budget-approval-status`,
//         {
//             params: { buyerId, styleId, poId }
//         }
//     );
//     return res.data;
// };


// Fetch paginated
// Fetch paginated
export const fetchPagedBudgetApprovals = async (
    params: FetchParams = {}
): Promise<PaginationObject<IBudget>> => {
    const queryString = buildQueryParams({
        pageNumber: params.page,
        pageSize: params.perPage,
        // currentPage: params.page,
        // perPage: params.perPage,
        ...params.searchCriteria,
        orderBy: params.orderBy,
    });

    const res = await axiosInstance.get(`/gmt-budget-approval/budget-approval-status?${queryString}`);
    return res.data;
};