import { GeneralBlockFabricStatusReportType } from "../general-block-f-status-rpt-type";

function ReportTotal({ data }: { data: GeneralBlockFabricStatusReportType[] }) {
  return (
    <tr className="bg-slate-300 border border-slate-500">
      <td
        className="border border-slate-400 p-1 text-sm text-center font-bold"
        colSpan={7}
      >
        Total
      </td>
      <td className="border border-slate-400 p-1 text-sm text-center font-bold">
        {data.reduce((pre, cur) => pre + cur.WO_QTY, 0).toFixed(2)}
      </td>
      <td className="border border-slate-400 p-1 text-sm text-center font-bold">
        {data.reduce((pre, cur) => pre + cur.RCV_QTY, 0)}
      </td>
      <td className="border border-slate-400 p-1 text-sm text-center font-bold">
        {data.reduce((pre, cur) => pre + cur.ALLOCATED_QTY, 0)}
      </td>
      <td className="border border-slate-400 p-1 text-sm text-center font-bold">
        {data.reduce((pre, cur) => pre + cur.ALLOCATED_BALANCE_QTY, 0)}
      </td>
      <td
        className="border border-slate-400 p-1 text-sm text-center font-bold"
        colSpan={6}
      ></td>
    </tr>
  );
}

export default ReportTotal;
