import { IFinishFabricReturnCuttingFloorToStoreReport } from "../finish-fabric-return-cutting-floor-to-store-report-type";

export interface IReportTableProps {
  data: IFinishFabricReturnCuttingFloorToStoreReport[];
}

const ReportTable: React.FC<IReportTableProps> = ({ data }) => {
  const totalReq = data.reduce((acc, item) => acc + item.REQ_QTY, 0);
  const totalRCV = data.reduce((acc, item) => acc + item.RCV_QTY, 0);
  const totalReturn = data.reduce((acc, item) => acc + item.RETURN_QTY, 0);

  return (
    <>
      {data.map((item, index) => (
        <tr key={index} className="text-center">
          <td className="border border-gray-300 p-1">{item.BUYER_NAME}</td>
          <td className="border border-gray-300 p-1">{item.STYLE_NO}</td>
          <td className="border border-gray-300 p-1">{item.PO_NO}</td>
          <td className="border border-gray-300 p-1">{item.REQ_QTY}</td>
          <td className="border border-gray-300 p-1">
            {item.RCV_QTY.toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">
            {(item.RCV_QTY - item.REQ_QTY).toFixed(2)}
          </td>
          <td className="border border-gray-300 p-1">{item.RETURN_QTY}</td>
          <td className="border border-gray-300 p-1">
            {(item.RCV_QTY - item.RETURN_QTY - item.REQ_QTY).toFixed(0)}
          </td>
        </tr>
      ))}
      <tr className="text-center font-bold">
        <td className="border border-gray-300 p-1" colSpan={3}>
          Total
        </td>
        <td className="border border-gray-300 p-1">{totalReq}</td>
        <td className="border border-gray-300 p-1">{totalRCV.toFixed(2)}</td>
        <td className="border border-gray-300 p-1">
          {(totalRCV - totalReq).toFixed(2)}
        </td>
        <td className="border border-gray-300 p-1">{totalReturn}</td>
        <td className="border border-gray-300 p-1">
          {(totalRCV - totalReturn - totalReq).toFixed(2)}
        </td>
      </tr>
    </>
  );
};

export default ReportTable;
