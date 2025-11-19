import { iaccWorkOrder } from "../../components/iaccWorkOrder";

function GetSizeQty({ data }: { data: iaccWorkOrder[] }) {
  let qty: number = 0;
  data?.forEach((element) => {
    qty += element.WORK_ORDER_QTY;
  });

  return <>{Math.round(qty)}</>;
}

function GetTotalAmount({ data }: { data: iaccWorkOrder[] }) {
  let qty: number = 0;
  data?.forEach((element) => {
    qty += element.WORK_ORDER_QTY * element.SUPPLIER_RATE_PER_PCS;
  });

  return <>{qty?.toFixed(2)}</>;
}

export default function AccReportTableRows({
  data,
  gmtSizes,
}: {
  data: iaccWorkOrder[];
  gmtSizes: string[];
}) {
  return (
    <tr key={Math.random()}>
      <td className="text-center text-sm border">{data[0]?.PO_NO}</td>
      <td className="text-center text-sm border">{data[0]?.STYLENAME}</td>
      <td className="text-center text-sm border">{data[0]?.GMT_COLOR_NAME}</td>
      {gmtSizes.map((s) => (
        <td className="text-center text-sm border" key={Math.random()}>
          <GetSizeQty
            data={data.filter(
              (x) =>
                x.PO_NO === data[0]?.PO_NO &&
                x.STYLENAME === data[0]?.STYLENAME &&
                x.GMT_COLOR_NAME === data[0]?.GMT_COLOR_NAME &&
                x.SUPPLIER_RATE_PER_PCS === data[0]?.SUPPLIER_RATE_PER_PCS &&
                x.GMT_SIZE_NAME === s
            )}
          />
        </td>
      ))}
      <td className="text-center text-sm border">
        <GetSizeQty
          data={data.filter(
            (x) =>
              x.PO_NO === data[0]?.PO_NO &&
              x.STYLENAME === data[0]?.STYLENAME &&
              x.GMT_COLOR_NAME === data[0]?.GMT_COLOR_NAME &&
              x.SUPPLIER_RATE_PER_PCS === data[0]?.SUPPLIER_RATE_PER_PCS
          )}
        />
      </td>
      <td className="text-center text-sm border">
        {data[0]?.SUPPLIER_RATE_PER_PCS?.toFixed(4)}
      </td>
      <td className="text-center text-sm border">
        <GetTotalAmount
          data={data.filter(
            (x) =>
              x.PO_NO === data[0]?.PO_NO &&
              x.STYLENAME === data[0]?.STYLENAME &&
              x.GMT_COLOR_NAME === data[0]?.GMT_COLOR_NAME &&
              x.SUPPLIER_RATE_PER_PCS === data[0]?.SUPPLIER_RATE_PER_PCS
          )}
        />
      </td>
    </tr>
  );
}
