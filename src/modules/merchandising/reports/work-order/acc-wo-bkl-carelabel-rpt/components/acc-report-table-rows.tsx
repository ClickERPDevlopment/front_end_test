import { iaccWorkOrder } from "../../components/iaccWorkOrder";

export default function AccReportTableRows({ data }: { data: iaccWorkOrder }) {
  return (
    <tr key={Math.random()}>
      <td className="text-center text-sm border">{data?.PO_NO}</td>
      <td className="text-center text-sm border">{data?.STYLENAME}</td>
      <td className="text-center text-sm border">{data?.FABRIC_QUALITY}</td>
      <td className="text-center text-sm border">
        {" "}
        {data?.GMT_COLOR_NAME == null
          ? data?.MTL_COLOR_NAME
          : data.GMT_COLOR_NAME}{" "}
      </td>
      <td className="text-center text-sm border">{data?.GMT_QTY}</td>
      <td className="text-center text-sm border">{data?.WORK_ORDER_QTY}</td>
      <td className="text-center text-sm border">
        {data?.SUPPLIER_RATE_PER_PCS?.toFixed(4)}
      </td>
      <td className="text-center text-sm border">
        {(data?.WORK_ORDER_QTY * data.SUPPLIER_RATE_PER_PCS).toFixed(2)}
      </td>
    </tr>
  );
}
