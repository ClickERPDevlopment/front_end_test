import { iaccWorkOrder } from "../../components/iaccWorkOrder";
import AccReportTableRows from "./acc-report-table-rows";
import AccReportTableTotal from "./acc-report-table-total";

function getAccReportGmtSizes(data: iaccWorkOrder[]) {
  const sizes: string[] = [];

  if (data) {
    if (data.length > 0) {
      data = data?.sort((a, b) => a.SORTINGNO - b.SORTINGNO);

      data?.forEach((element) => {
        if (!sizes.includes(element.GMT_SIZE_NAME)) {
          sizes.push(element.GMT_SIZE_NAME);
        }
      });
    }
  }

  return sizes;
}

function getColumns(data: iaccWorkOrder[]) {
  const colCheckStrings: string[] = [];
  const columns: iaccWorkOrder[] = [];

  data?.forEach((e) => {
    const str =
      e.PO_NO + e.STYLENAME + e.GMT_COLOR_NAME + e.SUPPLIER_RATE_PER_PCS;
    if (!colCheckStrings.includes(str)) {
      colCheckStrings.push(str);
      columns.push(e);
    }
  });

  return columns;
}

export default function AccReportTable({ data }: { data: iaccWorkOrder[] }) {
  data?.forEach((element) => {
    if (element.GMT_SIZE_NAME === null) {
      element.GMT_SIZE_NAME = "ALL SIZE";
    }
  });

  const gmtSizes = getAccReportGmtSizes(data);
  const columns = getColumns(data); /*coloums this group have */

  console.log(gmtSizes);

  return (
    <table className="border-collapse table-fixed my-4 min-w-[100%]">
      <thead>
        <tr className="border">
          <th colSpan={3} className="border">
            {data[0]?.MTL_NAME}
          </th>
          <th colSpan={gmtSizes?.length} className="border">
            Size wise Required Qty
          </th>
        </tr>
        <tr className="border">
          <th className="border min-w-[150px] text-sm">PO NO</th>
          <th className="border min-w-[150px] text-sm">STYLE</th>
          <th className="border min-w-[150px] text-sm">GMT Color</th>
          {gmtSizes?.map((s) => (
            <th key={Math.random()} className="border min-w-[70px] text-sm">
              {s}
            </th>
          ))}
          <th className="border min-w-[150px] text-sm">Total Qty</th>
          <th className="border min-w-[60px] text-sm">Rate</th>
          <th className="border min-w-[100px] text-sm">Total Amount</th>
        </tr>
      </thead>
      <tbody>
        {columns.map((col) => (
          <AccReportTableRows
            data={data.filter(
              (x) =>
                x.PO_NO === col.PO_NO &&
                x.STYLENAME === col.STYLENAME &&
                x.GMT_COLOR_NAME === col.GMT_COLOR_NAME &&
                x.SUPPLIER_RATE_PER_PCS === col.SUPPLIER_RATE_PER_PCS
            )}
            gmtSizes={gmtSizes}
            key={Math.random()}
          />
        ))}
        <AccReportTableTotal data={data} gmtSizes={gmtSizes} />
      </tbody>
    </table>
  );
}
