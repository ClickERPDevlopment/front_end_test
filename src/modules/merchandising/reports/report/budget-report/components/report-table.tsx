/* eslint-disable @typescript-eslint/no-explicit-any */
import { BudgetReportType } from "../budget-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
  totalQty,
  totalFob,
  poQty
}: {
  data: BudgetReportType[];
  firstHeader: string[] | null;
  totalQty: number;
  totalFob?: number;
  poQty?: number;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: BudgetReportType[],
    keys: string[]
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface GroupedByDate {
    [key: string]: {
      items: BudgetReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["MTL", "UOM", "BUDGET_PRICE", "UOM", "BUDGET_TOTAL_VALUE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalBudgetValue = data?.reduce(
    (acc, item) => acc + Number(item.BUDGET_TOTAL_VALUE),
    0
  );

  const gorupLength = data.length || 0;

  const particulars = ['IMPORTED FABRIC', 'YARN', 'Knitting', 'FABRIC DYEING']

  return (
    <>
      {uniqueKeysArray?.map((key, index) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          firstHeader={firstHeader}
          gorupLength={gorupLength}
          index={index}
          totalFob={totalFob}
          poQty={poQty}
        ></ReportSubgroup>
      ))}

      {data[0].DS === 'TRIMS & ACCESSORIES' ?
        (<tr style={{ fontSize: "12px", }} className="font-bold">
          <td colSpan={4} className="border border-gray-950 text-end"><span style={{ backgroundColor: "#f4f4cb" }}>Percentage: {((totalBudgetValue / data[0].TOTAL_FOB_VALUE) * 100).toFixed(2)} %</span></td>
          <td className="border border-gray-950 p-0.5" style={{ backgroundColor: "#f4f4cb" }}>{
            '(Dzn: ' +
            (totalQty == 0 ? 0 : (totalBudgetValue * 12 / totalQty)).toFixed(2)
            + ')'
          }</td>
          <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#f4f4cb" }}>{totalBudgetValue.toFixed(2)}</td>
        </tr>)
        : particulars.includes(data[0].DS) ?
          (<tr style={{ fontSize: "12px" }} className="font-bold">
            <td colSpan={2} className="border border-gray-950 text-end">Total</td>
            <td className="border border-gray-950 text-center"><span style={{ backgroundColor: "#f4f4cb" }}>{data.reduce((p, c) => p + c.QTY, 0).toFixed(2)}</span></td>
            <td colSpan={2} className="border border-gray-950 text-end"><span style={{ backgroundColor: "#f4f4cb" }}>Percen.: {((totalBudgetValue / data[0].TOTAL_FOB_VALUE) * 100).toFixed(2)} %</span></td>
            <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#f4f4cb" }}>{totalBudgetValue.toFixed(2)}</td>
          </tr>)
          :
          (<tr style={{ fontSize: "12px" }} className="font-bold">
            <td colSpan={5} className="border border-gray-950 text-end"><span style={{ backgroundColor: "#f4f4cb" }}>Percentage: {((totalBudgetValue / data[0].TOTAL_FOB_VALUE) * 100).toFixed(2)} %</span></td>
            <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#f4f4cb" }}>{totalBudgetValue.toFixed(2)}</td>
          </tr>)
      }
    </>
  );
}

export default ReportTable;
