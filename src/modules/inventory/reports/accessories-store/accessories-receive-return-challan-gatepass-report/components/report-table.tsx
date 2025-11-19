import { IAccessoriesReceiveReturnChallanGatePassReport } from "../accessories-receive-return-challan-gatepass-report-type";

export interface IReportTableProps {
  data: IAccessoriesReceiveReturnChallanGatePassReport[];
}

const ReportTable: React.FC<IReportTableProps> = ({ data }) => {
  const totalRcvQty = data.reduce((prev, curr) => prev + curr.RCV_QTY, 0);
  const totalReturnQty = data.reduce(
    (prev, curr) => prev + curr.CHALLAN_QTY,
    0
  );

  return (
    <>
      <tr className="text-center">
        {/* <td className='border border-gray-300 p-1'>{data[0]?.CHALLAN_NO}</td> */}
        <td className="border border-gray-300 p-1">{data[0]?.MATERIAL}</td>
        <td className="border border-gray-300 p-1">{data[0]?.UOM}</td>
        <td className="border border-gray-300 p-1">{data[0]?.MTL_SIZE}</td>
        <td className="border border-gray-300 p-1">{data[0]?.ML_COLOR_1}</td>
        <td className="border border-gray-300 p-1">{totalRcvQty}</td>
        <td className="border border-gray-300 p-1">{totalReturnQty}</td>
      </tr>
    </>
  );
};

export default ReportTable;
