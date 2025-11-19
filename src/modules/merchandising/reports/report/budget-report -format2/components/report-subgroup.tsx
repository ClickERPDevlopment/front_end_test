import { BudgetReportType } from "../budget-report -format2-type";
import TableRow from "./report-table-row";

function ReportSubgroup({
  data
}: {
  data: BudgetReportType[];
  firstHeader: string[] | null;
}) {

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.QTY),
    0);

  return (
    <>
      <TableRow
        DS={data[0]?.DS}
        MTL={data[0]?.MTL}
        TOTAL_QTY={totalQuantiy}
        UOM={data[0]?.UOM}
        BUDGET_PRICE={data[0]?.BUDGET_PRICE}
        BUDGET_TOTAL_VALUE={data[0]?.BUDGET_TOTAL_VALUE} />
    </>
  );
}

export default ReportSubgroup;
