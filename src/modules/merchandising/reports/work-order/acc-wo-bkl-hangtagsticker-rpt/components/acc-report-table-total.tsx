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
  gmtSizes,
}: {
  data: iaccWorkOrder[];
  gmtSizes: string[];
}) {
  return (
    <tr key={Math.random()}>
      <td colSpan={3} className="uppercase font-bold text-center border">
        Total
      </td>

      {gmtSizes.map((element) => (
        <td className="font-bold text-center border">
          {data
            .filter(
              (f) => f.GMT_SIZE_NAME.toUpperCase() === element.toUpperCase()
            )
            .reduce((p, c) => p + c.WORK_ORDER_QTY, 0)}
        </td>
      ))}
      <td className="font-bold text-center border">
        {data.reduce((p, c) => p + c.WORK_ORDER_QTY, 0)}
      </td>
      <td className="font-bold text-center border"></td>
      <td className="text-center border">
        <GetTotalAmount data={data} />
      </td>
    </tr>
  );
}
