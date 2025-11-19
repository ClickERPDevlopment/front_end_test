import { IAccessoriesIssueReturnChallanReport } from "../accessories-issue-return-challan-report-type";
export interface IReportTableProps {
  data: IAccessoriesIssueReturnChallanReport[];
}

const ReportTable: React.FC<IReportTableProps> = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <tr key={index} className="text-center">
          <td className="border border-gray-300">{index + 1}</td>
          <td className="border border-gray-300">{item.MATERIAL_NAME}</td>
          <td className="border border-gray-300">{item.RETURN_QTY}</td>
          <td className="border border-gray-300">{item.UOM}</td>
          <td className="border border-gray-300">{item.GMT_SIZE}</td>
          <td className="border border-gray-300">{item.MTL_SIZE}</td>
          <td className="border border-gray-300">{item.GMT_COLOR}</td>
          <td className="border border-gray-300">{item.MTL_COLOR_1}</td>
          <td className="border border-gray-300">{item.MTL_COLOR_2}</td>
          <td className="border border-gray-300">{item.SUB_PO}</td>
        </tr>
      ))}
    </>
  );
};

export default ReportTable;
