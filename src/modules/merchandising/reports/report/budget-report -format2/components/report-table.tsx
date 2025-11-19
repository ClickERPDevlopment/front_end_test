/* eslint-disable @typescript-eslint/no-explicit-any */
import { BudgetReportType } from "../budget-report -format2-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
}: {
  data: BudgetReportType[];
  firstHeader: string[] | null;
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

  return (
    <>
      {uniqueKeysArray?.map((key) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          firstHeader={firstHeader}
        ></ReportSubgroup>
      ))}

      <tr style={{ fontSize: "11px" }} className="font-bold">
        <td colSpan={5} className="border border-gray-950 p-0.5 text-end">PERCENTAGE: {((totalBudgetValue / data[0].TOTAL_FOB_VALUE) * 100).toFixed(2)} %</td>
        <td className="border border-gray-950 p-0.5">{totalBudgetValue.toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportTable;
