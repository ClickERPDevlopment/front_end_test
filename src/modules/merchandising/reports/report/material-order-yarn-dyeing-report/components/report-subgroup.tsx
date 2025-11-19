import { IMaterialOrderYarnDyeingReport } from "../material-order-yarn-dyeing-report-type";

function ReportSubgroup({
  data
}: {
  data: IMaterialOrderYarnDyeingReport[];
  firstHeader: string[] | null;
}) {

  const totalQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.WORK_ORDER_QTY),
    0);

  return (
    <>
      <tr style={{ fontSize: "11px" }} className="font-bold">
        <td className="border border-gray-950 p-0.5">{data[0]?.STYLENAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.MTL_COLOR_NAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.GMT_SIZE_NAME}</td>
        <td className="border border-gray-950 p-0.5">{totalQuantiy.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.UOM}</td>
        <td className="border border-gray-950 p-0.5">{data[0].SUPPLIER_RATE_PER_PCS.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{(data[0].SUPPLIER_RATE_PER_PCS * totalQuantiy).toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
