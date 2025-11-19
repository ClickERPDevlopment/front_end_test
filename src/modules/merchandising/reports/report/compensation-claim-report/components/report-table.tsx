import { IMonthlyYarnCosting } from "@/modules/inventory/reports/yarn-store/monthly-yarn-costing-report/monthly-yarn-costing-report-type";

function ReportTable({
  data,
}: {
  data: IMonthlyYarnCosting[];
  firstHeader: string[] | null;
}) {
  const totalQty = data.reduce((acc, item) => {
    return acc + item.QTY;
  }, 0);

  const totalAmount = data.reduce((acc, item) => {
    return acc + item.UNIT_PRICE * item.QTY;
  }, 0);

  return (
    <>
      {data.map((item, index) => (
        <tr key={index} className="text-center">
          <td className="border border-gray-950 p-1 text-left">{item.YARN}</td>
          <td className="border border-gray-950 p-1">{item.YARN_LOT}</td>
          <td className="border border-gray-950 p-1">{item.KNITTING_HOUSE}</td>
          <td className="border border-gray-950 p-1">{item.QTY.toFixed(2)}</td>
          <td className="border border-gray-950 p-1">{item.UNIT_PRICE}</td>
          <td className="border border-gray-950 p-1">
            {(item.QTY * item.UNIT_PRICE).toFixed(2)}
          </td>
        </tr>
      ))}
      {
        <tr className="text-center  bg-indigo-200">
          <td className="border border-gray-950 p-1 font-bold" colSpan={3}>
            Total
          </td>
          <td className="border border-gray-950 p-1 font-bold">
            {totalQty.toFixed(2)}
          </td>
          <td className="border border-gray-950 p-1 font-bold"></td>
          <td className="border border-gray-950 p-1 font-bold">
            {totalAmount.toFixed(2)}
          </td>
        </tr>
      }
    </>
  );
}

export default ReportTable;
