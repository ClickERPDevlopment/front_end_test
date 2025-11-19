import { IProcessWiseDyeingFinishProductionReport } from "../process-wise-dyeing-finish-production-report-type";

function ReportGrandTotal({
  data,
}: {
  data: IProcessWiseDyeingFinishProductionReport[];
  firstHeader: string[] | null;
}) {
  const totalQtyA = data?.reduce((acc, item) => {
    return acc + (item.SHIFT === "A" ? item.QUANTITY : 0);
  }, 0);

  const totalQtyB = data?.reduce((acc, item) => {
    return acc + (item.SHIFT === "B" ? item.QUANTITY : 0);
  }, 0);

  const totalQtyC = data?.reduce((acc, item) => {
    return acc + (item.SHIFT === "C" ? item.QUANTITY : 0);
  }, 0);

  const total = totalQtyA + totalQtyB + totalQtyC;

  return (
    <>
      <td className="border border-gray-300 p-1">{totalQtyA?.toFixed(2)}</td>
      <td className="border border-gray-300 p-1">{totalQtyB?.toFixed(2)}</td>
      <td className="border border-gray-300 p-1">{totalQtyC?.toFixed(2)}</td>
      <td className="border border-gray-300 p-1">
        {isNaN(total) ? 0 : total?.toFixed(2)}
      </td>
    </>
  );
}

export default ReportGrandTotal;
