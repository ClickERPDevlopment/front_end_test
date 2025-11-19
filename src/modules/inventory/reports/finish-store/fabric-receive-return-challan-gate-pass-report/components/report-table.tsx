import { IFabricReceiveReturnChallanGatePassReport } from "../fabric-receive-return-challan-gate-pass-report-type";
export interface IReportTableProps {
  data: IFabricReceiveReturnChallanGatePassReport[];
}

const ReportTable: React.FC<IReportTableProps> = ({ data }) => {

  return (
    <>
      {data.map((item, index) => (
        <tr key={index} className="text-center">
          <td className="border border-gray-300">{item.BUYER_NAME}</td>
          <td className="border border-gray-300">{item.STYLENO}</td>
          <td className="border border-gray-300">{item.PONO}</td>
          <td className="border border-gray-300">{item.FABRIC}</td>
          <td className="border border-gray-300">{item.COLORNAME}</td>
          <td className="border border-gray-300">{item.UOM}</td>
          <td className="border border-gray-300">{item.RCV_QTY}</td>
          <td className="border border-gray-300">{item.RCV_ROLL}</td>
          <td className="border border-gray-300">{item.RET_QTY}</td>
          <td className="border border-gray-300">{item.RET_ROLL}</td>
        </tr>
      ))}
    </>
  );
};

export default ReportTable;
