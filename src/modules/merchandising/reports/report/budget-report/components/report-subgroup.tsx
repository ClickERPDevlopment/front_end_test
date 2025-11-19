import useAppClient from "@/hooks/use-AppClient";
import { BudgetReportType } from "../budget-report-type";

function ReportSubgroup({
  data,
  gorupLength,
  index,
  totalFob,
  poQty
}: {
  data: BudgetReportType[];
  firstHeader: string[] | null;
  gorupLength: number;
  index: number;
  totalFob?: number;
  poQty?: number;
}) {

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.QTY),
    0);
  console.log(totalFob)
  console.log(poQty)
  const client = useAppClient();
  return (
    <>
      {data[0].DS.includes('COST CENTER') ?
        <tr style={{ fontSize: "12px" }} className="font-light">
          {
            index == 0 && <td rowSpan={gorupLength} className="border border-gray-950 p-0.5 font-bold">{data[0]?.DS}</td>
          }
          <td className="border border-gray-950 p-0.5">{data[0]?.MTL + '(Dzn: ' + (data[0]?.BUDGET_PRICE * 12).toFixed(2) + ')'}</td>
          <td className="border border-gray-950 p-0.5 text-center">{totalQuantiy}</td>
          <td className="border border-gray-950 p-0.5 text-center">{data[0]?.UOM}</td>
          <td className="border border-gray-950 p-0.5 text-center">{data[0]?.BUDGET_PRICE.toFixed(3)}</td>
          <td className="border border-gray-950 p-0.5 text-center">{data[0]?.BUDGET_TOTAL_VALUE.toFixed(3)}</td>
        </tr> :
        <tr style={{ fontSize: "12px" }} className="font-light">
          {
            index == 0 && <td rowSpan={gorupLength} className="border border-gray-950 p-0.5 font-bold">{data[0]?.DS}</td>
          }
          <td className="border border-gray-950 p-0.5">
            {
              client.currentClient === client.EURO ?
                `${data[0]?.MTL} ${(data[0]?.SUPPLIER_NAME ? `[${data[0]?.SUPPLIER_NAME}]` : '')}` :
                `${data[0]?.MTL}`
            }
          </td>
          <td className="border border-gray-950 p-0.5 text-center">{totalQuantiy}</td>
          <td className="border border-gray-950 p-0.5 text-center">{data[0]?.UOM}</td>
          <td className="border border-gray-950 p-0.5 text-center">{data[0]?.BUDGET_PRICE.toFixed(3)}</td>
          <td className="border border-gray-950 p-0.5 text-center">{data[0]?.BUDGET_TOTAL_VALUE.toFixed(3)}</td>
        </tr>
      }
    </>
  );
}

export default ReportSubgroup;
