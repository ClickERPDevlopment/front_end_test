import { IDateWiseFabricRequisitionReceive } from "../date-wise-fabric-requisition-receive-type";

function ReportTable({
  data,
}: {
  data: IDateWiseFabricRequisitionReceive[];
  firstHeader: string[] | null;
}) {
  const totalRequired = data.reduce((acc, item) => {
    return acc + item.TOTAL_REQUIRED;
  }, 0);

  const totalRedy = data.reduce((acc, item) => {
    return acc + item.READY_QTY;
  }, 0);

  const totalDayRequisition = data.reduce((acc, item) => {
    return acc + item.DAY_REQUISITION;
  }, 0);

  const totalDayReceive = data.reduce((acc, item) => {
    return acc + item.DAY_RECEIVE;
  }, 0);

  const totalReceive = data.reduce((acc, item) => {
    return acc + item.TOTAL_RECEIVE;
  }, 0);

  const totalBalance = data.reduce((acc, item) => {
    return acc + (item.TOTAL_RECEIVE - item.TOTAL_REQUIRED);
  }, 0);

  return (
    <>
      {data.map((item, index) => (
        <tr key={index} className="text-center">
          <td className="border border-gray-300 p-1">{item.BUYER_NAME}</td>
          <td className="border border-gray-300 p-1">{item.PO_NO}</td>
          <td className="border border-gray-300 p-1">{item.STYLE_NO}</td>
          <td className="border border-gray-300 p-1">{item.COLOR_NAME}</td>
          <td className="border border-gray-300 p-1">{item.FABRIC_NAME}</td>
          <td className="border border-gray-300 p-1">{item.FABRIC_SOURCE}</td>
          <td className="border border-gray-300 p-1">{item.UNIT}</td>
          <td className="border border-gray-300 p-1 text-center">
            {item.TOTAL_REQUIRED}
          </td>
          <td className="border border-gray-300 p-1 text-center">
            {item.READY_QTY}
          </td>
          <td className="border border-gray-300 p-1 text-center">
            {item.DAY_REQUISITION}
          </td>
          <td className="border border-gray-300 p-1 text-center">
            {item.DAY_RECEIVE}
          </td>
          <td className="border border-gray-300 p-1 text-center">
            {item.TOTAL_RECEIVE}
          </td>
          <td className="border border-gray-300 p-1 text-center">
            {(item.TOTAL_RECEIVE - item.TOTAL_REQUIRED).toFixed(2)}
          </td>
        </tr>
      ))}
      {
        <tr className="text-center  bg-indigo-200">
          <td className="border border-gray-300 p-1 font-bold" colSpan={7}>
            Total
          </td>
          <td className="border border-gray-300 p-1">
            {totalRequired && totalRequired.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">
            {totalRedy && totalRedy.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">
            {totalDayRequisition && totalDayRequisition.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">
            {totalDayReceive && totalDayReceive.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">
            {totalReceive && totalReceive.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">
            {totalBalance && totalBalance.toFixed(2)}
          </td>
        </tr>
      }
    </>
  );
}

export default ReportTable;
