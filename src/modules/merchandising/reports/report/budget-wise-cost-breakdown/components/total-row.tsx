import { ICommission, IGrossCostLocalStorage, IProfitLossLocalStorage } from "../budget-wise-cost-breakdown-index";
import { UniquePoStyleCommissions } from "./action";
import { IBudgetWiseCostBreakdown } from "./IBudgetWiseCostBreakdown";

type props = {
  data: IBudgetWiseCostBreakdown,
  title: string,
  gmtProcessType?: string[],
  commissionType?: string[],
  children?: React.ReactNode,
  fabricProcessType?: string[],
  comission?: ICommission[];
}

export default function TotalRow({ data, title, gmtProcessType, commissionType, comission }: props) {
  const grossCostString = localStorage.getItem('grossCost');
  const grossCostData: IGrossCostLocalStorage[] = grossCostString ? JSON.parse(grossCostString) : [];
  const grossCost = grossCostData?.reduce((p, c) => p + c.grossCost, 0);

  const profitLossString = localStorage.getItem('budget-profitloss');
  const profitLossData: IProfitLossLocalStorage[] = profitLossString ? JSON.parse(profitLossString) : [];
  const profitLoss = profitLossData?.reduce((p, c) => p + c.amount, 0);

  return (
    <tr>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" colSpan={6}>{title}</th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500">{data?.BudgetWiseCostBreakdownDto_PO.reduce((p, c) => p + Number(c.QTY), 0)}</th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500"></th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500"></th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500"></th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500"></th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500"></th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500">
        {data?.BudgetWiseCostBreakdownDto_PO?.reduce((p, c) => p + Number(c.MASTER_LC_VALUE), 0)}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500">
        {data?.BudgetWiseCostBreakdownDto_MainFabric?.reduce((p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE), 0).toFixed(2)}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {(data?.BudgetWiseCostBreakdownDto_OtherFabric?.reduce((p, c) => p + Number(c.TOTAL_MAIN_FABRIC_VALUE), 0).toFixed(2))}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {(data?.BudgetWiseCostBreakdownDto_Accessories?.reduce((p, c) => p + Number(c.TOTAL_COST), 0).toFixed(2))}
      </th>
      {gmtProcessType?.map((fp_item, i) =>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" key={i}>
          {data?.BudgetWiseCostBreakdownDto_GmtOtherCost?.filter(f => f.PROCESS_NAME === fp_item).reduce((p, c) => p + Number(c.TOTAL_PRICE), 0).toFixed(2)}
        </th>
      )}
      {/* <th className="text-balance text-center p-1 border-r border-t border-gray-500" >Total CM Achieve</th> */}
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {UniquePoStyleCommissions(data)?.reduce((p, c) => p + Number(c.COMMISSION), 0)?.toFixed(2)}
      </th>
      {commissionType?.map((fp_item, i) =>
        <th className="text-balance text-center p-1 border-r border-t border-gray-500" key={i}>
          {comission?.filter(f => f.commissinType === fp_item)?.reduce((p, c) => p + Number(c.amount), 0)?.toFixed(2)}
        </th>
      )}
      {/* <th className="text-balance text-center p-1 border-r border-t border-gray-500" >Commercial</th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" >Head Office Cost </th>
          <th className="text-balance text-center p-1 border-r border-t border-gray-500" >Buyeing commission</th> */}
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {grossCost?.toFixed(2)}
        {/* {Number(localStorage.getItem('grossCost'))?.toFixed(2)} */}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {/* SHORT+ EXTRA */}
        {Number((data?.BudgetWiseCostBreakdownDto_PO?.reduce((p, c) => p + Math.round(c.MASTER_LC_VALUE), 0)) - grossCost).toFixed(2)}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {/* CM per dzn Achieve */}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {/* SMV */}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {/* Target CM per dzn */}
      </th>
      <th className="text-balance text-center p-1 border-r border-t border-gray-500" >
        {/* PROFIT/ LOSS */}
        {profitLoss?.toFixed(2)}
      </th>
    </tr>
  );
}
