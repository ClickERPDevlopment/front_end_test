import { iaccWorkOrder } from "../../components/iaccWorkOrder";
export function GetTotalAmount({ data }: { data: iaccWorkOrder[] }) {
  let qty: number = 0;
  data?.forEach((element) => {
    qty += element.WORK_ORDER_QTY * element.SUPPLIER_RATE_PER_PCS;
  });

  return <>{qty?.toFixed(2)}</>;
}

export default function AccReportTableTotal({
  data,
}: {
  data: iaccWorkOrder[];
}) {
  return (
    <tr key={Math.random()}>
      <td colSpan={7} className="uppercase font-bold text-center border">
        Total
      </td>
      <td className="text-center border">
        <GetTotalAmount data={data} />
      </td>
    </tr>
  );
}
