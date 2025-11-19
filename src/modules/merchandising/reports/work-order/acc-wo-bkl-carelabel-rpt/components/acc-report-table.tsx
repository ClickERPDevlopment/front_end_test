import AccReportTableRows from "./acc-report-table-rows";
import AccReportTableTotal from "./acc-report-table-total";
import { iaccWorkOrder } from "../../components/iaccWorkOrder";

export default function AccReportTable({ data }: { data: iaccWorkOrder[] }) {
  return (
    <table className="border-collapse table-fixed my-4 min-w-[100%]">
      <thead>
        <tr className="border">
          <th colSpan={3} className="text-left px-3">
            {data[0]?.MTL_NAME}
          </th>
        </tr>
        <tr className="border">
          <th className="border min-w-[150px] text-sm">PO NO</th>
          <th className="border min-w-[150px] text-sm">STYLE</th>
          <th className="border min-w-[150px] text-sm">FABRIC QUALITY</th>
          <th className="border min-w-[150px] text-sm">COLOR</th>
          <th className="border min-w-[150px] text-sm">ORDER QTY PCS</th>
          <th className="border min-w-[150px] text-sm">WORK ORDER QTY</th>
          <th className="border min-w-[60px] text-sm">RATE</th>
          <th className="border min-w-[100px] text-sm">TOTAL AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <AccReportTableRows data={d} key={Math.random()} />
        ))}
        <AccReportTableTotal data={data} />
      </tbody>
    </table>
  );
}
