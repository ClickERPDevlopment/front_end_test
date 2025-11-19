import moment from "moment";
import { IAccessoriesReceiveStatusByChallanNoReport } from "../accessories-receive-status-by-challan-no-report-type";
export interface IReportTableProps {
  data: IAccessoriesReceiveStatusByChallanNoReport[];
}

const ReportTable: React.FC<IReportTableProps> = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <tr key={index} className="text-center">
          <td className="border border-gray-300">{item.BUYER_NAME}</td>
          <td className="border border-gray-300">{item.PONO}</td>
          <td className="border border-gray-300">{item.SUB_PO}</td>
          <td className="border border-gray-300">{item.STYLENO}</td>
          <td className="border border-gray-300">{item.PURCHASE_ORDER_NO}</td>
          <td className="border border-gray-300">{item.MRR_NO || item.ALLOCATION_NO || item.RET_NO}</td>
          {
            moment(item?.CHALLAN_DATE).format("DD-MMM-YY") !== "01-Jan-01" ?
              <td className="border border-gray-300 text-nowrap">
                {moment(item.CHALLAN_DATE).format("DD-MMM-YY")}
              </td> :
              <td className="border border-gray-300">
              </td>
          }
          <td className="border border-gray-300 text-nowrap">
            {moment(item.RECEIVE_DATE).format("DD-MMM-YY")}
          </td>
          <td className="border border-gray-300">{item.ITEM_NAME}</td>
          <td className="border border-gray-300">{item.COLORNAME}</td>
          <td className="border border-gray-300">{item.SIZENAME}</td>
          <td className="border border-gray-300">{item.RECEIVE_QTY}</td>
          <td className="border border-gray-300">{item.UOM}</td>
          <td className="border border-gray-300">{item.DESCRIPTION_1}</td>
          <td className="border border-gray-300">{item.DESCRIPTION_2}</td>
        </tr>
      ))}
    </>
  );
};

export default ReportTable;
